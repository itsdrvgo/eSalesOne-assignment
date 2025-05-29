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

export const checkoutFormSchema = createOrderSchema.extend({
    cardNumber: z
        .string({
            required_error: "Card number is required",
            invalid_type_error: "Card number must be a string",
        })
        .length(16, "Card number must be 16 digits")
        .regex(/^[0-9]{16}$/, "Invalid card number format"),
    expiryDate: z
        .string({
            required_error: "Expiry date is required",
            invalid_type_error: "Expiry date must be a string",
        })
        .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Expiry date must be MM/YY")
        .refine(
            (val) => {
                const [month, year] = val.split("/");
                const currentYear = new Date().getFullYear() % 100;
                const currentMonth = new Date().getMonth() + 1;
                const inputYear = parseInt(year, 10);
                const inputMonth = parseInt(month, 10);

                if (inputYear < currentYear) return false;
                if (inputYear === currentYear && inputMonth < currentMonth)
                    return false;
                return true;
            },
            { message: "Expiry date must be in the future" }
        ),
    cvv: z
        .string({
            required_error: "CVV is required",
            invalid_type_error: "CVV must be a string",
        })
        .length(3, "CVV must be 3 digits")
        .regex(/^[0-9]{3}$/, "Invalid CVV format"),
});

export type CheckoutFormData = z.infer<typeof checkoutFormSchema>;
