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
import { DEFAULT_MESSAGES } from "@/config/const";
import { queries } from "@/lib/queries";
import { Suspense } from "react";

interface PageProps {
    params: Promise<{ id: string }>;
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
