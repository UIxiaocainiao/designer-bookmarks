import { customers, inventoryItems, purchaseOrders, salesOrders, suppliers } from "./_data";

export interface DashboardStat {
  title: string;
  value: number;
  change: string;
  type: "inventory" | "purchase" | "sales" | "alerts";
}

export interface RecentOrder {
  id: string;
  type: "PURCHASE" | "SALES";
  counterparty: string;
  amount: number;
  status: "COMPLETED" | "PENDING" | "PROCESSING";
  timestamp: string;
}

export interface StockAlert {
  name: string;
  sku: string;
  current: number;
  minimum: number;
  unit: string;
}

function sum(values: number[]) {
  return values.reduce((total, value) => total + value, 0);
}

export function getDashboardPayload() {
  const totalInventoryValue = sum(inventoryItems.map((item) => item.quantity * item.unitPrice));
  const monthlyPurchaseValue = sum(purchaseOrders.map((o) => o.amount));
  const monthlySalesValue = sum(salesOrders.map((o) => o.amount));

  const lowStock = inventoryItems
    .filter((item) => item.quantity <= item.minimum)
    .map((item) => ({
      name: item.name, sku: item.sku, current: item.quantity, minimum: item.minimum, unit: item.unit,
    }))
    .sort((a, b) => a.current - b.current);

  const recentOrders = [
    ...purchaseOrders.map((o) => ({
      id: o.id, type: "PURCHASE" as const,
      counterparty: suppliers.find((s) => s.id === o.supplierId)?.name ?? "Unknown Supplier",
      amount: o.amount, status: o.status, timestamp: o.orderedAt,
    })),
    ...salesOrders.map((o) => ({
      id: o.id, type: "SALES" as const,
      counterparty: customers.find((c) => c.id === o.customerId)?.name ?? "Unknown Customer",
      amount: o.amount, status: o.status, timestamp: o.soldAt,
    })),
  ]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 6);

  return {
    stats: [
      { title: "TOTAL INVENTORY", value: totalInventoryValue, change: "+6.4%", type: "inventory" },
      { title: "MONTHLY PURCHASE", value: monthlyPurchaseValue, change: "+4.9%", type: "purchase" },
      { title: "MONTHLY SALES", value: monthlySalesValue, change: "+9.7%", type: "sales" },
      { title: "STOCK ALERTS", value: lowStock.length, change: "RESTOCK", type: "alerts" },
    ],
    recentOrders,
    lowStock,
  };
}
