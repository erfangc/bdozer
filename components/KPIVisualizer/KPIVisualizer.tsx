import React, {useEffect, useState} from 'react';
import {KPIReact} from "./KPIReact";
import {useCompanyKPIs} from "../../api-hooks";
import {PrimaryButton} from "../Common/PrimaryButton";
import {useRouter} from "next/router";
import {CompanyKPIs, Item} from "../../client";
import {GhostButton} from "../Common/GhostButton";
import {EditorDialog} from "./EditorDialog";

/**
 *
 * @constructor
 */
export function KPIVisualizer() {

    const router = useRouter()
    const {id} = router.query
    const companyKPIsApi = useCompanyKPIs();
    const [loading, setLoading] = useState(false)
    const [companyKPIs, setCompanyKPIs] = useState<CompanyKPIs>()

    async function getCompanyKPIs(id: string) {
        setLoading(true)
        const {data} = await companyKPIsApi.getCompanyKPIs(id)
        setCompanyKPIs(data)
        setLoading(false)
    }

    async function saveCompanyKPIs() {
        setLoading(true)
        try {
            await companyKPIsApi.saveCompanyKPIs(companyKPIs);
        } catch (e) {
        }
        setLoading(false)
    }

    async function evaluate() {
        setLoading(true);
        try {
            const {data} = await companyKPIsApi.evaluateCompanyKPIs(companyKPIs)
            setCompanyKPIs(data);
        } catch (e) {
        }
        setLoading(false);
    }

    /*
    This is a temporary state that is used to trigger
    dialogs, once the dialogs are complete these states
    are used in the next steps
     */
    const [addSiblingScratchPad, setAddSibilingScratchPad] = useState<[Item, Item?]>()
    /**
     * Triggers the process to add a new Item and do the following:
     *  (completed via the [completeAddSibling] function
     * - Create the corresponding KPI entry
     * - Create the corresponding Item entry
     * - Add the Item to the final companyKPIs instance
     * - Modify the parent Item and ensure the ordering of display is correct
     *
     * @param self
     * @param parent
     */
    function attemptToAddSibling(self: Item, parent?: Item) {
        setAddSibilingScratchPad([self, parent]);
    }

    function completeAddSibling(newItem: Item) {
        // TODO
    }

    function dismissAddSibling() {
        setAddSibilingScratchPad(undefined)
    }

    useEffect(() => {
        if (id) {
            getCompanyKPIs(id as string)
        }
    }, [id]);

    if (!companyKPIs) {
        return null;
    }

    const {items, revenueItemName} = companyKPIs;
    const [leftSibling] = addSiblingScratchPad || []
    return (
        <main className="max-w-prose container mx-auto pt-24 px-4">
            <KPIReact
                companyKPIs={companyKPIs}
                item={items.find(it => it.name === revenueItemName)}
                onAttemptToAddSibling={attemptToAddSibling}
            />
            <EditorDialog
                companyKPIs={companyKPIs}
                onSubmit={console.log}
                onDismiss={dismissAddSibling}
                open={leftSibling !== undefined}
            />
            <div className="mt-6 space-x-2">
                <PrimaryButton disabled={loading} onClick={evaluate}>
                    Evaluate
                </PrimaryButton>
                <GhostButton disabled={loading} onClick={saveCompanyKPIs}>
                    Save
                </GhostButton>
            </div>
        </main>
    );

}