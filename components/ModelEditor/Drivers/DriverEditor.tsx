import React from "react";
import { Driver, DriverTypeEnum } from "../../../client";
import { NumberInput } from "../../NumberInput";
import { PrimaryButton } from "../../PrimaryButton";
import { TextInput } from "../../TextInput";

interface DriverEditorProps {
    driver: Driver
    onChange: (driver: Driver) => void
    onDismiss: () => void
}

export function DriverEditor({ driver, onDismiss, onChange }: DriverEditorProps) {

    let driverSpecificForm = null

    switch (driver.type) {
        case DriverTypeEnum.SaaSRevenue:
            driverSpecificForm =
                <SaaSRevenueDriverEditor driver={driver} onChange={onChange} />
            break;
        case DriverTypeEnum.Custom:
            driverSpecificForm =
                <CustomDriverEditor driver={driver} onChange={onChange} />
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
            <PrimaryButton onClick={onDismiss}>Confirm</PrimaryButton>
        </div>
    )
}

interface Props {
    driver: Driver
    onChange: (driver: Driver) => void
}

function SaaSRevenueDriverEditor({ driver, onChange }: Props) {
    return (
        <div>
            <NumberInput
                label="Total Subscription At Terminal Year"
                value={driver.saaSRevenue?.totalSubscriptionAtTerminalYear}
                onValueChange={({ floatValue }) => onChange({ ...driver, saaSRevenue: { ...driver.saaSRevenue, totalSubscriptionAtTerminalYear: floatValue } })}
            />
            <NumberInput
                label="Initial Subscriptions"
                value={driver.saaSRevenue?.initialSubscriptions}
                onValueChange={({ floatValue }) => onChange({ ...driver, saaSRevenue: { ...driver.saaSRevenue, initialSubscriptions: floatValue } })}
            />
            <NumberInput
                label="Average Revenue per Subscription"
                value={driver.saaSRevenue?.averageRevenuePerSubscription}
                onValueChange={({ floatValue }) => onChange({ ...driver, saaSRevenue: { ...driver.saaSRevenue, averageRevenuePerSubscription: floatValue } })}
            />
        </div>
    )
}

function CustomDriverEditor({ driver, onChange }: Props) {
    return (
        <div className="flex-col flex">
            <label className="mb-2 text-sm">Formula</label>
            <textarea
                name="expression"
                rows={3}
                value={driver.customDriver?.formula}
                onChange={({ currentTarget: { value } }) => onChange({ ...driver, customDriver: { ...driver.customDriver, formula: value } })}
                className="w-full rounded-sm bg-blueGray-900 border-blueGray-500 px-4 py-4 outline-none"
                placeholder="Enter formula"
            />
        </div>
    )
}