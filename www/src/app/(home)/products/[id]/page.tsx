import { GeneralShell } from "@/components/globals/layouts";
import { ProductPage } from "@/components/home";
import { Icons } from "@/components/icons";
import {
    EmptyPlaceholder,
    EmptyPlaceholderContent,
    EmptyPlaceholderDescription,
    EmptyPlaceholderHeader,
    EmptyPlaceholderIcon,
    EmptyPlaceholderTitle,
} from "@/components/ui/empty-placeholder";
import { Skeleton } from "@/components/ui/skeleton";
import { DEFAULT_MESSAGES } from "@/config/const";
import { queries } from "@/lib/queries";
import { Suspense } from "react";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function Page(props: PageProps) {
    return (
        <GeneralShell>
            <Suspense fallback={<ProductPageSkeleton />}>
                <ProductsFetch {...props} />
            </Suspense>
        </GeneralShell>
    );
}

async function ProductsFetch({ params }: PageProps) {
    const { id } = await params;

    try {
        const data = await queries.product.get(id);
        return <ProductPage initialData={data} />;
    } catch (err) {
        const message =
            err instanceof Error
                ? err.message
                : DEFAULT_MESSAGES.ERRORS.PRODUCTS_FETCH_FAILED;

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

function ProductPageSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid items-start gap-8 md:grid-cols-2 lg:gap-12">
                {/* Image Skeleton */}
                <div className="relative aspect-square overflow-hidden rounded-lg border">
                    <Skeleton className="size-full" />
                </div>

                {/* Product Details Skeleton */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Skeleton className="h-10 w-3/4" /> {/* Title */}
                        <Skeleton className="h-8 w-1/4" /> {/* Price */}
                    </div>
                    <div className="space-y-4">
                        <Skeleton className="h-6 w-1/3" />{" "}
                        {/* Description Title */}
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                    {/* Variants Skeleton (Simplified) */}
                    <Skeleton className="h-px w-full" /> {/* Separator */}
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-1/4" /> {/* Variant Label */}
                        <div className="flex flex-wrap gap-2">
                            <Skeleton className="h-10 w-16 rounded-md" />
                            <Skeleton className="h-10 w-16 rounded-md" />
                            <Skeleton className="h-10 w-16 rounded-md" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-1/4" /> {/* Variant Label */}
                        <div className="flex flex-wrap gap-2">
                            <Skeleton className="h-10 w-12 rounded-md" />
                            <Skeleton className="h-10 w-12 rounded-md" />
                        </div>
                    </div>
                    <Skeleton className="h-px w-full" /> {/* Separator */}
                    {/* Buy Button Skeleton */}
                    <div>
                        <Skeleton className="h-12 w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
