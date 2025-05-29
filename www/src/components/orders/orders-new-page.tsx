"use client";

import { DevJsonCheckoutFiller } from "@/components/dev";
import { useOrder } from "@/lib/react-query";
import { convertCentToDollar, formatPriceTag } from "@/lib/utils";
import {
    CheckoutFormData,
    checkoutFormSchema,
    Order,
    Product,
} from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    parseAsInteger,
    parseAsString,
    parseAsStringLiteral,
    useQueryState,
} from "nuqs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";

interface PageProps {
    product: Product;
}

export function OrdersNewPage({ product }: PageProps) {
    const [quantity, setQuantity] = useQueryState(
        "quantity",
        parseAsInteger.withDefault(1)
    );

    const defaultSize = product.variants?.size?.[0] || "";
    const defaultColor = product.variants?.color?.[0] || "";

    const [size] = useQueryState(
        "size",
        parseAsString.withDefault(defaultSize)
    );
    const [color] = useQueryState(
        "color",
        parseAsString.withDefault(defaultColor)
    );

    const [status, setStatus] = useQueryState<Order["status"]>(
        "status",
        parseAsStringLiteral(["approved", "declined", "error"]).withDefault(
            "approved"
        )
    );

    const form = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            productId: product.id,
            quantity,
            variant: { size: size || "", color: color || "" },
            status,
            customerFullName: "",
            customerEmail: "",
            customerPhone: "",
            customerAddress: "",
            customerCity: "",
            customerState: "",
            customerZip: "",
            cardNumber: "",
            expiryDate: "",
            cvv: "",
            totalAmount: product.price * quantity,
        },
    });

    useEffect(() => {
        form.setValue("quantity", quantity);
        form.setValue("variant", { size: size || "", color: color || "" });
        form.setValue("status", status);
    }, [quantity, size, color, status, form]);

    const { useCreate } = useOrder();
    const { mutate: createOrder, isPending: isCreating } = useCreate();

    const onSubmit = (values: CheckoutFormData) => {
        const totalAmount = product.price * values.quantity;
        createOrder({ ...values, totalAmount });
    };

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1 && newQuantity <= product.stock) {
            setQuantity(newQuantity);
            form.setValue("quantity", newQuantity, {
                shouldValidate: true,
                shouldDirty: true,
            });
            form.setValue("totalAmount", product.price * newQuantity, {
                shouldValidate: true,
                shouldDirty: true,
            });
        }
    };

    const currentSubtotal = (product.price || 0) * quantity;
    const currentTotal = currentSubtotal;

    const defaultDevJson: Partial<CheckoutFormData> = {
        customerFullName: "Dev User",
        customerEmail: "dev@example.com",
        customerPhone: "9007163763",
        customerAddress: "123 Dev Lane",
        customerCity: "Devtown",
        customerState: "DV",
        customerZip: "90211",
        cardNumber: "1111222233334444",
        expiryDate: "12/27",
        cvv: "123",
        status: "approved",
    };

    return (
        <Form {...form}>
            {/* {process.env.NODE_ENV === "development" && ( */}
            <DevJsonCheckoutFiller form={form} defaultJson={defaultDevJson} />
            {/* )} */}

            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3"
            >
                <div className="space-y-8 lg:col-span-2">
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">
                            Contact Information
                        </h2>

                        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                            <FormField
                                control={form.control}
                                name="customerFullName"
                                render={({ field }) => (
                                    <FormItem className="sm:col-span-3">
                                        <FormLabel>Full Name</FormLabel>

                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="John Doe"
                                                disabled={isCreating}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="customerEmail"
                                render={({ field }) => (
                                    <FormItem className="sm:col-span-3">
                                        <FormLabel>Email address</FormLabel>

                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="you@example.com"
                                                disabled={isCreating}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="customerPhone"
                                render={({ field }) => (
                                    <FormItem className="sm:col-span-3">
                                        <FormLabel>Phone Number</FormLabel>

                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="tel"
                                                placeholder="(555) 123-4567"
                                                disabled={isCreating}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">
                            Shipping Address
                        </h2>

                        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                            <FormField
                                control={form.control}
                                name="customerAddress"
                                render={({ field }) => (
                                    <FormItem className="sm:col-span-6">
                                        <FormLabel>Address</FormLabel>

                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="123 Main St"
                                                disabled={isCreating}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="customerCity"
                                render={({ field }) => (
                                    <FormItem className="sm:col-span-2">
                                        <FormLabel>City</FormLabel>

                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Anytown"
                                                disabled={isCreating}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="customerState"
                                render={({ field }) => (
                                    <FormItem className="sm:col-span-2">
                                        <FormLabel>State / Province</FormLabel>

                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="CA"
                                                disabled={isCreating}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="customerZip"
                                render={({ field }) => (
                                    <FormItem className="sm:col-span-2">
                                        <FormLabel>ZIP / Postal code</FormLabel>

                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="90210"
                                                disabled={isCreating}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">
                            Payment Details
                        </h2>

                        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                            <FormField
                                control={form.control}
                                name="cardNumber"
                                render={({ field }) => (
                                    <FormItem className="sm:col-span-6">
                                        <FormLabel>Card Number</FormLabel>

                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="0000 0000 0000 0000"
                                                disabled={isCreating}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="expiryDate"
                                render={({ field }) => (
                                    <FormItem className="sm:col-span-3">
                                        <FormLabel>
                                            Expiry Date (MM/YY)
                                        </FormLabel>

                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="MM/YY"
                                                disabled={isCreating}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="cvv"
                                render={({ field }) => (
                                    <FormItem className="sm:col-span-3">
                                        <FormLabel>CVV</FormLabel>

                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="123"
                                                disabled={isCreating}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">
                            Mock Transaction Status
                        </h2>

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>
                                        Select mock status for this order:
                                    </FormLabel>

                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={(value) => {
                                                field.onChange(
                                                    value as Order["status"]
                                                );
                                                setStatus(
                                                    value as Order["status"]
                                                );
                                            }}
                                            value={field.value}
                                            disabled={isCreating}
                                            className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4"
                                        >
                                            <FormItem className="flex items-center space-y-0 space-x-2">
                                                <FormControl>
                                                    <RadioGroupItem value="approved" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Approved
                                                </FormLabel>
                                            </FormItem>

                                            <FormItem className="flex items-center space-y-0 space-x-2">
                                                <FormControl>
                                                    <RadioGroupItem value="declined" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Declined
                                                </FormLabel>
                                            </FormItem>

                                            <FormItem className="flex items-center space-y-0 space-x-2">
                                                <FormControl>
                                                    <RadioGroupItem value="error" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Gateway Error
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-8 rounded-lg border bg-card p-6 shadow-sm">
                        <h2 className="text-lg font-medium">Order summary</h2>

                        <dl className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <dt className="text-sm">{product.title}</dt>
                            </div>

                            {(size || color) && (
                                <div className="flex items-center justify-between border-t pt-4">
                                    <dt className="flex items-center text-sm">
                                        <span>Variant</span>
                                    </dt>

                                    <dd className="text-sm font-medium">
                                        {color && <span>Color: {color}</span>}
                                        {color && size && (
                                            <span className="mx-1">/</span>
                                        )}
                                        {size && <span>Size: {size}</span>}
                                    </dd>
                                </div>
                            )}

                            <div className="flex items-center justify-between border-t pt-4">
                                <dt className="text-sm">Quantity</dt>

                                <dd className="flex items-center">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() =>
                                            handleQuantityChange(quantity - 1)
                                        }
                                        disabled={quantity <= 1 || isCreating}
                                    >
                                        -
                                    </Button>

                                    <Input
                                        type="number"
                                        className="mx-2 h-8 w-16 text-center"
                                        value={quantity}
                                        onChange={(e) => {
                                            const val = parseInt(
                                                e.target.value,
                                                10
                                            );
                                            if (!isNaN(val))
                                                handleQuantityChange(val);
                                        }}
                                        min={1}
                                        max={product.stock}
                                        disabled={isCreating}
                                    />

                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() =>
                                            handleQuantityChange(quantity + 1)
                                        }
                                        disabled={isCreating}
                                    >
                                        +
                                    </Button>
                                </dd>
                            </div>

                            <div className="flex items-center justify-between border-t pt-4">
                                <dt className="text-sm">Subtotal</dt>
                                <dd className="text-sm font-medium">
                                    {formatPriceTag(
                                        convertCentToDollar(currentSubtotal),
                                        true
                                    )}
                                </dd>
                            </div>

                            <div className="flex items-center justify-between border-t border-white/20 pt-4">
                                <dt className="text-base font-medium">
                                    Order total
                                </dt>
                                <dd className="text-base font-medium">
                                    {formatPriceTag(
                                        convertCentToDollar(currentTotal),
                                        true
                                    )}
                                </dd>
                            </div>
                        </dl>

                        <div className="mt-6">
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isCreating || !form.formState.isDirty}
                            >
                                {isCreating ? "Processing..." : "Place Order"}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    );
}
