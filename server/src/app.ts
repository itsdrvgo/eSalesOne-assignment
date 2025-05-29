import "dotenv/config";
import "@/env";
import { env } from "@/env";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { routes } from "./app/routes";
import { initiateErrorHandler, logger } from "./lib/helpers";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    cors({
        origin: env.FRONTEND_URL,
        credentials: true,
    })
);

app.set("trust proxy", 1);

app.use("/api", routes.api);

app.listen(env.PORT, () => {
    initiateErrorHandler();
    logger.info(`Server is running on http://localhost:${env.PORT}`);
});
