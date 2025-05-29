import { axios } from "../axios";
import { CreateOrder, Order, Product, ResponseData } from "../validations";

class OrderQuery {
    async get(id: string) {
        const response = await axios.get<
            ResponseData<
                Order & {
                    product: Product;
                }
            >
        >(`/orders/${id}`);
        if (
            response.status !== 200 ||
            !response.data.data ||
            response.data.longMessage
        )
            throw new Error(
                response.data.longMessage || "Failed to fetch order"
            );

        return response.data.data;
    }

    async create(values: CreateOrder) {
        const response = await axios.post<ResponseData<Order>>(
            "/orders",
            values
        );
        if (
            response.status !== 200 ||
            !response.data.data ||
            response.data.longMessage
        )
            throw new Error(
                response.data.longMessage || "Failed to create order"
            );

        return response.data.data;
    }
}

export const orderQueries = new OrderQuery();
