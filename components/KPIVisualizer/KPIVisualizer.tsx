import React, {useEffect, useState} from 'react';
import {KPIReact} from "./KPIReact";
import {useCompanyKPIs} from "../../api-hooks";
import {PrimaryButton} from "../Common/PrimaryButton";
import {useRouter} from "next/router";
import {CompanyKPIs} from "../../client";
import {GhostButton} from "../Common/GhostButton";

export function KPIVisualizer() {

    const router = useRouter()
    const {id} = router.query
    const companyKPIsApi = useCompanyKPIs();
    const [loading, setLoading] = useState(false)
    const [companyKPIs, setCompanyKPIs] = useState<CompanyKPIs>()

    async function getCompanyKPIs() {
        setLoading(true)
        const {data} = await companyKPIsApi.getCompanyKPIs(id as any)
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

    useEffect(() => {
        if (id) {
            getCompanyKPIs()
        }
    }, [id]);

    if (!companyKPIs) {
        return null;
    }

    const {items, revenueItemName} = companyKPIs;

    return (
        <main className="max-w-prose container mx-auto pt-24 px-4">
            <KPIReact
                root
                companyKPIs={companyKPIs}
                item={items.find(it => it.name === revenueItemName)}
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