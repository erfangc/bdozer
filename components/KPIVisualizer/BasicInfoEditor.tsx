import {Item, KPIMetadata} from "../../client";
import React, {ChangeEvent} from "react";
import {NumberFormatValues} from "react-number-format";
import {Disclosure} from "@headlessui/react";
import {ChevronDown} from "../Common/Svgs";
import {TextInput} from "../Common/TextInput";
import {NumberInput} from "../Common/NumberInput";

interface BasicInfoEditorProps {
    item?: Item
    kpi?: KPIMetadata
    setItem: (newItem: Item) => void
    setKPI: (newKPI: KPIMetadata) => void
}

export function BasicInfoEditor({item, setItem, kpi, setKPI}: BasicInfoEditorProps) {

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

    function toggleCollapse() {
        const updatedKPI: KPIMetadata = {
            ...kpi,
            collapse: !kpi.collapse
        };
        setKPI(updatedKPI);
    }

    return (
        <Disclosure>
            <Disclosure.Button
                className="flex justify-between w-full py-1 rounded bg-blueGray-800 px-3 py-2 focus:outline-none"
            >
                <span>Basic Info</span><ChevronDown/>
            </Disclosure.Button>
            <Disclosure.Panel className="space-y-4 pt-4 px-3 py-1">
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
                <div className="flex items-center space-x-2 text-sm select-none" onClick={toggleCollapse}>
                    <input type="checkbox" checked={kpi?.collapse} onClick={toggleCollapse}/>
                    <label htmlFor="">Collapse Children</label>
                </div>
            </Disclosure.Panel>
        </Disclosure>
    )
}