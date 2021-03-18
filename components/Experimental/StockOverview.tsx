import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { basePath, useFilingEntityManagerApi, useNarrativeBuilderApi } from '../../apiHooks'
import { FilingEntity, Narrative } from '../../client'
import { useAuth0 } from '@auth0/auth0-react'
import { Spinner } from '../ButtonSvgs/Spinner'
import { NarrativeComponent } from './Narrative'

function Download({ loading }: { loading: boolean }) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={loading ? "animate-pulse" : null}>
            <path d="M19 22H5V20H19V22ZM12 18L6 12L7.41 10.59L11 14.17V2H13V14.17L16.59 10.59L18 12L12 18Z" fill="#22C55E" />
        </svg>
    )
}

export function StockOverview() {

    const router = useRouter()
    const filingEntityManagerApi = useFilingEntityManagerApi()
    const narrativeBuilderApi = useNarrativeBuilderApi()

    const { getIdTokenClaims } = useAuth0();

    const [filingEntity, setFilingEntity] = useState<FilingEntity>()
    const [narrative, setNarrative] = useState<Narrative>()
    const [loading, setLoading] = useState(false)
    const [exporting, setExporting] = useState(false)

    const { cik } = router.query

    async function getNarrative(ticker) {
        setLoading(true)
        const { data } = await narrativeBuilderApi.buildNarrative(ticker)
        setNarrative(data)
        setLoading(false)
    }

    useEffect(() => {
        if (cik) {
            setLoading(true)
            filingEntityManagerApi
                .getFilingEntity(cik as string)
                .then(resp => {
                    setFilingEntity(resp.data)
                    getNarrative(resp.data.tickers[0])
                })
        }
    }, [cik])

    async function downloadExcelModel() {
        setExporting(true)
        const ticker = filingEntity.tickers[0]
        const { __raw } = await getIdTokenClaims()
        const url = `${basePath}/api/zacks/narrative-builder/${ticker}/excel`
        fetch(url, {
            headers: {
                'content-type': 'application/vnd.ms-excel;charset=UTF-8',
                'authorization': `Bearer ${__raw}`
            },
            method: 'GET'
        }).then(res => res.blob().then(blob => {
            const filename = `${ticker}.xlsx`
            if (window.navigator.msSaveOrOpenBlob) {
                navigator.msSaveBlob(blob, filename)
            } else {
                const a = document.createElement('a')
                document.body.appendChild(a)
                a.href = window.URL.createObjectURL(blob)
                a.download = filename
                a.target = '_blank'
                a.click()
                a.remove()
                window.URL.revokeObjectURL(url)
            }
            setExporting(false)
        }))
    }

    const narrativeComponents = loading
        ? null
        : <>
            <button
                className="p-2 text-green-500 border-green-500 rounded-md border my-12 focus:outline-none flex items-center"
                onClick={downloadExcelModel}
                disabled={exporting}
            >
                <Download loading={exporting} />
                Download the Excel Model
            </button>
            <NarrativeComponent narrative={narrative} />
        </>

    return (
        <main className="text-blueGray-50 m-10">
            <h1 className="font-bold text-4xl">
                {filingEntity?.name}
            </h1>
            <h4 className="mt-4 text-xl flex items-center">
                {loading ? <><span>Loading ... </span> <Spinner /></> : <><b>Symbol: </b>{filingEntity?.tickers}</>}
            </h4>
            <br />
            {narrativeComponents}
        </main>
    )
}
