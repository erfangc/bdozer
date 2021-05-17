import React, {ChangeEvent, useState} from "react";
import {Item, KPIMetadata} from "../../client";
import {TextInput} from "../Common/TextInput";
import {NumberInput} from "../Common/NumberInput";
import {NumberFormatValues} from "react-number-format";
import {PrimaryButton} from "../Common/PrimaryButton";
import {DangerButton} from "../Common/DangerButton";
import {Delete} from "../Common/Svgs";

interface Props {
    kpi?: KPIMetadata
    item?: Item
    onSubmit: (kpi: KPIMetadata, item: Item) => void
    onDismiss: () => void
}

export function ItemEditor({item, kpi, onSubmit, onDismiss}: Props) {
    const [kpiName, setKPIName] = useState('')
    const [kpiValue, setKPIValue] = useState<number>()

    function handleKPINameChange({currentTarget, preventDefault}: ChangeEvent<HTMLInputElement>) {
        preventDefault();
        setKPIName(currentTarget.value);
    }

    function handleKPIValueChange({floatValue}: NumberFormatValues) {
        setKPIValue(floatValue);
    }

    return (
        <div className="space-y-4">
            <TextInput label="KPI Name" value={kpiName} onChange={handleKPINameChange}/>
            <NumberInput label="KPI Value" value={kpiValue} onValueChange={handleKPIValueChange}/>
            <div className="flex space-x-2">
                <PrimaryButton>Save</PrimaryButton>
                <DangerButton onClick={onDismiss}><Delete/> Cancel</DangerButton>
            </div>
        </div>
    )
}