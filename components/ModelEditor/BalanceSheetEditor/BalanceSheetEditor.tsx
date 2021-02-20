import React from "react";
import { Model } from "../../../client";
import { BalanceSheetItemComponent } from "./BalanceSheetItemComponent";

interface BalanceSheetEditorProps {
    model: Model
    onChange: (newModel: Model) => void
}

export function BalanceSheetEditor({ model, onChange }: BalanceSheetEditorProps) {

    const { balanceSheetItems } = model

    return (
        <section className="flex flex-col space-y-12">
            {
                balanceSheetItems.map(item =>
                    <BalanceSheetItemComponent
                        model={model}
                        onChange={onChange}
                        item={item}
                    />
                )
            }
        </section>
    )
}
