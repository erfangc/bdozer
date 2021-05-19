import React, {Fragment} from "react";
import {ItemTypeEnum} from "../../../client";
import {RadioGroup} from "@headlessui/react";
import {CheckedCircle, Nothing} from "../../Common/Svgs";

interface Props {
    itemType?: ItemTypeEnum
    onChange: (itemType: ItemTypeEnum) => void
}

export function ItemTypeChooser({itemType, onChange}: Props) {
    return (
        <div>
            <label className="mb-2 block text-sm">Projection Type</label>
            <RadioGroup
                value={itemType}
                onChange={onChange}
                className="cursor-pointer grid grid-cols-2 gap-2"
            >
                <RadioGroup.Option as={Fragment} value={ItemTypeEnum.ManualProjections}>
                    {({checked}) => (
                        <div className={`p-3 flex items-center justify-between rounded ${checked ? 'bg-blue-600' : 'bg-blueGray-900'}`}>
                            <span>Manual Projections</span>
                            {checked ? <CheckedCircle/> : <Nothing/>}
                        </div>
                    )}
                </RadioGroup.Option>
                <RadioGroup.Option as={Fragment} value={ItemTypeEnum.Custom}>
                    {({checked}) => (
                        <div className={`p-3 flex items-center justify-between rounded ${checked ? 'bg-blue-600' : 'bg-blueGray-900'}`}>
                            <span>Custom</span>
                            {checked ? <CheckedCircle/> : <Nothing/>}
                        </div>
                    )}
                </RadioGroup.Option>
                <RadioGroup.Option as={Fragment} value={ItemTypeEnum.FixedCost}>
                    {({checked}) => (
                        <div className={`p-3 flex items-center justify-between rounded ${checked ? 'bg-blue-600' : 'bg-blueGray-900'}`}>
                            <span>Fixed Value</span>
                            {checked ? <CheckedCircle/> : <Nothing/>}
                        </div>
                    )}
                </RadioGroup.Option>
                <RadioGroup.Option as={Fragment} value={ItemTypeEnum.CompoundedGrowth}>
                    {({checked}) => (
                        <div className={`p-3 flex items-center justify-between rounded ${checked ? 'bg-blue-600' : 'bg-blueGray-900'}`}>
                            <span>Compounded Growth</span>
                            {checked ? <CheckedCircle/> : <Nothing/>}
                        </div>
                    )}
                </RadioGroup.Option>
            </RadioGroup>
        </div>
    )
}