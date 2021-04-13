import React from 'react';
import { FilingEntity } from "../../../client";
import Link from 'next/link'
interface Props {
    filingEntity: FilingEntity
}

export function FilingEntityCard({ filingEntity }: Props) {
    return (
        <div className='bg-blueGray-700 shadow-md rounded-md grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-4 px-5 gap-4'>
            <div className="flex flex-col">
                <div className="font-light text-sm">Name</div>
                <span className="font-semibold">{filingEntity?.name}</span>
                <Link href={`/control-panel/filing-entities/${filingEntity?.cik}`}>
                    <a className="text-xs cursor-pointer space-x-1">
                        <span>CIK</span>
                        <span className="text-xs text-blue-300">
                            {filingEntity?.cik}
                        </span>
                    </a>
                </Link>
            </div>
            <div className="flex flex-col">
                <div className="font-light text-sm">Trading Symbol</div>
                <span className="font-semibold">{filingEntity?.tradingSymbol}</span>
            </div>
            <div className="flex flex-col">
                <div className="font-light text-sm">SIC Description</div>
                <span className="font-semibold">{filingEntity?.sicDescription}</span>
            </div>
            <div className="flex flex-col">
                <div className="font-light text-sm">Status</div>
                <span className="font-semibold space-x-1">{filingEntity?.statusMessage}</span>
            </div>
        </div>
    )
}