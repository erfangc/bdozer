import React, {useEffect, useState} from 'react'
import {Dialog, Transition} from "@headlessui/react";
import {RevenueModel, StockAnalysis2} from "../../../../client";
import {ARPU} from "./ARPU";
import {useRevenueModeler} from "../../../../api-hooks";
import {useRouter} from "next/router";

interface Props {
    stockAnalysis: StockAnalysis2
}

export function TryDifferentAssumptions({stockAnalysis}: Props) {

    const router = useRouter();
    const stockAnalysisId = stockAnalysis['_id']
    const [open, setOpen] = useState(false)
    const revenueModelerApi = useRevenueModeler()
    const [revenueModel, setRevenueModel] = useState<RevenueModel>()

    async function init() {
        const {data: revenueModel} = await revenueModelerApi.getRevenueModel(stockAnalysisId)
        setRevenueModel(revenueModel)
    }

    useEffect(() => {
        init()
    }, [])

    function openModal() {
        if (revenueModel.revenueDriverType !== 'AverageRevenuePerUserTimesActiveUser') {
            router.push(`/control-panel/stock-analyses/${stockAnalysisId}`)
        } else {
            setOpen(true);
        }
    }

    function closeModal() {
        setOpen(false)
    }

    return (
        <>
            <button
                onClick={openModal}
                className="hover:bg-blue-500 transition ease-in px-4 py-1 rounded border mx-2 border-blueGray-600 block flex justify-center items-center focus:outline-none"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M3 17V19H9V17H3ZM3 5V7H13V5H3ZM13 21V19H21V17H13V15H11V21H13ZM7 9V11H3V13H7V15H9V9H7ZM21 13V11H11V13H21ZM15 9H17V7H21V5H17V3H15V9Z"
                        fill="#CBD5E1"
                    />
                </svg>
                <span className="pl-2">Try Different Assumptions</span>
            </button>
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
                        className="p-6 rounded shadow bg-blueGray-700 text-blueGray-100 z-10 flex flex-col space-y-12 w-96"
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-90"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-90"
                    >
                        <Dialog.Title className="text-xl font-bold">Try Your Assumptions</Dialog.Title>
                        <ARPU stockAnalysis={stockAnalysis} revenueModel={revenueModel} onClose={closeModal}/>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </>
    )
}

export function Beta() {
    return (
        <span
            className="text-xs py-0.5 px-1 rounded bg-amber-500 text-blueGray-800 absolute -top-2 -right-2 transform rotate-6">
            Beta
        </span>
    )
}