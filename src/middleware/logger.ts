/// <reference path="../types/index.d.ts" />

import { Request, Response, NextFunction } from "express";
import { MongoClient, Db, Collection } from "mongodb";

export function logger(options: LoggerOptions) {
  if (!options.db && !options.client)
    throw new Error("Provide either a Mongo URL or an existing MongoClient");

  let collection: Collection<LogEntry>;

  async function initDB() {
    try {
      if (options.client) {
        const db: Db = options.client.db(options.databaseName);
        collection = db.collection("api_logs");
      } else if (options.db) {
        const client = new MongoClient(options.db);
        await client.connect();
        const db: Db = client.db(options.databaseName);
        collection = db.collection("api_logs");
      }
    } catch (err) {
      console.error("Logger DB initialization failed:", err);
    }
  }

  initDB().catch(console.error);

  return async function (req: Request, res: Response, next: NextFunction) {
    const start = performance.now();
    // console.log("logger is running");

    res.on("finish", async () => {
      const duration = (performance.now() - start).toFixed(2);
      const log: LogEntry = {
        method: req.method,
        path: req.path,
        status: req.status,
        duration,
        timestamp: new Date(),
        userAgent: req.headers["user-agent"],
        ipAddress: req.ip,
        responseSize: res.getHeader("Content-length") || 0,
        errorMessage: res.locals.error || null,
      };

      try {
        if (collection) {
          await collection.insertOne(log);
        } else {
          console.error("Logger: MongoDB collection not initialized yet.");
        }
      } catch (err) {
        console.error("Logger: Failed to insert log", err);
      }
    });

    next();
  };
}
