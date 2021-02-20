import React, { useState } from "react";
import NumberFormat from "react-number-format";
import { DeleteButton } from "../../DeleteButton";
import { SecondaryButton } from "../../SecondaryButton";
import { DriverProps } from "./DriverProps";

export function CustomDriver(
    { driver, model, item, onDelete, onEdit }: DriverProps
) {
    return (
        <div className="flex py-2 px-8 bg-blueGray-600 rounded-lg shadow space-x-12">
            <div className="flex-col flex justify-around">
                <span className="font-bold text-lg text-blueGray-200">Custom</span>
                <span className="flex space-x-2">
                    <SecondaryButton onClick={onEdit}>Edit</SecondaryButton>
                    <DeleteButton onClick={onDelete}>Delete</DeleteButton>
                </span>
            </div>
            <div className="flex-col flex justify-around">
                <span className="text-xs text-blueGray-100 whitespace-nowrap">Initial Subscribers</span>
                <pre>{driver.custom?.expression}</pre>
            </div>
        </div>
    )
}

export function CustomDriverEditor() {
    return (
        <div>

        </div>
    )
}