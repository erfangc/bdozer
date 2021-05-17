import React from 'react'
import {KPICard} from "./KPICard";
import {Arrow} from "./Arrow";
import {CompanyKPIs, Item, ItemTypeEnum} from "../../client";
import {Operator} from "./Operator";

export interface Props {
    companyKPIs: CompanyKPIs
    item: Item
    root?: boolean
    lastChild?: boolean
    parentOperator?: ItemTypeEnum
}

export function KPIReact(props: Props) {
    const {
        companyKPIs,
        companyKPIs: {
            kpis, items
        },
        item,
        lastChild,
        parentOperator,
    } = props;

    const kpi = kpis.find(it => it.itemName === item.name)

    /*
    Figure out the children of this component
     */
    function childrenOf(item: Item): Item[] {
        if (item.type === ItemTypeEnum.ProductOfOtherItems) {
            const productComponents = item.productOfOtherItems.components;
            return productComponents.map(component => items.find(it => it.name === component.itemName));
        } else if (item.type === ItemTypeEnum.SumOfOtherItems) {
            const components = item.sumOfOtherItems.components;
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
    const selfCard =
        <div className="flex flex-col self-end">
            <div className="flex items-center w-full">
                <KPICard item={item} companyKPIs={companyKPIs} period={0}/>
                {!lastChild ? <Operator itemType={parentOperator}/> : null}
            </div>
        </div>

    /*
    Stopping condition
     */
    if (children.length === 0 || kpi.collapse) {
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
                companyKPIs={companyKPIs}
                item={child}
                lastChild={idx === children.length - 1}
            />
        ));

        return (
            <div>
                <div className="flex space-x-4">{childrenCard}</div>
                <div className="text-center">
                    {/* Draw the arrow that connects the layers */}
                    <Arrow className="inline text-blueGray-400"/>
                </div>
                {selfCard}
            </div>
        )
    }
}
