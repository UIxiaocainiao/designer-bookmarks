import { getInventoryRecords } from "./_data";

export async function onRequest(): Promise<Response> {
  return new Response(JSON.stringify(getInventoryRecords()), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
