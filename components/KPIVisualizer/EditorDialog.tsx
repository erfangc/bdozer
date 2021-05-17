import React from "react";
import {Dialog, Transition} from "@headlessui/react";
import {CompanyKPIs, Item, KPIMetadata} from "../../client";
import {ItemEditor} from "./ItemEditor";

interface Props {
    companyKPIs: CompanyKPIs
    open: boolean
    onSubmit: (newKpi: KPIMetadata, newItem: Item) => void
    onDismiss: () => void
}

export function EditorDialog(
    {onSubmit, open, onDismiss}: Props
) {
    return (
        <Transition show={open}>
            <Dialog
                static
                open={open}
                onClose={onDismiss}
                className="fixed inset-0 h-screen flex justify-center items-center"
            >
                <Dialog.Overlay className="fixed h-screen inset-0 opacity-75 bg-blueGray-800"/>
                <Transition.Child
                    as="div"
                    className="p-6 rounded shadow bg-blueGray-700 text-blueGray-100 z-10 flex flex-col space-y-6 w-96"
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-90"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-90"
                >
                    <Dialog.Title className="text-xl font-bold">Add a New KPI</Dialog.Title>
                    <Dialog.Description className="text-blueGray-300">
                        <ItemEditor onSubmit={onSubmit} onDismiss={onDismiss}/>
                    </Dialog.Description>
                </Transition.Child>
            </Dialog>
        </Transition>
    )
}
