interface LogEntry {
  method: string;
  path: string;
  status: number;
  duration: string;
  timestamp: Date;
  userAgent?: string;
  ipAddress?: string;
  responseSize?: number;
  errorMessage?: string;
  dbKey?: string;
  routeName?: string;
}

interface LoggerOptions {
  provider: "mongodb" | "postgres";
  url?: string; // connection URL
  client?: import("mongodb").MongoClient; // optional, pre-initialized client
}
