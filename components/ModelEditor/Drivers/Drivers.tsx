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
            <PrimaryButton>Add Driver</PrimaryButton>
        </div>
    )
}