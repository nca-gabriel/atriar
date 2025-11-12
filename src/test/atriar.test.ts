// tests/middleware.test.ts
import express, { Request, Response } from "express";
import request from "supertest";
import atriar from "../middleware/atriar";

jest.mock("../handlers/mongoHandler", () => ({
  mongoHandler: () => ({
    insertLog: jest.fn().mockResolvedValue(null),
    getLogs: jest.fn().mockResolvedValue([]),
  }),
}));

jest.mock("../handlers/postgresHandler", () => ({
  postgresHandler: () => ({
    insertLog: jest.fn().mockResolvedValue(null),
    getLogs: jest.fn().mockResolvedValue([]),
  }),
}));

describe("Atriar Middleware", () => {
  let app: ReturnType<typeof express>;

  const testRouteSetup = (provider: "mongodb" | "postgres") => {
    app = express();
    app.use(atriar({ provider, url: "dummy_url" })); // URL only used by Mongo mock

    // simple test route
    app.get("/", (_req: Request, res: Response) => {
      res.json({ ok: true });
    });
  };

  test("MongoDB: responds without crashing", async () => {
    testRouteSetup("mongodb");
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  test("PostgreSQL: responds without crashing", async () => {
    testRouteSetup("postgres");
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});
