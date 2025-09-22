const now = () => new Date().toISOString();

// Companies
export const companies = [
  { id: 'cmp_1', name: 'Acme Foods', country: 'ID', createdAt: now() },
  { id: 'cmp_2', name: 'Nusantara Beverages', country: 'ID', createdAt: now() },
  { id: 'cmp_3', name: 'Global Snacks Ltd', country: 'SG', createdAt: now() },
  { id: 'cmp_4', name: 'Tropical Essentials', country: 'MY', createdAt: now() },
  { id: 'cmp_5', name: 'Harvest Organics', country: 'ID', createdAt: now() },
];

// Brands
export const brands = [
  { id: 'br_1', name: 'Acme Fresh', companyId: 'cmp_1', createdAt: now() },
  { id: 'br_2', name: 'Acme Daily', companyId: 'cmp_1', createdAt: now() },
  { id: 'br_3', name: 'NusaDrink', companyId: 'cmp_2', createdAt: now() },
  { id: 'br_4', name: 'Snackify', companyId: 'cmp_3', createdAt: now() },
  { id: 'br_5', name: 'TropiCare', companyId: 'cmp_4', createdAt: now() },
  { id: 'br_6', name: 'GreenHarvest', companyId: 'cmp_5', createdAt: now() },
  { id: 'br_7', name: 'HydraPlus', companyId: 'cmp_2', createdAt: now() },
  { id: 'br_8', name: 'PureBite', companyId: 'cmp_3', createdAt: now() },
];

// Categories
export const categories = [
  { id: 'cat_1', name: 'Beverages', parentCategoryId: null },
  { id: 'cat_2', name: 'Snacks', parentCategoryId: null },
  { id: 'cat_3', name: 'Dairy', parentCategoryId: null },
  { id: 'cat_4', name: 'Health', parentCategoryId: null },
  { id: 'cat_5', name: 'Energy Drinks', parentCategoryId: 'cat_1' },
  { id: 'cat_6', name: 'Organic', parentCategoryId: 'cat_4' },
];

// Products
export const products = [
  { id: 'prd_1', sku: 'AF-MILK-1L', name: 'Acme Fresh Milk 1L', brandId: 'br_1', companyId: 'cmp_1', categoryId: 'cat_3', price: 24000, cost: 18000, stock: 120, createdAt: now() },
  { id: 'prd_2', sku: 'AF-YOG-100', name: 'Acme Yogurt Cup 100g', brandId: 'br_1', companyId: 'cmp_1', categoryId: 'cat_3', price: 9000, cost: 6000, stock: 300, createdAt: now() },
  { id: 'prd_3', sku: 'AD-BREAD-LOAF', name: 'Acme Daily Bread Loaf', brandId: 'br_2', companyId: 'cmp_1', categoryId: 'cat_2', price: 20000, cost: 14000, stock: 80, createdAt: now() },
  { id: 'prd_4', sku: 'ND-TEA-500', name: 'NusaDrink Iced Tea 500ml', brandId: 'br_3', companyId: 'cmp_2', categoryId: 'cat_1', price: 10000, cost: 6500, stock: 250, createdAt: now() },
  { id: 'prd_5', sku: 'ND-WATER-600', name: 'NusaDrink Mineral Water 600ml', brandId: 'br_3', companyId: 'cmp_2', categoryId: 'cat_1', price: 5000, cost: 2500, stock: 500, createdAt: now() },
  { id: 'prd_6', sku: 'SP-CHIPS-ORI', name: 'Snackify Potato Chips Original 70g', brandId: 'br_4', companyId: 'cmp_3', categoryId: 'cat_2', price: 12500, cost: 8000, stock: 200, createdAt: now() },
  { id: 'prd_7', sku: 'SP-CHIPS-BBQ', name: 'Snackify Potato Chips BBQ 70g', brandId: 'br_4', companyId: 'cmp_3', categoryId: 'cat_2', price: 12500, cost: 8000, stock: 180, createdAt: now() },
  { id: 'prd_8', sku: 'TC-VITC-DRINK', name: 'TropiCare Vitamin C Shot 60ml', brandId: 'br_5', companyId: 'cmp_4', categoryId: 'cat_4', price: 15000, cost: 10500, stock: 90, createdAt: now() },
  { id: 'prd_9', sku: 'GH-GRAN-BOX', name: 'GreenHarvest Granola 300g', brandId: 'br_6', companyId: 'cmp_5', categoryId: 'cat_6', price: 48000, cost: 34000, stock: 60, createdAt: now() },
  { id: 'prd_10', sku: 'GH-OATS-500', name: 'GreenHarvest Oats 500g', brandId: 'br_6', companyId: 'cmp_5', categoryId: 'cat_6', price: 42000, cost: 30000, stock: 75, createdAt: now() },
  { id: 'prd_11', sku: 'HP-ENERGY-250', name: 'HydraPlus Energy 250ml', brandId: 'br_7', companyId: 'cmp_2', categoryId: 'cat_5', price: 18000, cost: 12000, stock: 140, createdAt: now() },
  { id: 'prd_12', sku: 'HP-ISO-500', name: 'HydraPlus Isotonic 500ml', brandId: 'br_7', companyId: 'cmp_2', categoryId: 'cat_5', price: 14000, cost: 9000, stock: 160, createdAt: now() },
  { id: 'prd_13', sku: 'PB-PROTEIN-BAR', name: 'PureBite Protein Bar 50g', brandId: 'br_8', companyId: 'cmp_3', categoryId: 'cat_4', price: 25000, cost: 17000, stock: 110, createdAt: now() },
  { id: 'prd_14', sku: 'PB-VEGAN-COOKIE', name: 'PureBite Vegan Cookie 45g', brandId: 'br_8', companyId: 'cmp_3', categoryId: 'cat_2', price: 16000, cost: 10500, stock: 95, createdAt: now() },
  { id: 'prd_15', sku: 'ND-TEA-LESSSUGAR', name: 'NusaDrink Iced Tea Less Sugar 500ml', brandId: 'br_3', companyId: 'cmp_2', categoryId: 'cat_1', price: 10500, cost: 6800, stock: 210, createdAt: now() },
  { id: 'prd_16', sku: 'SP-NUTMIX-90', name: 'Snackify Nut Mix 90g', brandId: 'br_4', companyId: 'cmp_3', categoryId: 'cat_2', price: 18500, cost: 12500, stock: 70, createdAt: now() },
  { id: 'prd_17', sku: 'TC-IMMUNE-DRINK', name: 'TropiCare Immune Boost 60ml', brandId: 'br_5', companyId: 'cmp_4', categoryId: 'cat_4', price: 18000, cost: 12500, stock: 55, createdAt: now() },
  { id: 'prd_18', sku: 'GH-ALMOND-200', name: 'GreenHarvest Almonds 200g', brandId: 'br_6', companyId: 'cmp_5', categoryId: 'cat_6', price: 52000, cost: 38000, stock: 40, createdAt: now() },
  { id: 'prd_19', sku: 'HP-ENERGY-500', name: 'HydraPlus Energy 500ml', brandId: 'br_7', companyId: 'cmp_2', categoryId: 'cat_5', price: 25000, cost: 17000, stock: 65, createdAt: now() },
  { id: 'prd_20', sku: 'PB-PROTEIN-COOKIE', name: 'PureBite Protein Cookie 55g', brandId: 'br_8', companyId: 'cmp_3', categoryId: 'cat_4', price: 27000, cost: 19000, stock: 50, createdAt: now() },
];

// Transactions
export const transactions = [
  { id: 'tx_1', productId: 'prd_1', type: 'PURCHASE', quantity: 120, unitCost: 18000, createdAt: now() },
  { id: 'tx_2', productId: 'prd_1', type: 'SALE', quantity: 5, unitPrice: 24000, createdAt: now() },
  { id: 'tx_3', productId: 'prd_4', type: 'PURCHASE', quantity: 250, unitCost: 6500, createdAt: now() },
  { id: 'tx_4', productId: 'prd_4', type: 'SALE', quantity: 12, unitPrice: 10000, createdAt: now() },
  { id: 'tx_5', productId: 'prd_6', type: 'PURCHASE', quantity: 200, unitCost: 8000, createdAt: now() },
  { id: 'tx_6', productId: 'prd_6', type: 'SALE', quantity: 20, unitPrice: 12500, createdAt: now() },
  { id: 'tx_7', productId: 'prd_9', type: 'PURCHASE', quantity: 60, unitCost: 34000, createdAt: now() },
  { id: 'tx_8', productId: 'prd_9', type: 'SALE', quantity: 3, unitPrice: 48000, createdAt: now() },
  { id: 'tx_9', productId: 'prd_11', type: 'PURCHASE', quantity: 140, unitCost: 12000, createdAt: now() },
  { id: 'tx_10', productId: 'prd_11', type: 'SALE', quantity: 18, unitPrice: 18000, createdAt: now() },
  { id: 'tx_11', productId: 'prd_13', type: 'PURCHASE', quantity: 110, unitCost: 17000, createdAt: now() },
  { id: 'tx_12', productId: 'prd_13', type: 'SALE', quantity: 10, unitPrice: 25000, createdAt: now() },
  { id: 'tx_13', productId: 'prd_18', type: 'PURCHASE', quantity: 40, unitCost: 38000, createdAt: now() },
  { id: 'tx_14', productId: 'prd_18', type: 'SALE', quantity: 4, unitPrice: 52000, createdAt: now() },
  { id: 'tx_15', productId: 'prd_5', type: 'PURCHASE', quantity: 500, unitCost: 2500, createdAt: now() },
  { id: 'tx_16', productId: 'prd_5', type: 'SALE', quantity: 30, unitPrice: 5000, createdAt: now() },
  { id: 'tx_17', productId: 'prd_8', type: 'PURCHASE', quantity: 90, unitCost: 10500, createdAt: now() },
  { id: 'tx_18', productId: 'prd_8', type: 'SALE', quantity: 6, unitPrice: 15000, createdAt: now() },
  { id: 'tx_19', productId: 'prd_3', type: 'PURCHASE', quantity: 80, unitCost: 14000, createdAt: now() },
  { id: 'tx_20', productId: 'prd_3', type: 'SALE', quantity: 7, unitPrice: 20000, createdAt: now() },
  { id: 'tx_21', productId: 'prd_2', type: 'PURCHASE', quantity: 300, unitCost: 6000, createdAt: now() },
  { id: 'tx_22', productId: 'prd_2', type: 'SALE', quantity: 25, unitPrice: 9000, createdAt: now() },
  { id: 'tx_23', productId: 'prd_16', type: 'PURCHASE', quantity: 70, unitCost: 12500, createdAt: now() },
  { id: 'tx_24', productId: 'prd_16', type: 'SALE', quantity: 5, unitPrice: 18500, createdAt: now() },
  { id: 'tx_25', productId: 'prd_12', type: 'PURCHASE', quantity: 160, unitCost: 9000, createdAt: now() },
  { id: 'tx_26', productId: 'prd_12', type: 'SALE', quantity: 14, unitPrice: 14000, createdAt: now() },
  { id: 'tx_27', productId: 'prd_10', type: 'PURCHASE', quantity: 75, unitCost: 30000, createdAt: now() },
  { id: 'tx_28', productId: 'prd_10', type: 'SALE', quantity: 8, unitPrice: 42000, createdAt: now() },
  { id: 'tx_29', productId: 'prd_14', type: 'PURCHASE', quantity: 95, unitCost: 10500, createdAt: now() },
  { id: 'tx_30', productId: 'prd_14', type: 'SALE', quantity: 9, unitPrice: 16000, createdAt: now() },
];

// Lookup helpers
export const findCompany = (id) => companies.find(c => c.id === id);
export const findBrand = (id) => brands.find(b => b.id === id);
export const findCategory = (id) => categories.find(c => c.id === id);
export const findProduct = (id) => products.find(p => p.id === id);
