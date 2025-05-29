import type { Product } from "@/lib/validations";
import {
    integer,
    jsonb,
    pgTable,
    text,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
    id: uuid("id").notNull().primaryKey().unique().defaultRandom(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    price: integer("price").notNull(),
    image: text("image").notNull(),
    variants: jsonb("variants")
        .notNull()
        .default({})
        .$type<Product["variants"]>(),
    stock: integer("stock").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
