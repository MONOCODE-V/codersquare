import type { JWTpayload } from "./types.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import e from "express";
dotenv.config();

export function signJwt(payload:JWTpayload): string {
 
    return jwt.sign(payload,getJwtsecret(), { expiresIn: '1h' });
}

function  getJwtsecret(): string {
  const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error("JWT_SECRET is not defined in environment variables");
        process.exit(1);
    }   
    return secret;
}
export function verifyJwt(token: string): JWTpayload | null {
    try {
        const decoded = jwt.verify(token, getJwtsecret());
        return decoded as JWTpayload;
    } catch (err) {
        console.error("JWT verification failed:", err);
        return null;
    }
}