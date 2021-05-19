import {EditorProps} from "./EditorProps";
import {NumberFormatValues} from "react-number-format";
import {NumberInput} from "../../Common/NumberInput";
import React from "react";

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