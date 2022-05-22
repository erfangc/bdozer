import React, {useEffect, useState} from 'react';
import {Page} from "../components/Page";
import {StockSearch} from "../components/Pages/Search/StockSearch";
import {usePublishedStockAnalysis} from "../api-hooks";
import {StockAnalysisProjection, ZacksDerivedAnalyticsTagsEnum} from "../client";
import {commafy, readablePercent} from "../number-formatters";
import {useRouter} from "next/router";
import {AscIcon, DescIcon, UnsortedIcon} from "../components/Pages/Search/Icons";
import {Nav} from "../components/Nav";
import {FilterButton} from '../components/FilterButton';
import {FilterPill} from "../components/FilterPill";

export default function Search() {

    const [stockAnalyses, setStockAnalyses] = useState<StockAnalysisProjection[]>([]);
    const stockAnalysisApi = usePublishedStockAnalysis();
    const [term, setTerm] = useState('')
    const [sort, setSort] = useState<'ascending' | 'descending' | undefined>("descending")
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState<ZacksDerivedAnalyticsTagsEnum[]>([]);
    const router = useRouter();

    function removeTag(tag: ZacksDerivedAnalyticsTagsEnum) {
        setSelected(selected.filter(it => it !== tag));
    }

    function toggleSort() {
        if (sort == undefined) {
            setSort('descending');
        } else if (sort == 'descending') {
            setSort('ascending');
        } else {
            setSort(undefined);
        }
    }
    
    useEffect(() => {
        (async () => {
            const {data} = await stockAnalysisApi.findPublishedStockAnalyses(
                undefined,
                undefined,
                undefined,
                page * 15,
                15,
                term ?? undefined,
                undefined,
                selected,
                sort,
            );
            setStockAnalyses(data.stockAnalyses);
        })();
    }, [setStockAnalyses, page, term, sort, selected]);

    function nextPage() {
        setPage(page + 1);
    }

    function previousPage() {
        if (page == 0) {
            return;
        }
        setPage(page - 1);
    }

    const rows = stockAnalyses.map(stockAnalysis => {
        const {
            currentPrice,
            finalPrice,
            name,
            ticker,
            percentUpside,
        } = stockAnalysis;

        function navigate() {
            router.push(`/stock-analyses/${stockAnalysis['_id']}`);
        }
        
        return (
            <tr
                className="cursor-pointer transition ease-in hover:bg-lightGreen-50 hover:text-chili-100"
                onClick={navigate}
            >
                <td className="font-mono p-2 text-left">{name}</td>
                <td className="font-mono p-2 text-left">{ticker}</td>
                <td
                    className={`font-mono p-2 text-left ${percentUpside > 0 ? 'text-lime-100' : 'text-red-100'} hover:text-chili-100`}
                >
                    {readablePercent(percentUpside)}
                </td>
                <td className="font-mono p-2 text-left hidden lg:table-cell">${commafy(currentPrice)}</td>
                <td className="font-mono p-2 text-left hidden lg:table-cell">${commafy(finalPrice)}</td>
                <td className="font-mono p-2 text-left hidden lg:table-cell">
                    <button>-</button>
                </td>
            </tr>
        );
    });

    return (
        <Page>
            <Nav/>
            <main className="bg-dashboardGray-100 min-h-screen">
                <div className="mx-auto pt-12 container text-lightGreen-25">
                    <div className="px-2 lg:px-0 ">
                        <h2 className="heading2">Stock Overview</h2>
                        <br/>
                        <StockSearch onChange={setTerm}/>
                        <br/>
                    </div>
                    <div className="flex justify-between">
                        <Pagination previousPage={previousPage} nextPage={nextPage}/>
                        <FilterButton selected={selected} onChange={newValues => setSelected(newValues)}/>
                    </div>
                    <div className="flex space-x-4 h-10">
                        {selected.map(tag => <FilterPill tag={tag} onRemove={removeTag}/>)}
                    </div>
                    <table className="label-small lg:label-regular w-full">
                        <thead>
                        <tr className="pb-2 border-b">
                            <th className="p-2 text-left">Company</th>
                            <th className="p-2 text-left">Symbol</th>
                            <th className="p-2 text-left cursor-pointer flex" onClick={toggleSort}>
                                Over/Under Valued
                                {sort == undefined ? <UnsortedIcon/> : sort === 'descending' ? <DescIcon/> : <AscIcon/>}
                            </th>
                            <th className="p-2 text-left hidden lg:table-cell">Current Share Price</th>
                            <th className="p-2 text-left hidden lg:table-cell">Forecasted Price</th>
                            <th className="p-2 text-left hidden lg:table-cell"/>
                        </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </table>
                </div>
            </main>
        </Page>
    );
}

function Pagination({previousPage, nextPage}: { previousPage: () => void, nextPage: () => void }) {
    return (
        <div className="flex space-x-2">
            <button className="rounded bg-lime-100 text-chili-100 w-8 h-8 flex items-center justify-center"
                    onClick={previousPage}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
                     className="fill-current">
                    <path d="M0 0h24v24H0V0z" fill="none"/>
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"/>
                </svg>
            </button>
            <button className="rounded bg-lime-100 text-chili-100 w-8 h-8 flex items-center justify-center"
                    onClick={nextPage}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
                     className="fill-current">
                    <path d="M0 0h24v24H0V0z" fill="none"/>
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/>
                </svg>
            </button>
        </div>
    );
}
