import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

interface User {
	userId: string;
}

export function middleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"] ?? "";
    const decoded = jwt.verify(token, JWT_SECRET) as User;

    if (decoded) {
        (req as any).userId = decoded.userId;
    } else {
        res.status(403).json({
            message: "UnAuthorized"
        })
    }

}