import React from "react";
import { Driver, DriverTypeEnum, Item, Model } from "../../../client";
import { PrimaryButton } from "../../PrimaryButton";
import { CustomDriver } from "./CustomDriver";
import { SaaSRevenueDriver } from "./SaaSRevenueDriver";

interface DriversProps {
    item: Item
    model: Model
    onChange: (newModel: Model) => void
    onEditTriggered: (driver: Driver) => void
}

export function Drivers({ item, model, onChange, onEditTriggered }: DriversProps) {

    const drivers = item.drivers ?? []

    function addDriver() {
        const num = (model.items?.flatMap(({ drivers }) => drivers)?.length ?? 0) + 1;
        const newDriver: Driver = {
            name: `Driver_${num}`,
            type: DriverTypeEnum.Custom,
            custom: {
                expression: '0'
            }
        }
        const updatedDrivers = [...(item?.drivers || []), newDriver]
        const updatedItems = model.items?.map(oldItem => {
            if (oldItem.name === item.name) {
                return {
                    ...item,
                    drivers: updatedDrivers
                }
            } else {
                return oldItem
            }
        })
        onChange({ ...model, items: updatedItems })
    }

    return (
        <div className="flex-col space-y-4">
            <p className="flex items-center">
                <span>Driver</span>
                <span className="ml-4 h-px border-t border-blueGray-300 flex-grow"></span>
            </p>
            {
                drivers.map(driver => {
                    if (driver.type === DriverTypeEnum.SaaSRevenue) {
                        return (
                            <SaaSRevenueDriver
                                item={item}
                                driver={driver}
                                model={model}
                                onChange={onChange}
                                onEdit={() => onEditTriggered(driver)}
                            />
                        )
                    } else if (driver.type === DriverTypeEnum.Custom) {
                        return (
                            <CustomDriver
                                item={item}
                                driver={driver}
                                model={model}
                                onChange={onChange}
                                onEdit={() => onEditTriggered(driver)}
                            />
                        )
                    } else {
                        return null
                    }
                })
            }
            <PrimaryButton onClick={addDriver}>Add Driver</PrimaryButton>
        </div>
    )
}