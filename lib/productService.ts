import { Product } from "@/data/products";
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
   * Get featured/top picks products
   */
  static async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    try {
      const allProducts = await this.getAllProducts();
      // For now, just return random products. You might want to add a "featured" field later
      return allProducts.slice(0, limit);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      throw error;
    }
  }
}
