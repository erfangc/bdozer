import {EditorProps} from "./EditorProps";
import React, {ChangeEvent} from "react";

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