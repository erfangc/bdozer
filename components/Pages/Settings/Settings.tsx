import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useFilingEntityManager, useFilingEntityManagerUnsecured, useStockAnalyzerFactory } from '../../../api-hooks'
import { FilingEntity, StockAnalysis } from '../../../client'
import { DeleteButton } from '../../Common/DeleteButton'
import { PrimaryButton } from '../../Common/PrimaryButton'
import { SecondaryButton } from '../../Common/SecondaryButton'
import { Title } from '../../Common/Title'
import Editor from './Editor'
import { FilingEntityCard } from './FilingEntityCard'
import StockAnalysisSummary from './StockAnalysisSummary'

export function Settings() {

    const router = useRouter()
    const [filingEntity, setFilingEntity] = useState<FilingEntity>()
    const [loading, setLoading] = useState(false)
    const filingEntityManagerUnsecured = useFilingEntityManagerUnsecured()
    const filingEntityManager = useFilingEntityManager()
    const stockAnalysisFactory = useStockAnalyzerFactory()
    const [stockAnalysis, setStockAnalysis] = useState<StockAnalysis>()

    const { cik } = router.query

    async function init() {
        try {
            const resp = await filingEntityManagerUnsecured.getFilingEntity(cik as string)
            setFilingEntity(resp.data)
            const resp2 = await stockAnalysisFactory.getAnalysis(cik as string)
            setStockAnalysis(resp2.data)
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if (cik) {
            init()
        }
    }, [cik])

    async function runStockAnalysis() {
        setLoading(true)
        try {
            const { data } = await stockAnalysisFactory.analyze(filingEntity.cik, true)
            setStockAnalysis(data)
        } catch (e) {
            console.error(e);
        }
        setLoading(false)
    }

    async function bootstrap() {
        setLoading(true)
        try {
            await filingEntityManager.bootstrapFilingEntity(filingEntity.cik)
        } catch (e) {
            console.error(e);
        }
        setLoading(false)
    }

    async function saveStockAnalysis() {
        setLoading(true)
        try {
            await stockAnalysisFactory.saveAnalysis(stockAnalysis)
        } catch (e) {
            console.error(e);
        }
        setLoading(false)
    }

    return (
        <main className="flex-grow flex flex-col space-y-12 min-h-screen p-3 xl:p-10 lg:p-8 pb-20">
            <Title>Model Control Panel</Title>
            <section className="flex flex-col space-y-6">
                <FilingEntityCard filingEntity={filingEntity} />
                <StockAnalysisSummary stockAnalysis={stockAnalysis} loading={loading} />
            </section>
            <section className="flex flex-col space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-6">
                    <PrimaryButton onClick={runStockAnalysis} disabled={loading} className="py-2">
                        {loading ? 'Loading ...' : 'Run Analysis'}
                    </PrimaryButton>
                    <DeleteButton onClick={bootstrap} disabled={loading} className="py-2">
                        {loading ? '-' : 'Rebootstrap'}
                    </DeleteButton>
                    <SecondaryButton onClick={saveStockAnalysis} className="py-2">
                        {loading ? '-' : 'Save'}
                    </SecondaryButton>
                </div>
                <Editor filingEntity={filingEntity} stockAnalysis={stockAnalysis} onFilingEntityUpdate={setFilingEntity} />
            </section>
        </main >
    )
}
