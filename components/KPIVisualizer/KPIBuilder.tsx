import React, {useEffect, useState} from 'react';
import {KPIReact} from "./KPIReact";
import {useCompanyKPIs, useStockAnalysis} from "../../api-hooks";
import {PrimaryButton} from "../Common/PrimaryButton";
import {useRouter} from "next/router";
import {GhostButton} from "../Common/GhostButton";
import {EditorDialog} from "./EditorDialog";
import {State, StateManager} from "./StateManager";
import {SubTitle} from "../Common/Title";
import {BlockQuote} from "../Common/BlockQuote";
import {CompanyKPIs, ItemTypeEnum, KPIMetadataFormatEnum} from "../../client";

export function KPIBuilder() {

    const {id} = useRouter().query;
    const companyKPIsApi = useCompanyKPIs();
    const stockAnalysesApi = useStockAnalysis();

    const [stateMgr] = useState(new StateManager());
    const [state, setState] = useState<State>(stateMgr.state);

    async function init(id: string) {
        stateMgr.startLoading();
        const {data} = await companyKPIsApi.getCompanyKPIs(id);
        if (!data) {
            const {data: stockAnalysis} = await stockAnalysesApi.getStockAnalysis(id);
            const revenueConceptName = stockAnalysis?.model?.totalRevenueConceptName;
            if (revenueConceptName) {
                const revenueItem = stockAnalysis
                    ?.model
                    ?.incomeStatementItems
                    ?.find(it => it.name === revenueConceptName);

                // create a new revenue KPI item as the root
                const companyKPIs: CompanyKPIs = {
                    _id: stockAnalysis['_id'],
                    items: [{
                        name: revenueConceptName,
                        description: 'Revenue',
                        type: ItemTypeEnum.Custom,
                        formula: '0',
                        historicalValue: revenueItem?.historicalValue,
                    }],
                    kpis: [{
                        itemName: revenueConceptName,
                        format: KPIMetadataFormatEnum.Money,
                    }],
                    cik: stockAnalysis.cik,
                    cells: [],
                    projectionPeriods: stockAnalysis.model.periods,
                    revenueItemName: revenueConceptName,
                } as any;
                await companyKPIsApi.saveCompanyKPIs(companyKPIs);
                stateMgr.setCompanyKPIs(companyKPIs);
            } else {
                stateMgr.setCompanyKPIs(data);
            }
        }
        stateMgr.stopLoading();
    }

    async function saveCompanyKPIs() {
        stateMgr.startLoading();
        try {
            await companyKPIsApi.saveCompanyKPIs(state.companyKPIs);
        } catch (e) {
        }
        stateMgr.stopLoading();
    }

    async function evaluate() {
        stateMgr.startLoading();
        try {
            const {data} = await companyKPIsApi.evaluateCompanyKPIs(state.companyKPIs);
            stateMgr.setCompanyKPIs(data);
        } catch (e) {
        }
        stateMgr.stopLoading();
    }

    useEffect(
        () => stateMgr.register(newState => setState(newState)),
        []
    );

    useEffect(() => {
        if (id) {
            init(id as string);
        }
    }, [id]);

    const {companyKPIs} = state;

    return (
        <main className="max-w-prose container mx-auto pt-24 px-4">
            {/* This is the root KPI element, from which a tree will be rendered recursively */}
            <SubTitle>KPI Visualizer</SubTitle>
            <BlockQuote className="mb-12">Click on the KPIs to edit them or add subcomponents</BlockQuote>
            {
                companyKPIs
                ?
                    <KPIReact
                        companyKPIs={companyKPIs}
                        item={companyKPIs?.items?.find(it => it.name === companyKPIs.revenueItemName)}
                        onAttemptToAddChild={stateMgr.attemptToAddChild}
                        onAttemptToAddSibling={stateMgr.attemptToAddSibling}
                        onAttemptToEdit={stateMgr.attemptToEdit}
                        deleteItem={stateMgr.deleteItem}
                    />
                : null
            }
            <EditorDialog
                companyKPIs={companyKPIs}
                onSubmit={stateMgr.handleItemEdit}
                onDismiss={stateMgr.dismiss}
                open={state?.editorOpen ?? false}
                item={state.currentItem}
                kpi={state.currentKPI}
            />
            <div className="mt-6 space-x-2">
                <PrimaryButton disabled={state.loading} onClick={evaluate}>Evaluate</PrimaryButton>
                <GhostButton disabled={state.loading} onClick={saveCompanyKPIs}>Save</GhostButton>
            </div>
        </main>
    );

}