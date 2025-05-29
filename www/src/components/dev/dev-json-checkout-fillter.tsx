"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckoutFormData } from "@/lib/validations";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface DevJsonCheckoutFillerProps {
    form: ReturnType<typeof useForm<CheckoutFormData>>;
    defaultJson?: Partial<CheckoutFormData>;
}

export function DevJsonCheckoutFiller({
    form,
    defaultJson,
}: DevJsonCheckoutFillerProps) {
    const [jsonInput, setJsonInput] = useState(() => {
        if (defaultJson) {
            try {
                return JSON.stringify(defaultJson, null, 2);
            } catch (error) {
                console.error("Error stringifying default JSON:", error);
                return "";
            }
        }
        return "";
    });

    const handleFillForm = () => {
        try {
            const parsedJson = JSON.parse(jsonInput);
            let fieldsSetCount = 0;
            for (const key in parsedJson) {
                if (Object.prototype.hasOwnProperty.call(parsedJson, key)) {
                    form.setValue(
                        key as keyof CheckoutFormData,
                        parsedJson[key],
                        {
                            shouldValidate: true,
                            shouldDirty: true,
                        }
                    );
                    fieldsSetCount++;
                }
            }
            toast.success(`${fieldsSetCount} fields filled from JSON.`);
        } catch (error) {
            console.error("Invalid JSON input:", error);
            toast.error(
                "Failed to parse JSON. Please check the console for errors."
            );
        }
    };

    return (
        <div className="my-6 rounded-lg border bg-card p-4 text-card-foreground">
            <h3 className="mb-2 text-lg font-semibold">
                Dev Tool: Fast Form Fill
            </h3>
            <p className="mb-2 text-sm text-muted-foreground">
                Paste a JSON object below to quickly fill the form fields.
                Ensure the JSON keys match the form field names.
            </p>
            <Textarea
                placeholder='Paste JSON here... e.g., { "customerFullName": "Test User", "customerEmail": "test@example.com" }'
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows={10}
                className="mb-2 bg-background text-foreground"
            />
            <Button type="button" onClick={handleFillForm} variant="outline">
                Fill Form from JSON
            </Button>
        </div>
    );
}
