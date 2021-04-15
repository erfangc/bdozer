import React, {ChangeEvent, useEffect, useState} from "react";
import {useStockAnalysisCrud} from "../../../api-hooks";
import {FindStockAnalysisResponse} from "../../../client";
import {PrimaryButton} from "../../Common/PrimaryButton";
import {Title} from "../../Common/Title";
import {LoadingSkeletons, StockAnalysisCard} from "./StockAnalysisCard";
import {useRouter} from "next/router";
import {ChevronLeft, ChevronRight, Plus, SearchIcon} from "../../Common/Svgs";
import {SecondaryButton} from "../../Common/SecondaryButton";

export function ControlPanel() {

    const router = useRouter()
    const stockAnalysisCrud = useStockAnalysisCrud()
    const [findStockAnalysisResponse, setFindStockAnalysisResponse] = useState<FindStockAnalysisResponse>()
    const [loading, setLoading] = useState(false)
    const [unpublishedOnly, setUnpublishedOnly] = useState<boolean | undefined>()

    const pageSize = 10
    const [page, setPage] = useState(0)
    const [term, setTerm] = useState<string>()

    async function nextPage() {
        const nextPage = page + 1;
        if (nextPage * pageSize > findStockAnalysisResponse.totalCount) {
            return
        }
        setPage(nextPage)
        await refresh(nextPage, pageSize, term, unpublishedOnly)
    }

    async function previousPage() {
        if (page === 0) {
            return
        }
        const previousPage = page - 1;
        setPage(previousPage)
        await refresh(previousPage, pageSize, term, unpublishedOnly)
    }

    async function handleTermChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        const {target} = event
        const nextTerm = target.value;
        setTerm(nextTerm)
        await refresh(0, pageSize, nextTerm, unpublishedOnly)
    }

    async function init() {
        await refresh(page, pageSize, term, unpublishedOnly)
    }


    async function refresh(page, pageSize, term, unpublishedOnly) {
        setLoading(true)
        const skip = page * pageSize
        const limit = pageSize
        const published = unpublishedOnly ? false : undefined
        const resp = await stockAnalysisCrud.findStockAnalyses(
            published,
            undefined,
            undefined,
            undefined,
            skip,
            limit,
            term === '' ? undefined : term,
        )
        setFindStockAnalysisResponse(resp.data)
        setLoading(false)
    }

    async function deleteStockAnalysis(id: string) {
        await stockAnalysisCrud.deleteStockAnalysis(id)
        await init()
    }

    function navigateToNew() {
        router.push('/control-panel/stock-analyses/new')
    }

    async function toggleUnpublishedOnly() {
        setUnpublishedOnly(unpublishedOnly ? undefined : true)
        await refresh(page, pageSize, term, unpublishedOnly ? undefined : true)
    }

    useEffect(() => {
        init()
    }, [])

    const totalCount = findStockAnalysisResponse?.totalCount;
    const showingFrom = page * pageSize + 1;
    const showingTo = Math.min((page + 1) * pageSize, totalCount);

    return (
        <main className="text-blueGray-50 container mx-auto space-y-16 py-16 px-4">
            {/* Start of filter and pagination */}
            <div className="space-y-6">
                <Title>In Progress Analyses</Title>
                <div className="bg-blueGray-700 px-4 rounded">
                    <SearchIcon/>
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
                <div className="mb-6 flex justify-between">
                    <div className="flex items-center space-x-2 text-blueGray-400">
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
                    <button
                        onClick={toggleUnpublishedOnly}
                        className={`focus:outline-none border border-lime-700 transition ease-linear hover:bg-lime-500 hover:text-white px-2 py-1 rounded self-end ${unpublishedOnly ? 'bg-lime-500 text-white' : 'text-lime-600'}`}>
                        Unpublished Only
                    </button>
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

