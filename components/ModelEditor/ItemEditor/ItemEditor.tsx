import React, { useState } from "react";
import { Driver, Item, Model } from "../../../client";
import { DeleteButton } from "../../DeleteButton";
import { DriverEditor } from "../Drivers/DriverEditor";
import { Drivers } from "../Drivers/Drivers";
import { ItemDescriptionInput } from "./ItemDescriptionInput";
import { ItemFY0Input } from "./ItemFY0Input";

interface ItemEditorProps {
    model: Model
    item: Item
    onChange: (newModel: Model) => void
}

/**
 * Shows an editor for the Item but also 
 * can be swapped to edit the Drivers that belong to the Item
 */
export function ItemEditor({ model, item, onChange }: ItemEditorProps) {

    const [driverBeingEdited, setDriverBeingEdited] = useState<Driver | undefined>(undefined)

    function updateDescription(newDescription) {
        // TODO validate the new description
        const updatedItems = model.incomeStatementItems?.map(oldItem => {
            if (oldItem.name === item.name) {
                return { ...item, description: newDescription }
            } else {
                return oldItem
            }
        })
        onChange({ ...model, incomeStatementItems: updatedItems })
    }

    function updateHistoricalValue(newHistoricalValue) {
        // TODO validate the new description
        const updatedItems = model.incomeStatementItems?.map(oldItem => {
            if (oldItem.name === item.name) {
                return { ...item, historicalValue: newHistoricalValue }
            } else {
                return oldItem
            }
        })
        onChange({ ...model, incomeStatementItems: updatedItems })
    }

    function deleteItem() {
        const updatedItems = model.incomeStatementItems?.filter(i => i.name !== item.name)
        onChange({ ...model, incomeStatementItems: updatedItems })
    }

    //
    // item editor proper, i.e not in driver editor mode
    // alternatively we could be editing a driver instead
    //
    const itemEditorProper =
        <>
            <div className="flex-col space-y-4">
                <ItemDescriptionInput item={item} onChange={updateDescription} />
                <ItemFY0Input item={item} onChange={updateHistoricalValue} />
            </div>
            <Drivers item={item} model={model} onChange={onChange} onEditTriggered={setDriverBeingEdited} />
            <div className="flex-col space-y-4">
                <p className="flex items-center">
                    <span>Formula</span>
                    <span className="ml-4 h-px border-t border-blueGray-300 flex-grow"></span>
                </p>
                <textarea
                    name="expression"
                    rows={3}
                    className="w-full rounded-sm bg-blueGray-900 border-blueGray-500 px-4 py-4"
                    placeholder="Enter formula"
                />
            </div>
            <DeleteButton onClick={deleteItem}>
                Delete Item
            </DeleteButton>
        </>

    function updateDriver(newDriver: Driver) {
        setDriverBeingEdited({ ...driverBeingEdited, ...newDriver })
        const updatedDrivers = item.drivers?.map(driver => {
            if (driver.name === newDriver) {
                return newDriver
            } else {
                return driver
            }
        })
        const updatedItems = model.incomeStatementItems?.map(oldItem => {
            if (oldItem.name === item.name) {
                return { ...item, drivers: updatedDrivers }
            } else {
                return oldItem
            }
        })
        onChange({ ...model, incomeStatementItems: updatedItems })
    }

    const driverEditor = driverBeingEdited
        ? <DriverEditor
            driver={driverBeingEdited}
            onChange={updateDriver}
            onDismiss={() => setDriverBeingEdited(undefined)}
        />
        : null

    return (
        <div className="absolute top-0 left-full ml-4 bg-blueGray-800 px-20 py-8 rounded-lg shadow-md flex-col space-y-8">
            {driverEditor ?? itemEditorProper}
        </div>
    )
}
