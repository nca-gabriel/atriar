import { Request, Response, NextFunction } from "express";
export declare function logger(options: LoggerOptions): (req: Request, res: Response, next: NextFunction) => Promise<void>;
