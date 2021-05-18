import React, {Fragment} from "react";
import {ItemTypeEnum} from "../../client";
import {RadioGroup} from "@headlessui/react";
import {CheckedCircle} from "../Common/Svgs";
import {Nothing} from "../Pages/StockAnalysisItemEditor/Svgs";

interface OperatorRadioGroupProps {
    value: ItemTypeEnum
    onChange: (type: ItemTypeEnum) => void
}

export function OperatorRadioGroup({onChange, value}: OperatorRadioGroupProps) {
    return (
        <div className="my-8">
            <label className="mb-2 block text-sm">Operator</label>
            <RadioGroup value={value} onChange={onChange} className="cursor-pointer flex space-x-1">
                <RadioGroup.Option as={Fragment} value={ItemTypeEnum.SumOfOtherItems}>
                    {({checked, active}) => (
                        <div className={`px-4 py-2 flex items-center space-x-2 rounded ${checked ? 'bg-blue-600' : 'bg-blueGray-900'}`}>
                            <span>Addition</span>
                            {checked ? <CheckedCircle/> : <Nothing/>}
                        </div>
                    )}
                </RadioGroup.Option>
                <RadioGroup.Option as={Fragment} value={ItemTypeEnum.ProductOfOtherItems}>
                    {({checked, active}) => (
                        <div className={`px-4 py-2 flex items-center space-x-2 rounded ${checked ? 'bg-blue-600' : 'bg-blueGray-900'}`}>
                            <span>Multiplication</span>
                            {checked ? <CheckedCircle/> : <Nothing/>}
                        </div>
                    )}
                </RadioGroup.Option>
            </RadioGroup>
        </div>
    );
}