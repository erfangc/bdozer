import React, {ChangeEvent} from 'react'
import {Title} from "../../../../Common/Title";
import {RevenueModel} from "../../../../../client";
import {TextInput} from "../../../../Common/TextInput";
import {PrimaryButton} from "../../../../Common/PrimaryButton";
import {SecondaryButton} from "../../../../Common/SecondaryButton";

interface Props {
    revenueModel: RevenueModel
    setRevenueModel: (RevenueModel) => void
    next: () => void
    back: () => void
}

export function LabelEditor({revenueModel, setRevenueModel, next, back}: Props) {
    const {drivers: [driver]} = revenueModel;
    function changeLabel1(event: ChangeEvent<HTMLInputElement>) {
        const updated: RevenueModel = {
            ...revenueModel,
            drivers: [
                {
                    ...driver,
                    component1: {...driver.component1, label: event.currentTarget.value},
                }
            ]
        }
        setRevenueModel(updated)
    }

    function changeLabel2(event: ChangeEvent<HTMLInputElement>) {
        const updated: RevenueModel = {
            ...revenueModel,
            drivers: [
                {
                    ...driver,
                    component2: {...driver.component2, label: event.currentTarget.value},
                }
            ]
        }
        setRevenueModel(updated)
    }

    const {component1, component2} = driver
    return (
        <div>
            <Title>Driver Variables</Title>
            <div className="flex my-8 space-y-2 flex-col md:flex-row md:space-x-2 md:space-y-0">
                <TextInput label="Variable 1 Name" value={component1.label} onChange={changeLabel1}/>
                <TextInput label="Variable 2 Name" value={component2.label} onChange={changeLabel2}/>
            </div>
            <div className="space-x-2">
                <PrimaryButton onClick={next}>Next</PrimaryButton>
                <SecondaryButton onClick={back}>Back</SecondaryButton>
            </div>
        </div>
    );
}