import React from 'react';
import {UnsecuredApp} from "../components/App";
import {KPIReact} from "../components/KPIVisualizer/KPIReact";
import {items, kpis} from "../components/KPIVisualizer/data";

export default function KpiVisualizer() {
    return (
        <UnsecuredApp>
            <main className="max-w-prose container mx-auto pt-24 px-4">
                <KPIReact
                    kpiContext={{kpis, items}}
                    root
                    item={items.find(it=>it.name === 'Revenue')}
                />
            </main>
        </UnsecuredApp>
    )
}
