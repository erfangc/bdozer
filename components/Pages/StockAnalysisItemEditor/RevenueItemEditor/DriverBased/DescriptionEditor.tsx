import React, {ChangeEvent} from 'react'
import {Title} from "../../../../Common/Title";
import {RevenueModel} from "../../../../../client";
import {PrimaryButton} from "../../../../Common/PrimaryButton";
import {TextArea} from "../../../../Common/Textarea";
import {SecondaryButton} from "../../../../Common/SecondaryButton";

interface Props {
    revenueModel: RevenueModel
    setRevenueModel: (RevenueModel) => void
    next: () => void
    back: () => void
}

export function DescriptionEditor({revenueModel, setRevenueModel, next, back}: Props) {
    const {drivers: [driver]} = revenueModel;

    function changeLabel1(event: ChangeEvent<HTMLTextAreaElement>) {
        const updated: RevenueModel = {
            ...revenueModel,
            drivers: [
                {
                    ...driver,
                    component1: {...driver.component1, description: event.currentTarget.value},
                }
            ]
        }
        setRevenueModel(updated)
    }

    function changeLabel2(event: ChangeEvent<HTMLTextAreaElement>) {
        const updated: RevenueModel = {
            ...revenueModel,
            drivers: [
                {
                    ...driver,
                    component2: {...driver.component2, description: event.currentTarget.value},
                }
            ]
        }
        setRevenueModel(updated)
    }

    const {component1, component2} = driver
    return (
        <div>
            <Title>Driver Based</Title>
            <div className="space-y-4 my-8">
                <TextArea label={`${component1.label} Description`} value={component1.description} onChange={changeLabel1}/>
                <TextArea label={`${component2.label} Description`} value={component2.description} onChange={changeLabel2}/>
            </div>
            <div className="space-x-2">
                <PrimaryButton onClick={next}>
                    Next
                </PrimaryButton>
                <SecondaryButton onClick={back}>Back</SecondaryButton>
            </div>
        </div>
    );
}