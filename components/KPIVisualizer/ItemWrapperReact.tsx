import React from 'react'
import {ItemWrapper} from "./ItemWrapper";
import {KPICard} from "./KPICard";
import {Arrow} from "./Arrow";

function isTerminal(itemWrapper: ItemWrapper): boolean {
    return itemWrapper.collapse || !itemWrapper.children || itemWrapper.children.length === 0
}

export function ItemWrapperReact(props: { itemWrapper: ItemWrapper, root?: boolean }) {
    let {itemWrapper: {children}, root} = props;

    /*
    this is a recursive component
    the stopping condition: this item is either collapsed or have no more children
     */
    const selfCard =
        <div className="flex flex-col self-end">
            <KPICard itemWrapper={props.itemWrapper}/>
            {!root ? <Arrow className="place-self-center text-emerald-500"/> : null}
        </div>

    if (isTerminal(props.itemWrapper)) {
        // stopping condition
        return selfCard;
    } else {
        // separate children into those with and without grandchildren
        // those without grand children should be rendered immediately
        const withOutGrandChildren = children
            .filter(child => isTerminal(child))
            .map(child => <ItemWrapperReact itemWrapper={child}/>);

        const withGrandChildren = children
            .filter(child => !isTerminal(child))
            .map(child => <ItemWrapperReact itemWrapper={child}/>);

        // render children recursively (important to render children first)
        // then selfCard
        const childrenCard = [
            ...withGrandChildren,
            ...withOutGrandChildren
        ];
        return (
            <div>
                <div className="flex space-x-4">{childrenCard}</div>
                {selfCard}
            </div>
        )
    }
}
