import React, {useEffect, useState} from 'react'
import {RevenueModel} from "../../../../client";
import {PrimaryButton} from "../../../Common/PrimaryButton";
import {SecondaryButton} from "../../../Common/SecondaryButton";
import {NumberInput} from "../../../Common/NumberInput";
import {NumberFormatValues} from "react-number-format";
import {Title} from "../../../Common/Title";

interface Props {
    revenueModel: RevenueModel
    onSubmit: (revenueModel: RevenueModel) => void
    back: () => void
    close: () => void
}

export function ARPU({revenueModel, onSubmit, back, close}: Props) {

    const [terminalYearAverageRevenuePerUser, setTerminalYearAverageRevenuePerUser] = useState(revenueModel.terminalYearAverageRevenuePerUser)
    const [terminalYearActiveUser, setTerminalYearActiveUser] = useState(revenueModel.terminalYearActiveUser)
    const [terminalFiscalYear, setTerminalFiscalYear] = useState(revenueModel.terminalFiscalYear)

    function changeTerminalYearAverageRevenuePerUser(values: NumberFormatValues) {
        setTerminalYearAverageRevenuePerUser(values.floatValue)
    }

    function changeTerminalYearActiveUser(values: NumberFormatValues) {
        setTerminalYearActiveUser(values.floatValue)
    }

    function changeTerminalFiscalYear(values: NumberFormatValues) {
        setTerminalFiscalYear(values.floatValue)
    }

    function handleSubmit() {
        onSubmit({...revenueModel, terminalFiscalYear, terminalYearActiveUser, terminalYearAverageRevenuePerUser})
    }

    useEffect(() => {
        setTerminalYearAverageRevenuePerUser(revenueModel.terminalYearAverageRevenuePerUser)
        setTerminalYearActiveUser(revenueModel.terminalYearActiveUser)
        setTerminalFiscalYear(revenueModel.terminalFiscalYear)
    },[
        revenueModel.terminalYearAverageRevenuePerUser,
        revenueModel.terminalYearActiveUser,
        revenueModel.terminalFiscalYear
    ])

    return (
        <div>
            <Title>Key Revenue Driver Inputs</Title>
            <div className="flex flex-col space-y-2 mt-8">
                <NumberInput value={terminalFiscalYear} label="Terminal Year" onValueChange={changeTerminalFiscalYear} thousandSeparator={false}/>
                <NumberInput value={terminalYearActiveUser} label="Terminal Year Active Users" onValueChange={changeTerminalYearActiveUser}/>
                <NumberInput
                    decimalScale={2}
                    value={terminalYearAverageRevenuePerUser}
                    label="Terminal Year Average Revenue / User"
                    onValueChange={changeTerminalYearAverageRevenuePerUser}
                />
            </div>
            <div className="space-x-2">
                <PrimaryButton
                    className="mt-4"
                    disabled={revenueModel.revenueDriverType === undefined}
                    onClick={handleSubmit}
                >
                    Confirm
                </PrimaryButton>
                <SecondaryButton onClick={back}>Back</SecondaryButton>
                <SecondaryButton onClick={close}>Close</SecondaryButton>
            </div>
        </div>
    )
}