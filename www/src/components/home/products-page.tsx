"use client";

import { Button } from "@/components/ui/button";
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
import { useProducts } from "@/lib/react-query";
import { cn, convertCentToDollar, formatPriceTag } from "@/lib/utils";
import { Product } from "@/lib/validations";
import Image from "next/image";
import Link from "next/link";
import { parseAsInteger, useQueryState } from "nuqs";
import { Icons } from "../icons";

interface PageProps extends GenericProps {
    initialData?: { data: Product[]; items: number; pages: number };
}

export function ProductsPage({ className, initialData, ...props }: PageProps) {
    const [page, setPage] = useQueryState(
        "page",
        parseAsInteger.withDefault(DEFAULT_PAGINATION_PAGE)
    );
    const [limit] = useQueryState(
        "limit",
        parseAsInteger.withDefault(DEFAULT_PAGINATION_LIMIT)
    );

    const { usePaginate } = useProducts();
    const { data, error } = usePaginate({
        page,
        limit,
        initialData,
    });

    if (!data) return null;

    if (error)
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
                                {error.message ||
                                    DEFAULT_MESSAGES.ERRORS
                                        .PRODUCTS_FETCH_FAILED}
                            </EmptyPlaceholderDescription>
                        </EmptyPlaceholderHeader>
                    </EmptyPlaceholderContent>
                </EmptyPlaceholder>
            </div>
        );

    return (
        <>
            <div
                className={cn(
                    "grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
                    className
                )}
                {...props}
            >
                {data.data.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {data.pages > 1 && (
                <div className="mt-8 flex justify-center space-x-2">
                    <Button
                        onClick={() => setPage(page - 1)}
                        disabled={page <= 1}
                    >
                        Previous
                    </Button>
                    {[...Array(data.pages).keys()].map((p) => (
                        <Button
                            key={p + 1}
                            onClick={() => setPage(p + 1)}
                            variant={page === p + 1 ? "default" : "outline"}
                        >
                            {p + 1}
                        </Button>
                    ))}

                    <Button
                        onClick={() => setPage(page + 1)}
                        disabled={page >= data.pages}
                    >
                        Next
                    </Button>
                </div>
            )}
        </>
    );
}

function ProductCard({ product }: { product: Product }) {
    return (
        <div className="group relative block overflow-hidden rounded-lg border bg-card shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <div className="p-4">
                <h3
                    className="truncate text-lg font-semibold text-card-foreground"
                    title={product.title}
                >
                    {product.title}
                </h3>

                <p
                    className="mt-1 truncate text-sm text-muted-foreground"
                    title={product.description}
                >
                    {product.description}
                </p>

                <div className="mt-3 flex items-center justify-between">
                    <p className="text-lg font-bold text-card-foreground">
                        {formatPriceTag(
                            convertCentToDollar(product.price),
                            true
                        )}
                    </p>

                    <Button asChild size="sm">
                        <Link href={`/products/${product.id}`}>Buy Now</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
