import dotenv from "dotenv";
import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { errors } from "celebrate";
import cors from "cors";
import { routes } from "./routes";
import AppError from "../errors/AppError";
import "./../../shared/typeorm";
import { Client } from "pg";

dotenv.config();
const app = express();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
client.connect();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(errors());

app.use(
    (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        if (error instanceof AppError) {
            return response.status(error.statusCode).json({
                status: "error",
                message: error.message,
            });
        }

        return response.status(500).json({
            status: "error",
            message: "Internal Server error",
        });
    }
);

app.listen(process.env.PORT || 3333, () => {
    console.log("Server ligado na porta 3333!");
});
