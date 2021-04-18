import {Dialog, Listbox, Transition} from "@headlessui/react";
import {useRouter} from "next/router";
import React, {Fragment, useState} from "react";
import {useTimeoutFn} from "react-use";
import {CheckIcon, SelectorIcon} from "@heroicons/react/solid";
import {PrimaryButton} from "../components/Common/PrimaryButton";

const people = [
    {name: "Wade Cooper"},
    {name: "Arlene Mccoy"},
    {name: "Devon Webb"},
    {name: "Tom Cook"},
    {name: "Tanya Fox"},
    {name: "Hellen Schmidt"},
];

function Select() {

    const [selected, setSelected] = useState(people[0]);

    return (
        <div className="w-72 fixed top-16">
            <Listbox value={selected} onChange={setSelected}>
                {({open}) => (
                    <>
                        <div className="relative mt-1 text-blueGray-50">
                            <Listbox.Button
                                className="relative w-full py-2 pl-3 pr-10 text-left bg-blueGray-700 rounded shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                                <span className="block truncate">{selected.name}</span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                  <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true"/>
                                </span>
                            </Listbox.Button>
                            <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options
                                    static
                                    className="absolute w-full py-1 mt-1 overflow-auto text-base bg-blueGray-700 rounded shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                >
                                    {people.map((person, personIdx) => (
                                        <Listbox.Option
                                            key={personIdx}
                                            value={person}
                                            className={({active, selected}) =>
                                                `${active || selected ? "text-blueGray-50 bg-blue-500" : "text-blueGray-50"}
                                                cursor-default select-none relative py-2 pl-10 pr-4`
                                            }
                                        >
                                            {({selected}) => (
                                                <>
                                                  <span className={`${selected ? "font-bold" : "font-normal"} block truncate`}>
                                                    {person.name}
                                                  </span>
                                                    {selected
                                                        ? (
                                                            <span className="text-blueGray-50 absolute inset-y-0 left-0 flex items-center pl-3">
                                                              <CheckIcon className="w-5 h-5" aria-hidden="true"/>
                                                            </span>
                                                        ) : null
                                                    }
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </>
                )}
            </Listbox>
        </div>
    );
}

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

                        <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-blueGray-50">
                            Step 1 - Scaffold the Model
                        </Dialog.Title>

                        <div className="my-6 text-blueGray-300">
                            <p className="text-sm">
                                We will automatically import <span className="font-extrabold">TSLA</span>'s financial
                                statements and autofill as much of the
                                valuation model as much as possible
                            </p>
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
