import React from 'react'
import {Title} from "../../../../Common/Title";
import {RevenueComponent, RevenueModel} from "../../../../../client";
import {PrimaryButton} from "../../../../Common/PrimaryButton";
import {SecondaryButton} from "../../../../Common/SecondaryButton";
import {ComponentValuesEditor} from "./ComponentValuesEditor";

interface Props {
    revenueModel: RevenueModel
    setRevenueModel: (RevenueModel) => void
    next: () => void
    back: () => void
}

export function ValueEditor(props: Props) {
    const {revenueModel, setRevenueModel, next, back} = props;
    const {drivers: [driver]} = revenueModel;

    function setComponent1(component: RevenueComponent) {
        setRevenueModel({
            ...revenueModel,
            drivers: [{...driver, component1: component}]
        })
    }

    function setComponent2(component: RevenueComponent) {
        setRevenueModel({
            ...revenueModel,
            drivers: [{...driver, component2: component}]
        })
    }

    return (
        <div>
            <Title>Enter Variable Values</Title>
            <div className="space-y-8 mt-12">
                <ComponentValuesEditor {...props} component={driver.component1} setComponent={setComponent1}/>
                <ComponentValuesEditor {...props} component={driver.component2} setComponent={setComponent2}/>
            </div>
            <div className="space-x-2 mt-12 mb-4">
                <PrimaryButton onClick={next}>Done</PrimaryButton>
                <SecondaryButton onClick={back}>Back</SecondaryButton>
            </div>
        </div>
    );
}
