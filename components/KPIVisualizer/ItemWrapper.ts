import {Item} from "../../client";

export type Operator = 'multiplication' | 'addition'

export interface ItemWrapper {
    item: Item
    value: number
    format: 'number' | 'percent' | 'money'
    operator: Operator
    desc?: string
    collapse?: boolean
    children?: ItemWrapper[]
}