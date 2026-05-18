export async function onRequest(): Promise<Response> {
  return new Response(JSON.stringify({
    service: "backend",
    endpoints: ["/api", "/api/health", "/api/dashboard", "/api/inventory", "/api/suppliers", "/api/customers"],
  }), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
