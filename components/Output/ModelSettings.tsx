import React, { useState } from "react";
import Modal from 'react-modal';
import { Model } from "../../client";
import { AutoForm, Schema } from "../AutoForms/AutoForm";
import { DeleteButton } from "../Common/DeleteButton";
import { PrimaryButton } from "../Common/PrimaryButton";
import { Cogs } from "../ButtonSvgs/Cogs";

Modal.setAppElement('#__next');

interface ModelSettingsProps {
    model: Model
    onChange: (newModel: Model) => void
}

export function ModelSettings({ model, onChange }: ModelSettingsProps) {
    const [open, setOpen] = useState(false)

    function openModal() {
        setOpen(true)
    }

    function closeModal() {
        setOpen(false)
    }

    function handleSubmit(newModel: Model) {
        onChange(newModel)
        closeModal()
    }

    return (
        <div>
            <PrimaryButton onClick={openModal}>
                <Cogs />
                <span>Model Settings</span>
            </PrimaryButton>
            <Modal
                overlayClassName="z-10"
                shouldCloseOnOverlayClick
                className="z-10 top-8 left-1/4 right-1/4 absolute p-10 overflow-auto rounded-lg outline-none bg-blueGray-700 text-blueGray-50"
                isOpen={open}
                onRequestClose={closeModal}
            >
                <h1 className="text-2xl font-bold">Model Settings</h1>
                <p className="text-sm mt-2 mb-12 font-light">
                    Configure settings for discount rates, beta, corporate tax rate and other common inputs into an equity valuation model
                </p>
                <AutoForm body={model} schema={schema} onSubmit={handleSubmit} useGrid />
                <DeleteButton onClick={closeModal} className="mt-2">
                    Close
                </DeleteButton>
            </Modal>
        </div>
    )
}

const schema: Schema[] = [
    {
        name: 'name',
        type: 'string',
        label: 'Model Name',
        fullLength: true
    },
    {
        name: 'description',
        type: 'textarea',
        label: 'Description',
        fullLength: true
    },
    {
        name: 'symbol',
        type: 'string',
        label: 'Symbol'
    },
    {
        name: 'cik',
        type: 'string',
        label: 'CIK'
    },
    {
        name: "currentPrice",
        type: "number",
        label: "Current Price"
    },
    {
        name: "beta",
        type: "number",
        label: "Beta"
    },
    {
        name: "sharesOutstanding",
        type: "number",
        label: "Shares Outstanding"
    },
    {
        name: "dilutedSharesOutstanding",
        type: "number",
        label: "Diluted Shares Outstanding"
    },
    {
        name: "corporateTaxRate",
        type: "percent",
        label: "Corporate Tax Rate %"
    },
    {
        name: "costOfDebt",
        type: "percent",
        label: "Cost Of Debt %"
    },
    {
        name: "riskFreeRate",
        type: "percent",
        label: "Risk Free Rate %"
    },
    {
        name: "equityRiskPremium",
        type: "percent",
        label: "Equity Risk Premium %"
    },
    {
        name: "terminalFcfMultiple",
        type: "number",
        label: "Terminal FCF Multiple"
    },
    {
        name: "terminalFcfGrowthRate",
        type: "percent",
        label: "Terminal FCF Growth Rate %"
    },
    {
        name: "periods",
        type: "integer",
        label: "Projection Periods"
    }
]