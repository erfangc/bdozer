import React from 'react'
import {ItemWrapper, Operator} from "./ItemWrapper";
import {KPICard} from "./KPICard";
import {Arrow} from "./Arrow";

function isTerminal(itemWrapper: ItemWrapper): boolean {
    return itemWrapper.collapse || !itemWrapper.children || itemWrapper.children.length === 0
}

export function ItemWrapperReact(props: { itemWrapper: ItemWrapper, root?: boolean, lastChild?: boolean, parentOperator?: Operator }) {
    const {
        itemWrapper: {children},
        root,
        lastChild,
        parentOperator,
    } = props;

    /*
    this is a recursive component
    the stopping condition: this item is either collapsed or have no more children
     */
    const itemWrapper = props.itemWrapper;
    const operator = <>{!lastChild && !root ?
        <div className="ml-4 text-xl font-extrabold">{parentOperator === 'addition' ? '+' : 'x'}</div> : null}</>;
    const selfCard =
        <div className="flex flex-col self-end">
            <div className="flex items-center w-full">
                <KPICard itemWrapper={itemWrapper}/>
                {operator}
            </div>
            {!root ? <Arrow className="place-self-center text-blueGray-500"/> : null}
        </div>

    if (isTerminal(itemWrapper)) {
        // stopping condition
        return selfCard;
    } else {
        // separate children into those with and without grandchildren
        // those without grand children should be rendered immediately
        const withOutGrandChildren = children
            .filter(child => isTerminal(child))
        const withGrandChildren = children
            .filter(child => !isTerminal(child))

        // render children recursively (important to render children first)
        // then selfCard
        const childrenCard = [
            ...withGrandChildren,
            ...withOutGrandChildren,
        ].map((child, idx) => (
            <ItemWrapperReact
                parentOperator={itemWrapper.operator}
                itemWrapper={child}
                lastChild={idx === children.length - 1}
            />
        ));

        return (
            <div>
                <div className="flex space-x-4">{childrenCard}</div>
                {selfCard}
            </div>
        )
    }
}
