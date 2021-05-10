import React, {ChangeEvent, useEffect, useState} from "react";
import {useStockAnalysis} from "../../../api-hooks";
import {FindStockAnalysisResponse, Tag} from "../../../client";
import {PrimaryButton} from "../../Common/PrimaryButton";
import {Title} from "../../Common/Title";
import {StockAnalysisCard} from "./StockAnalysisCard";
import {useRouter} from "next/router";
import {ChevronLeft, ChevronRight, Plus, SearchIcon} from "../../Common/Svgs";
import {SecondaryButton} from "../../Common/SecondaryButton";
import {PublishedToggle} from "./PublishedToggle";
import {TagInput} from "../../TagInput";

interface ControlStates {
    page?: string
    pageSize?: string
    term?: string
    published?: boolean
    tags: string | string[]
}

export function ControlPanel() {

    const router = useRouter()
    const stockAnalysisCrud = useStockAnalysis()
    const [findStockAnalysisResponse, setFindStockAnalysisResponse] = useState<FindStockAnalysisResponse>()
    const [loading, setLoading] = useState(false)

    const state: ControlStates = router.query as any
    const page = parseFloat(state.page);
    const tags = state.tags === undefined ? [] : typeof state.tags === 'string' ? [state.tags] : state.tags;
    const term = state.term;
    const published = state.published;

    async function nextPage() {
        const nextPage = page + 1;
        const nextState = {...state, page: nextPage.toString()}
        await refreshState(nextState)
    }

    async function previousPage() {
        if (page === 0) {
            return
        }
        const previousPage = page - 1;
        const nextState: ControlStates = {...state, page: previousPage.toString()}
        await refreshState(nextState)
    }

    async function updateTags(tags: Tag[]) {
        const nextState: ControlStates = {
            ...state,
            tags: tags.map(it => it['_id'])
        }
        await refreshState(nextState)
    }

    async function handleTermChange(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        const {target} = event
        const nextTerm = target.value;
        const nextState: ControlStates = {...state, term: nextTerm, page: '0',}
        await refreshState(nextState)
    }

    async function init() {
        let initialState = {...state};
        if (!state.page) {
            initialState.page = '0';
        }
        if (!state.pageSize) {
            initialState.pageSize = '10';
        }
        await refreshState(initialState);
    }

    async function refreshState(nextState: ControlStates) {
        router.replace({
            query: nextState as any
        });
        setLoading(true)
        const skip = parseFloat(nextState.page) * parseFloat(nextState.pageSize)
        const limit = parseFloat(nextState.pageSize)
        const resp = await stockAnalysisCrud.findStockAnalyses(
            nextState.published,
            undefined,
            undefined,
            undefined,
            skip,
            limit,
            nextState.term === '' ? undefined : nextState.term,
            typeof nextState.tags === 'string'? [nextState.tags] : nextState.tags,
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
            page: '0',
        }
        await refreshState(nextState)
    }

    useEffect(() => {
        init()
    }, [])

    const stockAnalyses = findStockAnalysisResponse?.stockAnalyses || [];

    return (
        <main className="text-blueGray-50 container mx-auto max-w-6xl space-y-8 py-12 px-4">
            {/* Start of filter and pagination */}
            <div className="space-y-6">
                <Title>Stock Analyses</Title>
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
                <div className="flex flex-col space-y-8 md:flex-row md:space-y-0 justify-between">
                    <PrimaryButton onClick={navigateToNew} className="h-12">
                        <Plus/><span className="pl-1">Create New</span>
                    </PrimaryButton>
                    <TagInput selected={tags} onChange={updateTags}/>
                </div>
            </div>

            {/* Pagination */}
            <div>
                <div className="mb-6 flex flex-col space-y-2 md:flex-row md:space-y-0 md:justify-between">
                    <PublishedToggle setPublished={handleSetPublished} published={published}/>
                    <div className="flex items-center space-x-2 text-blueGray-400">
                        <SecondaryButton disabled={loading} onClick={previousPage}><ChevronLeft/></SecondaryButton>
                        <SecondaryButton disabled={loading} onClick={nextPage}><ChevronRight/></SecondaryButton>
                    </div>
                </div>

                {/* Stop of filtering and pagination */}
                <div>
                    {loading
                        ? null
                        : stockAnalyses
                            .map((stockAnalysis, idx) => (
                                <StockAnalysisCard
                                    first={idx === 0}
                                    last={idx === stockAnalyses.length - 1}
                                    key={stockAnalysis['_id']}
                                    stockAnalysis={stockAnalysis}
                                    onDelete={deleteStockAnalysis}
                                />
                            ))
                    }
                </div>
            </div>

        </main>
    )
}
