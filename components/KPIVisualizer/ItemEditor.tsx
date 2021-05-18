import React, {ChangeEvent, Fragment, useEffect, useState} from "react";
import {Item, ItemTypeEnum, KPIMetadata, KPIMetadataFormatEnum} from "../../client";
import {TextInput} from "../Common/TextInput";
import {NumberInput} from "../Common/NumberInput";
import {NumberFormatValues} from "react-number-format";
import {PrimaryButton} from "../Common/PrimaryButton";
import {DangerButton} from "../Common/DangerButton";
import {CheckedCircle, Delete} from "../Common/Svgs";
import {RadioGroup} from "@headlessui/react";
import {Nothing} from "../Pages/StockAnalysisItemEditor/Svgs";
import {OperatorRadioGroup} from "./OperatorRadioGroup";

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

    function handleKPIDescriptionChange({currentTarget}: ChangeEvent<HTMLInputElement>) {
        const updatedItem: Item = {
            ...item,
            description: currentTarget.value,
        };
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

    function setOperator(itemType: ItemTypeEnum) {
        const updatedItem: Item = {
            ...item,
            type: itemType,
        };
        setItem(updatedItem);
    }

    return (
        <div className="space-y-4">
            <TextInput
                label="Name"
                value={item?.name}
                onChange={handleKPINameChange}
            />
            <TextInput
                label="Description"
                value={item?.description}
                onChange={handleKPIDescriptionChange}
            />
            <NumberInput
                label="FY0 Value" value={item?.historicalValue?.value}
                onValueChange={handleKPIValueChange}
            />
            <div className="flex items-center space-x-2">
                <input type="checkbox" checked={kpi?.collapse} onClick={toggleCollapse}/>
                <label htmlFor="">Collapsed</label>
            </div>
            <div>
                <OperatorRadioGroup value={item?.type} onChange={setOperator}/>
            </div>
            <div className="flex space-x-2">
                <PrimaryButton onClick={handleSubmit}>Save</PrimaryButton>
                <DangerButton onClick={onDismiss}><Delete/> Cancel</DangerButton>
            </div>
        </div>
    );
}
