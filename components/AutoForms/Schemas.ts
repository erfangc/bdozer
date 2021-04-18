import {Item, ItemTypeEnum} from "../../client";
import {Schema} from "./AutoForm";

export function schemaOf(item: Item): Schema[] {
    switch (item.type) {
        case ItemTypeEnum.CompoundedGrowth:
            return [
                {
                    name: "growthRate",
                    label: "Growth Rate %",
                    type: "percent",
                    fullLength: true,
                }
            ]
        case ItemTypeEnum.SubscriptionRevenue:
            return [
                {
                    name: "totalSubscriptionAtTerminalYear",
                    label: "Total Subscription at Terminal Year",
                    type: "integer",
                    fullLength: true,
                },
                {
                    name: "initialSubscriptions",
                    label: "Initial Subscriptions",
                    type: "integer",
                    fullLength: true,
                },
                {
                    name: "averageRevenuePerSubscription",
                    label: "Average Revenue per Subscription",
                    type: "number",
                    fullLength: true,
                },
            ];
        case ItemTypeEnum.FixedCost:
            return [
                {
                    name: "cost",
                    label: "Cost",
                    type: "number",
                    fullLength: true,
                },
            ];
        case ItemTypeEnum.PercentOfRevenue:
            return [
                {
                    label: "Percent of Revenue",
                    name: "percentOfRevenue",
                    type: "percent",
                    description: "Percent Of Revenue",
                },
            ];
        case ItemTypeEnum.PercentOfTotalAsset:
            return [
                {
                    label: "Percent of Total Asset",
                    name: "percentOfTotalAsset",
                    type: "percent",
                    description: "Percent of Total Asset",
                },
            ];
        case ItemTypeEnum.Discrete:
            return [
                {
                    label: "Formula",
                    name: "formula",
                    type: "textarea",
                    description: "N/A",
                },
            ];
        default:
            return null;
    }
}

export function bodyOf(item: Item): any {
    switch (item.type) {
        case ItemTypeEnum.SubscriptionRevenue:
            return item.subscriptionRevenue;
        case ItemTypeEnum.PercentOfRevenue:
            return item.percentOfRevenue;
        case ItemTypeEnum.FixedCost:
            return item.fixedCost;
        case ItemTypeEnum.PercentOfTotalAsset:
            return item.percentOfTotalAsset;
        case ItemTypeEnum.Discrete:
            return item.discrete;
        case ItemTypeEnum.CompoundedGrowth:
            return item.compoundedGrowth;
        default:
            return {};
    }
}

export function merge(item: Item, property: any): Item {
    switch (item.type) {
        case ItemTypeEnum.SubscriptionRevenue:
            return {...item, subscriptionRevenue: {...property}};
        case ItemTypeEnum.PercentOfRevenue:
            return {...item, percentOfRevenue: {...property}};
        case ItemTypeEnum.FixedCost:
            return {...item, fixedCost: {...property}};
        case ItemTypeEnum.PercentOfTotalAsset:
            return {...item, percentOfTotalAsset: {...property}};
        case ItemTypeEnum.Discrete:
            return {...item, discrete: {...property}};
        case ItemTypeEnum.CompoundedGrowth:
            return {...item, compoundedGrowth: {...property}};
        default:
            return {...item};
    }
}
