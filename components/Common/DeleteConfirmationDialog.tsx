import React, {useState} from 'react'
import {DangerButton} from "./DangerButton";
import {Delete} from "./Svgs";
import {Dialog, Transition} from "@headlessui/react";
import {SecondaryButton} from "./SecondaryButton";

interface DeleteConfirmationDialogProps {
    resourceName?: string
    message?: string
    label?: string
    onDelete: () => void
}

export function DeleteConfirmationDialog({label, message, resourceName, onDelete}: DeleteConfirmationDialogProps) {

    const [open, setOpen] = useState(false)

    function handleConfirm() {
        setOpen(false)
        onDelete()
    }

    function openModal() {
        setOpen(true)
    }

    function closeModal() {
        setOpen(false)
    }

    return (
        <>
            <DangerButton onClick={openModal}>
                <Delete/>{label ? <span className="pl-1">{label}</span> : null}
            </DangerButton>
            <Transition show={open}>
                <Dialog
                    static
                    open={open}
                    onClose={closeModal}
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
                        <Dialog.Title className="text-xl font-bold">Confirm Delete</Dialog.Title>
                        <Dialog.Description className="text-blueGray-300">
                            {message ? message : `You are about to delete ${resourceName ?? 'this resource'} permanently`}
                        </Dialog.Description>
                        <div className="flex space-x-2">
                            <DangerButton onClick={handleConfirm}><Delete/><span>Confirm</span></DangerButton>
                            <SecondaryButton onClick={closeModal}>No, Keep It</SecondaryButton>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </>
    )
}
