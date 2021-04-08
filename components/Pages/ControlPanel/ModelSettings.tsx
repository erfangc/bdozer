import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useStockAnalysisCrud } from "../../../api-hooks";
import { Model, StockAnalysis2 } from "../../../client";
import { AutoForm, Schema } from "../../AutoForms/AutoForm";
import { SecondaryButton } from "../../Common/SecondaryButton";

export function ModelSettings() {
    const router = useRouter()
    const { id } = router.query
    const stockAnalysisCrud = useStockAnalysisCrud()
    const [stockAnalysis, setStockAnalysis] = useState<StockAnalysis2>()

    async function init() {
        const { data: stockAnalysis } = await stockAnalysisCrud.getStockAnalysis(id as string)
        setStockAnalysis(stockAnalysis)
    }

    useEffect(() => {
        if (id) {
            init()
        }
    }, [id])

    async function handleSubmit(model: Model) {
        const updatedStockAnalysis: StockAnalysis2 = {
            ...stockAnalysis,
            model: { ...stockAnalysis.model, ...model }
        }
        await stockAnalysisCrud.saveStockAnalysis(updatedStockAnalysis)
        setStockAnalysis(updatedStockAnalysis)
    }

    return (
        <main className="container mx-auto py-20">
            <h1 className="text-2xl font-bold">Model Settings</h1>
            <p className="text-sm mt-2 mb-12 font-light">
                Configure settings for discount rates, beta, corporate tax rate and other common inputs into an equity valuation model
            </p>
            {stockAnalysis ? <AutoForm body={stockAnalysis.model} schema={schema} onSubmit={handleSubmit} useGrid /> : null}
            <Link href={`/control-panel/stock-analyses/${id}`}>
                <SecondaryButton className="mt-2">Back</SecondaryButton>
            </Link>
        </main>
    )
}

const schema: Schema[] = [
    {
        name: "totalRevenueConceptName",
        label: "Total Revenue Concept Name",
        type: "string"
    },
    {
        name: "epsConceptName",
        label: "EPS Concept Name",
        type: "string"
    },
    {
        name: "netIncomeConceptName",
        label: "Net Income Concept Name",
        type: "string"
    },
    {
        name: "ebitConceptName",
        label: "EBIT Concept Name",
        type: "string"
    },
    {
        name: "operatingCostConceptName",
        label: "Operating Cost ConceptName",
        type: "string"
    },
    {
        name: "sharesOutstandingConceptName",
        label: "Shares Outstanding Concept Name",
        type: "string"
    },
    {
        name: "riskFreeRate",
        type: "percent",
        label: "Risk Free Rate %"
    },
    {
        name: "equityRiskPremium",
        type: "percent",
        label: "Equity Risk Premium %"
    },
    {
        name: "terminalGrowthRate",
        type: "percent",
        label: "Terminal Growth Rate %"
    },
    {
        name: "periods",
        type: "integer",
        label: "Projection Periods"
    }
]