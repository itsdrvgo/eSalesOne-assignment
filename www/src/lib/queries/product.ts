import {
    DEFAULT_PAGINATION_LIMIT,
    DEFAULT_PAGINATION_PAGE,
} from "@/config/const";
import { axios } from "../axios";
import { Product, ResponseData } from "../validations";

class ProductQuery {
    async paginate({
        page = DEFAULT_PAGINATION_PAGE,
        limit = DEFAULT_PAGINATION_LIMIT,
    }: {
        page: number;
        limit: number;
    }) {
        const response = await axios.get<
            ResponseData<{ data: Product[]; items: number; pages: number }>
        >("/products", {
            params: {
                page,
                limit,
            },
        });
        if (
            response.status !== 200 ||
            !response.data.data ||
            response.data.longMessage
        )
            throw new Error(
                response.data.longMessage || "Failed to fetch products"
            );

        return response.data.data;
    }

    async get(id: string) {
        const response = await axios.get<ResponseData<Product>>(
            `/products/${id}`
        );
        if (
            response.status !== 200 ||
            !response.data.data ||
            response.data.longMessage
        )
            throw new Error(
                response.data.longMessage || "Failed to fetch product"
            );

        return response.data.data;
    }
}

export const productQueries = new ProductQuery();
