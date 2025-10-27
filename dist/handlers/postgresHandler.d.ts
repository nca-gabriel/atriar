export declare function postgresHandler(options: LoggerOptions): {
    insertLog(log: LogEntry): Promise<void>;
    getLogs(limit?: number): Promise<any>;
};
