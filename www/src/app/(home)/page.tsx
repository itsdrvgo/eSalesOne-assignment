import { GeneralShell } from "@/components/globals/layouts";
import { ProductsPage } from "@/components/home";
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
import {
    DEFAULT_MESSAGES,
    DEFAULT_PAGINATION_LIMIT,
    DEFAULT_PAGINATION_PAGE,
} from "@/config/const";
import { queries } from "@/lib/queries";
import { Suspense } from "react";

interface PageProps {
    searchParams: Promise<{
        page?: string;
        limit?: string;
    }>;
}

export default function Page(props: PageProps) {
    return (
        <GeneralShell>
            <Suspense fallback={<ProductsSkeleton />}>
                <ProductsFetch {...props} />
            </Suspense>
        </GeneralShell>
    );
}

async function ProductsFetch({ searchParams }: PageProps) {
    const { page: pageRaw, limit: limitRaw } = await searchParams;

    const page = pageRaw ? parseInt(pageRaw, 10) : DEFAULT_PAGINATION_PAGE;
    const limit = limitRaw ? parseInt(limitRaw, 10) : DEFAULT_PAGINATION_LIMIT;

    try {
        const data = await queries.product.paginate({ page, limit });
        return <ProductsPage initialData={data} />;
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

function ProductsSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 16 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
}

function ProductCardSkeleton() {
    return (
        <div className="block overflow-hidden rounded-lg border bg-card shadow-sm">
            <Skeleton className="h-48 w-full" />
            <div className="p-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="mt-1 h-4 w-full" />
                <div className="mt-3 flex items-center justify-between">
                    <Skeleton className="h-8 w-1/4" />
                    <Skeleton className="h-9 w-20" />
                </div>
            </div>
        </div>
    );
}
