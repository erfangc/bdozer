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
        default:
            return null;
    }
}

export function bodyOf(item: Item): any {
    switch (item.type) {
        case ItemTypeEnum.PercentOfRevenue:
            return item.percentOfRevenue;
        case ItemTypeEnum.FixedCost:
            return item.fixedCost;
        case ItemTypeEnum.CompoundedGrowth:
            return item.compoundedGrowth;
        default:
            return {};
    }
}

export function merge(item: Item, property: any): Item {
    switch (item.type) {
        case ItemTypeEnum.PercentOfRevenue:
            return {...item, percentOfRevenue: {...property}};
        case ItemTypeEnum.FixedCost:
            return {...item, fixedCost: {...property}};
        case ItemTypeEnum.CompoundedGrowth:
            return {...item, compoundedGrowth: {...property}};
        default:
            return {...item};
    }
}
