"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = logger;
const mongoHandler_1 = require("../handlers/mongoHandler");
const postgresHandler_1 = require("../handlers/postgresHandler");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
function logger(options) {
    const mount = "/atriar";
    const handler = options.provider === "mongodb"
        ? (0, mongoHandler_1.mongoHandler)(options)
        : (0, postgresHandler_1.postgresHandler)(options);
    const router = express_1.default.Router();
    // 1) Logger middleware
    router.use(async (req, res, next) => {
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
    });
    // Serve static dashboard
    const dashboardPath = path_1.default.join(__dirname, "../page");
    router.use(mount, express_1.default.static(dashboardPath));
    // API route to fetch logs
    router.get(`${mount}/api/logs`, async (_req, res) => {
        const logs = await handler.getLogs();
        res.json(logs);
    });
    return router;
}
