import { getSupplierSummaries } from "./_data";

export async function onRequest(): Promise<Response> {
  return new Response(JSON.stringify(getSupplierSummaries()), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
