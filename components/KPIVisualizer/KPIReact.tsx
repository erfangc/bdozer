import React from 'react'
import {KPICard} from "./SupportComponents/KPICard";
import {Arrow} from "./SupportComponents/Arrow";
import {CompanyKPIs, Item, ItemTypeEnum, KPIMetadata} from "../../client";
import {Operator} from "./SupportComponents/Operator";

export interface Props {
    companyKPIs: CompanyKPIs
    item: Item
    parent?: Item
    lastChild?: boolean
    onAttemptToAddSibling: (self: Item, parent?: Item) => void
    onAttemptToAddChild: (parent: Item) => void
    onAttemptToEdit: (item: Item, kpi: KPIMetadata) => void
    deleteItem: (item: Item) => void
}

/**
 * This component renders a single KPI item
 * for the KPI modeling effort
 *
 * Where the passed in Item have children, the children will be recursively rendered. This component
 * exposes methods for triggering edit operations as well, though the actual editor components will be separate
 * @param props
 * @constructor
 */
export function KPIReact(props: Props) {
    const {
        parent,
        companyKPIs,
        companyKPIs: {kpis, items},
        item,
        deleteItem,
        lastChild,
        onAttemptToAddChild,
        onAttemptToAddSibling,
        onAttemptToEdit,
    } = props;

    const kpi = kpis.find(it => it.itemName === item.name)

    /*
    Function to figure out the children of this component
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
                <KPICard
                    item={item}
                    companyKPIs={companyKPIs}
                    period={0}
                    deleteItem={deleteItem}
                    onAttemptToAddChild={onAttemptToAddChild}
                    onAttemptToEdit={onAttemptToEdit}
                    onAttemptToAddSibling={() => onAttemptToAddSibling(item, parent)}
                />
                {!lastChild ? <Operator itemType={parent?.type}/> : null}
            </div>
        </div>

    /*
    Stopping condition
     */
    if (children.length === 0 || kpi.collapse) {
        return selfCard;
    } else {
        // the parent item in this recursive call is the item being rendered in this cycle
        /*
        Separate children into those with and without grandchildren
        those without grand children should be rendered immediately
         */
        const withoutGrandChildren = children
            .filter(child => childrenOf(child).length === 0)
        const withGrandChildren = children
            .filter(child => childrenOf(child).length !== 0)

        /*
        Render children recursively (important to render children first) then selfCard
         */
        const childrenCard = [
            ...withGrandChildren,
            ...withoutGrandChildren,
        ].map((child, idx) => (
            /*
            Pass onAttemptToAddSibling on the call to children, as invocation of this will bubble with the correct self, parent
            */
            <KPIReact
                parent={item}
                companyKPIs={companyKPIs}
                item={child}
                deleteItem={deleteItem}
                onAttemptToAddChild={onAttemptToAddChild}
                lastChild={idx === children.length - 1}
                onAttemptToEdit={onAttemptToEdit}
                onAttemptToAddSibling={onAttemptToAddSibling}
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
