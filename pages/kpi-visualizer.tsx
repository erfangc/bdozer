import React from 'react';
import {UnsecuredApp} from "../components/App";
import {ItemTypeEnum} from "../client";
import {ItemWrapper} from "../components/KPIVisualizer/ItemWrapper";
import {ItemWrapperReact} from "../components/KPIVisualizer/ItemWrapperReact";

export default function KpiVisualizer() {
    return (
        <UnsecuredApp>
            <main className="max-w-prose container mx-auto pt-24 px-4">
                <ItemWrapperReact itemWrapper={data} root/>
            </main>
        </UnsecuredApp>
    )
}

const data: ItemWrapper = {
    item: {
        name: 'Revenue',
        type: ItemTypeEnum.ManualProjections,
        formula: '0.0',
    },
    value: 127088000000,
    format: "money",
    operator: "addition",
    children: [
        {
            item: {
                name: 'Vehicle Revenue',
                type: ItemTypeEnum.ManualProjections,
                formula: '',
            },
            value: 115885000000,
            format: "money",
            operator: "multiplication",
            children: [
                {
                    item: {
                        name: 'Vehicle Sales',
                        type: ItemTypeEnum.ManualProjections,
                        formula: '0.0',
                    },
                    value: 4187000.00,
                    format: "money",
                    operator: "addition",
                    children: []
                },
                {
                    item: {
                        name: 'Average Selling Price',
                        type: ItemTypeEnum.ManualProjections,
                        formula: '0.0',
                    },
                    value: 27677.33,
                    format: "money",
                    operator: "addition",
                    children: []
                },
            ],
        },
        {
            item: {
                name: 'Credit',
                type: ItemTypeEnum.ManualProjections,
                formula: '0.0',
            },
            value: 11203000000,
            format: "money",
            operator: "addition",
        }
    ],
}
