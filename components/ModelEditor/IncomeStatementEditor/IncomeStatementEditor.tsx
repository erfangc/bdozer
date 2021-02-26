import React from "react";
import { Item, Model } from "../../../client";
import { CostOfGoodsSold, GrossProfit, InterestExpense, NetIncome, NonOperatingExpense, OperatingExpense, OperatingIncome, Revenue, TaxExpense } from "../../../constants/ReservedItemNames";
import { IncomeStatementItemComponent } from "./IncomeStatementItemComponent";
import { IncomeStatementSection } from "./Section";
import { Subtotal } from "./Subtotal";

interface IncomeStatementEditorProps {
    model: Model
    onChange: (newModel: Model) => void
}

export function IncomeStatementEditor({ model, onChange }: IncomeStatementEditorProps) {

    const items = model.incomeStatementItems ?? [];

    // ------------------------------
    //  Model item partitioning
    // ------------------------------

    const revenueIdx = items.findIndex(it => it.name === Revenue)
    const revenueSubtotal = items[revenueIdx]
    const revenueItems: Item[] = items.slice(0, revenueIdx)

    const cogsIdx = items.findIndex(it => it.name === CostOfGoodsSold)
    const cogsSubtotal = items[cogsIdx]
    const cogsItems: Item[] = items.slice(revenueIdx + 1, cogsIdx)

    const grossProfitIdx = items.findIndex(it => it.name === GrossProfit)
    const grossProfitSubtotal = items[grossProfitIdx]

    const operatingExpensesIdx = items.findIndex(it => it.name === OperatingExpense)
    const operatingExpensesSubtotal = items[operatingExpensesIdx]
    const operatingExpensesItems: Item[] = items.slice(grossProfitIdx + 1, operatingExpensesIdx)

    const operatingIncomeIdx = items.findIndex(it => it.name === OperatingIncome)
    const operatingIncomeSubtotal = items[operatingIncomeIdx]

    const nonOperatingExpensesIdx = items.findIndex(it => it.name === NonOperatingExpense)
    const nonOperatingExpensesSubtotal = items[nonOperatingExpensesIdx]
    const nonOperatingExpensesItems: Item[] = items.slice(operatingIncomeIdx + 1, nonOperatingExpensesIdx)

    const interestExpenseIdx = items.findIndex(it => it.name === InterestExpense)
    const interestExpenseSubtotal = items[interestExpenseIdx]

    const taxExpenseIdx = items.findIndex(it => it.name === TaxExpense)
    const taxExpenseSubtotal = items[taxExpenseIdx]

    const netIncomeIdx = items.findIndex(it => it.name === NetIncome)
    const netIncomeSubtotal = items[netIncomeIdx]

    // ------------------------------
    //  End of model item partitioning
    // ------------------------------
    const editorComponent = (
        <section className="flex flex-col space-y-12">
            <div className="flex-col space-y-4">
                <div className="flex justify-end"><p className="font-light text-sm mr-10">FY0 Historical Value</p></div>
                <IncomeStatementSection items={revenueItems} subtotal={revenueSubtotal} onChange={onChange} model={model} />
            </div>
            <IncomeStatementSection items={cogsItems} subtotal={cogsSubtotal} onChange={onChange} model={model} />
            <Subtotal subtotal={grossProfitSubtotal} />
            <IncomeStatementSection items={operatingExpensesItems} subtotal={operatingExpensesSubtotal} onChange={onChange} model={model} />
            <Subtotal subtotal={operatingIncomeSubtotal} />
            <IncomeStatementSection items={nonOperatingExpensesItems} subtotal={nonOperatingExpensesSubtotal} onChange={onChange} model={model} />
            <div>
                <IncomeStatementItemComponent
                    item={interestExpenseSubtotal}
                    onChange={onChange}
                    model={model}
                />
                <IncomeStatementItemComponent
                    item={taxExpenseSubtotal}
                    onChange={onChange}
                    model={model}
                />
            </div>
            <Subtotal subtotal={netIncomeSubtotal} />
        </section>
    )

    return editorComponent
}
