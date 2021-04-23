import React, {useState} from 'react'
import {Item, ItemTypeEnum, Model} from "../../../../client";
import {NumberInput} from "../../../Common/NumberInput";
import {NumberFormatValues} from "react-number-format";
import {ItemAutocomplete} from "../../../Autocomplete/ItemAutocomplete";

interface Props {
    item: Item
    model: Model
    onSubmit: (Item) => void
}

export function PercentOfAnotherItemEditor({item, model, onSubmit}: Props) {
    const initialDependentItem = [...(model?.incomeStatementItems || []), ...(model?.balanceSheetItems || [])]
        .find(it => it.name === item?.percentOfAnotherItem?.itemName)

    const [value, setValue] = useState((item?.percentOfAnotherItem?.percent ?? 0) * 100)
    const [dependentItem, setDependentItem] = useState<Item>(initialDependentItem)

    function handleChange({floatValue}: NumberFormatValues) {
        setValue(floatValue)
    }

    function handleSubmit(value: number) {
        const updatedItem: Item = {
            ...item,
            type: ItemTypeEnum.PercentOfAnotherItem,
            percentOfAnotherItem: {
                itemName: dependentItem.name,
                percent: value / 100.0
            }
        }
        onSubmit(updatedItem)
    }

    function setOtherItemName(otherItem: Item) {
        setDependentItem(otherItem)
    }

    return (
        <div className="flex flex-col space-y-4">
            <div>
                <label className="mb-2 text-sm">Choose Item:</label>
                <ItemAutocomplete
                    className="rounded bg-blueGray-900 border-blueGray-500 border w-full"
                    choicesContainerClassName="bg-blueGray-800 rounded shadow-md min-w-full"
                    choiceClassName="px-4"
                    onItemSelect={setOtherItemName}
                    initialValue={dependentItem?.name}
                    model={model}
                />
            </div>
            <NumberInput
                value={value}
                disabled={!dependentItem}
                label={dependentItem ? `Percent` : '-'}
                onValueChange={handleChange}
                onBlur={() => handleSubmit(value)}
            />
        </div>
    )
}