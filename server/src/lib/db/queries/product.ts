import {
    DEFAULT_PAGINATION_LIMIT,
    DEFAULT_PAGINATION_PAGE,
} from "@/config/const";
import { productSchema } from "@/lib/validations";
import { eq } from "drizzle-orm";
import { db } from "..";
import { products } from "../schemas";

class ProductQuery {
    async paginate({
        page = DEFAULT_PAGINATION_PAGE,
        limit = DEFAULT_PAGINATION_LIMIT,
    }: {
        page: number;
        limit: number;
    }) {
        const data = await db.query.products.findMany({
            offset: (page - 1) * limit,
            limit,
            orderBy: (products, { desc }) => [desc(products.createdAt)],
            extras: {
                count: db.$count(products).as("products_count"),
            },
        });

        const items = +(data?.[0]?.count || 0);
        const pages = Math.ceil(items / limit);

        const parsed = productSchema.array().parse(data);
        return {
            data: parsed,
            items,
            pages,
        };
    }

    async get(id: string) {
        const data = await db.query.products.findFirst({
            where: (f, o) => o.eq(f.id, id),
        });
        if (!data) return null;
        return productSchema.parse(data);
    }

    async updateStock(id: string, stock: number) {
        const data = await db
            .update(products)
            .set({ stock })
            .where(eq(products.id, id))
            .returning()
            .then((res) => res[0]);
        if (!data) return null;

        return productSchema.parse(data);
    }
}

export const productQueries = new ProductQuery();
