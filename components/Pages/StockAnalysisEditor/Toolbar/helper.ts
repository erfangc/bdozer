import {Item} from "../../../../client";

export function itemAdditions(pre: Item[], post: Item[]): Item[] {
    return post.filter(item => pre.find(it => it.name === item.name) === undefined)
}

export function itemRemovals(pre: Item[], post: Item[]): Item[] {
    return pre.filter(item => post.find(it => it.name === item.name) === undefined)
}
