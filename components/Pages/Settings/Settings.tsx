import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useFilingEntityManager, useFilingEntityManagerUnsecured, useStockAnalysisCrud, useStockAnalysisWorkflow } from '../../../api-hooks'
import { FilingEntity, StockAnalysis2 } from '../../../client'
import { DeleteButton } from '../../Common/DeleteButton'
import { PrimaryButton } from '../../Common/PrimaryButton'
import { SecondaryButton } from '../../Common/SecondaryButton'
import { Title } from '../../Common/Title'
import Editor from './Editor'
import { FilingEntityCard } from './FilingEntityCard'
import StockAnalysisSummary from './StockAnalysisSummary'

export const Completed = "Completed"
export const Bootstrapping = "Bootstrapping"
export const Created = "Created"

export function Settings() {

    const router = useRouter()
    const [filingEntity, setFilingEntity] = useState<FilingEntity>()
    const [loading, setLoading] = useState(false)
    const filingEntityManagerUnsecured = useFilingEntityManagerUnsecured()
    const filingEntityManager = useFilingEntityManager()

    const stockAnalysisCrud = useStockAnalysisCrud()
    const stockAnalysisWorkflow = useStockAnalysisWorkflow()

    const [stockAnalysis, setStockAnalysis] = useState<StockAnalysis2>()

    const { cik } = router.query

    async function init() {
        try {
            const resp = await filingEntityManagerUnsecured.getFilingEntity(cik as string)
            setFilingEntity(resp.data)
            const { data: stockAnalyses } = await stockAnalysisCrud.find()
            if (stockAnalyses.length === 0) {
                const { data } = await stockAnalysisWorkflow.create(cik as string)
                await stockAnalysisCrud.save(data)
                setStockAnalysis(data)
            } else {
                setStockAnalysis(stockAnalyses[0])
            }
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
        } catch (e) {
            console.error(e);
        }
        setLoading(false)
    }

    async function bootstrap() {
        setLoading(true)
        try {
            await filingEntityManager.bootstrapFilingEntity(cik as string)
            const resp = await filingEntityManagerUnsecured.getFilingEntity(cik as string)
            setFilingEntity(resp.data)
        } catch (e) {
            console.error(e);
        }
        setLoading(false)
    }

    async function saveStockAnalysis() {
        setLoading(true)
        try {
            await stockAnalysisCrud.save(stockAnalysis)
        } catch (e) {
            console.error(e);
        }
        setLoading(false)
    }

    const statusMessage = filingEntity?.statusMessage

    return (
        <main className="flex-grow flex flex-col space-y-12 min-h-screen p-3 xl:p-10 lg:p-8 pb-20">
            <Title>Model Control Panel</Title>
            <section className="flex flex-col space-y-6">
                <FilingEntityCard filingEntity={filingEntity} />
                <StockAnalysisSummary stockAnalysis={stockAnalysis} loading={loading} />
            </section>
            <section className="flex flex-col space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-6">
                    {
                        statusMessage !== Completed
                            ? null
                            :
                            <>
                                <PrimaryButton onClick={runStockAnalysis} disabled={loading} className="py-2">
                                    {loading ? 'Loading ...' : 'Run Analysis'}
                                </PrimaryButton>
                                <SecondaryButton onClick={saveStockAnalysis} className="py-2">
                                    {loading ? '-' : 'Save'}
                                </SecondaryButton>
                            </>
                    }
                    <DeleteButton onClick={bootstrap} disabled={loading} className="py-2">
                        {loading ? '-' : statusMessage !== Completed ? 'Bootstrap Facts' : 'Reboostrap Facts'}
                    </DeleteButton>
                </div>
                <Editor
                    filingEntity={filingEntity}
                    stockAnalysis={stockAnalysis}
                    onFilingEntityUpdate={setFilingEntity}
                />
            </section>
        </main >
    )
}
