import React from 'react';
import {FilingEntity} from "../../client";

interface Props {
    loading: boolean
    filingEntity: FilingEntity
}

export function FilingEntityCard({loading, filingEntity}: Props) {
    if (loading) {
        return <LoadingSkeletons/>
    } else {
        return (
            <div
                className='bg-blueGray-700 shadow-md rounded grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-4 px-5 gap-4'>
                <div className="flex flex-col col-span-2 md:col-span-1">
                    <div className="font-light text-sm">Name</div>
                    <span className="font-semibold">{filingEntity?.name}</span>
                    <div>
                        <span className="text-xs">CIK </span>
                        <a className="text-xs cursor-pointer space-x-1" href={`https://www.sec.gov/edgar/browse/?CIK=${filingEntity?.cik}&owner=exclude`}>
                            <span className="text-xs text-blue-300">
                                {filingEntity?.cik}
                            </span>
                        </a>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="font-light text-sm">Trading Symbol</div>
                    <span className="font-semibold">{filingEntity?.tradingSymbol}</span>
                </div>
                <div className="flex flex-col col-span-2">
                    <div className="font-light text-sm">SIC Description</div>
                    <span className="font-semibold">{filingEntity?.sicDescription}</span>
                </div>
            </div>
        );
    }
}

function LoadingSkeletons() {
    return (
        <div
            className='bg-blueGray-700 shadow-md rounded grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-4 px-5 gap-4'>
            <div className="flex flex-col animate-pulse space-y-1">
                <div className="bg-blueGray-500 h-4 w-12 rounded"/>
                <div className="bg-blueGray-500 h-5 w-24 rounded"/>
                <div className="bg-blueGray-500 h-4 w-32 rounded"/>
            </div>
            <div className="flex flex-col animate-pulse space-y-1">
                <div className="h-5 w-32 bg-blueGray-500 rounded"/>
                <div className="h-8 w-32 bg-blueGray-500 rounded"/>
                <div/>
            </div>
            <div className="flex flex-col animate-pulse space-y-1">
                <div className="h-5 w-32 bg-blueGray-500 rounded"/>
                <div className="h-8 w-32 bg-blueGray-500 rounded"/>
                <div/>
            </div>
        </div>
    )
}