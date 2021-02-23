import React from "react";
import { Model } from "../../../client";
import { CurrentAsset, CurrentLiability, LongTermAsset, LongTermLiability, ShareholdersEquity, TotalAsset, TotalLiability } from "../../../constants/ReservedItemNames";
import { Subtotal } from "../IncomeStatementEditor/Subtotal";
import { BalanceSheetSection } from "./BalanceSheetSection";

interface BalanceSheetEditorProps {
    model: Model
    onChange: (newModel: Model) => void
}

export function BalanceSheetEditor({ model, onChange }: BalanceSheetEditorProps) {

    const { balanceSheetItems: items } = model
    // ------------------------------
    //  Model item partitioning
    // ------------------------------
    const caIdx = items.findIndex(it => it.name === CurrentAsset)
    const caItems = items.slice(0, caIdx)
    const caSubtotal = items[caIdx]

    const ltaIdx = items.findIndex(it => it.name === LongTermAsset)
    const ltaItems = items.slice(caIdx + 1, ltaIdx)
    const ltaSubtotal = items[ltaIdx]

    const totalAssetIdx = items.findIndex(it => it.name === TotalAsset)
    const totalAssetSubtotal = items[totalAssetIdx]

    const clIdx = items.findIndex(it => it.name === CurrentLiability)
    const clItems = items.slice(totalAssetIdx + 1, clIdx)
    const clSubtotal = items[clIdx]

    const ltlIdx = items.findIndex(it => it.name === LongTermLiability)
    const ltlItems = items.slice(clIdx + 1, ltlIdx)
    const ltlSubtotal = items[ltlIdx]

    const totalLiabilityIdx = items.findIndex(it => it.name === TotalLiability)
    const totalLiabilitySubtotal = items[totalLiabilityIdx]

    const equityIdx = items.findIndex(it => it.name === ShareholdersEquity)
    const equitySubtotal = items[equityIdx]
    // ------------------------------
    //  End of model item partitioning
    // ------------------------------

    return (
        <section className="flex flex-col space-y-12">
            <div className="flex-col space-y-4">
                <div className="flex justify-end"><p className="font-light text-sm mr-10">FY0 Historical Value</p></div>
                <BalanceSheetSection items={caItems} subtotal={caSubtotal} onChange={onChange} model={model} />
            </div>
            <BalanceSheetSection items={ltaItems} subtotal={ltaSubtotal} onChange={onChange} model={model} />
            <Subtotal subtotal={totalAssetSubtotal} />
            <BalanceSheetSection items={clItems} subtotal={clSubtotal} onChange={onChange} model={model} />
            <BalanceSheetSection items={ltlItems} subtotal={ltlSubtotal} onChange={onChange} model={model} />
            <Subtotal subtotal={totalLiabilitySubtotal} />
            <Subtotal subtotal={equitySubtotal} />
        </section>
    )
}
