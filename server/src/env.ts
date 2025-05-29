import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    server: {
        FRONTEND_URL: z.string().min(1, "FRONTEND_URL is required"),
        PORT: z.coerce.number().default(3001),

        DOMAIN: z.string().min(1, "DOMAIN is required"),

        DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

        MAIL_FROM: z.string().min(1, "MAIL_FROM is required"),
        MAIL_HOST: z.string().min(1, "MAIL_HOST is required"),
        MAIL_PORT: z.coerce.number().default(2525),
        MAIL_USER: z.string().min(1, "MAIL_USER is required"),
        MAIL_PASSWORD: z.string().min(1, "MAIL_PASSWORD is required"),
    },
    runtimeEnv: process.env,
});
