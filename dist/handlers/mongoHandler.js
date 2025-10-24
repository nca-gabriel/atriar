"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoHandler = mongoHandler;
/// <reference path="../types/logger.d.ts" />
const mongodb_1 = require("mongodb");
function extractDbName(url) {
    try {
        const parsed = new URL(url);
        const name = parsed.pathname.replace("/", "");
        return name || null;
    }
    catch {
        return null;
    }
}
function mongoHandler(options) {
    if (!options.url && !options.client)
        throw new Error("Provide either a Mongo URL or an existing MongoClient");
    let collection;
    const ready = (async () => {
        let db;
        if (options.client) {
            db = options.client.db();
        }
        else {
            const client = new mongodb_1.MongoClient(options.url);
            await client.connect();
            const dbName = extractDbName(options.url);
            if (!dbName) {
                throw new Error("MongoDB URL must specify a database name, e.g. mongodb://localhost/mydb");
            }
            db = client.db(dbName);
        }
        collection = db.collection("api_logs");
        console.log("[Logger] MongoDB ready");
    })();
    return {
        async insertLog(log) {
            await ready;
            await collection.insertOne(log);
        },
    };
}
