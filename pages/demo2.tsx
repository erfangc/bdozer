import {Dialog, Transition} from "@headlessui/react";
import {useRouter} from "next/router";
import {Fragment, useState} from "react";
import {PrimaryButton} from "../components/Common/PrimaryButton";
import {useTimeoutFn} from "react-use";

export default function Demo2() {

    const router = useRouter()
    const [open, setOpen] = useState(false)

    const [, , ,] = useTimeoutFn(() => setOpen(true), 250)

    function next() {
        router.push('/control-panel')
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
                            Done!
                        </Dialog.Title>

                        <div className="mt-6">
                            <p className="text-sm text-blueGray-300">
                                We imported all the data we can. There are <span
                                className="font-bold p-1 rounded bg-blueGray-900">3</span> items that
                                requires your attention
                            </p>
                        </div>

                        <div className="mt-4">
                            <PrimaryButton onClick={next}>
                                Understood, take me to them
                            </PrimaryButton>
                        </div>

                    </Transition.Child>
                </Dialog>
            </Transition>
        </main>
    );
}
