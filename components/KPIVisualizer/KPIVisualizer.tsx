import React, {useEffect, useState} from 'react';
import {KPIReact} from "./KPIReact";
import {useCompanyKPIs} from "../../api-hooks";
import {PrimaryButton} from "../Common/PrimaryButton";
import {useRouter} from "next/router";
import {GhostButton} from "../Common/GhostButton";
import {EditorDialog} from "./EditorDialog";
import {State, StateManager} from "./StateManager";

export function KPIVisualizer() {

    const {id} = useRouter().query;
    const companyKPIsApi = useCompanyKPIs();

    const [stateMgr] = useState(new StateManager());
    const [state, setState] = useState<State>(stateMgr.state);

    async function fetchCompanyKPIs(id: string) {
        stateMgr.startLoading();
        const {data} = await companyKPIsApi.getCompanyKPIs(id);
        stateMgr.setCompanyKPIs(data);
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

    useEffect(() => {
        stateMgr.register(newState => {
            console.log(newState);
            setState(newState);
        });
    }, []);

    useEffect(() => {
        if (id) {
            fetchCompanyKPIs(id as string);
        }
    }, [id])

    if (!state.companyKPIs) {
        return null;
    }

    const {companyKPIs} = state;
    const {items, revenueItemName} = state.companyKPIs;

    return (
        <main className="max-w-prose container mx-auto pt-24 px-4">
            <KPIReact
                companyKPIs={companyKPIs}
                item={items.find(it => it.name === revenueItemName)}
                onAttemptToAddSibling={stateMgr.attemptToAddSibling}
                onAttemptToEdit={stateMgr.attemptToEdit}
                deleteItem={stateMgr.deleteItem}
            />
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