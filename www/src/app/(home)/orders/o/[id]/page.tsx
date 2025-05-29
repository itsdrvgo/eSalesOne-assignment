import { GeneralShell } from "@/components/globals/layouts";
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
import { Separator } from "@/components/ui/separator";
import { queries } from "@/lib/queries";
import {
    cn,
    convertCentToDollar,
    convertValueToLabel,
    formatPriceTag,
} from "@/lib/utils";
import { Order, Product } from "@/lib/validations";
import Link from "next/link";
import { Suspense } from "react";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function Page(props: PageProps) {
    return (
        <GeneralShell>
            <Suspense>
                <OrderFetch {...props} />
            </Suspense>
        </GeneralShell>
    );
}

async function OrderFetch({ params }: PageProps) {
    const { id } = await params;

    try {
        const order = await queries.order.get(id);
        return <OrderPage order={order} />;
    } catch (err) {
        const message =
            err instanceof Error
                ? err.message
                : "Could not fetch order details";

        return (
            <div className="flex justify-center">
                <EmptyPlaceholder>
                    <EmptyPlaceholderIcon>
                        <Icons.AlertTriangle />
                    </EmptyPlaceholderIcon>

                    <EmptyPlaceholderContent>
                        <EmptyPlaceholderHeader>
                            <EmptyPlaceholderTitle>
                                Failed to fetch order
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

function OrderPage({ order }: { order: Order & { product: Product } }) {
    const getStatusClassName = (status: Order["status"]) => {
        switch (status) {
            case "approved":
                return "text-green-600";
            case "declined":
                return "text-red-600";
            case "error":
                return "text-orange-600";
            default:
                return "text-gray-700";
        }
    };

    return (
        <div className="flex justify-center py-8">
            <div className="w-full max-w-2xl rounded-lg border bg-card p-6 shadow-lg md:p-8">
                <div className="mb-6 text-center">
                    {order.status === "approved" ? (
                        <h2 className="text-2xl font-bold text-card-foreground">
                            Thank You for Your Order!
                        </h2>
                    ) : order.status === "declined" ? (
                        <h2 className="text-2xl font-bold text-red-600">
                            Order Declined
                        </h2>
                    ) : (
                        <h2 className="text-2xl font-bold text-orange-600">
                            Order Processing Error
                        </h2>
                    )}

                    <p className="text-sm text-muted-foreground">
                        Order # {order.id}
                    </p>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                            Product Information
                        </h3>
                        <div className="space-y-1 text-sm text-muted-foreground">
                            <p>
                                <strong className="text-card-foreground">
                                    Name:
                                </strong>{" "}
                                {order.product.title}
                            </p>
                            {order.variant &&
                                (order.variant.color || order.variant.size) && (
                                    <p>
                                        <strong className="text-card-foreground">
                                            Variant:
                                        </strong>
                                        {order.variant.color &&
                                            ` Color - ${order.variant.color}`}
                                        {order.variant.color &&
                                            order.variant.size &&
                                            ", "}
                                        {order.variant.size &&
                                            ` Size - ${order.variant.size}`}
                                    </p>
                                )}
                            <p>
                                <strong className="text-card-foreground">
                                    Quantity:
                                </strong>{" "}
                                {order.quantity}
                            </p>
                        </div>
                    </div>

                    <Separator />

                    <div>
                        <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                            Order Summary
                        </h3>
                        <div className="space-y-1 text-sm text-muted-foreground">
                            <p>
                                <strong className="text-card-foreground">
                                    Subtotal:
                                </strong>{" "}
                                {formatPriceTag(
                                    convertCentToDollar(order.totalAmount),
                                    true
                                )}
                            </p>
                            <p>
                                <strong className="text-card-foreground">
                                    Total:
                                </strong>{" "}
                                {formatPriceTag(
                                    convertCentToDollar(order.totalAmount),
                                    true
                                )}
                            </p>
                        </div>
                    </div>

                    <Separator />

                    <div>
                        <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                            Transaction Status
                        </h3>
                        <p
                            className={cn(
                                "text-sm font-medium",
                                getStatusClassName(order.status)
                            )}
                        >
                            {convertValueToLabel(order.status)}
                        </p>
                    </div>

                    <Separator />

                    <div>
                        <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                            Customer Information
                        </h3>
                        <div className="grid grid-cols-1 gap-x-4 gap-y-1 text-sm text-muted-foreground sm:grid-cols-2">
                            <p>
                                <strong className="text-card-foreground">
                                    Full Name:
                                </strong>{" "}
                                {order.customerFullName}
                            </p>
                            <p>
                                <strong className="text-card-foreground">
                                    Email:
                                </strong>{" "}
                                {order.customerEmail}
                            </p>
                            <p>
                                <strong className="text-card-foreground">
                                    Phone:
                                </strong>{" "}
                                {order.customerPhone}
                            </p>
                            <p className="sm:col-span-2">
                                <strong className="text-card-foreground">
                                    Address:
                                </strong>{" "}
                                {order.customerAddress}, {order.customerCity},{" "}
                                {order.customerState} {order.customerZip}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <Button asChild>
                        <Link href="/">Back to Home</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
