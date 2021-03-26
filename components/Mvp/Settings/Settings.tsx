import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useFilingEntityManager, useStockAnalyzerFactory } from '../../../api-hooks'
import { FilingEntity } from '../../../client'
import { DeleteButton } from '../../DeleteButton'
import { GhostButton } from '../../GhostButton'
import { PrimaryButton } from '../../PrimaryButton'
import { Select } from '../../Select'
import { Title, SubTitle } from '../../Title'

interface Props {
}

export function Settings(props: Props) {

    const router = useRouter()
    const [filingEntity, setFilingEntity] = useState<FilingEntity>()
    const [loading, setLoading] = useState(false)
    const filingEntityManager = useFilingEntityManager()
    const stockAnalysisFactory = useStockAnalyzerFactory()

    const { cik } = router.query
    useEffect(() => {
        if (cik) {
            filingEntityManager
                .getFilingEntity(cik as string)
                .then(resp => setFilingEntity(resp.data))
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
            await stockAnalysisFactory.analyze(filingEntity.cik, true)
        } catch (e) { }
        setLoading(false)
    }

    async function bootstrap() {
        setLoading(true)
        try {
            await filingEntityManager.bootstrapFilingEntity(filingEntity.cik)
        } catch (e) { }
        setLoading(false)
    }

    function seeModel() {
        router.push(`/${filingEntity?.cik}/narrative2`)
    }

    function seeFullModel() {
        router.push(`/settings/${filingEntity?.cik}/full-model`)
    }

    return (
        <main className="flex-grow flex flex-col space-y-12 min-h-screen p-2 xl:p-10 lg:p-8">
            <Title>Advanced Model Controls</Title>
            <section className="flex flex-col space-y-4">
                {filingEntity ?
                    <>
                        <div className='bg-blueGray-800 shadow-md rounded-md grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-6 px-4 gap-4'>
                            <div className="w-96 flex flex-col items-center">
                                <div className="font-light text-sm">Name</div>
                                <span>{filingEntity?.name}</span>
                            </div>
                            <div className="w-96 flex flex-col items-center">
                                <div className="font-light text-sm">Trading Symbol</div>
                                <span>{filingEntity?.tradingSymbol}</span>
                            </div>
                            <div className="w-96 flex flex-col items-center">
                                <div className="font-light text-sm">SIC Description</div>
                                <span>{filingEntity?.sicDescription}</span>
                            </div>
                            <div className="w-96 flex flex-col items-center">
                                <div className="font-light text-sm">Exchange</div>
                                <span className="space-x-1">{filingEntity?.exchanges.map(exchange => <span>{exchange}</span>)}</span>
                            </div>
                        </div>
                        <p className="self-end text-sm">
                            <div className="font-light text-blueGray-300">Last Updated</div>
                            <div className="text-blueGray-200">{new Date(filingEntity.lastUpdated).toLocaleString()}</div>
                        </p>
                    </>
                    : null
                }
                {
                    filingEntity ?
                        <div className="w-96">
                            <Select onChange={({ currentTarget: { value } }) => changeModelTemplate(value)} value={filingEntity?.modelTemplate?.template} label="Choose Model Template">
                                <option></option>
                                <option value="Recovery">Recovery</option>
                            </Select>
                        </div> : null
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
                <SubTitle className="mb-4">View Built Models</SubTitle>
                <div className="space-x-2">
                    <GhostButton onClick={seeModel} className={loading ? `animate-pulse` : ``} disabled={loading}>
                        Narrative Model
                    </GhostButton>
                    <GhostButton onClick={seeFullModel} className={loading ? `animate-pulse` : ``} disabled={loading}>
                        See Full Model
                    </GhostButton>
                </div>
            </section>
        </main>
    )
}