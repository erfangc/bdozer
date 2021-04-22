import React, {useState} from "react"
import {Component, Item, ItemTypeEnum, Model} from "../../../client"
import {BlockQuote} from "../../Common/BlockQuote";
import {GhostButton} from "../../Common/GhostButton";
import {Plus} from "../../Common/Svgs";
import {ManagedTextInput} from "../../Common/TextInput";
import {ItemAutocomplete} from "../../Autocomplete/ItemAutocomplete";

interface Props {
    model: Model
    item: Item
    onSubmit: (item: Item) => void
}

export function SumOfOtherItemsEditor({item, model, onSubmit}: Props) {

    const [sumOfOtherItems, setSumOfOtherItems] = useState(item.sumOfOtherItems || {components:[]})

    function updateComponentName(oldValue: string, newValue: string) {
        const updatedComponent = sumOfOtherItems.components.map(component => {
            if (component.itemName === oldValue) {
                return {...component, itemName: newValue}
            } else {
                return component
            }
        })
        setSumOfOtherItems({...sumOfOtherItems, components: updatedComponent})
        onSubmit({
            ...item,
            type: ItemTypeEnum.SumOfOtherItems,
            sumOfOtherItems: {...sumOfOtherItems, components: updatedComponent}
        })
    }

    function updateComponentWeight(itemName: string, newValue: string) {
        const newWeight = parseFloat(newValue)
        const updatedComponent = sumOfOtherItems.components.map(component => {
            if (component.itemName === itemName) {
                return {...component, weight: newWeight}
            } else {
                return component
            }
        })
        setSumOfOtherItems({...sumOfOtherItems, components: updatedComponent})
        onSubmit({
            ...item,
            type: ItemTypeEnum.SumOfOtherItems,
            sumOfOtherItems: {...sumOfOtherItems, components: updatedComponent}
        })
    }

    function add() {
        const updatedComponent: Component[] = [...sumOfOtherItems.components, {
            itemName: 'NewItemPleaseRename',
            weight: 1
        }]
        setSumOfOtherItems({...sumOfOtherItems, components: updatedComponent})
        onSubmit({
            ...item,
            type: ItemTypeEnum.SumOfOtherItems,
            sumOfOtherItems: {...sumOfOtherItems, components: updatedComponent}
        })
    }

    function remove(itemName: string) {
        const updatedComponent = sumOfOtherItems.components.filter(component => component.itemName !== itemName)
        setSumOfOtherItems({...sumOfOtherItems, components: updatedComponent})
        onSubmit({
            ...item,
            type: ItemTypeEnum.SumOfOtherItems,
            sumOfOtherItems: {...sumOfOtherItems, components: updatedComponent}
        })
    }

    return (
        <div className="flex-col space-y-4">
            <BlockQuote>Specify other items to sum over</BlockQuote>
            <div className="hidden md:grid gap-2 grid-cols-6 text-sm font-bold">
                <div className="md:col-span-4">Item Name</div>
                <div>Weight</div>
                <div/>
            </div>
            <ul className="flex flex-col space-y-6">
                {sumOfOtherItems.components.map(component => (
                    <li key={component.itemName} className="grid gap-2 grid-cols-6">
                        <ItemAutocomplete
                            model={model}
                            onItemSelect={newItem => updateComponentName(component.itemName, newItem.name)}
                            initialValue={component.itemName}
                            wrapperClassName="col-span-6 md:col-span-4"
                            className="border border-blueGray-500 rounded w-full bg-blueGray-900"
                            choicesContainerClassName="rounded bg-blueGray-800 shadow-md min-w-full text-sm"
                            choiceClassName="text-blueGray-100 px-3"
                        />
                        <ManagedTextInput
                            onInputSubmit={newValue => updateComponentWeight(component.itemName, newValue)}
                            value={component.weight}
                        />
                        <button
                            className="fill-current text-blueGray-500 hover:text-blueGray-400 transition ease-linear focus:outline-none "
                            onClick={() => remove(component.itemName)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px">
                                <path d="M0 0h24v24H0z" fill="none"/>
                                <path
                                    d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                            </svg>
                        </button>
                    </li>
                ))}
            </ul>
            <GhostButton onClick={add}>
                <Plus/><span className="pl-1">Add</span>
            </GhostButton>
        </div>
    )
}