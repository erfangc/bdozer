import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { basePath, useFilingEntityManager, useNarrativeBuilder } from '../../../api-hooks'
import { FilingEntity, Narrative } from '../../../client'
import { useAuth0 } from '@auth0/auth0-react'
import { Spinner } from '../../ButtonSvgs/Spinner'
import { NarrativeComponent } from './Narrative'

function DownloadIcon({ loading }: { loading: boolean }) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={loading ? "animate-pulse" : null}>
            <path d="M19 22H5V20H19V22ZM12 18L6 12L7.41 10.59L11 14.17V2H13V14.17L16.59 10.59L18 12L12 18Z" fill="#22C55E" />
        </svg>
    )
}

function DownloadButton(props) {
    return (
        <button
            className="p-2 text-green-500 border-green-500 rounded-md border my-12 focus:outline-none flex items-center"
            onClick={props.onClick}
            disabled={props.loading}
        >
            <DownloadIcon loading={props.loading} />
                Download the Excel Model
        </button>
    )
}

export function StockNarrative() {

    const router = useRouter()
    const { cik } = router.query
    const filingEntityManagerApi = useFilingEntityManager()
    const narrativeBuilderApi = useNarrativeBuilder()

    const { getIdTokenClaims } = useAuth0();

    const [filingEntity, setFilingEntity] = useState<FilingEntity>()
    const [narrative, setNarrative] = useState<Narrative>()
    const [loading, setLoading] = useState(false)
    const [exporting, setExporting] = useState(false)

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
                .getFilingEntity1(cik as string)
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

    return (
        <main className="text-blueGray-50 flex items-center p-4 xl:pt-10 justify-center flex-grow bg-blueGray-900">
            {loading
                ? <div className="text-4xl flex space-x-2 items-center"><span>Loading </span> <Spinner /></div>
                : <div>
                    <h1 className="font-bold text-4xl">
                        {filingEntity?.name}
                    </h1>
                    <h4 className="mt-4 text-xl flex items-center space-x-2">
                        <b>Symbol: </b>{filingEntity?.tickers}
                    </h4>
                    <DownloadButton loading={exporting} onClick={downloadExcelModel} />
                    <NarrativeComponent narrative={narrative} />
                </div>}
        </main>
    )
}
