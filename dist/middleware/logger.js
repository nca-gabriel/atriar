"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = logger;
const mongoHandler_1 = require("../handlers/mongoHandler");
const postgresHandler_1 = require("../handlers/postgresHandler");
function logger(options) {
    const handler = options.provider === "mongodb"
        ? (0, mongoHandler_1.mongoHandler)(options)
        : (0, postgresHandler_1.postgresHandler)(options);
    return async function (req, res, next) {
        const start = performance.now();
        res.on("finish", async () => {
            const duration = (performance.now() - start).toFixed(2);
            const log = {
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
            }
            catch (err) {
                console.error("Logger insert failed:", err);
            }
        });
        next();
    };
}
