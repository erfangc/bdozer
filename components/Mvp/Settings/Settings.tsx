import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useFilingEntityManager, useStockAnalyzerFactory } from '../../../api-hooks'
import { FilingEntity } from '../../../client'
import { DeleteButton } from '../../DeleteButton'
import { GhostButton } from '../../GhostButton'
import { PrimaryButton } from '../../PrimaryButton'
import { Select } from '../../Select'
import { TextInput } from '../../TextInput'
import { SubTitle, Title } from '../../Title'
import { FilingEntityCard } from './FilingEntityCard'

export function Settings() {

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

    function seeModel() {
        router.push(`/${filingEntity?.cik}/narrative2`)
    }

    function seeFullModel() {
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
        <main className="flex-grow flex flex-col space-y-12 min-h-screen p-3 xl:p-10 lg:p-8">
            <Title>Model Controls</Title>
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
                <SubTitle className="mb-4">View Built Models</SubTitle>
                <div className="space-x-2">
                    <GhostButton onClick={seeModel}>
                        Narrative Model
                    </GhostButton>
                    <GhostButton onClick={seeFullModel}>
                        See Full Model
                    </GhostButton>
                </div>
            </section>
        </main>
    )
}
