import {Item} from "../../client";

export interface ItemWrapper {
    item: Item
    value: number
    format: 'number' | 'percent' | 'money'
    operator: 'multiplication' | 'addition'
    desc?: string
    collapse?: boolean
    children?: ItemWrapper[]
}