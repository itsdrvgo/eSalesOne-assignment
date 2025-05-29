import type { CreateOrder } from "@/lib/validations";
import { db } from "..";
import { orders } from "../schemas";

class OrderQuery {
    async get(id: string) {
        const data = await db.query.orders.findFirst({
            where: (f, o) => o.eq(f.id, id),
            with: {
                product: true,
            },
        });
        if (!data) return null;

        return data;
    }

    async create(values: CreateOrder) {
        const data = await db
            .insert(orders)
            .values(values)
            .returning()
            .then((res) => res[0]);

        return data;
    }
}

export const orderQueries = new OrderQuery();
