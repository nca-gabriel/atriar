/// <reference path="../types/logger.d.ts" />
import { Request, Response, NextFunction } from "express";
import { mongoHandler } from "../handlers/mongoHandler";
import { postgresHandler } from "../handlers/postgresHandler";
import express from "express";
import path from "path";

export default function atriar(options: LoggerOptions) {
  const mount = "/atriar";

  const handler =
    options.provider === "mongodb"
      ? mongoHandler(options)
      : postgresHandler(options);

  const router = express.Router();

  // 1) Logger middleware
  router.use(async (req: Request, res: Response, next: NextFunction) => {
    if (
      req.path.startsWith(`${mount}/`) || // your own dashboard & API routes
      /\.(js|css|html|png|jpg|jpeg|gif|svg|ico|json)$/.test(req.path) // static assets
    ) {
      return next();
    }

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
  });

  // Serve static dashboard
  const dashboardPath = path.join(__dirname, "../page");
  router.use(mount, express.static(dashboardPath));

  // API route to fetch logs
  router.get(`${mount}/api/logs`, async (_req: Request, res: Response) => {
    const logs = await handler.getLogs();
    res.json(logs);
  });

  return router;
}
