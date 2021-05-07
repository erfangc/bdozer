import {ItemTypeEnum, ManualProjection, StockAnalysis2} from "../../../../client";
import React, {useState} from 'react';
import {Money} from "../../../Common/Card";
import {Dialog} from "@headlessui/react";
import {NumberInput} from "../../../Common/NumberInput";
import {PrimaryButton} from "../../../Common/PrimaryButton";
import {Loading, Play, PrecisionManufacturing} from "../../../Common/Svgs";
import {SecondaryButton} from "../../../Common/SecondaryButton";
import {GhostButton} from "../../../Common/GhostButton";
import {NumberFormatValues} from "react-number-format";
import {useStockAnalysis} from "../../../../api-hooks";
import {useRouter} from "next/router";
import {year} from "../../../../year";

interface Props {
    stockAnalysis: StockAnalysis2
    onClose: () => void
}

export function RevenueCAGR({stockAnalysis, onClose}: Props) {

    const stockAnalysisId = stockAnalysis['_id']
    const stockAnalysisApi = useStockAnalysis()
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [refreshedStockAnalysis, setRefreshedStockAnalysis] = useState<StockAnalysis2>(stockAnalysis)
    const [revenueCARG, setRevenueCARG] = useState<number>(stockAnalysis.derivedStockAnalytics.revenueCAGR * 100)

    async function rerun() {
        setLoading(true)
        try {
            const {model, cells} = stockAnalysis
            const {totalRevenueConceptName, periods} = model;
            const initialValue = cells.find(it => it.period === 0 && it.item.name === totalRevenueConceptName)?.value;
            const manualProjections: ManualProjection[] = [{fiscalYear: year(0), value: initialValue,}];

            for (let i = 0; i < periods; i++) {
                const last = manualProjections[manualProjections.length - 1];
                const next: ManualProjection = {
                    fiscalYear: last.fiscalYear + 1,
                    value: last.value * (1 + revenueCARG / 100.0),
                };
                manualProjections.push(next);
            }

            /*
            replace the current model
             */
            const revenueItem = model.incomeStatementItems.find(it => it.name === totalRevenueConceptName)
            const itemOverrides = [
                ...model
                    .itemOverrides
                    .filter(item => item.name !== totalRevenueConceptName),
                {
                    ...revenueItem,
                    type: ItemTypeEnum.ManualProjections,
                    manualProjections: {
                        manualProjections
                    }
                }
            ];
            /*
            refresh the stock analysis
             */
            const {data: refreshedStockAnalysis} = await stockAnalysisApi.refreshStockAnalysis({
                ...stockAnalysis,
                model: {
                    ...model,
                    itemOverrides,
                }
            })
            setRefreshedStockAnalysis(refreshedStockAnalysis)
        } catch (e) {
            console.error(e)
        }
        setLoading(false)
    }

    function changeRevenueCAGR(values: NumberFormatValues) {
        setRevenueCARG(values.floatValue)
    }

    function goToControlPanel() {
        router.push(`/control-panel/stock-analyses/${stockAnalysisId}`)
    }

    function close() {
        onClose();
        setRefreshedStockAnalysis(stockAnalysis)
    }

    const derivedStockAnalytics = refreshedStockAnalysis.derivedStockAnalytics;
    const targetPrice = derivedStockAnalytics.targetPrice;
    const currentPrice = derivedStockAnalytics.currentPrice;

    return (
        <>
            <Money
                value={targetPrice}
                label={refreshedStockAnalysis !== stockAnalysis ? 'New Fair Value' : "Fair Value"}
                state={targetPrice < currentPrice ? 'danger' : 'good'}
                running={loading}
                darker
            />
            <Dialog.Description className="text-blueGray-300">
                <NumberInput
                    autoFocus
                    value={revenueCARG}
                    label="Revenue Growth Rate %"
                    onValueChange={changeRevenueCAGR}
                />
            </Dialog.Description>
            <div className="flex space-x-2">
                <PrimaryButton disabled={loading} onClick={rerun}>
                    {loading ? <Loading/> : <Play/>}<span>Go</span>
                </PrimaryButton>
                <SecondaryButton onClick={close}>
                    Dismiss
                </SecondaryButton>
            </div>
            <GhostButton onClick={goToControlPanel} className="w-full space-x-2 justify-center relative">
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