import React, {ChangeEvent, useEffect, useState} from "react";
import {useStockAnalysis} from "../../../api-hooks";
import {FindStockAnalysisResponse} from "../../../client";
import {PrimaryButton} from "../../Common/PrimaryButton";
import {Title} from "../../Common/Title";
import {LoadingSkeletons, StockAnalysisCard} from "./StockAnalysisCard";
import {useRouter} from "next/router";
import {ChevronLeft, ChevronRight, Plus, SearchIcon} from "../../Common/Svgs";
import {SecondaryButton} from "../../Common/SecondaryButton";
import {PublishedToggle} from "./PublishedToggle";
import {TagInput} from "../../Common/TagInput";

interface ControlStates {
    page: number
    pageSize: number
    term?: string
    published?: boolean
    tags: string[]
}

const initialState: ControlStates = {
    tags: [],
    pageSize: 10,
    page: 0,
}

export function ControlPanel() {

    const router = useRouter()
    const stockAnalysisCrud = useStockAnalysis()
    const [findStockAnalysisResponse, setFindStockAnalysisResponse] = useState<FindStockAnalysisResponse>()
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState(initialState)

    async function nextPage() {
        const nextPage = state.page + 1;
        if (nextPage * state.pageSize > findStockAnalysisResponse.totalCount) {
            return
        }
        const nextState = {...state, page: nextPage}
        setState(nextState)
        await refresh(nextState)
    }

    async function previousPage() {
        if (state.page === 0) {
            return
        }
        const previousPage = state.page - 1;
        const nextState: ControlStates = {...state, page: previousPage}
        setState(nextState)
        await refresh(nextState)
    }

    async function handleTermChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        const {target} = event
        const nextTerm = target.value;
        const nextState: ControlStates = {...state, term: nextTerm, page: 0,}
        setState(nextState)
        await refresh(nextState)
    }

    async function init() {
        await refresh(state)
    }

    async function refresh(nextState: ControlStates) {
        setLoading(true)
        const skip = nextState.page * nextState.pageSize
        const limit = nextState.pageSize
        const resp = await stockAnalysisCrud.findStockAnalyses(
            nextState.published,
            undefined,
            undefined,
            undefined,
            skip,
            limit,
            nextState.term === '' ? undefined : nextState.term,
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

    async function handleSetPublished(value?: boolean) {
        const nextState: ControlStates = {
            ...state,
            published: value,
            page: 0,
        }
        setState(nextState)
        await refresh(nextState)
    }

    useEffect(() => {
        init()
    }, [])

    const totalCount = findStockAnalysisResponse?.totalCount;
    const showingFrom = isNaN(totalCount) ? 0 : state.page * state.pageSize + 1;
    const showingTo = Math.min((state.page + 1) * state.pageSize, isNaN(totalCount) ? 0 : totalCount);

    return (
        <main className="text-blueGray-50 container mx-auto space-y-16 py-16 px-4">
            {/* Start of filter and pagination */}
            <div className="space-y-6">
                <Title>In Progress Analyses</Title>
                <div className="bg-blueGray-700 px-4 rounded">
                    <SearchIcon/>
                    <input
                        value={state.term}
                        onChange={handleTermChange}
                        autoFocus
                        placeholder="Filter analyses"
                        className="text-blueGray-50 pl-4 py-4 focus:outline-none bg-blueGray-700 placeholder-blueGray-400 text-lg"
                    />
                </div>
                <div className="flex flex-col space-y-8 md:flex-row md:space-y-0 justify-between">
                    <PrimaryButton onClick={navigateToNew} className="h-12">
                        <Plus/><span className="pl-1">Create New</span>
                    </PrimaryButton>
                    <TagInput selected={[]} onChange={console.log}/>
                </div>
            </div>

            {/* Pagination */}
            <div>
                <div className="mb-6 flex flex-col space-y-2 md:flex-row md:space-y-0 md:justify-between">
                    <div className="flex items-center space-x-2 text-blueGray-400">
                        <SecondaryButton disabled={loading} onClick={previousPage}>
                            <ChevronLeft/>
                        </SecondaryButton>
                        <span>
                        <b>Showing</b> {showingFrom} - {showingTo} out of {isNaN(totalCount) ? 0 : totalCount}
                        </span>
                        <SecondaryButton disabled={loading} onClick={nextPage}>
                            <ChevronRight/>
                        </SecondaryButton>
                    </div>
                    <PublishedToggle setPublished={handleSetPublished} published={state.published}/>
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
