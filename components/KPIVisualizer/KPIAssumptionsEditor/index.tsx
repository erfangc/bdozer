import React from "react";
import {Item, ItemTypeEnum} from "../../../client";
import {ItemTypeChooser} from "./ItemTypeChooser";
import {FixedCostEditor} from "./FixedCostEditor";
import {FormulaEditor} from "./FormulaEditor";
import {CompoundedGrowthEditor} from "./CompoundedGrowthEditor";
import {ManualProjectionsEditor} from "./ManualProjectionsEditor";

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
        <div className="py-4 space-y-6">
            <ItemTypeChooser itemType={item?.type} onChange={handleItemTypeChange}/>
            {editorComponent}
        </div>
    );
}

