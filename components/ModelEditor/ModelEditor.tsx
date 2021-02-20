import React, { useEffect, useState } from 'react';
import { DriverTypeEnum, Item, Model, ModelBuilderControllerApi } from '../../client';
import { Revenue, CostOfGoodsSold, GrossProfit, OperatingExpense, OperatingIncome, NonOperatingExpense, InterestExpense, TaxExpense, NetIncome } from '../../constants/ReservedItemNames';
import { Billboard } from './Billboard';
import { ItemComponent } from './ItemComponent';
import { Section } from './Section';
import { Subtotal } from './Subtotal';

const api = new ModelBuilderControllerApi()

export function ModelEditor() {

    const [model, setModel] = useState<Model | undefined>()

    useEffect(() => {
        api.createModel().then(({ data }) => setModel(data))
    }, []) // load model from backend

    const items = model?.incomeStatementItems ?? [];

    async function updateModel(newModel: Model) {
        setModel(newModel)
        // reformulate the model via the back-end
        const { data: reformulatedModel } = await new ModelBuilderControllerApi().reformulateModel(newModel)
        setModel(reformulatedModel)
    }

    // Model item partitioning
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
    // End of model item partitioning

    if (model === undefined) {
        return null
    }

    return (
        <div className="text-blueGray-100 text-lg container mx-auto pt-24 pb-96 lg:flex">
            <section className="flex flex-col space-y-12">
                <Section items={revenueItems} subtotal={revenueSubtotal} onChange={updateModel} model={model} />
                <Section items={cogsItems} subtotal={cogsSubtotal} onChange={updateModel} model={model} />
                <Subtotal subtotal={grossProfitSubtotal} />
                <Section items={operatingExpensesItems} subtotal={operatingExpensesSubtotal} onChange={updateModel} model={model} />
                <Subtotal subtotal={operatingIncomeSubtotal} />
                <Section items={nonOperatingExpensesItems} subtotal={nonOperatingExpensesSubtotal} onChange={updateModel} model={model} />
                <div>
                    <ItemComponent item={interestExpenseSubtotal} onChange={updateModel} model={model} />
                    <ItemComponent item={taxExpenseSubtotal} onChange={updateModel} model={model} />
                </div>
                <Subtotal subtotal={netIncomeSubtotal} />
            </section>
            <Billboard />
        </div>
    )
}
