import {StockAnalysisProjection} from "../../../client";
import React from "react";
import {Published} from "../../Publish/Publish";
import {DeleteConfirmationDialog} from "../../Common/DeleteConfirmationDialog";
import Link from "next/link";
import {TagDisplay} from "../../TagInput/TagDisplay";

interface Props {
    first?: boolean
    last?: boolean
    stockAnalysis: StockAnalysisProjection
    onDelete: (string) => void
}

export function StockAnalysisCard({stockAnalysis, onDelete, first, last}: Props) {

    const {ticker, name, lastUpdated, tags} = stockAnalysis
    const id = stockAnalysis['_id']

    return (
        <Link href={`/control-panel/stock-analyses/${id}`}>
            <a
                key={id}
                className={
                    `px-4 py-4 cursor-pointer hover:bg-blueGray-800 bg-blueGray-900 flex border-b border-r border-l border-blueGray-500 justify-between relative ${first ? 'rounded-t border-t' : ''} ${last ? 'rounded-b border-b' :''}`
                }>
                {stockAnalysis.published ? <Published/> : null}
                <div>
                    <div className="flex items-center space-x-2">
                        <span className="text-blueGray-300 font-extrabold">{name}</span>
                        <span className="text-xl font-extrabold">({ticker})</span>
                    </div>
                    <div className="text-xs text-blueGray-300">{new Date(lastUpdated).toLocaleString()}</div>
                </div>
                <div className="items-center justify-end space-x-2 hidden md:flex">
                    {tags.map(tag => <TagDisplay tag={{createdAt:'',_id: tag, description: tag} as any} key={tag}/>)}
                    <DeleteConfirmationDialog onDelete={() => onDelete(id)} resourceName={name}/>
                </div>
            </a>
        </Link>
    )
}
