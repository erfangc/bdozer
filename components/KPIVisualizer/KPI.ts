import {Format} from "./Format";

export interface KPI {
    itemName: string
    description: string
    format: Format
    value: number
    date: string
}