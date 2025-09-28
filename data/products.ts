import { Timestamp } from "firebase/firestore";

export interface Product {
  id: string;
  category: string;
  name: string;
  price: string;
  image: string;
  images?: string[];
  sizes?: string[];
  availability?: string;
  description?: string;
  brand?: string;
  colorway?: string;
  material?: string;
  gender?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export const productsData = {
  running: [
    {
      id: "adidas-ultraboost-22-blue",
      category: "Running",
      name: "Adidas Ultraboost 22 Men's Running Shoes Blue",
      price: "RM529.00",
      image: "/images/Running/ADIDAS ULTRABOOST 22 MEN'S RUNNING SHOES BLUE.jpg",
      images: [
        "/images/Running/ADIDAS ULTRABOOST 22 MEN'S RUNNING SHOES BLUE.jpg",
        "/images/Running/ADIDAS ULTRABOOST 22 MEN'S RUNNING SHOES BLUE-2.jpg",
        "/images/Running/ADIDAS ULTRABOOST 22 MEN'S RUNNING SHOES BLUE-3.jpg",
      ],
      sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"],
      availability: "IN STOCK",
      description:
        "Experience ultimate comfort and energy return with the Adidas Ultraboost 22. Featuring responsive Boost midsole technology, Primeknit+ upper for adaptive fit, and Continental rubber outsole for superior traction. Perfect for daily runs and long-distance training. The iconic three-stripes design meets cutting-edge performance technology.",
      brand: "Adidas",
      colorway: "Blue/White/Core Black",
      material: "Primeknit+ upper, Boost midsole, Continental rubber outsole",
      gender: "Men",
    },
    {
      id: "asics-gel-kinsei-blast-red",
      category: "Running",
      name: "Asics Gel-Kinsei Blast LE Men's Running Shoes Red",
      price: "RM449.00",
      image: "/images/Running/ASICS GEL-KINSEI BLAST LE MEN'S RUNNING SHOES RED new.png",
      images: [
        "/images/Running/ASICS GEL-KINSEI BLAST LE MEN'S RUNNING SHOES RED new.png",
        "/images/Running/ASICS GEL-KINSEI BLAST LE MEN'S RUNNING SHOES RED-2.png",
        "/images/Running/ASICS GEL-KINSEI BLAST LE MEN'S RUNNING SHOES RED-3.png",
      ],
      sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"],
      availability: "IN STOCK",
      description:
        "The Asics Gel-Kinsei Blast LE delivers premium cushioning and support for serious runners. Features FlyteFoam Blast+ midsole for lightweight bounce, GEL technology for shock absorption, and engineered mesh upper for breathability. Limited edition colorway with enhanced visibility features for early morning or evening runs.",
      brand: "Asics",
      colorway: "Red/Black/White",
      material: "Engineered mesh upper, FlyteFoam Blast+ midsole, GEL technology",
      gender: "Men",
    },
    {
      id: "nike-pegasus-39-black",
      category: "Running",
      name: "Nike Air Zoom Pegasus 39 Men's Road Running Shoes Black",
      price: "RM389.00",
      image: "/images/Running/NIKE AIR ZOOM PEGASUS 39 MEN'S ROAD RUNNING SHOES BLACK.jpg",
      images: [
        "/images/Running/NIKE AIR ZOOM PEGASUS 39 MEN'S ROAD RUNNING SHOES BLACK.jpg",
        "/images/Running/NIKE AIR ZOOM PEGASUS 39 MEN'S ROAD RUNNING SHOES BLACK-2.jpg",
        "/images/Running/NIKE AIR ZOOM PEGASUS 39 MEN'S ROAD RUNNING SHOES BLACK-3.jpg",
      ],
      sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12", "UK 13"],
      availability: "IN STOCK",
      description:
        "The Nike Air Zoom Pegasus 39 continues its legacy as a reliable daily trainer. Features dual Air Zoom units in the forefoot and heel for responsive cushioning, breathable mesh upper, and durable rubber outsole. Perfect for daily miles, tempo runs, and long runs. A versatile workhorse for runners of all levels.",
      brand: "Nike",
      colorway: "Black/White/Anthracite",
      material: "Mesh upper, Nike Air Zoom units, Rubber outsole",
      gender: "Men",
    },
    {
      id: "under-armour-hovr-phantom-black",
      category: "Running",
      name: "Under Armour HOVR Phantom 3 Men's Running Shoes Black",
      price: "RM469.00",
      image: "/images/Running/UNDER ARMOUR HOVR PHANTOM 3 MEN'S RUNNING SHOES BLACK.jpg",
      images: [
        "/images/Running/UNDER ARMOUR HOVR PHANTOM 3 MEN'S RUNNING SHOES BLACK.jpg",
        "/images/Running/UNDER ARMOUR HOVR PHANTOM 3 MEN'S RUNNING SHOES BLACK-2.jpg",
        "/images/Running/UNDER ARMOUR HOVR PHANTOM 3 MEN'S RUNNING SHOES BLACK-3.jpg",
      ],
      sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"],
      availability: "IN STOCK",
      description:
        "Experience zero-gravity feel with the Under Armour HOVR Phantom 3. Features HOVR foam for energy return and impact reduction, 3D-molded sockliner for enhanced comfort, and breathable spacer mesh upper. Connect with MapMyRun app for real-time coaching and running metrics tracking.",
      brand: "Under Armour",
      colorway: "Black/White/Pitch Gray",
      material: "Spacer mesh upper, HOVR foam midsole, 3D-molded sockliner",
      gender: "Men",
    },
  ],
  sneakers: [
    {
      id: "nike-jordan-1-bred-toe",
      category: "Sneakers",
      name: "Nike Air Jordan 1 Low 'Bred Toe'",
      price: "RM899.00",
      image: "/images/Sneakers/bred toe.png",
      images: ["/images/Sneakers/bred toe.png", "/images/Sneakers/bred toe 2.png", "/images/Sneakers/bred toe 3.png"],
      sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"],
      availability: "IN STOCK",
      description:
        "The Air Jordan 1 Low 'Bred Toe' has distinctive color that was first seen on a 2018 AJ1 High release. The low-top has an all-leather upper with white quarter panels, a black forefoot overlay, a red toe box, and a coordinating red finish on the collar and heel overlay. The latter is identified by a sewn Wings emblem, while the tongue's black nylon material bears a white Jumpman logo embroidered on it. A timeless classic that bridges basketball heritage with street style.",
      brand: "Nike",
      colorway: "Black/Varsity Red/White",
      material: "Leather upper, Rubber outsole",
      gender: "Unisex",
    },
    {
      id: "nike-zoom-fly-off-white",
      category: "Sneakers",
      name: "Nike Zoom Fly x Off-White 'The Ten'",
      price: "RM3299.00",
      image: "/images/Sneakers/NIKE ZOOM FLY X OFF-WHITE THE 10.png",
      images: [
        "/images/Sneakers/NIKE ZOOM FLY X OFF-WHITE THE 10.png",
        "/images/Sneakers/NIKE ZOOM FLY X OFF-WHITE THE 10-2.png",
        "/images/Sneakers/NIKE ZOOM FLY X OFF-WHITE THE 10-3.png",
      ],
      sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"],
      availability: "LIMITED STOCK",
      description:
        "Part of Virgil Abloh's iconic 'The Ten' collection, this Nike Zoom Fly features deconstructed design elements, exposed foam, and Off-White's signature industrial aesthetic. Limited edition collaboration piece with unique text graphics, zip-tie, and translucent upper. A coveted collector's item that redefined sneaker culture.",
      brand: "Nike x Off-White",
      colorway: "White/Cone/Black",
      material: "Translucent upper, React foam midsole, Carbon fiber plate",
      gender: "Unisex",
    },
    {
      id: "nike-dunk-low-panda",
      category: "Sneakers",
      name: "Nike Dunk Low 'Panda'",
      price: "RM459.00",
      image: "/images/Sneakers/panda.png",
      images: ["/images/Sneakers/panda.png", "/images/Sneakers/panda-2.png", "/images/Sneakers/panda-3.png"],
      sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"],
      availability: "IN STOCK",
      description:
        "The Nike Dunk Low 'Panda' features a clean white leather base with black overlays, creating a timeless two-tone colorway. Premium leather construction, padded collar for comfort, and classic basketball silhouette. This versatile colorway pairs perfectly with any outfit and has become a modern streetwear staple.",
      brand: "Nike",
      colorway: "White/Black",
      material: "Leather upper, Rubber cupsole",
      gender: "Unisex",
    },
  ],
  clothing: [
    {
      id: "champion-big-logo-tee",
      category: "Clothing",
      name: "Champion Big Logo Graphic Tee",
      price: "RM79.00",
      image: "/images/Clothing/CHAMPION BIG LOGO GRAPHIC TEE.png",
      images: [
        "/images/Clothing/CHAMPION BIG LOGO GRAPHIC TEE.png",
        "/images/Clothing/CHAMPION BIG LOGO GRAPHIC TEE-2.png",
      ],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      availability: "IN STOCK",
      description:
        "Classic Champion heritage meets modern street style. Features oversized Champion logo print, premium cotton construction, and comfortable regular fit. Perfect for casual wear, layering, or athletic activities. Durable construction ensures long-lasting comfort and style.",
      brand: "Champion",
      colorway: "White/Navy",
      material: "100% Cotton",
      gender: "Unisex",
    },
    {
      id: "champion-jersey-ringer-black",
      category: "Clothing",
      name: "Champion Classic Jersey Ringer Tee Black",
      price: "RM89.00",
      image: "/images/Clothing/CHAMPION CLASSIC JERSEY RINGER TEE BLACK.jpg",
      images: [
        "/images/Clothing/CHAMPION CLASSIC JERSEY RINGER TEE BLACK.jpg",
        "/images/Clothing/CHAMPION CLASSIC JERSEY RINGER TEE BLACK-2.jpg",
      ],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      availability: "IN STOCK",
      description:
        "Vintage-inspired Champion jersey tee with contrasting ringer details. Soft jersey fabric blend for comfort, classic crew neck design, and iconic Champion script logo. Retro athletic aesthetic perfect for everyday wear with a timeless appeal.",
      brand: "Champion",
      colorway: "Black/White",
      material: "Cotton/Polyester blend",
      gender: "Unisex",
    },
    {
      id: "stussy-dsm-london-black",
      category: "Clothing",
      name: "Stüssy DSM London Tee Black",
      price: "RM159.00",
      image: "/images/Clothing/STÜSSY DSM LONDON TEE BLACK.png",
      images: [
        "/images/Clothing/STÜSSY DSM LONDON TEE BLACK.png",
        "/images/Clothing/STÜSSY DSM LONDON TEE BLACK-2.png",
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
      availability: "LIMITED STOCK",
      description:
        "Exclusive Stüssy collaboration with Dover Street Market London. Features unique DSM London graphic print, premium cotton construction, and limited edition status. Part of the exclusive streetwear collection celebrating the iconic London store. Collector's piece for streetwear enthusiasts.",
      brand: "Stüssy",
      colorway: "Black/White",
      material: "100% Cotton",
      gender: "Unisex",
    },
    {
      id: "stussy-dsm-london-white",
      category: "Clothing",
      name: "Stüssy DSM London Tee White",
      price: "RM159.00",
      image: "/images/Clothing/STÜSSY DSM LONDON TEE WHITE.png",
      images: [
        "/images/Clothing/STÜSSY DSM LONDON TEE WHITE.png",
        "/images/Clothing/STÜSSY DSM LONDON TEE WHITE-2.png",
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
      availability: "IN STOCK",
      description:
        "Exclusive Stüssy collaboration with Dover Street Market London in clean white colorway. Features unique DSM London graphic print, premium cotton construction, and limited edition status. Perfect for those who prefer lighter tones while maintaining streetwear credibility.",
      brand: "Stüssy",
      colorway: "White/Black",
      material: "100% Cotton",
      gender: "Unisex",
    },
  ],
  sandals: [
    {
      id: "adidas-adilette-comfort-green",
      category: "Sandals",
      name: "Adidas Adilette Comfort Slides Green",
      price: "RM119.00",
      image: "/images/Sandals/ADIDAS ADILETTE COMFORT SLIDES GREEN.jpg",
      images: [
        "/images/Sandals/ADIDAS ADILETTE COMFORT SLIDES GREEN.jpg",
        "/images/Sandals/ADIDAS ADILETTE COMFORT SLIDES GREEN-2.jpg",
      ],
      sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"],
      availability: "IN STOCK",
      description:
        "Ultimate comfort meets iconic style with the Adidas Adilette Comfort Slides. Features Cloudfoam Plus footbed for superior cushioning, quick-dry bandage upper, and classic 3-Stripes branding. Perfect for post-workout recovery, poolside relaxation, or casual everyday wear.",
      brand: "Adidas",
      colorway: "Green/White",
      material: "Synthetic upper, Cloudfoam Plus footbed",
      gender: "Unisex",
    },
    {
      id: "adidas-adilette-sandal-classic",
      category: "Sandals",
      name: "Adidas Men's Adilette Sandal Classic",
      price: "RM99.00",
      image: "/images/Sandals/ADIDAS MEN ADILETTE SANDAL.jpg",
      images: ["/images/Sandals/ADIDAS MEN ADILETTE SANDAL.jpg", "/images/Sandals/ADIDAS MEN ADILETTE SANDAL-2.jpg"],
      sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"],
      availability: "IN STOCK",
      description:
        "The original Adidas slide that started it all. Classic Adilette design with synthetic upper, comfortable footbed, and durable outsole. Timeless 3-Stripes detail and comfortable slip-on design make these perfect for gym, beach, or casual wear. A wardrobe essential since 1972.",
      brand: "Adidas",
      colorway: "Navy/White",
      material: "Synthetic upper, EVA footbed",
      gender: "Men",
    },
    {
      id: "nike-offcourt-slides-black",
      category: "Sandals",
      name: "Nike Offcourt Men's Slides Black",
      price: "RM109.00",
      image: "/images/Sandals/NIKE OFFCOURT MEN'S SLIDES BLACK.jpg",
      images: [
        "/images/Sandals/NIKE OFFCOURT MEN'S SLIDES BLACK.jpg",
        "/images/Sandals/NIKE OFFCOURT MEN'S SLIDES BLACK-2.jpg",
      ],
      sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"],
      availability: "IN STOCK",
      description:
        "Nike Offcourt Slides deliver comfort and style off the court. Features foam midsole for lightweight cushioning, durable synthetic leather upper, and flex grooves for natural movement. Perfect for post-game recovery or casual summer wear with classic Nike Swoosh branding.",
      brand: "Nike",
      colorway: "Black/White",
      material: "Synthetic leather upper, Foam midsole",
      gender: "Men",
    },
    {
      id: "nike-offcourt-slides-red",
      category: "Sandals",
      name: "Nike Offcourt Men's Slides Red",
      price: "RM109.00",
      image: "/images/Sandals/NIKE OFFCOURT MEN'S SLIDES RED.jpg",
      images: [
        "/images/Sandals/NIKE OFFCOURT MEN'S SLIDES RED.jpg",
        "/images/Sandals/NIKE OFFCOURT MEN'S SLIDES RED-2.jpg",
      ],
      sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"],
      availability: "IN STOCK",
      description:
        "Make a bold statement with Nike Offcourt Slides in vibrant red. Features the same comfort technology as the black version with foam midsole cushioning, synthetic leather upper, and flex grooves. Eye-catching colorway perfect for making a statement at the pool or gym.",
      brand: "Nike",
      colorway: "Red/White",
      material: "Synthetic leather upper, Foam midsole",
      gender: "Men",
    },
  ],
  basketball: [
    {
      id: "curry-10-iron-sharpens-iron",
      category: "Basketball",
      name: "Under Armour Curry 10 'Iron Sharpens Iron'",
      price: "RM599.00",
      image: "/images/Basketball/CURRY 10 IRON SHARPENS IRON.png",
      images: [
        "/images/Basketball/CURRY 10 IRON SHARPENS IRON.png",
        "/images/Basketball/CURRY 10 IRON SHARPENS IRON-2.png",
        "/images/Basketball/CURRY 10 IRON SHARPENS IRON-3.png",
      ],
      sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"],
      availability: "IN STOCK",
      description:
        "Stephen Curry's latest signature shoe featuring UA Flow cushioning technology for superior court feel and traction. Warp upper provides lightweight support and breathability. Designed for explosive cuts, quick releases, and the dynamic play style that defines modern basketball. 'Iron Sharpens Iron' colorway represents the relentless pursuit of excellence.",
      brand: "Under Armour",
      colorway: "Grey/Black/Yellow",
      material: "Warp upper, UA Flow cushioning, Rubber outsole",
      gender: "Unisex",
    },
    {
      id: "kyrie-infinity-nrg-ep",
      category: "Basketball",
      name: "Nike Kyrie Infinity NRG EP",
      price: "RM489.00",
      image: "/images/Basketball/KYRIE INFINITY NRG EP.png",
      images: [
        "/images/Basketball/KYRIE INFINITY NRG EP.png",
        "/images/Basketball/KYRIE INFINITY NRG EP-2.png",
        "/images/Basketball/KYRIE INFINITY NRG EP-3.png",
      ],
      sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"],
      availability: "IN STOCK",
      description:
        "Kyrie Irving's signature shoe designed for unpredictable movement and infinite creativity on the court. Features curved outsole for enhanced traction during cuts, Zoom Air cushioning for responsive feel, and lightweight construction. NRG (Energy) edition celebrates the electric playing style of one of basketball's most creative players.",
      brand: "Nike",
      colorway: "Multi-Color/Black/White",
      material: "Mesh upper, Zoom Air cushioning, Curved rubber outsole",
      gender: "Unisex",
    },
    {
      id: "curry-warriors-jersey-2022",
      category: "Basketball",
      name: "Stephen Curry Golden State Warriors Icon Edition 2022-23",
      price: "RM249.00",
      image: "/images/Basketball/STEPHEN CURRY GOLDEN STATE WARRIORS ICON EDITION 202223.png",
      images: [
        "/images/Basketball/STEPHEN CURRY GOLDEN STATE WARRIORS ICON EDITION 202223.png",
        "/images/Basketball/STEPHEN CURRY GOLDEN STATE WARRIORS ICON EDITION 202223-2.png",
      ],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      availability: "IN STOCK",
      description:
        "Official NBA Stephen Curry Golden State Warriors Icon Edition jersey for the 2022-23 championship season. Features Nike Dri-FIT technology for moisture management, authentic team colors and logos, and premium construction. Celebrate the Warriors dynasty with this premium basketball jersey.",
      brand: "Nike",
      colorway: "Royal Blue/Yellow/White",
      material: "Dri-FIT polyester",
      gender: "Unisex",
    },
    {
      id: "wilson-nba-curry-basketball",
      category: "Basketball",
      name: "Wilson NBA Player Icon Outdoor Basketball Curry 7",
      price: "RM149.00",
      image: "/images/Basketball/WILSON NBA PLAYER ICON OUTDOOR BSKT CURRY 7.png",
      images: [
        "/images/Basketball/WILSON NBA PLAYER ICON OUTDOOR BSKT CURRY 7.png",
        "/images/Basketball/WILSON NBA PLAYER ICON OUTDOOR BSKT CURRY 7-2.png",
      ],
      sizes: ["7"],
      availability: "IN STOCK",
      description:
        "Official Wilson basketball featuring Stephen Curry player icon graphics. Designed for outdoor play with durable rubber construction, deep channel design for superior grip, and official NBA size and weight specifications. Perfect for recreational play, training, or as a collector's item for Curry fans.",
      brand: "Wilson",
      colorway: "Orange/Black/White",
      material: "Rubber construction, Deep channel design",
      gender: "Unisex",
    },
  ],
};

export const categoryConfig = {
  running: { title: "RUNNING", label: "Running" },
  sneakers: { title: "SNEAKERS", label: "Sneakers" },
  clothing: { title: "CLOTHING", label: "Clothing" },
  sandals: { title: "SANDALS", label: "Sandals" },
  basketball: { title: "BASKETBALL", label: "Basketball" },
};

// Helper function to get all products
export const getAllProducts = (): Product[] => {
  return Object.values(productsData).flat();
};

// Helper function to find a product by ID (now works with string IDs)
export const getProductById = (id: string): Product | undefined => {
  const allProducts = getAllProducts();
  return allProducts.find((product) => product.id === id);
};
