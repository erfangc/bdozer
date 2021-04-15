import React, {ChangeEvent, useEffect, useState} from "react";
import {useStockAnalysisCrud} from "../../../api-hooks";
import {FindStockAnalysisResponse} from "../../../client";
import {PrimaryButton} from "../../Common/PrimaryButton";
import {Title} from "../../Common/Title";
import {LoadingSkeletons, StockAnalysisCard} from "./StockAnalysisCard";
import {useRouter} from "next/router";
import {ChevronLeft, ChevronRight, History, Plus, SearchIcon} from "../../Common/Svgs";
import {SecondaryButton} from "../../Common/SecondaryButton";

export function ControlPanel() {

    const router = useRouter()
    const stockAnalysisCrud = useStockAnalysisCrud()
    const [findStockAnalysisResponse, setFindStockAnalysisResponse] = useState<FindStockAnalysisResponse>()
    const [loading, setLoadingAnalyses] = useState(false)

    const pageSize = 10
    const [page, setPage] = useState(0)
    const [term, setTerm] = useState<string>()

    async function nextPage() {
        const nextPage = page + 1;
        if (nextPage * pageSize > findStockAnalysisResponse.totalCount) {
            return
        }
        setPage(nextPage)
        await refresh(nextPage, pageSize, term)
    }

    async function previousPage() {
        if (page === 0) {
            return
        }
        const previousPage = page - 1;
        setPage(previousPage)
        await refresh(previousPage, pageSize, term)
    }

    async function handleTermChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        const {target} = event
        const nextTerm = target.value;
        setTerm(nextTerm)
        await refresh(0, pageSize, nextTerm)
    }

    async function init() {
        await refresh(page, pageSize, term)
    }


    async function refresh(page, pageSize, term) {
        setLoadingAnalyses(true)
        const skip = page * pageSize
        const limit = pageSize
        const resp = await stockAnalysisCrud.findStockAnalyses(
            undefined,
            undefined,
            undefined,
            skip,
            limit,
            term === '' ? undefined : term,
        )
        setFindStockAnalysisResponse(resp.data)
        setLoadingAnalyses(false)
    }

    async function deleteStockAnalysis(id: string) {
        await stockAnalysisCrud.deleteStockAnalysis(id)
        await init()
    }

    function navigateToNew() {
        router.push('/control-panel/stock-analyses/new')
    }

    useEffect(() => {
        init()
    }, [])

    /*

     */
    const totalCount = findStockAnalysisResponse?.totalCount;
    const showingFrom = page * pageSize + 1;
    const showingTo = Math.min((page + 1) * pageSize, totalCount);
    return (
        <main className="text-blueGray-50 container mx-auto space-y-12 py-16 px-4">
            {/* Start of filter and pagination*/}
            <div className="space-y-6">
                <div className="space-y-6 lg:space-y-0 lg:flex lg:justify-between">
                    <Title>In Progress Analyses</Title>
                    <div className="space-x-4">
                        <SecondaryButton>
                            <History/>
                            <span className="pl-1">Recently Updated</span>
                        </SecondaryButton>
                    </div>
                </div>
                <div className="bg-blueGray-700 px-4 rounded">
                    <SearchIcon />
                    <input
                        value={term}
                        onChange={handleTermChange}
                        autoFocus
                        placeholder="Filter analyses"
                        className="text-blueGray-50 pl-4 py-4 focus:outline-none bg-blueGray-700 placeholder-blueGray-400 text-lg"
                    />
                </div>
                <div className="flex justify-between">
                    <PrimaryButton onClick={navigateToNew}>
                        <Plus/><span className="pl-1">Create New</span>
                    </PrimaryButton>
                </div>
            </div>
            {/* Pagination */}
            <div>
                <div className="mb-4 text-blueGray-400 flex space-x-2 items-center">
                    <SecondaryButton disabled={loading} onClick={previousPage}>
                        <ChevronLeft/>
                    </SecondaryButton>
                    <span>
                        <b>Showing</b> {showingFrom} - {showingTo} out of {totalCount}
                    </span>
                    <SecondaryButton disabled={loading} onClick={nextPage}>
                        <ChevronRight/>
                    </SecondaryButton>
                </div>
                {/* Stop of filtering and pagination */}
                <div className="space-y-8">
                    <ul className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                        {loading
                            ? <LoadingSkeletons/>
                            : findStockAnalysisResponse
                                ?.stockAnalyses
                                ?.map(stockAnalysis => (
                                    <StockAnalysisCard
                                        key={stockAnalysis['_id']}
                                        stockAnalysis={stockAnalysis}
                                        onDelete={deleteStockAnalysis}
                                    />
                                ))
                        }
                    </ul>
                </div>
            </div>

        </main>
    )
}

