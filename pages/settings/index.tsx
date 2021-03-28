import { useRouter } from "next/router";
import React from "react";
import { FilingEntity } from "../../client";
import { App } from "../../components/App";
import { FilingEntitySearch } from "../../components/Mvp/FilingEntitySearch";
import { Title } from "../../components/Title";

function SettingsComponent() {

    const router = useRouter()

    async function switchFilingEntity(filingEntity: FilingEntity) {
        router.push(`/settings/${filingEntity.cik}`)
    }

    return (
        <main className="text-blueGray-50 flex-grow flex flex-col space-y-6 justify-center items-center min-h-screen p-2 xl:p-10 lg:p-8">
            <Title>Model Controls and Settings</Title>
            <FilingEntitySearch onSubmit={switchFilingEntity} className="w-80 lg:w-96" />
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