import React, {Fragment} from 'react'
import {RadioGroup} from "@headlessui/react";
import {CheckedCircle, RadioButtonUnchecked} from "../../../../Common/Svgs";
import {RevenueModelRevenueDriverTypeEnum} from "../../../../../client";

interface ChoiceProps {
    label: string
    explanation: string
    value: RevenueModelRevenueDriverTypeEnum
}

export function Choice({explanation, label, value}: ChoiceProps) {
    return (
        <RadioGroup.Option value={value} as={Fragment}>
            {({checked}) => (
                <div
                    className={`flex items-center p-4 my-4 rounded justify-between shadow-lg ${checked ? 'bg-blue-600' : 'bg-blueGray-800'} focus:outline-none transition ease-in cursor-pointer`}
                >
                    <div>
                        <p className="text-xl font-bold text-blueGray-100">{label}</p>
                        <p className="text-sm mt-1 tracking-tight">{explanation}</p>
                    </div>

                    <div className={`flex items-center`}>
                        {
                            checked
                                ? <CheckedCircle size={40}/>
                                : <RadioButtonUnchecked size={40}/>
                        }
                    </div>
                </div>
            )}
        </RadioGroup.Option>
    )
}
