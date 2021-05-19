import React, {ChangeEvent} from "react";
import {Item, ItemTypeEnum} from "../../../client";
import {ItemTypeChooser} from "./ItemTypeChooser";
import {NumberInput} from "../../Common/NumberInput";
import {NumberFormatValues} from "react-number-format";

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
            editorComponent = <FixedCostEditor onChange={onChange}/>;
            break;
        case ItemTypeEnum.CompoundedGrowth:
            editorComponent = <CompoundedGrowthEditor onChange={onChange}/>;
            break;
        case ItemTypeEnum.Custom:
            editorComponent = <FormulaEditor onChange={onChange}/>;
            break;
    }

    return (
        <div className="py-4 space-y-6">
            <ItemTypeChooser itemType={item?.type} onChange={handleItemTypeChange}/>
            {editorComponent}
        </div>
    );
}

interface EditorProps {
    item?: Item
    onChange: (newItem: Item) => void
}

export function FixedCostEditor({item, onChange}: EditorProps) {

    function handleValueChange(newValue: NumberFormatValues) {
        onChange({...item, fixedCost: {cost: newValue.floatValue}});
    }

    return (
        <NumberInput
            label="Fixed Cost"
            value={item?.fixedCost?.cost}
            onValueChange={handleValueChange}
        />
    );

}

export function FormulaEditor({item, onChange}: EditorProps) {

    function handleChange({currentTarget: {value}}: ChangeEvent<HTMLTextAreaElement>) {
        onChange({...item, formula: value});
    }

    return (
        <div className="space-y-2">
            <p className="text-sm">Formula</p>
            <textarea
                autoFocus
                name="expression"
                value={item?.formula}
                onFocus={focus}
                onChange={handleChange}
                className="cursor-pointer w-full rounded-sm bg-blueGray-900 border-blueGray-500 px-4 py-4"
                placeholder="Enter formula"
            >
            </textarea>
        </div>
    )
}

export function CompoundedGrowthEditor({item, onChange}: EditorProps) {

    function handleValueChange(newValue: NumberFormatValues) {
        onChange({...item, compoundedGrowth: {growthRate: newValue.floatValue}});
    }

    return (
        <NumberInput
            label="Growth Rate"
            value={item?.compoundedGrowth?.growthRate}
            onValueChange={handleValueChange}
        />
    );
}