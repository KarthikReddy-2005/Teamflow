import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/auth.routes.js";
import { env } from "./configs/env.js";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use("/", router);

export default app;
