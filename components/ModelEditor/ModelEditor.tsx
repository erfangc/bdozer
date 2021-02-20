import React, { useState } from 'react';
import { DriverTypeEnum, Item, Model, ModelBuilderControllerApi } from '../../client';
import { Billboard } from './Billboard';
import { ItemComponent } from './ItemComponent';
import { Section } from './Section';
import { Subtotal } from './Subtotal';

const Revenue = "Revenue"
const CostOfGoodsSold = "CostOfGoodsSold"
const GrossProfit = "GrossProfit"
const OperatingIncome = "OperatingIncome"
const OperatingExpense = "OperatingExpense"
const NonOperatingExpense = "NonOperatingExpense"
const TaxExpense = "TaxExpense"
const InterestExpense = "InterestExpense"
const NetIncome = "NetIncome"

const initialModel: Model = {
    items: [
        {
            name: "Commercial_Aircraft",
            description: "Commercial Aircraft",
            historicalValue: 150_000
        },
        {
            name: "Military_Aircraft",
            description: "Military Aircraft",
            historicalValue: 50_000,
            drivers: [
                {
                    name: 'Online_Subscription',
                    type: DriverTypeEnum.SaaSRevenue,
                    saaSRevenue: {
                        averageRevenuePerSubscription: 128,
                        initialSubscriptions: 150_000,
                        totalSubscriptionAtTerminalYear: 355_000
                    }
                },
                {
                    name: 'Some_Other_Driver',
                    type: DriverTypeEnum.Custom,
                    customDriver: {
                        formula: 'period * 12 + 2'
                    }
                }
            ]
        },
        {
            name: "Revenue",
            description: "Revenue",
            historicalValue: 100_000
        },
        {
            name: "Commercial_Aircraft_COGS",
            description: "Commercial Aircraft COGS",
            historicalValue: 50_000
        },
        {
            name: "Military_Aircraft_COGS",
            description: "Military Aircraft COGS",
            historicalValue: 50_000
        },
        {
            name: "CostOfGoodsSold",
            description: "Cost Of Goods Sold",
            historicalValue: 100_000
        },
        {
            name: "GrossProfit",
            description: "Gross Profit",
            historicalValue: 100_000
        },
        {
            name: "Research_and_Development",
            description: "Research and Development",
            historicalValue: 100_000
        },
        {
            name: "General_Administrative",
            description: "General Administrative",
            historicalValue: 100_000
        },
        {
            name: "OperatingExpense",
            description: "Operating Expenses",
            historicalValue: 100_000
        },
        {
            name: "OperatingIncome",
            description: "Operating Income",
            historicalValue: 100_000
        },
        {
            name: "Litigation",
            description: "Litigation",
            historicalValue: 100_000
        },
        {
            name: "NonOperatingExpense",
            description: "Non Operating Expenses",
            historicalValue: 100_000
        },
        {
            name: "InterestExpense",
            description: "Interest Expense",
            historicalValue: 100_000
        },
        {
            name: "TaxExpense",
            description: "Tax Expense",
            historicalValue: 100_000
        },
        {
            name: "NetIncome",
            description: "Net Income",
            historicalValue: 100_000
        },
    ],
    periods: 5
}

export function ModelEditor() {

    const [model, setModel] = useState(initialModel)
    const items = model.items ?? [];

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
