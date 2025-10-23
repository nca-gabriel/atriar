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
  db?: string;
  client?: import("mongodb").MongoClient;
  databaseName?: string;
}
