import {Dialog, Transition} from "@headlessui/react";
import {useRouter} from "next/router";
import {Fragment, useState} from "react";
import {PrimaryButton} from "../components/Common/PrimaryButton";
import {useTimeoutFn} from "react-use";

export default function Demo() {

    const router = useRouter()
    const [open, setOpen] = useState(false)

    const [, , ,] = useTimeoutFn(() => setOpen(true), 250)

    function next() {
        router.push('/demo2')
    }

    return (
        <main className="flex items-center justify-center h-screen bg-blueGray-900">
            <Transition show={open} as={Fragment}>
                <Dialog
                    static
                    as="div"
                    id="modal"
                    className="fixed inset-0 z-10 flex items-center justify-center"
                    open={open}
                    onClose={next}
                >
                    <Transition.Child
                        as="div"
                        enter="ease-out duration-500"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                        className="max-w-lg p-6 overflow-hidden text-left align-middle transition-all transform bg-blueGray-700 shadow rounded"
                    >

                        <Dialog.Title
                            as="h3"
                            className="text-xl font-medium leading-6 text-blueGray-50"
                        >
                            Step 1 - Scaffold the Model
                        </Dialog.Title>

                        <div className="mt-6">
                            <p className="text-sm text-blueGray-300">
                                We will automatically import <b>TSLA</b>'s financial
                                statements and autofill as much of the
                                valuation model as much as possible
                            </p>
                            <p className="mt-2 text-blueGray-200 text-sm font-light">This may take several seconds to 1
                                minute</p>
                        </div>

                        <div className="mt-4">
                            <PrimaryButton onClick={next}>
                                Got it, go ahead
                            </PrimaryButton>
                        </div>

                    </Transition.Child>
                </Dialog>
            </Transition>
        </main>
    );
}
