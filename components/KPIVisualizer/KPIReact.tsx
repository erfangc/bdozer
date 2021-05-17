import React from 'react'
import {KPICard} from "./KPICard";
import {Arrow} from "./Arrow";
import {Item, ItemTypeEnum} from "../../client";
import {KPIContext} from "./KPIContext";

export interface Props {
    kpiContext: KPIContext
    item: Item
    root?: boolean
    lastChild?: boolean
    parentOperator?: ItemTypeEnum
}

export function KPIReact(props: Props) {
    const {
        kpiContext: {kpis, items},
        item,
        root,
        lastChild,
        parentOperator,
        kpiContext,
    } = props;

    const kpi = kpis.find(it=>it.itemName === item.name)

    /*
    Figure out the children of this component
     */
    function childrenOf(item: Item): Item[] {
        if (item.type === ItemTypeEnum.ProductOfOtherItems) {
            const productOfOtherItems = item.productOfOtherItems;
            const productComponents = productOfOtherItems.components;
            return productComponents.map(component => items.find(it => it.name === component.itemName));
        } else if (item.type === ItemTypeEnum.SumOfOtherItems) {
            const sumOfOtherItems = item.sumOfOtherItems;
            const components = sumOfOtherItems.components;
            return components.map(component => items.find(it => it.name === component.itemName));
        } else {
            return [];
        }
    }

    const children = childrenOf(item);

    /*
    This is a recursive component
    the stopping condition: this item is either collapsed or have no more children
     */
    const operator = !lastChild
        ?
        <div className="ml-4 text-xl font-extrabold">
            {
                parentOperator === ItemTypeEnum.ProductOfOtherItems ? '+'
                    : parentOperator === ItemTypeEnum.SumOfOtherItems ? 'x' : null
            }
        </div>
        : null;

    const selfCard =
        <div className="flex flex-col self-end">
            <div className="flex items-center w-full">
                <KPICard item={item} kpiContext={kpiContext}/>
                {operator}
            </div>
        </div>

    if (children.length === 0 || kpi.collapse) {
        /*
        Stopping condition
         */
        return selfCard;
    } else {
        /*
        Separate children into those with and without grandchildren
        those without grand children should be rendered immediately
         */
        const withOutGrandChildren = children
            .filter(child => childrenOf(child).length === 0)
        const withGrandChildren = children
            .filter(child => childrenOf(child).length !== 0)

        /*
        Render children recursively (important to render children first) then selfCard
         */
        const childrenCard = [
            ...withGrandChildren,
            ...withOutGrandChildren,
        ].map((child, idx) => (
            <KPIReact
                parentOperator={item.type}
                kpiContext={kpiContext}
                item={child}
                lastChild={idx === children.length - 1}
            />
        ));

        return (
            <div>
                <div className="flex space-x-4">{childrenCard}</div>
                <div className="text-center">
                    {/* draw the arrow that connects the layers */}
                    <Arrow className="inline text-blueGray-400"/>
                </div>
                {selfCard}
            </div>
        )
    }
}
