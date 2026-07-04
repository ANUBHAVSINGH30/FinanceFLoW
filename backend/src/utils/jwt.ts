import jwt from "jsonwebtoken"
import {env} from "../config/env.js"

const JWT_EXPIRES_IN = "7d";

export function generateToken(userId: string): string {
    return jwt.sign(
        {userId}, 
        env.JWT_SECRET,
        {expiresIn: JWT_EXPIRES_IN}
    );
};

export function verifyToken(token: string){
    return jwt.verify(token, env.JWT_SECRET);
};

