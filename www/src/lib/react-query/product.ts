import {
    DEFAULT_PAGINATION_LIMIT,
    DEFAULT_PAGINATION_PAGE,
} from "@/config/const";
import { useQuery } from "@tanstack/react-query";
import { queries } from "../queries";
import { Product } from "../validations";

export function useProducts() {
    const usePaginate = ({
        page = DEFAULT_PAGINATION_PAGE,
        limit = DEFAULT_PAGINATION_LIMIT,
        initialData,
    }: {
        page?: number;
        limit?: number;
        initialData?: { data: Product[]; items: number; pages: number };
    }) => {
        return useQuery({
            queryKey: ["products", { page, limit }],
            queryFn: async () => {
                const response = await queries.product.paginate({
                    page,
                    limit,
                });

                return response;
            },
            initialData,
        });
    };

    const useGet = ({
        id,
        initialData,
    }: {
        id: string;
        initialData?: Product;
    }) => {
        return useQuery({
            queryKey: ["product", id],
            queryFn: async () => {
                const response = await queries.product.get(id);
                return response;
            },
            initialData,
        });
    };

    return {
        usePaginate,
        useGet,
    };
}
