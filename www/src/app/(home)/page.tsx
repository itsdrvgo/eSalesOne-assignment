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
            <Suspense>
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
