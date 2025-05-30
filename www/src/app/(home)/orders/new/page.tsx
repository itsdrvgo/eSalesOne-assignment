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
import { Skeleton } from "@/components/ui/skeleton";
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
            <Suspense fallback={<OrdersNewSkeleton />}>
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

function OrdersNewSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            {/* Form Section Skeleton */}
            <div className="space-y-8 lg:col-span-2">
                {/* Contact Information Skeleton */}
                <div className="space-y-4">
                    <Skeleton className="h-6 w-1/3" /> {/* Section Title */}
                    <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <Skeleton className="mb-1 h-4 w-1/4" />{" "}
                            {/* Label */}
                            <Skeleton className="h-10 w-full" /> {/* Input */}
                        </div>
                        <div className="sm:col-span-3">
                            <Skeleton className="mb-1 h-4 w-1/4" />{" "}
                            {/* Label */}
                            <Skeleton className="h-10 w-full" /> {/* Input */}
                        </div>
                        <div className="sm:col-span-3">
                            <Skeleton className="mb-1 h-4 w-1/4" />{" "}
                            {/* Label */}
                            <Skeleton className="h-10 w-full" /> {/* Input */}
                        </div>
                    </div>
                </div>
                <Skeleton className="h-px w-full" /> {/* Separator */}
                {/* Shipping Address Skeleton */}
                <div className="space-y-4">
                    <Skeleton className="h-6 w-1/3" /> {/* Section Title */}
                    <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <Skeleton className="mb-1 h-4 w-1/4" />{" "}
                            {/* Label */}
                            <Skeleton className="h-10 w-full" /> {/* Input */}
                        </div>
                        <div className="sm:col-span-2">
                            <Skeleton className="mb-1 h-4 w-1/4" />{" "}
                            {/* Label */}
                            <Skeleton className="h-10 w-full" /> {/* Input */}
                        </div>
                        <div className="sm:col-span-2">
                            <Skeleton className="mb-1 h-4 w-1/4" />{" "}
                            {/* Label */}
                            <Skeleton className="h-10 w-full" /> {/* Input */}
                        </div>
                        <div className="sm:col-span-2">
                            <Skeleton className="mb-1 h-4 w-1/4" />{" "}
                            {/* Label */}
                            <Skeleton className="h-10 w-full" /> {/* Input */}
                        </div>
                    </div>
                </div>
                <Skeleton className="h-px w-full" /> {/* Separator */}
                {/* Payment Details Skeleton */}
                <div className="space-y-4">
                    <Skeleton className="h-6 w-1/3" /> {/* Section Title */}
                    <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <Skeleton className="mb-1 h-4 w-1/4" />{" "}
                            {/* Label */}
                            <Skeleton className="h-10 w-full" /> {/* Input */}
                        </div>
                        <div className="sm:col-span-3">
                            <Skeleton className="mb-1 h-4 w-1/4" />{" "}
                            {/* Label */}
                            <Skeleton className="h-10 w-full" /> {/* Input */}
                        </div>
                        <div className="sm:col-span-3">
                            <Skeleton className="mb-1 h-4 w-1/4" />{" "}
                            {/* Label */}
                            <Skeleton className="h-10 w-full" /> {/* Input */}
                        </div>
                    </div>
                </div>
                <Skeleton className="h-px w-full" /> {/* Separator */}
                {/* Mock Transaction Status Skeleton */}
                <div className="space-y-4">
                    <Skeleton className="h-6 w-1/2" /> {/* Section Title */}
                    <Skeleton className="mb-1 h-4 w-3/4" /> {/* Label */}
                    <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
                        <Skeleton className="h-10 w-24" /> {/* Radio Option */}
                        <Skeleton className="h-10 w-24" /> {/* Radio Option */}
                        <Skeleton className="h-10 w-24" /> {/* Radio Option */}
                    </div>
                </div>
            </div>

            {/* Order Summary Skeleton */}
            <div className="lg:col-span-1">
                <div className="sticky top-8 rounded-lg border bg-card p-6 shadow-sm">
                    <Skeleton className="h-6 w-1/2" /> {/* Summary Title */}
                    <div className="mt-6 space-y-4">
                        {/* Product Item */}
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-4 w-2/3" />
                        </div>

                        {/* Variant Info */}
                        <div className="flex items-center justify-between border-t pt-4">
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-4 w-1/3" />
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center justify-between border-t pt-4">
                            <Skeleton className="h-4 w-1/5" />
                            <div className="flex items-center">
                                <Skeleton className="h-8 w-8" />
                                <Skeleton className="mx-2 h-8 w-16" />
                                <Skeleton className="h-8 w-8" />
                            </div>
                        </div>

                        {/* Subtotal */}
                        <div className="flex items-center justify-between border-t pt-4">
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-4 w-1/3" />
                        </div>

                        {/* Order Total */}
                        <div className="flex items-center justify-between border-t pt-4">
                            <Skeleton className="h-5 w-1/3" />
                            <Skeleton className="h-5 w-1/2" />
                        </div>
                    </div>
                    <div className="mt-6">
                        <Skeleton className="h-12 w-full" /> {/* Button */}
                    </div>
                </div>
            </div>
        </div>
    );
}
