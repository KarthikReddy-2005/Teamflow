import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import { env } from "./configs/env.js";
import teamsRouter from "./routes/teams.routes.js";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use("/", authRouter);
app.use("/teams", teamsRouter);

export default app;
