export interface Supplier {
  id: number;
  name: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
}

export interface Customer {
  id: number;
  name: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  level: "VIP" | "STANDARD";
}

export interface InventoryItem {
  id: number;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  minimum: number;
  unit: string;
  unitPrice: number;
  supplierId: number;
  location: string;
}

export interface PurchaseOrder {
  id: string;
  supplierId: number;
  amount: number;
  status: "COMPLETED" | "PENDING" | "PROCESSING";
  orderedAt: string;
}

export interface SalesOrder {
  id: string;
  customerId: number;
  amount: number;
  status: "COMPLETED" | "PENDING" | "PROCESSING";
  soldAt: string;
}

export interface InventoryRecord {
  id: number;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  minimum: number;
  unit: string;
  price: number;
  supplier: string;
  location: string;
}

export interface SupplierSummary {
  id: number;
  name: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  products: number;
  totalPurchase: number;
}

export interface CustomerSummary {
  id: number;
  name: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  orders: number;
  totalSales: number;
  level: "VIP" | "STANDARD";
}

export const suppliers: Supplier[] = [
  { id: 1, name: "Summit Supply Co.", contact: "Lena Hart", phone: "+1-202-555-0120", email: "lena@summit.test", address: "1200 Summit Parkway, Austin, TX" },
  { id: 2, name: "Blue Harbor Trading", contact: "Noah Park", phone: "+1-202-555-0130", email: "noah@blueharbor.test", address: "88 Harbor Avenue, Seattle, WA" },
  { id: 3, name: "Vertex Industrial", contact: "Ava Brooks", phone: "+1-202-555-0140", email: "ava@vertex.test", address: "42 Industrial Loop, Chicago, IL" },
];

export const customers: Customer[] = [
  { id: 1, name: "Acme Retail", contact: "Maya Chen", phone: "+1-202-555-0100", email: "buyer@acme.test", address: "500 Market Street, San Francisco, CA", level: "VIP" },
  { id: 2, name: "Northwind Stores", contact: "Owen Silva", phone: "+1-202-555-0110", email: "ops@northwind.test", address: "77 Lake Shore Drive, Chicago, IL", level: "STANDARD" },
  { id: 3, name: "Harbor Front Market", contact: "Emma Wells", phone: "+1-202-555-0150", email: "purchasing@harborfront.test", address: "18 Harbor Street, Boston, MA", level: "STANDARD" },
];

export const inventoryItems: InventoryItem[] = [
  { id: 1, sku: "INV-001", name: "Warehouse Scanner", category: "ELECTRONICS", quantity: 24, minimum: 20, unit: "PCS", unitPrice: 149, supplierId: 1, location: "WAREHOUSE A-01" },
  { id: 2, sku: "INV-002", name: "Thermal Printer", category: "ELECTRONICS", quantity: 12, minimum: 18, unit: "PCS", unitPrice: 229, supplierId: 2, location: "WAREHOUSE A-02" },
  { id: 3, sku: "INV-003", name: "Packing Tape", category: "SUPPLIES", quantity: 44, minimum: 60, unit: "BOX", unitPrice: 12, supplierId: 1, location: "WAREHOUSE B-03" },
  { id: 4, sku: "INV-004", name: "Barcode Labels", category: "SUPPLIES", quantity: 18, minimum: 30, unit: "ROLL", unitPrice: 19, supplierId: 3, location: "WAREHOUSE B-01" },
  { id: 5, sku: "INV-005", name: "Storage Bin", category: "STORAGE", quantity: 96, minimum: 40, unit: "PCS", unitPrice: 34, supplierId: 2, location: "WAREHOUSE C-02" },
];

export const purchaseOrders: PurchaseOrder[] = [
  { id: "PO-001", supplierId: 1, amount: 12500, status: "COMPLETED", orderedAt: "2026-04-20T09:30:00.000Z" },
  { id: "PO-002", supplierId: 2, amount: 25000, status: "PENDING", orderedAt: "2026-04-22T12:00:00.000Z" },
  { id: "PO-003", supplierId: 3, amount: 18400, status: "PROCESSING", orderedAt: "2026-04-23T15:45:00.000Z" },
];

export const salesOrders: SalesOrder[] = [
  { id: "SO-102", customerId: 2, amount: 8900, status: "PROCESSING", soldAt: "2026-04-21T08:20:00.000Z" },
  { id: "SO-103", customerId: 3, amount: 15600, status: "COMPLETED", soldAt: "2026-04-22T10:10:00.000Z" },
  { id: "SO-104", customerId: 1, amount: 12450, status: "COMPLETED", soldAt: "2026-04-24T06:50:00.000Z" },
];

export function sum(values: number[]) {
  return values.reduce((total, value) => total + value, 0);
}

export function getInventoryRecords(): InventoryRecord[] {
  return inventoryItems.map((item) => ({
    id: item.id, sku: item.sku, name: item.name, category: item.category,
    quantity: item.quantity, minimum: item.minimum, unit: item.unit,
    price: item.unitPrice,
    supplier: suppliers.find((s) => s.id === item.supplierId)?.name ?? "Unknown Supplier",
    location: item.location,
  }));
}

export function getSupplierSummaries(): SupplierSummary[] {
  return suppliers.map((supplier) => ({
    id: supplier.id, name: supplier.name, contact: supplier.contact,
    phone: supplier.phone, email: supplier.email, address: supplier.address,
    products: inventoryItems.filter((item) => item.supplierId === supplier.id).length,
    totalPurchase: sum(purchaseOrders.filter((o) => o.supplierId === supplier.id).map((o) => o.amount)),
  }));
}

export function getCustomerSummaries(): CustomerSummary[] {
  return customers.map((customer) => ({
    id: customer.id, name: customer.name, contact: customer.contact,
    phone: customer.phone, email: customer.email, address: customer.address,
    orders: salesOrders.filter((o) => o.customerId === customer.id).length,
    totalSales: sum(salesOrders.filter((o) => o.customerId === customer.id).map((o) => o.amount)),
    level: customer.level,
  }));
}
