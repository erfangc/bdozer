import {RadioGroup} from '@headlessui/react'
import React from 'react'
import {RevenueModel, RevenueModelRevenueDriverTypeEnum} from "../../../../client";
import {PrimaryButton} from "../../../Common/PrimaryButton";
import {SecondaryButton} from "../../../Common/SecondaryButton";
import {RadioOption} from "./RadioOption";
import {Title} from "../../../Common/Title";

interface Props {
    revenueModel: RevenueModel
    setRevenueModel: (revenueModel: RevenueModel) => void
    next: () => void
    close: () => void
}

export function RevenueDriverChooser({revenueModel, setRevenueModel, next, close}: Props) {

    function setRevenueDriverType(revenueDriverType: RevenueModelRevenueDriverTypeEnum) {
        setRevenueModel({
            ...revenueModel,
            revenueDriverType
        })
    }

    return (
        <div>
            <Title>How is revenue driven?</Title>
            <RadioGroup
                value={revenueModel.revenueDriverType}
                onChange={setRevenueDriverType}
                className="flex flex-col space-y-4 cursor-pointer"
            >
                <RadioOption
                    label="Zacks Estimates"
                    explanation="Use the median analyst ratings sourced from Zacks estimates"
                    revenueDriverType={RevenueModelRevenueDriverTypeEnum.ZacksEstimates}
                />
                <RadioOption
                    label="ARPU x AU"
                    explanation="Model Average Revenue per User times Active User"
                    revenueDriverType={RevenueModelRevenueDriverTypeEnum.AverageRevenuePerUserTimesActiveUser}
                />
                <RadioOption
                    label="Default"
                    explanation="Use the auto generated model's default"
                    revenueDriverType={undefined}
                />
            </RadioGroup>
            <div className="space-x-2">
                <PrimaryButton
                    className="mt-4"
                    onClick={next}
                >
                    Confirm
                </PrimaryButton>
                <SecondaryButton onClick={close}>Close</SecondaryButton>
            </div>
        </div>
    )
}

