import {EditorProps} from "./EditorProps";
import {NumberFormatValues} from "react-number-format";
import {NumberInput} from "../../Common/NumberInput";
import React from "react";

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