import {Item, ItemTypeEnum, KPI, KPIFormatEnum} from "../../client";

export const kpis: KPI[] = [
    { itemName: 'Revenue', format: KPIFormatEnum.Money, value: 127088000000, date: new Date().toISOString() },
    { itemName: 'Vehicle_Revenue', format: KPIFormatEnum.Money, value: 115885000000, date: new Date().toISOString() },
    { itemName: 'Vehicle_Sales', format: KPIFormatEnum.Number, value: 4187000, date: new Date().toISOString()},
    { itemName: 'Average_Selling_Price', format: KPIFormatEnum.Money, value: 27677.33, date: new Date().toISOString() },
    { itemName: 'Credit', format: KPIFormatEnum.Money, value: 11203000000, date: new Date().toISOString(), collapse: true },
    { itemName: 'Credit_Percent', format: KPIFormatEnum.Percent, value: 0.1, date: new Date().toISOString() },
];

export const items: Item[] = [
    {
        name: 'Revenue',
        type: ItemTypeEnum.SumOfOtherItems,
        sumOfOtherItems: {
            components: [
                { itemName: 'Vehicle_Revenue', weight: 1 },
                { itemName: 'Credit', weight: 1 },
            ],
        },
        formula: '0.0',
    },
    {
        name: 'Vehicle_Revenue',
        description: 'Vehicle Revenue',
        type: ItemTypeEnum.ProductOfOtherItems,
        productOfOtherItems: {
            components: [
                { itemName: 'Vehicle_Sales' },
                { itemName: 'Average_Selling_Price' },
            ],
        },
        formula: '0.0',
    },
    {
        name: 'Vehicle_Sales',
        description: 'Vehicle Sales',
        type: ItemTypeEnum.Custom,
        formula: '0.0',
    },
    {
        name: 'Average_Selling_Price',
        description: 'Average Selling Price',
        type: ItemTypeEnum.Custom,
        formula: '0.0',
    },
    {
        name: 'Credit',
        type: ItemTypeEnum.ProductOfOtherItems,
        formula: '0.0',
        productOfOtherItems: {
            components: [
                { itemName: 'Vehicle_Revenue' },
                { itemName: 'Credit_Percent' },
            ],
        }
    },
    {
        name: 'Credit_Percent',
        type: ItemTypeEnum.Custom,
        formula: '0.0',
    },
];
