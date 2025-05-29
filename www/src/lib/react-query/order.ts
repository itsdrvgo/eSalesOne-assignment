import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { queries } from "../queries";
import { handleClientError } from "../utils";
import { CreateOrder } from "../validations";

export function useOrder() {
    const router = useRouter();

    const useCreate = () => {
        return useMutation({
            onMutate: () => {
                const toastId = toast.loading("Creating order...");
                return { toastId };
            },
            mutationFn: async (values: CreateOrder) => {
                const data = await queries.order.create(values);
                return data;
            },
            onSuccess: (data, _, { toastId }) => {
                switch (data.status) {
                    case "approved":
                        toast.success("Order created successfully!", {
                            id: toastId,
                        });
                        break;
                    case "declined":
                        toast.warning(
                            "Order declined. Please try again or contact support.",
                            { id: toastId }
                        );
                        break;
                    case "error":
                        toast.error(
                            "There was an error processing your order. Please contact support.",
                            { id: toastId }
                        );
                        break;
                    default:
                        toast.info(`Order status: ${data.status}`, {
                            id: toastId,
                        });
                }

                router.push(`/orders/o/${data.id}`);
            },
            onError: (err, _, ctx) => {
                return handleClientError(err, { id: ctx?.toastId });
            },
        });
    };

    return {
        useCreate,
    };
}
