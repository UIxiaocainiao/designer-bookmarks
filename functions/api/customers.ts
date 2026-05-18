import { getCustomerSummaries } from "./_data";

export async function onRequest(): Promise<Response> {
  return new Response(JSON.stringify(getCustomerSummaries()), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
