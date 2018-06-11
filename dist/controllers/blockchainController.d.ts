import { Request, Response } from "express";
export declare let getBitCoint: (req: Request, res: Response) => void;
export declare let postTransaction: (req: Request, res: Response) => void;
export declare let getMine: (req: Request, res: Response) => Promise<void>;
