import type { ResponseMessages } from "../validations";
import { logger } from "./logger";

export class AppError extends Error {
    status: ResponseMessages;

    constructor(message: string, status: ResponseMessages) {
        super(message);
        this.status = status;
    }
}

export function initiateErrorHandler() {
    logger.info("Error Handler initiated");

    process.on("uncaughtException", (err) =>
        logger.error(`Uncaught Exception : ${err}`)
    );
    process.on("uncaughtExceptionMonitor", (err) =>
        logger.error(`Uncaught Exception (Monitor) : ${err}`)
    );
    process.on("unhandledRejection", (reason) =>
        logger.error(`Unhandled Rejection/Catch : ${reason}`)
    );
}
