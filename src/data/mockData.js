// MARGINN — Premium Mock Data Generator & Database Simulator

// 25 Realistic Suppliers
export const INITIAL_SUPPLIERS = [
  {
    id: "sup-1",
    name: "Apex Electronics Corp",
    company: "Apex Electronics India Pvt Ltd",
    gst: "27AAACA1234A1Z1",
    contactPerson: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "contact@apexelectronics.com",
    address: "Plot 42, Phase II, Phase 2 Industrial Area, Noida, UP, 201305",
    website: "https://www.apexelectronics.in",
    categories: ["Electronics", "Accessories"],
    moq: 50,
    avgDeliveryTime: 4, // in days
    rating: 4.8,
    paymentTerms: "Net 30",
    shippingPartner: "BlueDart",
    apiEndpoint: "https://api.apexelectronics.com/v1",
    webhookUrl: "https://marginn.io/webhooks/apex",
    notes: "Primary supplier for premium wireless headphones and smart gadgets. Very reliable."
  },
  {
    id: "sup-2",
    name: "Global Textiles Ltd",
    company: "Global Textile Exporters",
    gst: "24AABCG9876Q2Z0",
    contactPerson: "Amit Patel",
    phone: "+91 98234 56789",
    email: "orders@globaltextiles.co",
    address: "102, Textile Towers, Ring Road, Surat, Gujarat, 395002",
    website: "https://www.globaltextiles.co",
    categories: ["Apparel", "Home Decor"],
    moq: 100,
    avgDeliveryTime: 6,
    rating: 4.5,
    paymentTerms: "Net 15",
    shippingPartner: "Delhivery",
    apiEndpoint: "https://api.globaltextiles.com/v2",
    webhookUrl: "https://marginn.io/webhooks/textiles",
    notes: "Supplier for premium cotton t-shirts and bedding sets. Custom labels supported."
  },
  {
    id: "sup-3",
    name: "Zenith Kitchenware",
    company: "Zenith Kitchen Solutions Ltd",
    gst: "07AAACZ4567M1ZY",
    contactPerson: "Sanjay Sharma",
    phone: "+91 99100 12345",
    email: "b2b@zenithkitchen.com",
    address: "A-15, Wazirpur Industrial Area, New Delhi, 110052",
    website: "https://www.zenithkitchen.com",
    categories: ["Kitchen", "Home Appliances"],
    moq: 20,
    avgDeliveryTime: 3,
    rating: 4.6,
    paymentTerms: "P.O.D",
    shippingPartner: "Express Logistics",
    apiEndpoint: "https://zenithkitchen.co.in/api",
    webhookUrl: "https://marginn.io/webhooks/zenith",
    notes: "High quality stainless steel items, air fryers and kitchen tools. Good packaging."
  },
  {
    id: "sup-4",
    name: "FlexiFit Sports Co",
    company: "FlexiFit Sports Goods",
    gst: "03AABCF5544B3Z8",
    contactPerson: "Harpreet Singh",
    phone: "+91 94170 88990",
    email: "wholesale@flexifitsports.com",
    address: "BXX-890, Leather Complex Road, Jalandhar, Punjab, 144021",
    website: "https://www.flexifitsports.com",
    categories: ["Fitness", "Outdoors"],
    moq: 30,
    avgDeliveryTime: 5,
    rating: 4.7,
    paymentTerms: "50% Advance, 50% Delivery",
    shippingPartner: "SafeExpress",
    apiEndpoint: "https://flexifit.com/api/v1",
    webhookUrl: "https://marginn.io/webhooks/flexifit",
    notes: "Provides dumbbells, yoga mats, resistance bands, and activewear. High-demand items."
  },
  {
    id: "sup-5",
    name: "Lumina Home Decor",
    company: "Lumina Craftworks India",
    gst: "09AAIPL2233K2ZE",
    contactPerson: "Neha Gupta",
    phone: "+91 75033 11223",
    email: "neha@luminadecor.in",
    address: "Sector 63, Block H-12, Noida, UP, 201301",
    website: "https://www.luminadecor.in",
    categories: ["Home Decor", "Lighting"],
    moq: 15,
    avgDeliveryTime: 7,
    rating: 4.4,
    paymentTerms: "Net 30",
    shippingPartner: "BlueDart",
    apiEndpoint: "https://lumina.in/api",
    webhookUrl: "https://marginn.io/webhooks/lumina",
    notes: "Designer lamps, LED ambient lights, and handicraft decor items."
  },
  {
    id: "sup-6",
    name: "Organic Roots Cosmetics",
    company: "Organic Roots Personal Care Pvt Ltd",
    gst: "33AAFOR5698C1ZA",
    contactPerson: "Priya Nair",
    phone: "+91 88921 54321",
    email: "sales@organicroots.com",
    address: "44, ECR Road, Adyar, Chennai, TN, 600020",
    website: "https://www.organicroots.in",
    categories: ["Beauty", "Personal Care"],
    moq: 40,
    avgDeliveryTime: 3,
    rating: 4.9,
    paymentTerms: "Net 10",
    shippingPartner: "Delhivery",
    apiEndpoint: "https://api.organicroots.com",
    webhookUrl: "https://marginn.io/webhooks/organic",
    notes: "Cruelty-free vegan skincare, serums, and organic hair oils. Fast-moving summer stock."
  },
  {
    id: "sup-7",
    name: "Apex Tech Accessories",
    company: "Apex Tech Accs",
    gst: "27AAACA1234A2Z2",
    contactPerson: "Karan Johar",
    phone: "+91 98888 77777",
    email: "karan@apexaccessories.com",
    address: "Lamington Road, Grant Road, Mumbai, 400007",
    website: "https://apexaccessories.com",
    categories: ["Electronics", "Accessories"],
    moq: 100,
    avgDeliveryTime: 2,
    rating: 4.3,
    paymentTerms: "Prepaid",
    shippingPartner: "Express Logistics",
    apiEndpoint: "https://apexaccessories.com/api",
    webhookUrl: "https://marginn.io/webhooks/apextech",
    notes: "Fast delivery for bulk items, charger cables, phone cases, and laptop stands."
  },
  {
    id: "sup-8",
    name: "Vanguard Luggage",
    company: "Vanguard Travel Gear Pvt Ltd",
    gst: "19AABCV7788P1Z4",
    contactPerson: "Joydeep Sen",
    phone: "+91 93300 55443",
    email: "joydeep@vanguardgear.com",
    address: "Salt Lake Sector V, Block EP, Kolkata, WB, 700091",
    website: "https://vanguardtravelgear.com",
    categories: ["Travel", "Accessories"],
    moq: 25,
    avgDeliveryTime: 5,
    rating: 4.6,
    paymentTerms: "Net 30",
    shippingPartner: "SafeExpress",
    apiEndpoint: "",
    webhookUrl: "",
    notes: "Premium travel bags, trolley cases, and hiking backpacks."
  },
  {
    id: "sup-9",
    name: "Verdant Plants & Gardening",
    company: "Verdant Horticultures",
    gst: "29AAVPV3344D1ZM",
    contactPerson: "Ramesh Gowda",
    phone: "+91 80234 56789",
    email: "ramesh@verdantplants.com",
    address: "Lalbagh Road, Bangalore, Karnataka, 560027",
    website: "https://verdantplants.com",
    categories: ["Home Decor", "Gardening"],
    moq: 50,
    avgDeliveryTime: 2,
    rating: 4.7,
    paymentTerms: "Cash",
    shippingPartner: "Local Courier",
    apiEndpoint: "",
    webhookUrl: "",
    notes: "Live indoor plants, bonsai trees, and premium planters."
  },
  {
    id: "sup-10",
    name: "Sona Gold & Jewels Wholesale",
    company: "Sona Bullion & Jewelry",
    gst: "32AAACS4455G1Z3",
    contactPerson: "Venugopal Swamy",
    phone: "+91 94470 12345",
    email: "wholesale@sonajewels.com",
    address: "Jewel Junction, MG Road, Kochi, Kerala, 682016",
    website: "https://sonajewels.com",
    categories: ["Fashion", "Jewelry"],
    moq: 10,
    avgDeliveryTime: 4,
    rating: 4.8,
    paymentTerms: "Bank Transfer",
    shippingPartner: "Sequel Secure",
    apiEndpoint: "",
    webhookUrl: "",
    notes: "Sells premium fashion jewelry and gold-plated accessories. Secure transit required."
  }
];

// Add 15 more suppliers programmatically to reach 25
const supplierNames = [
  "Nova Office Essentials", "FitTech Wearables", "PureStream Filters", "BlueWave Toys", 
  "Prime Leather Goods", "AromaTherapy Labs", "Zen Bamboo Crafts", "Elite Footwear Co",
  "Aero Chargers", "SmartPet Innovations", "Glow Cosmetic Tools", "Chef's Selection Spices",
  "Urban Lightings", "Crafty Hands Paper", "EcoPack Solutions"
];
const categoriesPool = [
  ["Office", "Accessories"], ["Fitness", "Electronics"], ["Kitchen", "Home Appliances"], ["Toys", "Kids"],
  ["Apparel", "Accessories"], ["Beauty", "Personal Care"], ["Home Decor", "Furniture"], ["Apparel", "Footwear"],
  ["Electronics", "Accessories"], ["Pet Supplies"], ["Beauty", "Accessories"], ["Kitchen", "Groceries"],
  ["Home Decor", "Lighting"], ["Stationery", "Office"], ["Packaging", "Shipping"]
];
const namesPool = ["Vikram Malhotra", "Rohit Verma", "Simran Kaur", "Nikhil D'Souza", "Aditya Sen", "Meera Nair", "Rahul Roy", "Sneha Rao", "Rohan Mehta", "Divya Pillai", "Arjun Das", "Siddharth Jain", "Pooja Hegde", "Varun Dhawan", "Kriti Sanon"];
const citiesPool = ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Ahmedabad", "Pune", "Chennai", "Kolkata", "Jaipur", "Indore"];

for (let i = 0; i < 15; i++) {
  const city = citiesPool[i % citiesPool.length];
  INITIAL_SUPPLIERS.push({
    id: `sup-${11 + i}`,
    name: supplierNames[i],
    company: `${supplierNames[i]} India Pvt Ltd`,
    gst: `07AABC${1000 + i}K1Z${(i % 9) + 1}`,
    contactPerson: namesPool[i],
    phone: `+91 9${8000 + i * 100} ${12345 + i}`,
    email: `contact@${supplierNames[i].toLowerCase().replace(/[^a-z]/g, "")}.com`,
    address: `Industrial Area, Phase ${i + 1}, ${city}`,
    website: `https://www.${supplierNames[i].toLowerCase().replace(/[^a-z]/g, "")}.com`,
    categories: categoriesPool[i],
    moq: 10 * (i + 1),
    avgDeliveryTime: (i % 5) + 3,
    rating: Number((4.1 + (i % 9) * 0.1).toFixed(1)),
    paymentTerms: i % 2 === 0 ? "Net 30" : "Prepaid",
    shippingPartner: i % 3 === 0 ? "Delhivery" : i % 3 === 1 ? "BlueDart" : "SafeExpress",
    apiEndpoint: `https://api.${supplierNames[i].toLowerCase().replace(/[^a-z]/g, "")}.com/v1`,
    webhookUrl: `https://marginn.io/webhooks/${supplierNames[i].toLowerCase().replace(/[^a-z]/g, "")}`,
    notes: `Reliable supplier of ${categoriesPool[i].join(" & ")}. Fast shipping to ${city}.`
  });
}

// 100 Realistic Products across categories
const PRODUCT_TEMPLATES = [
  // Electronics & Accessories
  { name: "Apex Pro Wireless ANC Headphones", category: "Electronics", supplierId: "sup-1", cost: 1800, price: 3999, feesPercent: 12, shipping: 150, image: "🎧", tags: ["wireless", "audio", "premium", "bestseller"] },
  { name: "Aero Charge Fast Charging Hub (65W)", category: "Electronics", supplierId: "sup-19", cost: 450, price: 1299, feesPercent: 15, shipping: 80, image: "🔌", tags: ["charger", "mobile", "accessory"] },
  { name: "Lumina LED RGB Ring Light 12-inch", category: "Electronics", supplierId: "sup-5", cost: 350, price: 1199, feesPercent: 14, shipping: 100, image: "⭕", tags: ["lighting", "vlogging", "home-studio"] },
  { name: "FitTech Active HR Smartwatch V2", category: "Electronics", supplierId: "sup-12", cost: 950, price: 2499, feesPercent: 13, shipping: 90, image: "⌚", tags: ["wearable", "fitness", "smartwatch"] },
  { name: "Apex Bluetooth Soundbar with Subwoofer", category: "Electronics", supplierId: "sup-1", cost: 2200, price: 4999, feesPercent: 12, shipping: 250, image: "🔊", tags: ["audio", "home-theater", "wireless"] },
  { name: "SmartPet Automatic Feeder with App Sync", category: "Electronics", supplierId: "sup-20", cost: 1250, price: 3499, feesPercent: 15, shipping: 120, image: "🐱", tags: ["pet-care", "smart-home", "automatic"] },
  
  // Kitchen & Home Appliances
  { name: "Zenith Digital Touch Air Fryer 4.5L", category: "Kitchen", supplierId: "sup-3", cost: 1600, price: 4499, feesPercent: 14, shipping: 220, image: "🍟", tags: ["kitchen", "health", "fryer"] },
  { name: "PureStream Copper Alkaline Water Filter", category: "Kitchen", supplierId: "sup-13", cost: 800, price: 2199, feesPercent: 12, shipping: 140, image: "🚰", tags: ["water-filter", "kitchen", "health"] },
  { name: "Zenith Multi-Speed Bullet Blender Set", category: "Kitchen", supplierId: "sup-3", cost: 650, price: 1899, feesPercent: 13, shipping: 110, image: "🌪️", tags: ["blender", "smoothie", "kitchen"] },
  { name: "Chef's Choice Electric Salt & Pepper Grinders", category: "Kitchen", supplierId: "sup-22", cost: 380, price: 1099, feesPercent: 15, shipping: 70, image: "🧂", tags: ["grinder", "kitchen", "gadget"] },

  // Apparel & Fashion
  { name: "Global Cotton Oversized Tee (Heavyweight)", category: "Apparel", supplierId: "sup-2", cost: 180, price: 699, feesPercent: 15, shipping: 60, image: "👕", tags: ["clothing", "cotton", "streetwear"] },
  { name: "FlexiFit Women's High-Waist Gym Leggings", category: "Apparel", supplierId: "sup-4", cost: 220, price: 899, feesPercent: 15, shipping: 60, image: "👖", tags: ["athleisure", "fitness", "women"] },
  { name: "Elite Leather Chelsea Boots (Handcrafted)", category: "Apparel", supplierId: "sup-18", cost: 1100, price: 3499, feesPercent: 12, shipping: 130, image: "🥾", tags: ["footwear", "leather", "mens"] },
  { name: "Prime Retro Canvas Messenger Bag", category: "Apparel", supplierId: "sup-15", cost: 420, price: 1499, feesPercent: 14, shipping: 90, image: "💼", tags: ["bags", "canvas", "vintage"] },

  // Fitness & Outdoors
  { name: "FlexiFit Eco-Friendly Cork Yoga Mat", category: "Fitness", supplierId: "sup-4", cost: 280, price: 999, feesPercent: 14, shipping: 85, image: "🧘", tags: ["yoga", "cork", "eco-friendly"] },
  { name: "FlexiFit Hex Rubber Dumbbell Set (10kg)", category: "Fitness", supplierId: "sup-4", cost: 850, price: 2199, feesPercent: 10, shipping: 300, image: "🏋️", tags: ["weights", "strength", "home-gym"] },
  { name: "FitTech Bluetooth Smart Skipping Rope", category: "Fitness", supplierId: "sup-12", cost: 290, price: 899, feesPercent: 15, shipping: 65, image: "🪢", tags: ["skipping-rope", "smart", "cardio"] },

  // Home Decor & Gardening
  { name: "Lumina Minimalist Ceramic Table Lamp", category: "Home Decor", supplierId: "sup-5", cost: 500, price: 1699, feesPercent: 13, shipping: 110, image: "💡", tags: ["lamp", "ceramic", "minimalist"] },
  { name: "Verdant Live Snake Plant with Ceramic Pot", category: "Home Decor", supplierId: "sup-9", cost: 180, price: 599, feesPercent: 15, shipping: 80, image: "🪴", tags: ["live-plant", "indoor", "snakeplant"] },
  { name: "Lumina Geometric Wall Hanging Planter", category: "Home Decor", supplierId: "sup-5", cost: 150, price: 499, feesPercent: 15, shipping: 65, image: "📐", tags: ["decor", "planter", "geometric"] },

  // Beauty & Personal Care
  { name: "Organic Roots Vitamin C Glow Facial Serum", category: "Beauty", supplierId: "sup-6", cost: 120, price: 499, feesPercent: 15, shipping: 50, image: "🧪", tags: ["skincare", "serum", "organic"] },
  { name: "Organic Roots Cold Pressed Castor Oil (200ml)", category: "Beauty", supplierId: "sup-6", cost: 85, price: 299, feesPercent: 15, shipping: 50, image: "🧴", tags: ["haircare", "castor-oil", "organic"] },
  { name: "Glow 12-Piece Premium Makeup Brush Set", category: "Beauty", supplierId: "sup-21", cost: 190, price: 799, feesPercent: 15, shipping: 55, image: "🖌️", tags: ["makeup-brushes", "beauty-tools"] },
  { name: "AromaTherapy Lavender Essential Oil (30ml)", category: "Beauty", supplierId: "sup-16", cost: 95, price: 399, feesPercent: 15, shipping: 50, image: "💧", tags: ["essential-oil", "aroma", "relax"] },
];

export const INITIAL_PRODUCTS = [];

// Helper to calculate pricing fields
export function calculateProductMetrics(cost, price, feesPercent, shipping) {
  const marketplaceFees = Math.round(price * (feesPercent / 100));
  const expectedProfit = price - cost - marketplaceFees - shipping;
  const expectedMargin = Number(((expectedProfit / price) * 100).toFixed(2));
  return { marketplaceFees, expectedProfit, expectedMargin };
}

// Populate exactly 100 Products programmatically
for (let i = 0; i < 100; i++) {
  const template = PRODUCT_TEMPLATES[i % PRODUCT_TEMPLATES.length];
  // Create variations of name and costs
  const modifier = (i % 5) + 1; // 1, 2, 3, 4, 5
  const nameModifier = modifier === 1 ? "" : modifier === 2 ? " Max" : modifier === 3 ? " Elite" : modifier === 4 ? " Lite" : " Classic";
  const name = `${template.name.replace(" Pro", "").replace(" V2", "")}${nameModifier}`;
  const cost = Math.round(template.cost * (0.85 + (modifier * 0.05)));
  const price = Math.round(template.price * (0.85 + (modifier * 0.06)));
  const shipping = template.shipping;
  const feesPercent = template.feesPercent;
  const sku = `${template.category.substring(0, 3).toUpperCase()}-${1000 + i}-${modifier}`;
  
  const { marketplaceFees, expectedProfit, expectedMargin } = calculateProductMetrics(cost, price, feesPercent, shipping);

  // Distribute inventory status
  let inventory = 0;
  let status = "Active";
  if (i % 25 === 0) {
    inventory = 0;
    status = "Out of Stock";
  } else if (i % 12 === 0) {
    inventory = Math.floor(Math.random() * 8) + 1; // 1 to 8
    status = "Low Stock";
  } else {
    inventory = Math.floor(Math.random() * 150) + 15;
    status = "Active";
  }

  // Assign to marketplaces
  const marketplacesList = ["Amazon", "Flipkart", "ONDC", "Meesho"];
  const marketplace = marketplacesList[i % marketplacesList.length];

  INITIAL_PRODUCTS.push({
    id: `prod-${i + 1}`,
    name,
    sku,
    category: template.category,
    supplierId: template.supplierId,
    marketplace,
    supplierCost: cost,
    sellingPrice: price,
    marketplaceFees,
    shippingCost: shipping,
    expectedProfit,
    expectedMargin,
    inventory,
    status,
    barcode: `890${450000000 + i * 159}`,
    tags: template.tags.slice(0, 2 + (i % 2)),
    image: template.image,
    competitorPrice: Math.round(price * (0.92 + (Math.sin(i) * 0.08))),
    demandScore: Math.floor(Math.random() * 35) + 65, // 65-99
    competitionScore: Math.floor(Math.random() * 50) + 20, // 20-70
    growthTrend: Number((Math.random() * 20 + 2).toFixed(1)), // 2% to 22%
    riskScore: Math.floor(Math.random() * 40) + 10, // 10-50
    recommendationScore: Math.floor(Math.random() * 30) + 70 // 70-100
  });
}

// 300 Realistic Orders spanning the last 30 days
const firstNames = ["Rahul", "Priya", "Aman", "Neha", "Vijay", "Anjali", "Suresh", "Kiran", "Deepak", "Ritu", "Vikram", "Shalini", "Sunil", "Preeti", "Arjun", "Sneha", "Aditya", "Riya", "Manish", "Divya"];
const lastNames = ["Sharma", "Verma", "Gupta", "Nair", "Kumar", "Singh", "Patel", "Reddy", "Choudhary", "Joshi", "Sen", "Das", "Mehta", "Iyer", "Rao", "Pillai", "Bose", "Srivastava", "Malhotra", "Kaur"];
const orderStatusPool = ["Delivered", "Shipped", "Pending", "Cancelled"];
const paymentStatusPool = ["Paid", "Paid", "Paid", "Pending", "Refunded"]; // mostly paid

export const INITIAL_ORDERS = [];

// Helper to generate a random date in the last 30 days
function getRandomDateInLast30Days(index) {
  const date = new Date();
  // distribute orders across the 30 days
  const daysAgo = Math.floor(index / 10); // around 10 orders per day
  date.setDate(date.getDate() - daysAgo);
  // random hours
  date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), 0, 0);
  return date;
}

// Generate exactly 300 Orders programmatically
for (let i = 0; i < 300; i++) {
  const productIndex = (i * 7) % INITIAL_PRODUCTS.length;
  const product = INITIAL_PRODUCTS[productIndex];
  const qty = (i % 15 === 0) ? 2 : 1; // mostly 1, occasionally 2
  const orderValue = product.sellingPrice * qty;
  const supplierCost = product.supplierCost * qty;
  const shippingCost = product.shippingCost * qty;
  const marketplaceFees = product.marketplaceFees * qty;
  const totalCost = supplierCost + shippingCost + marketplaceFees;
  const profit = orderValue - totalCost;

  // status distribution: 80% Delivered, 10% Shipped, 7% Pending, 3% Cancelled
  let status = "Delivered";
  const roll = i % 100;
  if (roll < 80) status = "Delivered";
  else if (roll < 90) status = "Shipped";
  else if (roll < 97) status = "Pending";
  else status = "Cancelled";

  let paymentStatus = "Paid";
  if (status === "Pending") paymentStatus = "Pending";
  if (status === "Cancelled") paymentStatus = "Refunded";

  const orderDate = getRandomDateInLast30Days(i);
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(orderDate.getDate() + 3);

  const customerName = `${firstNames[(i * 3) % firstNames.length]} ${lastNames[(i * 5) % lastNames.length]}`;
  const trackingNumber = status === "Pending" || status === "Cancelled" ? "" : `TRK${8900000000 + i * 277}`;

  INITIAL_ORDERS.push({
    id: `ORD-${10000 + i}`,
    marketplace: product.marketplace,
    customerName,
    productName: product.name,
    productSku: product.sku,
    qty,
    orderValue,
    cost: totalCost,
    profit,
    status,
    paymentStatus,
    trackingNumber,
    orderDate: orderDate.toISOString(),
    deliveryDate: status === "Delivered" ? deliveryDate.toISOString() : null,
    supplierId: product.supplierId
  });
}

// Predefined AI Product Recommendations for "AI Product Discovery" page
export const INITIAL_AI_RECOMMENDATIONS = [
  {
    id: "rec-1",
    name: "Ultra-Quiet Portable Neck Fan",
    category: "Electronics",
    image: "🍃",
    demandScore: 94,
    competitionScore: 28,
    supplierCost: 180,
    suggestedPrice: 699,
    expectedMargin: 58.6,
    shippingCost: 55,
    feesPercent: 15,
    searchVolume: "24,500/mo",
    growthTrend: 18.4,
    riskScore: 12,
    recommendationScore: 92,
    supplierId: "sup-1",
    summary: "Viral TikTok summer gadget. Low competition and high search volume spikes in multiple cities."
  },
  {
    id: "rec-2",
    name: "Automatic Self-Stirring Mug",
    category: "Kitchen",
    image: "☕",
    demandScore: 88,
    competitionScore: 35,
    supplierCost: 220,
    suggestedPrice: 799,
    expectedMargin: 55.2,
    shippingCost: 65,
    feesPercent: 14,
    searchVolume: "18,200/mo",
    growthTrend: 12.1,
    riskScore: 20,
    recommendationScore: 87,
    supplierId: "sup-3",
    summary: "High volume gift item. Great margins and lightweight shipping logistics."
  },
  {
    id: "rec-3",
    name: "Orthopedic Memory Foam Seat Cushion",
    category: "Home Decor",
    image: "🪑",
    demandScore: 92,
    competitionScore: 42,
    supplierCost: 350,
    suggestedPrice: 1299,
    expectedMargin: 56.4,
    shippingCost: 80,
    feesPercent: 12,
    searchVolume: "35,000/mo",
    growthTrend: 22.8,
    riskScore: 15,
    recommendationScore: 90,
    supplierId: "sup-5",
    summary: "Work-from-home essential with consistent evergreen sales velocity and low refund rates."
  },
  {
    id: "rec-4",
    name: "Weighted Smart Hula Hoop",
    category: "Fitness",
    image: "⭕",
    demandScore: 85,
    competitionScore: 48,
    supplierCost: 450,
    suggestedPrice: 1599,
    expectedMargin: 54.0,
    shippingCost: 110,
    feesPercent: 13,
    searchVolume: "14,800/mo",
    growthTrend: 9.6,
    riskScore: 30,
    recommendationScore: 81,
    supplierId: "sup-4",
    summary: "Fitness accessory with rising demand. Target demographic is highly active on social commerce channels."
  },
  {
    id: "rec-5",
    name: "Snail Mucin Deep Hydrating Glow Cream",
    category: "Beauty",
    image: "🐌",
    demandScore: 96,
    competitionScore: 22,
    supplierCost: 280,
    suggestedPrice: 999,
    expectedMargin: 59.1,
    shippingCost: 50,
    feesPercent: 15,
    searchVolume: "42,000/mo",
    growthTrend: 34.5,
    riskScore: 18,
    recommendationScore: 95,
    supplierId: "sup-6",
    summary: "Extremely popular skincare ingredient. Highest margin category with organic supplier nearby."
  }
];

// Predefined AI Insights
export const INITIAL_AI_INSIGHTS = [
  {
    id: "ins-1",
    title: "Supplier Cost Optimization Opportunity",
    type: "warning",
    message: "Global Textiles Ltd (sup-2) is offering a 5% discount on bulk orders (> 200 units) of Cotton Oversized Tees. Switching your primary channel to this MOQ can save you approximately ₹18,400 monthly.",
    actionLabel: "View Supplier Agreement",
    actionTarget: "Suppliers"
  },
  {
    id: "ins-2",
    title: "Impending Stockout Alert",
    type: "error",
    message: "At the current sales velocity (4.2 units/day), Apex Pro Wireless ANC Headphones (SKU: ELE-1000-1) will run out of stock in 4 days. Lead time is 4 days. You should reorder immediately to avoid listing deactivation.",
    actionLabel: "Reorder Now",
    actionTarget: "Inventory"
  },
  {
    id: "ins-3",
    title: "Competitor Price Increase Detected",
    type: "info",
    message: "Competitors on Amazon have raised prices of 'Lumina LED RGB Ring Light' by 12%. You are currently pricing it at ₹1,199. AI suggests updating price to ₹1,299 to capture higher profits with 94% confidence.",
    actionLabel: "Apply AI Pricing",
    actionTarget: "Pricing Engine"
  },
  {
    id: "ins-4",
    title: "High Refund Alert on Footwear",
    type: "warning",
    message: "Elite Leather Chelsea Boots has seen a 6.2% refund request increase this week. Customers cite sizing mismatch issues. AI recommends updating size charts on Flipkart listings to reduce returns.",
    actionLabel: "Inspect Orders",
    actionTarget: "Orders"
  }
];
