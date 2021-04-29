import React, {useState} from 'react'
import {RadioGroup} from "@headlessui/react";
import {Choice} from "./Choice";
import {Title} from "../../../../Common/Title";
import {PrimaryButton} from "../../../../Common/PrimaryButton";
import {RevenueModel, RevenueModelRevenueDriverTypeEnum} from "../../../../../client";

interface Props {
    revenueModel: RevenueModel
    setRevenueModel: (revenueModel: RevenueModel) => void
    next: () => void
}

export function RevenueDriverChooser({revenueModel, setRevenueModel, next}: Props) {

    const [choice, setChoice] = useState<RevenueModelRevenueDriverTypeEnum>(revenueModel.revenueDriverType)

    function handleSetChoice(choice: RevenueModelRevenueDriverTypeEnum) {
        setChoice(choice)
        setRevenueModel({...revenueModel, enabled: choice === 'DriverBased'})
    }

    return (
        <div className="space-y-4">
            <Title className="mb-8">How will Revenue be Determined?</Title>
            <RadioGroup value={choice} onChange={handleSetChoice}>
                <Choice
                    label={`Use Zack's Estimates`}
                    explanation="Apply Zack's median estimates for revenue"
                    value={RevenueModelRevenueDriverTypeEnum.ZacksEstimates}
                />
                <Choice
                    label={`Driver Based`}
                    explanation="Define your own revenue driver"
                    value={RevenueModelRevenueDriverTypeEnum.DriverBased}
                />
            </RadioGroup>
            <PrimaryButton disabled={!choice} onClick={next}>
                Next
            </PrimaryButton>
        </div>
    )
}

