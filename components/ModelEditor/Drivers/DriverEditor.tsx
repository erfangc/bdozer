import React from "react";
import { Driver, DriverTypeEnum } from "../../../client";
import { NumberInput } from "../../NumberInput";
import { PrimaryButton } from "../../PrimaryButton";
import { TextInput } from "../../TextInput";

interface DriverEditorProps {
    driver: Driver
    onChange: (driver: Driver) => void
}

export function DriverEditor({ driver, onChange }: DriverEditorProps) {

    let driverSpecificForm = null

    switch (driver.type) {
        case DriverTypeEnum.SaaSRevenue:
            driverSpecificForm =
                <div>
                    <NumberInput label="Total Subscription At Terminal Year" />
                    <NumberInput label="Initial Subscriptions" />
                    <NumberInput label="Average Revenue per Subscription" />
                </div>
            break;
        case DriverTypeEnum.Custom:
            driverSpecificForm =
                <div className="flex-col flex">
                    <label className="mb-2 text-sm">Formula</label>
                    <textarea
                        name="expression"
                        rows={3}
                        className="w-full rounded-sm bg-blueGray-900 border-blueGray-500 px-4 py-4 outline-none"
                        placeholder="Enter formula"
                    />
                </div>
            break;
        default:
            driverSpecificForm = null
    }

    return (
        <div className="flex-col space-y-6">
            <div className="flex-col space-y-4">
                <TextInput label="Driver Name" value={driver.name} />
                <div className="flex-col flex">
                    <label className="mb-2 text-sm">Driver Type</label>
                    <select
                        className="w-48 h-11 border border-blueGray-500 bg-blueGray-900 text-blueGray-50 rounded-sm px-4 py-2 appearance-none outline-none"
                        value={driver.type}
                        onChange={({ currentTarget: { value } }) => onChange({ ...driver, type: value as any })}
                    >
                        <option>{DriverTypeEnum.SaaSRevenue}</option>
                        <option>{DriverTypeEnum.Custom}</option>
                        <option>{DriverTypeEnum.FixedCost}</option>
                        <option>{DriverTypeEnum.VariableCost}</option>
                    </select>
                </div>
            </div>
            <p className="flex items-center w-96">
                <span>Driver</span>
                <span className="ml-4 h-px border-t border-blueGray-300 flex-grow"></span>
            </p>
            {driverSpecificForm}
            <PrimaryButton>Confirm</PrimaryButton>
        </div>
    )
}