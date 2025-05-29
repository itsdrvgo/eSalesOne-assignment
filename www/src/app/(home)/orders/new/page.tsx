import { GeneralShell } from "@/components/globals/layouts";
import { Icons } from "@/components/icons";
import { OrdersNewPage } from "@/components/orders";
import {
    EmptyPlaceholder,
    EmptyPlaceholderContent,
    EmptyPlaceholderDescription,
    EmptyPlaceholderHeader,
    EmptyPlaceholderIcon,
    EmptyPlaceholderTitle,
} from "@/components/ui/empty-placeholder";
import { queries } from "@/lib/queries";
import { Suspense } from "react";

interface PageProps {
    searchParams: Promise<{
        productId: string;
    }>;
}

export default function Page(props: PageProps) {
    return (
        <GeneralShell>
            <Suspense>
                <OrdersNewFetch {...props} />
            </Suspense>
        </GeneralShell>
    );
}

async function OrdersNewFetch({ searchParams }: PageProps) {
    const { productId } = await searchParams;

    try {
        const existingProduct = await queries.product.get(productId);
        return <OrdersNewPage product={existingProduct} />;
    } catch (err) {
        const message =
            err instanceof Error
                ? err.message
                : "Could not fetch product details for order creation";

        return (
            <div className="flex justify-center">
                <EmptyPlaceholder>
                    <EmptyPlaceholderIcon>
                        <Icons.AlertTriangle />
                    </EmptyPlaceholderIcon>

                    <EmptyPlaceholderContent>
                        <EmptyPlaceholderHeader>
                            <EmptyPlaceholderTitle>
                                Failed to fetch products
                            </EmptyPlaceholderTitle>
                            <EmptyPlaceholderDescription>
                                {message}
                            </EmptyPlaceholderDescription>
                        </EmptyPlaceholderHeader>
                    </EmptyPlaceholderContent>
                </EmptyPlaceholder>
            </div>
        );
    }
}
