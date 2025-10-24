/// <reference path="../types/logger.d.ts" />
import { Request, Response, NextFunction } from "express";
import { mongoHandler } from "../handlers/mongoHandler";
import { postgresHandler } from "../handlers/postgresHandler";

export function logger(options: LoggerOptions) {
  const handler =
    options.provider === "mongodb"
      ? mongoHandler(options)
      : postgresHandler(options);

  return async function (req: Request, res: Response, next: NextFunction) {
    const start = performance.now();

    res.on("finish", async () => {
      const duration = (performance.now() - start).toFixed(2);
      const log: LogEntry = {
        method: req.method,
        path: req.path,
        status: res.statusCode,
        duration,
        timestamp: new Date(),
        userAgent: req.headers["user-agent"],
        ipAddress: req.ip,
        responseSize: Number(res.getHeader("Content-Length")) || 0,
        errorMessage: res.locals.error || null,
      };

      try {
        await handler.insertLog(log);
      } catch (err) {
        console.error("Logger insert failed:", err);
      }
    });

    next();
  };
}
