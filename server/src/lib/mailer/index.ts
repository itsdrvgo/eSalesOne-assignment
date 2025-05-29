import { env } from "@/env";
import nodemailer from "nodemailer";
import { convertCentToDollar, formatPriceTag } from "../utils";
import type { Order } from "../validations";

export const transporter = nodemailer.createTransport({
    host: env.MAIL_HOST,
    port: env.MAIL_PORT,
    auth: {
        user: env.MAIL_USER,
        pass: env.MAIL_PASSWORD,
    },
});

export const buildApprovedEmail = (
    data: Order & {
        productName: string;
    }
) => {
    const variantParts = Object.entries(data.variant)
        .filter(([, value]) => value !== "")
        .map(([key, value]) => `${key}: ${value}`);
    const variantString =
        variantParts.length > 0 ? variantParts.join(", ") : "N/A";

    return {
        subject: `Your Order #${data.id} is Confirmed!`,
        html: `
    <h2>Thank you for your purchase, ${data.customerFullName}!</h2>
    <p>Your order <strong>#${data.id}</strong> has been successfully placed and confirmed.</p>
    <h3>Order Summary:</h3>
    <ul>
      <li><strong>Product:</strong> ${data.productName}</li>
      <li><strong>Variant:</strong> ${variantString}</li>
      <li><strong>Quantity:</strong> ${data.quantity}</li>
      <li><strong>Total:</strong> ${formatPriceTag(convertCentToDollar(data.totalAmount))}</li>
    </ul>
    <h3>Shipping Information:</h3>
    <p>
      ${data.customerFullName}<br>
      ${data.customerAddress}<br>
      ${data.customerCity}, ${data.customerState} - ${data.customerZip}<br>
      Phone: ${data.customerPhone}<br>
      Email: ${data.customerEmail}
    </p>
    <p>We'll notify you when your order is shipped.</p>
    <hr />
    <small>This is a transactional email. Please don't reply directly.</small>
  `,
    };
};

export const buildFailedEmail = (
    data: Order & {
        productName: string;
        failureReason?: string;
    }
) => {
    const variantParts = Object.entries(data.variant)
        .filter(([, value]) => value !== "")
        .map(([key, value]) => `${key}: ${value}`);
    const variantString =
        variantParts.length > 0 ? variantParts.join(", ") : "N/A";

    return {
        subject: `Order Failed — #${data.id}`,
        html: `
    <h2>Hi ${data.customerFullName},</h2>
    <p>Unfortunately, your order <strong>#${data.id}</strong> could not be processed.</p>
    <h3>Reason:</h3>
    <p><em>${data.failureReason ?? "Unknown error"}</em></p>
    <h3>Order Attempt Details:</h3>
    <ul>
      <li><strong>Product:</strong> ${data.productName}</li>
      <li><strong>Variant:</strong> ${variantString}</li>
      <li><strong>Quantity:</strong> ${data.quantity}</li>
      <li><strong>Total:</strong> ${formatPriceTag(convertCentToDollar(data.totalAmount))}</li>
    </ul>
    <h3>What You Can Do:</h3>
    <p>We're sorry for the inconvenience.</p>
    <hr />
    <small>This is a transactional email. Please don't reply directly.</small>
  `,
    };
};
