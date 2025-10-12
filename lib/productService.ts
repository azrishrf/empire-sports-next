import { Product, Review } from "@/data/products";
import { db } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { serializeProductForClient, serializeProductsForClient } from "./productUtils";

export class ProductService {
  private static readonly COLLECTION_NAME = "products";

  /**
   * Get all products from Firestore
   */
  static async getAllProducts(): Promise<Product[]> {
    try {
      const productsCollection = collection(db, this.COLLECTION_NAME);
      const querySnapshot = await getDocs(productsCollection);

      const products: Product[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        products.push({
          id: doc.id,
          ...data,
        } as Product);
      });

      return serializeProductsForClient(products);
    } catch (error) {
      console.error("Error fetching all products:", error);
      throw error;
    }
  }

  /**
   * Get products by category from Firestore
   */
  static async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const productsCollection = collection(db, this.COLLECTION_NAME);
      const q = query(productsCollection, where("category", "==", category), orderBy("name"));

      const querySnapshot = await getDocs(q);

      const products: Product[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        products.push({
          id: doc.id,
          ...data,
        } as Product);
      });

      return serializeProductsForClient(products);
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
      throw error;
    }
  }

  /**
   * Get a single product by ID from Firestore
   */
  static async getProductById(productId: string): Promise<Product | null> {
    try {
      const productDoc = doc(db, this.COLLECTION_NAME, productId);
      const docSnapshot = await getDoc(productDoc);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const product = {
          id: docSnapshot.id,
          ...data,
        } as Product;
        return serializeProductForClient(product);
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error);
      throw error;
    }
  }

  /**
   * Search products by name or brand
   */
  static async searchProducts(searchTerm: string): Promise<Product[]> {
    try {
      const productsCollection = collection(db, this.COLLECTION_NAME);
      const querySnapshot = await getDocs(productsCollection);

      const products: Product[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const product = {
          id: doc.id,
          ...data,
        } as Product;

        // Simple client-side search (you might want to implement server-side search for better performance)
        if (
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          products.push(product);
        }
      });

      return serializeProductsForClient(products);
    } catch (error) {
      console.error("Error searching products:", error);
      throw error;
    }
  }

  /**
   * Get featured/top picks products based on sales data from orders
   */
  static async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    try {
      // Get only confirmed orders to calculate sales data
      const ordersCollection = collection(db, "orders");
      const confirmedOrdersQuery = query(ordersCollection, where("status", "==", "success"));
      const ordersSnapshot = await getDocs(confirmedOrdersQuery);

      // Count sales for each product
      const productSalesCount: { [productId: string]: number } = {};

      ordersSnapshot.forEach((doc) => {
        const orderData = doc.data();
        // Assuming orders have an 'items' array with productId and quantity
        if (orderData.items && Array.isArray(orderData.items)) {
          orderData.items.forEach((item: { productId?: string; id?: string; quantity?: number }) => {
            const productId = item.productId || item.id;
            const quantity = item.quantity || 1;

            if (productId) {
              productSalesCount[productId] = (productSalesCount[productId] || 0) + quantity;
            }
          });
        }
      });

      // Get all products
      const allProducts = await this.getAllProducts();

      // Add sales count to products and sort by sales
      const productsWithSales = allProducts.map((product) => ({
        ...product,
        salesCount: productSalesCount[product.id] || 0,
      }));

      // Sort by sales count (highest first) and take the top products
      const topSellingProducts = productsWithSales
        .sort((a, b) => b.salesCount - a.salesCount)
        .slice(0, limit)
        .map((productWithSales) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { salesCount, ...product } = productWithSales;
          return product;
        });

      // If we don't have enough top selling products, fill with recent products
      if (topSellingProducts.length < limit) {
        const remainingProducts = allProducts
          .filter((product) => !topSellingProducts.some((top) => top.id === product.id))
          .sort((a, b) => {
            // Sort by creation date if available
            if (a.createdAt && b.createdAt) {
              try {
                return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
              } catch {
                return 0;
              }
            }
            return 0;
          })
          .slice(0, limit - topSellingProducts.length);

        return [...topSellingProducts, ...remainingProducts];
      }

      return topSellingProducts;
    } catch (error) {
      console.error("Error fetching featured products:", error);
      // Fallback to original method if there's an error
      const allProducts = await this.getAllProducts();
      return allProducts.slice(0, limit);
    }
  }
}

// Function to get reviews for a specific product from Firestore
export async function getProductReviews(productId: string): Promise<Review[]> {
  try {
    const product = await ProductService.getProductById(productId);
    if (product && product.reviews) {
      return product.reviews;
    }
    return [];
  } catch (error) {
    console.error(`Error fetching reviews for product ${productId}:`, error);
    return [];
  }
}

// Function to calculate average rating for a product from Firestore
export async function getAverageRating(productId: string): Promise<number> {
  try {
    const reviews = await getProductReviews(productId);
    if (reviews.length === 0) return 0;

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round((totalRating / reviews.length) * 10) / 10;
  } catch (error) {
    console.error(`Error calculating average rating for product ${productId}:`, error);
    return 0;
  }
}

// Function to get review count for a product
export async function getReviewCount(productId: string): Promise<number> {
  try {
    const reviews = await getProductReviews(productId);
    return reviews.length;
  } catch (error) {
    console.error(`Error getting review count for product ${productId}:`, error);
    return 0;
  }
}

// Function to get reviews with pagination
export async function getProductReviewsPaginated(
  productId: string,
  page: number = 1,
  limit: number = 10,
): Promise<{ reviews: Review[]; totalCount: number; hasMore: boolean }> {
  try {
    const allReviews = await getProductReviews(productId);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedReviews = allReviews.slice(startIndex, endIndex);
    const hasMore = endIndex < allReviews.length;

    return {
      reviews: paginatedReviews,
      totalCount: allReviews.length,
      hasMore,
    };
  } catch (error) {
    console.error(`Error getting paginated reviews for product ${productId}:`, error);
    return {
      reviews: [],
      totalCount: 0,
      hasMore: false,
    };
  }
}
