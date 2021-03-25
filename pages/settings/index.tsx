import { useRouter } from "next/router";
import React, { useState } from "react";
import { useFilingEntityManager, useStockAnalyzerFactory } from "../../api-hooks";
import { FilingEntity } from "../../client";
import { App } from "../../components/App";
import { DeleteButton } from "../../components/DeleteButton";
import { GhostButton } from "../../components/GhostButton";
import { Search } from "../../components/Mvp/Search";
import { PrimaryButton } from "../../components/PrimaryButton";
import { Select } from "../../components/Select";

function SettingsComponent() {

    const router = useRouter()
    const [filingEntity, setFilingEntity] = useState<FilingEntity>()
    const [loading, setLoading] = useState(false)
    const filingEntityManager = useFilingEntityManager()
    const stockAnalysisFactory = useStockAnalyzerFactory()

    async function switchFilingEntity(filingEntity: FilingEntity) {
        const { data } = await filingEntityManager.getFilingEntity(filingEntity.cik)
        setFilingEntity(data)
    }

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
        <main className="text-blueGray-50 flex-grow flex-col space-y-12 h-screen flex p-10">
            <div>
                <h1 className="text-xl font-bold mb-4">
                    Advanced Model Controls
                </h1>
                <Search onSubmit={switchFilingEntity} className="" />
            </div>

            <div className="flex-col space-y-4">
                <div className="w-96">
                    <b>Trading symbol: </b>
                    <span>{filingEntity?.tradingSymbol}</span>
                </div>

                <div className="w-96">
                    <b>Name: </b>
                    <span>{filingEntity?.name}</span>
                </div>
                <hr />
                <div className="w-96">
                    <Select onChange={({ currentTarget: { value } }) => changeModelTemplate(value)} value={filingEntity?.modelTemplate?.template} label="Model Template">
                        <option></option>
                        <option value="Recovery">Recovery</option>
                    </Select>
                </div>
                <div className="flex space-x-4">
                    <PrimaryButton onClick={runStockAnalysis} className={loading ? `animate-pulse` : ``} disabled={loading}>
                        {loading ? 'Loading ...' : 'Run Stock Analysis'}
                    </PrimaryButton>
                    <DeleteButton onClick={bootstrap} className={loading ? `animate-pulse` : ``} disabled={loading}>
                        Rebootstrap
                    </DeleteButton>
                    <GhostButton onClick={seeModel} className={loading ? `animate-pulse` : ``} disabled={loading}>
                        See Model
                    </GhostButton>
                    <GhostButton onClick={seeFullModel} className={loading ? `animate-pulse` : ``} disabled={loading}>
                        See Full Model
                    </GhostButton>
                </div>
            </div>
        </main>
    )
}

export default function SettingsPage() {
    return (
        <App>
            <SettingsComponent />
        </App>
    )
}