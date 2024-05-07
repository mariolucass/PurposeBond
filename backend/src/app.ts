import express, { json } from "express";
import "express-async-errors";
import helmet from "helmet";
import "reflect-metadata";
import { ErrorHandler } from "./errors/errorHandler";

export const app = express();

app.use(helmet());

app.use(json());

app.use(ErrorHandler.execute);
