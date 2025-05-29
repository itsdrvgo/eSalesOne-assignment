import { env } from "@/env";
import { queries } from "@/lib/db/queries";
import { AppError } from "@/lib/helpers";
import {
    buildApprovedEmail,
    buildFailedEmail,
    transporter,
} from "@/lib/mailer";
import { CResponse, handleError } from "@/lib/utils";
import { createOrderSchema } from "@/lib/validations";
import { type CreateOrder } from "@/lib/validations/order";
import { type Product } from "@/lib/validations/product";
import type { Request, Response } from "express";

class OrderController {
    async get(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if (!id) throw new AppError("Order ID is required", "BAD_REQUEST");

            const data = await queries.order.get(id);
            if (!data) throw new AppError("Order not found", "NOT_FOUND");

            CResponse({ res, data });
        } catch (err) {
            handleError(err, res);
        }
    }

    private _validateProductVariant(
        product: Product,
        variant: CreateOrder["variant"]
    ) {
        const requestedColor = variant.color;
        const requestedSize = variant.size;

        let colorValid = false;
        if (product.variants.color.length === 0) {
            colorValid = requestedColor === "";
        } else {
            colorValid = product.variants.color.includes(requestedColor);
        }

        let sizeValid = false;
        if (product.variants.size.length === 0) {
            sizeValid = requestedSize === "";
        } else {
            sizeValid = product.variants.size.includes(requestedSize);
        }

        if (!colorValid || !sizeValid) {
            let message = "";
            if (!colorValid && !sizeValid) {
                const cMsg =
                    product.variants.color.length === 0 && requestedColor !== ""
                        ? "This product does not have color options."
                        : `Color '${requestedColor}' is not available.`;
                const sMsg =
                    product.variants.size.length === 0 && requestedSize !== ""
                        ? "This product does not have size options."
                        : `Size '${requestedSize}' is not available.`;
                message = `${cMsg} ${sMsg}`;
            } else if (!colorValid) {
                message =
                    product.variants.color.length === 0 && requestedColor !== ""
                        ? "This product does not have color options."
                        : `Color '${requestedColor}' is not available for this product.`;
            } else {
                message =
                    product.variants.size.length === 0 && requestedSize !== ""
                        ? "This product does not have size options."
                        : `Size '${requestedSize}' is not available for this product.`;
            }
            throw new AppError(message.trim(), "BAD_REQUEST");
        }
    }

    create = async (req: Request, res: Response) => {
        try {
            const body = req.body;
            const parsed = createOrderSchema.parse(body);

            const existingProduct = await queries.product.get(parsed.productId);
            if (!existingProduct)
                throw new AppError("Product not found", "NOT_FOUND");

            this._validateProductVariant(existingProduct, parsed.variant);

            const existingStock = existingProduct.stock;
            if (existingStock < parsed.quantity)
                throw new AppError("Insufficient stock", "BAD_REQUEST");

            const newStock = existingStock - parsed.quantity;

            const [data] = await Promise.all([
                queries.order.create(parsed),
                queries.product.updateStock(parsed.productId, newStock),
            ]);
            if (!data)
                throw new AppError(
                    "Order creation failed",
                    "INTERNAL_SERVER_ERROR"
                );

            let subject = "";
            let html = "";

            if (data?.status === "approved") {
                const email = buildApprovedEmail({
                    ...data,
                    productName: existingProduct.title,
                });
                subject = email.subject;
                html = email.html;
            } else {
                const email = buildFailedEmail({
                    ...data,
                    productName: existingProduct.title,
                });
                subject = email.subject;
                html = email.html;
            }

            await transporter.sendMail({
                from: env.MAIL_FROM,
                to: data.customerEmail,
                subject,
                html,
            });

            CResponse({ res, data });
        } catch (err) {
            handleError(err, res);
        }
    };
}

export const orderController = new OrderController();
