import React, {useState} from 'react'
import {Title} from "../../../Common/Title";
import {FilingEntitySearch} from "../../FilingEntitySearch";
import {FilingEntity} from "../../../../client";
import {BlockQuote} from "../../../Common/BlockQuote";

export function CreateStockAnalysis() {

    const [loading, setLoading] = useState(false)

    async function handleFilingEntitySelect(filingEntity: FilingEntity) {
        //
        // Otherwise create a new stock analysis and navigate to it
        //
        setLoading(true)
        try {
        } catch (e) {
            console.error(e)
        }
        setLoading(false)
    }

    return (
        <main className="container mx-auto min-h-screen px-2">
            <div className="space-y-8 flex justify-center flex-col h-full">
                <Title>Create New Analysis (This feature has been disabled)</Title>
                <FilingEntitySearch
                    className="w-80 lg:w-full"
                    onSubmit={handleFilingEntitySelect}
                    loading={loading}
                    placeholder="Search for a company to get started"
                />
                <BlockQuote>
                    <span className="inline-block my-1 p-1 rounded bg-amber-500 text-blueGray-800">Warning</span><br/>
                    We are still early in this project, the process of bootstrapping a company automatically can be fraught with unexpected errors. <br/>
                    If you run into issues, <a className="text-blue-500" href="mailto:erfangc@gmail.com?subject=Stock Modeling Request" target='_blank'>email us</a> the tickers you want to analyze
                    and we can preload the data for you
                </BlockQuote>
            </div>
        </main>
    )
}
