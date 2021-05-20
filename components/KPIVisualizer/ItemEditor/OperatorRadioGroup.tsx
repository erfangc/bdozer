import React, {Fragment} from "react";
import {Item, ItemTypeEnum} from "../../../client";
import {RadioGroup} from "@headlessui/react";
import {CheckedCircle, Nothing} from "../../Common/Svgs";

interface OperatorRadioGroupProps {
    item: Item
    onChange: (type: ItemTypeEnum) => void
}

export function OperatorRadioGroup({onChange, item}: OperatorRadioGroupProps) {
    return (
        <div className="py-4">
            <label className="mb-2 block text-sm">Operator Applied to Children</label>
            <RadioGroup value={item?.type} onChange={onChange} className="cursor-pointer flex space-x-1">
                <RadioGroup.Option as={Fragment} value={ItemTypeEnum.SumOfOtherItems}>
                    {({checked}) => (
                        <div
                            className={`px-4 py-2 flex items-center space-x-2 rounded ${checked ? 'bg-blue-600' : 'bg-blueGray-900'}`}>
                            <span>Addition</span>
                            {checked ? <CheckedCircle/> : <Nothing/>}
                        </div>
                    )}
                </RadioGroup.Option>
                <RadioGroup.Option as={Fragment} value={ItemTypeEnum.ProductOfOtherItems}>
                    {({checked}) => (
                        <div
                            className={`px-4 py-2 flex items-center space-x-2 rounded ${checked ? 'bg-blue-600' : 'bg-blueGray-900'}`}>
                            <span>Multiplication</span>
                            {checked ? <CheckedCircle/> : <Nothing/>}
                        </div>
                    )}
                </RadioGroup.Option>
            </RadioGroup>
        </div>
    );
}