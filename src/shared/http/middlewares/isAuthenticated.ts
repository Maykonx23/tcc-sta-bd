import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../../../config/auth";
import AppError from "../../../shared/errors/AppError";

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("JWT Token não existe");
    }

    const [, token] = authHeader.split(" ");

    try {
        const decoredToken = verify(token, authConfig.jwt.secret);

        const { sub } = decoredToken as TokenPayload;

        request.cliente = {
            id: sub,
        };

        return next();
    } catch {
        throw new AppError("Token JWT Invalido.");
    }
}
