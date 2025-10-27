"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postgresHandler = postgresHandler;
/// <reference path="../types/logger.d.ts" />
const pg_1 = require("pg");
function postgresHandler(options) {
    if (!options.url && !options.client)
        throw new Error("Provide either a Postgres URL or an existing pg Client");
    let client;
    const ready = (async () => {
        if (options.client) {
            client = options.client;
        }
        else {
            client = new pg_1.Client({ connectionString: options.url });
            await client.connect();
        }
        await client.query(`
      CREATE TABLE IF NOT EXISTS api_logs (
        id SERIAL PRIMARY KEY,
        method TEXT,
        path TEXT,
        status INT,
        duration TEXT,
        timestamp TIMESTAMP,
        userAgent TEXT,
        ipAddress TEXT,
        responseSize INT,
        errorMessage TEXT
      );
    `);
        console.log("[Logger] PostgreSQL connected");
    })();
    return {
        async insertLog(log) {
            await ready; // ensure DB is initialized before inserting
            const query = `
        INSERT INTO api_logs (
          method, path, status, duration, timestamp, userAgent,
          ipAddress, responseSize, errorMessage
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);
      `;
            const values = [
                log.method,
                log.path,
                log.status,
                log.duration,
                log.timestamp,
                log.userAgent || null,
                log.ipAddress || null,
                log.responseSize || null,
                log.errorMessage || null,
            ];
            await client.query(query, values);
        },
        async getLogs(limit = 100) {
            await ready;
            const result = await client.query(`SELECT * FROM api_logs ORDER BY timestamp DESC LIMIT $1;`, [limit]);
            return result.rows;
        },
    };
}
