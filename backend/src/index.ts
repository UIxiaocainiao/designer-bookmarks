import { createFetchHandler } from "./server.js";

const databaseUrl = (globalThis as any).DATABASE_URL as string | undefined;

export default createFetchHandler({ databaseUrl });
