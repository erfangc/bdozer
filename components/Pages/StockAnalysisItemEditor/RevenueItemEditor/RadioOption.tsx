import {RevenueModelRevenueDriverTypeEnum} from "../../../../client";
import {RadioGroup} from "@headlessui/react";
import React, {Fragment} from "react";
import {CheckedCircle, RadioButtonUnchecked} from "../../../Common/Svgs";

interface RadioOptionProps {
    label: string
    explanation: string
    revenueDriverType: RevenueModelRevenueDriverTypeEnum
}

export function RadioOption({revenueDriverType, label, explanation}: RadioOptionProps) {
    return (
        <RadioGroup.Option value={revenueDriverType} as={Fragment}>
            {({checked}) => (
                <div
                    className={`${checked ? "bg-blue-500" : "bg-blueGray-700"} py-6 px-4 rounded flex items-center justify-between focus:outline-none`}>
                    <div>
                        <h3 className="font-bold text-2xl">{label}</h3>
                        <p className="text-sm">{explanation}</p>
                    </div>
                    {
                        checked ? <CheckedCircle className="h-10 w-10"/> : <RadioButtonUnchecked className="h-10 w-10"/>
                    }
                </div>
            )}
        </RadioGroup.Option>
    )
}