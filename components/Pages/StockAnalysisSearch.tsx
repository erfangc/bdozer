import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useEdgarExplorer, useFilingEntityManager, useFilingEntityManagerUnsecured, useStockAnalyzerFactory } from '../../api-hooks'
import { EdgarEntity, EdgarEntitySource, FilingEntity, StockAnalysis } from '../../client'
import { GhostButton } from '../GhostButton'

interface Props {
    className?: string
    onSubmit: (cik: FilingEntity) => void
}

export function StockAnalysisSearch(props: Props) {
    const router = useRouter()

    const stockAnalyzer = useStockAnalyzerFactory()
    const edgarExplorer = useEdgarExplorer()
    const filingEntityManager = useFilingEntityManager()
    const publicFilingEntityManager = useFilingEntityManagerUnsecured()
    const ref = useRef<HTMLInputElement>()

    const [term, setTerm] = useState<string>()
    const [found, setFound] = useState<EdgarEntity[]>([])
    const [stockAnalyses, setStockAnalyses] = useState<StockAnalysis[]>([])

    useEffect(() => {
        if (ref.current) {
            ref.current.select()
        }
        stockAnalyzer
            .getAnalyses()
            .then(resp => setStockAnalyses(resp.data))
    }, [])

    async function search(newTerm) {
        if (newTerm) {
            const { data } = await edgarExplorer.searchEntities(newTerm)
            setFound(data)
        } else {
            setFound([])
        }
    }

    async function submit(edgarEntity: EdgarEntity) {
        setFound([])
        const { data } = await publicFilingEntityManager.getFilingEntity(edgarEntity['_id'])
        try {
            props.onSubmit(data)
        } catch (e) {
            console.error(e);
        }
        setTerm('')
        setFound([])
    }

    function changeTerm(newTerm: string) {
        setTerm(newTerm)
        search(newTerm)
    }

    async function requestCoverage(cik: string) {
        const { data: filingEntity } = await publicFilingEntityManager.getFilingEntity(cik)
        router.push(`/request-stock?cik=${filingEntity.cik}`)
    }

    const entities = found.map(entity => {
        const source = entity['_source'] as EdgarEntitySource
        const id = entity['_id']
        const hasAnalysis = stockAnalyses.find(stockAnalysis => stockAnalysis['_id']?.endsWith(id)) !== undefined
        return (
            <li
                key={id}
                className="px-4 py-2 cursor-pointer hover:bg-blueGray-900 text-sm flex justify-between items-center whitespace-nowrap transition ease-linear"
                onClick={() => { if (hasAnalysis) submit(entity) }}
            >
                <span className="w-56 md:w-96 overflow-hidden overflow-ellipsis">
                    {source.entity}
                </span>
                {
                    hasAnalysis
                        ?
                        <span className="overflow-hidden overflow-ellipsis bg-blue-600 rounded-lg p-2 text-blueGray-100 w-16 flex justify-center font-bold">
                            {source.tickers}
                        </span>
                        :
                        <GhostButton onClick={() => requestCoverage(id)}>
                            Request Coverage
                        </GhostButton>
                }
            </li>
        )
    }).slice(0, 5)

    return (
        <div className={`w-full text-blueGray-50 ${props.className}`}>
            <div className="relative container max-w-lg">
                <div className={`bg-blueGray-700 px-4 ${entities.length > 0 ? 'rounded-t-lg' : 'rounded-lg'}`}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline">
                        <path d="M31.1283 32.6783L21.6033 23.1517C17.3661 26.1641 11.5274 25.4273 8.17146 21.4566C4.81552 17.4859 5.06194 11.606 8.73834 7.93001C12.4138 4.25242 18.2942 4.00494 22.2657 7.3607C26.2371 10.7165 26.9744 16.5558 23.9617 20.7933L33.4867 30.32L31.13 32.6767L31.1283 32.6783ZM15.8083 8.33332C12.6478 8.33261 9.92116 10.5511 9.27913 13.6457C8.6371 16.7403 10.2562 19.8605 13.1561 21.1171C16.0561 22.3737 19.4398 21.4214 21.2587 18.8368C23.0777 16.2521 22.8318 12.7455 20.67 10.44L21.6783 11.44L20.5417 10.3067L20.5217 10.2867C19.2747 9.03197 17.5773 8.32856 15.8083 8.33332Z" fill="#E2E8F0" />
                    </svg>
                    <input
                        value={term}
                        ref={ref}
                        placeholder="Search for a company"
                        onChange={e => changeTerm(e.currentTarget.value)}
                        className="relative text-blueGray-50 pl-4 py-4 focus:outline-none bg-blueGray-700 placeholder-blueGray-400 text-lg"
                    />
                </div>
                <div
                    className={`absolute bg-blueGray-700 top-full shadow-md w-full rounded-b-lg border-t ease-in transition-all ${entities.length > 0 ? 'border-blueGray-600' : 'border-blueGray-900'} overflow-hidden`}
                    style={{
                        height: entities.length > 0 ? `${(entities.length + 1) * 52 + 24}px` : 0
                    }}
                >
                    <h5 className="px-4 pt-8 text-sm font-bold text-blueGray-400">Companies Found</h5>
                    <ul className="py-2">
                        {entities}
                    </ul>
                </div>
            </div>
        </div>
    )
}

