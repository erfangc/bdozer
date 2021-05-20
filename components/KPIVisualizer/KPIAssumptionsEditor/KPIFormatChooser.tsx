import {Disclosure, RadioGroup} from "@headlessui/react";
import React, {Fragment} from "react";
import {KPIMetadataFormatEnum} from "../../../client";
import {CheckedCircle, ChevronDown, Nothing} from "../../Common/Svgs";

interface KPIFormatChooserProps {
    kpiFormat: KPIMetadataFormatEnum
    onChange: (newKPIFormat: KPIMetadataFormatEnum) => void
}

export function KPIFormatChooser({kpiFormat, onChange}: KPIFormatChooserProps) {

    return (
        <Disclosure>
            <Disclosure.Button
                className="flex justify-between w-full py-1 rounded bg-blueGray-800 px-3 py-2 focus:outline-none">
                <span>Format</span><ChevronDown/>
            </Disclosure.Button>
            <Disclosure.Panel className="space-y-4 pt-4 px-3 py-1">
                <RadioGroup
                    value={kpiFormat}
                    onChange={onChange}
                    className="cursor-pointer grid grid-cols-2 gap-2"
                >
                    <RadioGroup.Option as={Fragment} value={KPIMetadataFormatEnum.Money}>
                        {({checked}) => (
                            <div
                                className={`p-3 flex items-center justify-between rounded ${checked ? 'bg-blue-600' : 'bg-blueGray-900'}`}>
                                <span>Money</span>
                                {checked ? <CheckedCircle/> : <Nothing/>}
                            </div>
                        )}
                    </RadioGroup.Option>
                    <RadioGroup.Option as={Fragment} value={KPIMetadataFormatEnum.Number}>
                        {({checked}) => (
                            <div
                                className={`p-3 flex items-center justify-between rounded ${checked ? 'bg-blue-600' : 'bg-blueGray-900'}`}>
                                <span>Number</span>
                                {checked ? <CheckedCircle/> : <Nothing/>}
                            </div>
                        )}
                    </RadioGroup.Option>
                    <RadioGroup.Option as={Fragment} value={KPIMetadataFormatEnum.Percent}>
                        {({checked}) => (
                            <div
                                className={`p-3 flex items-center justify-between rounded ${checked ? 'bg-blue-600' : 'bg-blueGray-900'}`}>
                                <span>Percent</span>
                                {checked ? <CheckedCircle/> : <Nothing/>}
                            </div>
                        )}
                    </RadioGroup.Option>
                </RadioGroup>
            </Disclosure.Panel>
        </Disclosure>
    )
}