import React from "react";
import NumberFormat from "react-number-format";
import { Model } from "../../../client";
import { DeleteButton } from "../../DeleteButton";
import { SecondaryButton } from "../../SecondaryButton";
import { DriverProps } from "./DriverProps";

export function SaaSRevenueDriver({
    driver, model, onChange, onEdit
}: DriverProps) {

    const saaSRevenue = driver.saaSRevenue

    function deleteDriver() {
        const updatedItems = model.incomeStatementItems?.map(oldItem => {
            const drivers = oldItem.drivers?.filter(oldDriver => oldDriver.name !== driver.name)
            return { ...oldItem, drivers }
        })
        const updatedModel: Model = { ...model, incomeStatementItems: updatedItems }
        onChange(updatedModel)
    }

    return (
        <div className="flex py-2 px-8 bg-blueGray-600 rounded-lg shadow space-x-12">
            <div className="flex-col flex justify-around">
                <span className="font-bold text-lg text-blueGray-200">SaaSRevenue</span>
                <span className="flex space-x-2">
                    <SecondaryButton onClick={onEdit}>Edit</SecondaryButton>
                    <DeleteButton onClick={deleteDriver}>Delete</DeleteButton>
                </span>
            </div>
            <div className="flex-col flex justify-around">
                <span className="text-xs text-blueGray-100 whitespace-nowrap">Initial Subscribers</span>
                <NumberFormat
                    className="hover:text-blueGray-400"
                    thousandSeparator
                    decimalScale={0}
                    displayType='text'
                    value={saaSRevenue.initialSubscriptions}
                />
            </div>
            <div className="flex-col flex justify-around whitespace-nowrap">
                <span className="text-xs text-blueGray-100">ARR</span>
                <NumberFormat
                    className="hover:text-blueGray-400"
                    thousandSeparator
                    decimalScale={0}
                    displayType='text'
                    value={saaSRevenue.averageRevenuePerSubscription}
                />
            </div>
            <div className="flex-col flex justify-around whitespace-nowrap">
                <span className="text-xs text-blueGray-100">Eventual Subscribers</span>
                <NumberFormat
                    className="hover:text-blueGray-400"
                    thousandSeparator
                    decimalScale={0}
                    displayType='text'
                    value={saaSRevenue.totalSubscriptionAtTerminalYear}
                />
            </div>
        </div>
    )
}