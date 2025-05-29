"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
    EmptyPlaceholder,
    EmptyPlaceholderContent,
    EmptyPlaceholderDescription,
    EmptyPlaceholderHeader,
    EmptyPlaceholderIcon,
    EmptyPlaceholderTitle,
} from "@/components/ui/empty-placeholder";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DEFAULT_MESSAGES } from "@/config/const";
import { useProducts } from "@/lib/react-query";
import { cn, convertCentToDollar, formatPriceTag } from "@/lib/utils";
import { Product } from "@/lib/validations";
import Image from "next/image";
import Link from "next/link";
import { parseAsString, useQueryState } from "nuqs";
import { toast } from "sonner";
import { Separator } from "../ui/separator";

interface ProductPageProps extends GenericProps {
    initialData: Product;
}

export function ProductPage({
    className,
    initialData,
    ...props
}: ProductPageProps) {
    const [size, setSize] = useQueryState(
        "size",
        parseAsString.withDefault("")
    );
    const [color, setColor] = useQueryState(
        "color",
        parseAsString.withDefault("")
    );

    const { useGet } = useProducts();
    const { data: product, error } = useGet({
        id: initialData.id,
        initialData,
    });

    if (error)
        return (
            <div className="flex justify-center py-8">
                <EmptyPlaceholder>
                    <EmptyPlaceholderIcon>
                        <Icons.AlertTriangle />
                    </EmptyPlaceholderIcon>

                    <EmptyPlaceholderContent>
                        <EmptyPlaceholderHeader>
                            <EmptyPlaceholderTitle>
                                Failed to fetch product
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

    if (!product) return null;

    const handleBuy = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (product.stock <= 0) return e.preventDefault();

        const hasColorVariants = product.variants?.color?.length > 0;
        const hasSizeVariants = product.variants?.size?.length > 0;
        const hasAnyVariants = hasColorVariants || hasSizeVariants;

        let variantsAreSelected = true;

        if (hasAnyVariants) {
            if (hasColorVariants && !color) variantsAreSelected = false;
            if (hasSizeVariants && !size) variantsAreSelected = false;
        }

        if (!variantsAreSelected) {
            e.preventDefault();
            toast.error(
                "Please select all available variant options before proceeding."
            );
            return;
        }
    };

    console.log(
        Object.values(product.variants)
            .map((x) => x.length)
            .reduce((a, b) => a + b, 0)
    );

    return (
        <div
            className={cn("container mx-auto px-4 py-8", className)}
            {...props}
        >
            <div className="grid items-start gap-8 md:grid-cols-2 lg:gap-12">
                <div className="relative aspect-square overflow-hidden rounded-lg border">
                    <Image
                        src={product.image}
                        alt={product.title}
                        height={500}
                        width={500}
                        className="size-full object-cover"
                        priority
                    />
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            {product.title}
                        </h1>

                        <p className="text-xl text-muted-foreground">
                            {formatPriceTag(
                                convertCentToDollar(product.price),
                                true
                            )}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">Description</h2>
                        <p className="text-muted-foreground">
                            {product.description}
                        </p>
                    </div>

                    {Object.values(product.variants)
                        .map((x) => x.length)
                        .reduce((a, b) => a + b, 0) > 0 && <Separator />}

                    {product.variants?.color?.length > 0 && (
                        <div className="space-y-2">
                            <Label
                                htmlFor="color-group"
                                className="text-lg font-semibold"
                            >
                                Color
                            </Label>

                            <RadioGroup
                                id="color-group"
                                value={color}
                                onValueChange={setColor}
                                className="flex flex-wrap gap-2"
                            >
                                {product.variants.color.map((c) => (
                                    <Label
                                        key={c}
                                        htmlFor={`color-${c}`}
                                        className={cn(
                                            "cursor-pointer rounded-md border px-3 py-2 text-sm hover:bg-accent",
                                            color === c &&
                                                "bg-accent ring-2 ring-primary"
                                        )}
                                    >
                                        <RadioGroupItem
                                            value={c}
                                            id={`color-${c}`}
                                            className="sr-only"
                                        />
                                        {c}
                                    </Label>
                                ))}
                            </RadioGroup>
                        </div>
                    )}

                    {product.variants?.size?.length > 0 && (
                        <div className="space-y-2">
                            <Label
                                htmlFor="size-group"
                                className="text-lg font-semibold"
                            >
                                Size
                            </Label>
                            <RadioGroup
                                id="size-group"
                                value={size}
                                onValueChange={setSize}
                                className="flex flex-wrap gap-2"
                            >
                                {product.variants.size.map((s) => (
                                    <Label
                                        key={s}
                                        htmlFor={`size-${s}`}
                                        className={cn(
                                            "cursor-pointer rounded-md border px-3 py-2 text-sm hover:bg-accent",
                                            size === s &&
                                                "bg-accent ring-2 ring-primary"
                                        )}
                                    >
                                        <RadioGroupItem
                                            value={s}
                                            id={`size-${s}`}
                                            className="sr-only"
                                        />
                                        {s}
                                    </Label>
                                ))}
                            </RadioGroup>
                        </div>
                    )}

                    <Separator />

                    <div>
                        <Button
                            asChild
                            size="lg"
                            className="w-full"
                            disabled={product.stock <= 0}
                        >
                            <Link
                                href={`/orders/new?productId=${product.id}&size=${size}&color=${color}&quantity=1`}
                                onClick={handleBuy}
                                className={cn(
                                    product.stock === 0 &&
                                        "cursor-not-allowed opacity-50"
                                )}
                            >
                                {product.stock > 0 ? "Buy Now" : "Out of Stock"}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
