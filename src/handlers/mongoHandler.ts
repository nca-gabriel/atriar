/// <reference path="../types/logger.d.ts" />
import { MongoClient, Db, Collection } from "mongodb";

function extractDbName(url: string): string | null {
  try {
    const parsed = new URL(url);
    const name = parsed.pathname.replace("/", "");
    return name || null;
  } catch {
    return null;
  }
}

export function mongoHandler(options: LoggerOptions) {
  if (!options.url && !options.client)
    throw new Error("Provide either a Mongo URL or an existing MongoClient");

  let collection: Collection<LogEntry>;

  const ready = (async () => {
    let db: Db;
    if (options.client) {
      db = options.client.db();
    } else {
      const client = new MongoClient(options.url!);
      await client.connect();

      const dbName = extractDbName(options.url!);
      if (!dbName) {
        throw new Error(
          "MongoDB URL must specify a database name, e.g. mongodb://localhost/mydb"
        );
      }

      db = client.db(dbName);
    }
    collection = db.collection("api_logs");
    console.log("[Logger] MongoDB ready");
  })();

  return {
    async insertLog(log: LogEntry) {
      await ready;
      await collection.insertOne(log);
    },
  };
}
