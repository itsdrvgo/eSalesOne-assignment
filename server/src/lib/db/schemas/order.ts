import type { Order } from "@/lib/validations";
import { relations } from "drizzle-orm";
import {
    integer,
    jsonb,
    pgTable,
    text,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";
import { products } from "./product";

export const orders = pgTable("orders", {
    id: uuid("id").notNull().primaryKey().unique().defaultRandom(),

    // Product
    productId: uuid("product_id")
        .notNull()
        .references(() => products.id, { onDelete: "cascade" }),
    variant: jsonb("variant").notNull().default({}).$type<Order["variant"]>(),
    quantity: integer("quantity").notNull().default(1),

    // Customer
    customerFullName: text("customer_full_name").notNull(),
    customerEmail: text("customer_email").notNull(),
    customerPhone: text("customer_phone").notNull(),
    customerAddress: text("customer_address").notNull(),
    customerCity: text("customer_city").notNull(),
    customerState: text("customer_state").notNull(),
    customerZip: text("customer_zip").notNull(),

    // Others
    status: text("status", {
        enum: ["approved", "declined", "error"],
    }).notNull(),
    totalAmount: integer("total_amount").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const orderRelations = relations(orders, ({ one }) => ({
    product: one(products, {
        fields: [orders.productId],
        references: [products.id],
    }),
}));
