import React from "react";
import {Item, ItemTypeEnum} from "../../../client";
import {ItemTypeChooser} from "./ItemTypeChooser";
import {FixedCostEditor} from "./FixedCostEditor";
import {FormulaEditor} from "./FormulaEditor";
import {CompoundedGrowthEditor} from "./CompoundedGrowthEditor";
import {ManualProjectionsEditor} from "./ManualProjectionsEditor";
import { Disclosure } from "@headlessui/react";
import {ChevronDown} from "../../Common/Svgs";

interface Props {
    item?: Item
    onChange: (newItem: Item) => void
}

export function KPIAssumptionsEditor({item, onChange}: Props) {

    function handleItemTypeChange(newItemType: ItemTypeEnum) {
        onChange({...item, type: newItemType});
    }

    const itemType = item?.type;
    let editorComponent = null
    switch (itemType) {
        case ItemTypeEnum.FixedCost:
            editorComponent = <FixedCostEditor item={item} onChange={onChange}/>;
            break;
        case ItemTypeEnum.CompoundedGrowth:
            editorComponent = <CompoundedGrowthEditor item={item} onChange={onChange}/>;
            break;
        case ItemTypeEnum.Custom:
            editorComponent = <FormulaEditor item={item} onChange={onChange}/>;
            break;
        case ItemTypeEnum.ManualProjections:
            editorComponent = <ManualProjectionsEditor item={item} onChange={onChange}/>;
            break;
    }

    return (
        <Disclosure>
            <Disclosure.Button
                className="flex justify-between w-full py-1 rounded bg-blueGray-800 px-3 py-2 focus:outline-none">
                <span>Assumptions</span><ChevronDown/>
            </Disclosure.Button>
            <Disclosure.Panel className="space-y-4 px-3 py-1">
                <div className="space-y-6">
                    <ItemTypeChooser itemType={item?.type} onChange={handleItemTypeChange}/>
                    {editorComponent}
                </div>
            </Disclosure.Panel>
        </Disclosure>
    );
}

