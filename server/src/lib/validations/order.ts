import { z } from "zod";
import { dateSchema, idSchema } from "./general";

export const orderSchema = z.object({
    id: idSchema,

    // Product
    productId: idSchema,
    variant: z.object({
        color: z.string({
            invalid_type_error: "Color must be a string",
            required_error: "Color is required",
        }),
        size: z.string({
            invalid_type_error: "Size must be a string",
            required_error: "Size is required",
        }),
    }),
    quantity: z
        .number({
            invalid_type_error: "Quantity must be a number",
            required_error: "Quantity is required",
        })
        .int("Quantity must be an integer")
        .nonnegative("Quantity must be non-negative"),

    // Customer
    customerFullName: z
        .string({
            invalid_type_error: "Full name must be a string",
            required_error: "Full name is required",
        })
        .min(3, "Full name must be at least 3 characters long"),
    customerEmail: z
        .string({
            invalid_type_error: "Email must be a string",
            required_error: "Email is required",
        })
        .email("Please provide a valid email address"),
    customerPhone: z
        .string({
            invalid_type_error: "Phone must be a string",
            required_error: "Phone is required",
        })
        .min(10, "Phone must be at least 10 characters long"),
    customerAddress: z
        .string({
            invalid_type_error: "Address must be a string",
            required_error: "Address is required",
        })
        .min(5, "Address must be at least 5 characters long"),
    customerCity: z
        .string({
            invalid_type_error: "City must be a string",
            required_error: "City is required",
        })
        .min(2, "City must be at least 2 characters long"),
    customerState: z
        .string({
            invalid_type_error: "State must be a string",
            required_error: "State is required",
        })
        .min(2, "State must be at least 2 characters long"),
    customerZip: z
        .string({
            invalid_type_error: "Zip code must be a string",
            required_error: "Zip code is required",
        })
        .min(5, "Zip code must be at least 5 characters long"),

    // Others
    status: z.enum(["approved", "declined", "error"], {
        invalid_type_error:
            "Status must be one of 'approved', 'declined', or 'error'",
        required_error: "Status is required",
    }),
    totalAmount: z
        .number({
            invalid_type_error: "Total amount must be a number",
            required_error: "Total amount is required",
        })
        .int("Total amount must be an integer")
        .nonnegative("Total amount must be non-negative"),
    createdAt: dateSchema,
    updatedAt: dateSchema,
});

export const createOrderSchema = orderSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export type Order = z.infer<typeof orderSchema>;
export type CreateOrder = z.infer<typeof createOrderSchema>;
