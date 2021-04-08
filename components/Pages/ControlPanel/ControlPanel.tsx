import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useFilingEntityManagerUnsecured, useStockAnalysisCrud } from '../../../api-hooks'
import { FilingEntity, StockAnalysis2 } from '../../../client'
import { SubTitle, Title } from '../../Common/Title'
import Editor from './Editor'
import { FilingEntityCard } from './FilingEntityCard'
import StockAnalysisSummary from './StockAnalysisSummary'
import Toolbar from './Toolbar/Toolbar'

export const Completed = "Completed"
export const Bootstrapping = "Bootstrapping"
export const Created = "Created"

export function ControlPanel() {

    const router = useRouter()
    const [filingEntity, setFilingEntity] = useState<FilingEntity>()
    const [loading, setLoading] = useState(false)
    const filingEntityManagerUnsecured = useFilingEntityManagerUnsecured()
    const stockAnalysisCrud = useStockAnalysisCrud()
    const [stockAnalysis, setStockAnalysis] = useState<StockAnalysis2>()
    const { id } = router.query

    async function init() {
        try {
            const { data: stockAnalysis } = await stockAnalysisCrud.getStockAnalysis(id as string)
            const { data: filingEntity } = await filingEntityManagerUnsecured.getFilingEntity(stockAnalysis.cik)
            setFilingEntity(filingEntity)
            setStockAnalysis(stockAnalysis)
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if (id) {
            init()
        }
    }, [id])

    const statusMessage = filingEntity?.statusMessage

    return (
        <main className="container mx-auto px-4 py-20 space-y-12">
            <section className="flex flex-col space-y-6">
                <Title>Summary</Title>
                <FilingEntityCard filingEntity={filingEntity} />
                <StockAnalysisSummary stockAnalysis={stockAnalysis} loading={loading} />
            </section>
            <section className="flex flex-col space-y-6">
                <SubTitle>Inputs</SubTitle>
                <Toolbar
                    stockAnalysis={stockAnalysis}
                    setStockAnalysis={setStockAnalysis}
                    loading={loading}
                    setLoading={setLoading}
                />
                <Editor
                    filingEntity={filingEntity}
                    stockAnalysis={stockAnalysis}
                    onFilingEntityUpdate={setFilingEntity}
                    onStockAnalysisUpdate={setStockAnalysis}
                />
            </section>
        </main >
    )
}
