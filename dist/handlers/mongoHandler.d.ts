export declare function mongoHandler(options: LoggerOptions): {
    insertLog(log: LogEntry): Promise<void>;
    getLogs(limit?: number): Promise<import("mongodb").WithId<LogEntry>[]>;
};
