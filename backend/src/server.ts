import { getCustomerSummaries, getInventoryRecords, getSupplierSummaries } from "./data.js";
import { getDashboardPayload } from "./dashboard.js";

export interface ServerConfig {
  databaseUrl?: string;
}

function sendJson(payload: unknown, statusCode = 200) {
  return new Response(JSON.stringify(payload, null, 2), {
    status: statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,OPTIONS",
    },
  });
}

function handleRequest(config: ServerConfig, request: Request): Response {
  const method = request.method;
  const url = new URL(request.url);

  if (method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
      },
    });
  }

  if (method === "GET" && url.pathname === "/api") {
    return sendJson({
      service: "backend",
      endpoints: [
        "/api",
        "/api/health",
        "/api/dashboard",
        "/api/inventory",
        "/api/suppliers",
        "/api/customers",
      ],
    });
  }

  if (method === "GET" && url.pathname === "/api/health") {
    return sendJson({
      status: "ok",
      databaseConfigured: Boolean(config.databaseUrl),
      timestamp: new Date().toISOString(),
    });
  }

  if (method === "GET" && url.pathname === "/api/dashboard") {
    return sendJson(getDashboardPayload());
  }

  if (method === "GET" && url.pathname === "/api/inventory") {
    return sendJson(getInventoryRecords());
  }

  if (method === "GET" && url.pathname === "/api/suppliers") {
    return sendJson(getSupplierSummaries());
  }

  if (method === "GET" && url.pathname === "/api/customers") {
    return sendJson(getCustomerSummaries());
  }

  return sendJson(
    {
      error: "NOT_FOUND",
      message: `Cannot ${method} ${url.pathname}`,
    },
    404,
  );
}

export function createFetchHandler(config: ServerConfig) {
  return {
    fetch(request: Request): Response {
      return handleRequest(config, request);
    },
  };
}
