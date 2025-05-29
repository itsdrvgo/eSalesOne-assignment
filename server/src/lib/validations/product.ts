import { z } from "zod";
import { dateSchema, idSchema, priceSchema } from "./general";

export const productSchema = z.object({
    id: idSchema,
    title: z
        .string({
            invalid_type_error: "Title must be a string",
            required_error: "Title is required",
        })
        .min(3, "Title must be at least 3 characters long"),
    description: z
        .string({
            invalid_type_error: "Description must be a string",
            required_error: "Description is required",
        })
        .min(10, "Description must be at least 10 characters long"),
    price: priceSchema,
    image: z
        .string({
            invalid_type_error: "Image must be a string",
            required_error: "Image is required",
        })
        .url("Image must be a valid URL"),
    variants: z.object({
        color: z.array(
            z.string({
                invalid_type_error: "Color must be a string",
                required_error: "Color is required",
            })
        ),
        size: z.array(
            z.string({
                invalid_type_error: "Size must be a string",
                required_error: "Size is required",
            })
        ),
    }),
    stock: z
        .number({
            invalid_type_error: "Stock must be a number",
            required_error: "Stock is required",
        })
        .int("Stock must be an integer")
        .nonnegative("Stock must be non-negative"),
    createdAt: dateSchema,
    updatedAt: dateSchema,
});

export type Product = z.infer<typeof productSchema>;
