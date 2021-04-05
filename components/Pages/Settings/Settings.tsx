import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useFilingEntityManager, useFilingEntityManagerUnsecured, useStockAnalyzerFactory } from '../../../api-hooks'
import { FilingEntity, StockAnalysis } from '../../../client'
import { Card, CardPercent } from '../../Common/Card'
import { DeleteButton } from '../../Common/DeleteButton'
import { GhostButton } from '../../Common/GhostButton'
import { PrimaryButton } from '../../Common/PrimaryButton'
import { Select } from '../../Common/Select'
import { TextInput } from '../../Common/TextInput'
import { SubTitle, Title } from '../../Common/Title'
import { FilingEntityCard } from './FilingEntityCard'

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

    async function changeModelTemplate(template: string) {
        const updatedFilingEntity: FilingEntity = {
            ...filingEntity, modelTemplate: {
                name: template, template
            }
        };
        await filingEntityManager.saveFilingEntity(updatedFilingEntity)
        setFilingEntity(updatedFilingEntity)
    }

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

    function viewModel() {
        router.push(`/${filingEntity?.cik}/narrative2`)
    }

    function viewFullModel() {
        router.push(`/settings/${filingEntity?.cik}/full-model`)
    }

    async function updateBeta(event: React.ChangeEvent<HTMLInputElement>) {
        const updatedFilingEntity: FilingEntity = {
            ...filingEntity,
            beta: parseFloat(event.currentTarget.value)
        }
        await filingEntityManager.saveFilingEntity(updatedFilingEntity)
        setFilingEntity(updatedFilingEntity)
    }

    return (
        <main className="flex-grow flex flex-col space-y-12 min-h-screen p-3 xl:p-10 lg:p-8 pb-20">
            <Title>Model Control Panel</Title>
            <section className="flex flex-col space-y-4">
                {filingEntity
                    ?
                    <FilingEntityCard filingEntity={filingEntity} />
                    : null
                }
                {
                    filingEntity
                        ?
                        <>
                            <Select
                                onChange={({ currentTarget: { value } }) => changeModelTemplate(value)}
                                value={filingEntity?.modelTemplate?.template}
                                label="Choose Model Template"
                                className="lg:w-96"
                            >
                                <option></option>
                                <option value="Recovery">Recovery</option>
                            </Select>
                            <TextInput value={filingEntity.beta} type="number" onChange={updateBeta} label="Beta" className="w-24" />
                        </>
                        : null
                }
                <div className="flex space-x-2 pt-8">
                    <PrimaryButton onClick={runStockAnalysis} className={loading ? `animate-pulse` : ``} disabled={loading}>
                        {loading ? 'Loading ...' : 'Run Stock Analysis'}
                    </PrimaryButton>
                    <DeleteButton onClick={bootstrap} className={loading ? `animate-pulse` : ``} disabled={loading}>
                        Rebootstrap
                    </DeleteButton>
                </div>
            </section>

            <section>
                {
                    stockAnalysis !== undefined
                        ?
                        <div>
                            <SubTitle className="mb-4">Model Output Preview</SubTitle>
                            <div className="space-x-2">
                                <GhostButton onClick={viewModel}>
                                    Narrative Model
                                </GhostButton>
                                <GhostButton onClick={viewFullModel}>
                                    See Full Model
                                </GhostButton>
                            </div>
                            <div className="grid grid-flow-row gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
                                <Card value={stockAnalysis.currentPrice} label={"Current Price"} running={loading} />
                                <Card value={stockAnalysis.targetPrice} label={"Target Price"} running={loading} />
                                <Card value={stockAnalysis.zeroGrowthPrice} label={"Zero Growth Price"} running={loading} />
                                <CardPercent value={stockAnalysis.revenueCAGR} label={"Revenue CAGR"} running={loading} />
                            </div>
                        </div>
                        : null
                }
            </section>
        </main >
    )
}
