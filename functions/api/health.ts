export async function onRequest(): Promise<Response> {
  return new Response(JSON.stringify({
    status: "ok",
    timestamp: new Date().toISOString(),
  }), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
