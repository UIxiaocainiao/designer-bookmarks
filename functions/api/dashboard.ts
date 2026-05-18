import { getDashboardPayload } from "./_dashboard";

export async function onRequest(): Promise<Response> {
  return new Response(JSON.stringify(getDashboardPayload()), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
