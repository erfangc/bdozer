import {KPI} from "./KPI";
import {Item, ItemTypeEnum} from "../../client";

export const kpis: KPI[] = [
    { itemName: 'Revenue', description: '', format: "money", value: 127088000000, date: new Date().toISOString() },
    { itemName: 'Vehicle_Revenue', description: '', format: "money", value: 115885000000, date: new Date().toISOString() },
    { itemName: 'Vehicle_Sales', description: '', format: "number", value: 4187000, date: new Date().toISOString()},
    { itemName: 'Average_Selling_Price', description: '', format: "money", value: 27677.33, date: new Date().toISOString() },
    { itemName: 'Credit', description: '', format: "money", value: 11203000000, date: new Date().toISOString() },
];

export const items: Item[] = [
    {
        name: 'Revenue',
        type: ItemTypeEnum.SumOfOtherItems,
        sumOfOtherItems: {
            components: [
                {itemName: 'Vehicle_Revenue', weight: 1},
                {itemName: 'Credit', weight: 1},
            ]
        },
        formula: '0.0',
    },
    {
        name: 'Vehicle_Revenue',
        type: ItemTypeEnum.ProductOfOtherItems,
        productOfOtherItems: {
            components: [{itemName: 'Vehicle_Sales'}, {itemName: 'Average_Selling_Price'}]
        },
        formula: '0.0',
    },
    {
        name: 'Vehicle_Sales',
        type: ItemTypeEnum.Custom,
        formula: '0.0',
    },
    {
        name: 'Average_Selling_Price',
        type: ItemTypeEnum.Custom,
        formula: '0.0',
    },
    {
        name: 'Credit',
        type: ItemTypeEnum.Custom,
        formula: '0.0',
    },
];
