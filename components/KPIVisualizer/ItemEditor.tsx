import React, {ChangeEvent, useEffect, useState} from "react";
import {Item, ItemTypeEnum, KPIMetadata, KPIMetadataFormatEnum} from "../../client";
import {TextInput} from "../Common/TextInput";
import {NumberInput} from "../Common/NumberInput";
import {NumberFormatValues} from "react-number-format";
import {PrimaryButton} from "../Common/PrimaryButton";
import {DangerButton} from "../Common/DangerButton";
import {Delete} from "../Common/Svgs";

interface Props {
    kpi?: KPIMetadata
    item?: Item
    onSubmit: (
        newKPI: KPIMetadata, newItem: Item,
        kpi?: KPIMetadata, item?: Item,
    ) => void
    onDismiss: () => void
}

const initItem: Item = {
    name: '',
    type: ItemTypeEnum.Custom,
    formula: '0.0',
}

const initKPI: KPIMetadata = {
    itemName: '',
    format: KPIMetadataFormatEnum.Money,
}

export function ItemEditor(props: Props) {

    const {onSubmit, onDismiss} = props;

    const [item, setItem] = useState<Item>(props.item ?? initItem);
    const [kpi, setKPI] = useState<KPIMetadata>(props.kpi ?? initKPI);

    useEffect(() => {
        setItem(props.item);
        setKPI(props.kpi);
    }, [props.item, props.kpi]);

    function handleKPINameChange({currentTarget}: ChangeEvent<HTMLInputElement>) {
        const updatedItem: Item = {
            ...item,
            name: currentTarget.value,
        };
        const updatedKPI: KPIMetadata = {
            ...kpi,
            itemName: currentTarget.value,
        };
        setKPI(updatedKPI);
        setItem(updatedItem);
    }

    function handleKPIValueChange({floatValue}: NumberFormatValues) {
        const updatedItem: Item = {
            ...item,
            historicalValue: {
                ...item.historicalValue,
                value: floatValue,
            }
        };
        setItem(updatedItem);
    }

    function handleSubmit() {
        onSubmit(kpi, item, props.kpi, props.item);
    }

    function toggleCollapse() {
        const updatedKPI: KPIMetadata = {
            ...kpi,
            collapse: !kpi.collapse
        };
        setKPI(updatedKPI);
    }

    return (
        <div className="space-y-4">
            <TextInput
                label="KPI Name"
                value={item?.name}
                onChange={handleKPINameChange}
            />
            <NumberInput
                label="KPI Value" value={item?.historicalValue?.value}
                onValueChange={handleKPIValueChange}
            />
            <div className="flex items-center space-x-2">
                <input type="checkbox" checked={kpi.collapse} onClick={toggleCollapse}/>
                <label htmlFor="">Collapsed</label>
            </div>
            <div className="flex space-x-2">
                <PrimaryButton onClick={handleSubmit}>Save</PrimaryButton>
                <DangerButton onClick={onDismiss}><Delete/> Cancel</DangerButton>
            </div>
        </div>
    );
}