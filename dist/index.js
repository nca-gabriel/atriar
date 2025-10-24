"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = require("./middleware/logger");
const app = (0, express_1.default)();
app.use((0, logger_1.logger)({ provider: "mongodb", url: "mongodb://localhost/atriar" }));
app.get("/", (req, res) => {
    res.send("Logger test route hit");
});
app.listen(3000, () => console.log("Server running on port 3000"));
