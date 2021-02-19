import React from "react";
import { PrimaryButton } from "../../PrimaryButton";
import { SaaSRevenueDriver } from "./SaaSRevenueDriver";

export function Drivers() {
    return (
        <div className="flex-col space-y-4">
            <p className="flex items-center">
                <span>Driver</span>
                <span className="ml-4 h-px border-t border-blueGray-300 flex-grow"></span>
            </p>
            {/* TODO replace with real editor or data */}
            <SaaSRevenueDriver />
            <PrimaryButton>Add Driver</PrimaryButton>
        </div>
    )
}