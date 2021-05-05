import {ItemTypeEnum, RevenueModel, StockAnalysis2} from "../../../../client";
import React, {useEffect, useState} from 'react';
import {Money} from "../../../Common/Card";
import {Dialog} from "@headlessui/react";
import {NumberInput} from "../../../Common/NumberInput";
import {PrimaryButton} from "../../../Common/PrimaryButton";
import {Loading, Play, PrecisionManufacturing} from "../../../Common/Svgs";
import {SecondaryButton} from "../../../Common/SecondaryButton";
import {GhostButton} from "../../../Common/GhostButton";
import {NumberFormatValues} from "react-number-format";
import {useRevenueModeler, useStockAnalysis} from "../../../../api-hooks";
import {useRouter} from "next/router";

interface Props {
    revenueModel: RevenueModel
    stockAnalysis:StockAnalysis2
    onClose: () => void
}

export function ARPU({stockAnalysis, revenueModel, onClose}: Props) {

    const stockAnalysisId = stockAnalysis['_id']
    const revenueModelerApi = useRevenueModeler()
    const stockAnalysisApi = useStockAnalysis()
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [refreshedStockAnalysis, setRefreshedStockAnalysis] = useState<StockAnalysis2>(stockAnalysis)
    const [terminalFiscalYear, setTerminalFiscalYear] = useState<number>()
    const [terminalYearActiveUser, setTerminalYearActiveUser] = useState<number>()
    const [terminalYearAverageRevenuePerUser, setTerminalYearAverageRevenuePerUser] = useState<number>()

    async function init() {
        setTerminalFiscalYear(revenueModel.terminalFiscalYear)
        setTerminalYearActiveUser(revenueModel.terminalYearActiveUser)
        setTerminalYearAverageRevenuePerUser(revenueModel.terminalYearAverageRevenuePerUser)
    }

    async function rerun() {
        setLoading(true)
        try {
            const {model} = stockAnalysis

            const updatedRevenueModel = {
                ...revenueModel,
                terminalFiscalYear,
                terminalYearActiveUser,
                terminalYearAverageRevenuePerUser,
            }

            const {data: manualProjections} = await revenueModelerApi.modelRevenue({
                revenueModel: updatedRevenueModel,
                model
            })

            /*
            replace the current model
             */
            const itemOverrides = model
                .itemOverrides
                .map(item => {
                    if (item.name === model.totalRevenueConceptName) {
                        return {
                            ...item,
                            type: ItemTypeEnum.ManualProjections,
                            manualProjections,
                        }
                    } else {
                        return item
                    }
                })
            /*
            refresh the stock analysis
             */
            const {data: refreshedStockAnalysis} = await stockAnalysisApi.refreshStockAnalysis({
                ...stockAnalysis,
                model: {
                    ...model,
                    itemOverrides: itemOverrides,
                }
            })
            setRefreshedStockAnalysis(refreshedStockAnalysis)
        } catch (e) {
            console.error(e)
        }
        setLoading(false)
    }

    useEffect(() => {
        init()
    }, [stockAnalysisId])

    function changeTerminalYearAverageRevenuePerUser(values: NumberFormatValues) {
        setTerminalYearAverageRevenuePerUser(values.floatValue)
    }

    function changeTerminalYearActiveUser(values: NumberFormatValues) {
        setTerminalYearActiveUser(values.floatValue)
    }

    function changeTerminalFiscalYear(values: NumberFormatValues) {
        setTerminalFiscalYear(values.floatValue)
    }

    function goToControlPanel() {
        router.push(`/control-panel/stock-analyses/${stockAnalysisId}`)
    }

    return (
        <>
        <Money
            value={refreshedStockAnalysis.derivedStockAnalytics.targetPrice}
            label={refreshedStockAnalysis !== stockAnalysis ? 'New Fair Value' : "Fair Value"}
            state={refreshedStockAnalysis.derivedStockAnalytics.targetPrice < refreshedStockAnalysis.derivedStockAnalytics.currentPrice ? 'danger' : 'good'}
            running={loading}
            darker
        />
        <Dialog.Description className="text-blueGray-300">
            <div className="flex flex-col space-y-6">
                <NumberInput
                    value={terminalYearActiveUser}
                    label="Eventual Active Users"
                    onValueChange={changeTerminalYearActiveUser}
                />
                <NumberInput
                    decimalScale={2}
                    value={terminalYearAverageRevenuePerUser}
                    label="Average Revenue per User"
                    onValueChange={changeTerminalYearAverageRevenuePerUser}
                />
                <NumberInput
                    value={terminalFiscalYear}
                    label="Achieve by Year"
                    onValueChange={changeTerminalFiscalYear}
                    thousandSeparator={false}
                />
            </div>
        </Dialog.Description>
        <div className="flex space-x-2">
            <PrimaryButton disabled={loading} onClick={rerun}>{loading ? <Loading/> :
                <Play/>}<span>Go</span></PrimaryButton>
            <SecondaryButton onClick={() => {
                onClose();
                setRefreshedStockAnalysis(stockAnalysis)
            }}>Dismiss</SecondaryButton>
        </div>
        <GhostButton className="w-full justify-center relative" onClick={goToControlPanel}>
            <Beta/>
            <PrecisionManufacturing/><span>Try Advanced Mode</span>
        </GhostButton>
    </>)
}


export function Beta() {
    return (
        <span
            className="text-xs py-0.5 px-1 rounded bg-amber-500 text-blueGray-800 absolute -top-2 -right-2 transform rotate-6">
            Beta
        </span>
    )
}