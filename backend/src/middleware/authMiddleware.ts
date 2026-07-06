import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";
import { AppError } from "../utils/appError.js";
import { JwtPayload } from "jsonwebtoken";
import { findPackageJSON } from "node:module";
import { tr } from "zod/locales";

export function AuthMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
){
    try{
        //1. read authentication header
        const authHeader = req.headers.authorization;

        if(!authHeader){
            throw new AppError("Authentication headers missing", 401);
        }

        //2. Check bearer token
        if(!authHeader.startsWith("Bearer")){
            throw new AppError("Invalid authorization format", 401);
        }

        //3. Extract token 
        const token = authHeader.split(" ")[1];

        //4. verify token 
        const decoded = verifyToken(token) as JwtPayload & {
            userId: string
        };

        //5. Attach userId
        req.userId =decoded.userId

        next();
    }catch (error){
        next(new AppError("Invalid or expired token", 401))
    };
};
