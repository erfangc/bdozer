import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { basePath, useFilingEntityManagerApi, useNarrativeBuilderApi } from '../../apiHooks'
import { FilingEntity, Narrative } from '../../client'
import { useAuth0 } from '@auth0/auth0-react'
import NumberFormat from 'react-number-format'
import { Spinner } from '../ButtonSvgs/Spinner'

function Title(props) {
    return <h1 className="font-bold text-lg mb-2">{props.children}</h1>
}

function Million({ value }: { value?: number }) {
    return <><NumberFormat value={value} thousandSeparator displayType="text" prefix="$" decimalScale={0} /> million</>
}

function Percent({ value }: { value?: number }) {
    return <NumberFormat value={value * 100} thousandSeparator displayType="text" suffix="%" decimalScale={1} />
}

function DollarPerShare({ value }: { value?: number }) {
    return <><NumberFormat value={value} thousandSeparator displayType="text" prefix="$" decimalScale={2} /> / share</>
}

function Section(props) {
    return <section className="mb-12 px-3 w-96 shadow-2xl py-4 border rounded-xl border-blueGray-700">{props.children}</section>
}

function Download({ loading }: { loading: boolean }) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={loading ? "animate-pulse" : null}>
            <path d="M19 22H5V20H19V22ZM12 18L6 12L7.41 10.59L11 14.17V2H13V14.17L16.59 10.59L18 12L12 18Z" fill="#22C55E" />
        </svg>
    )
}

export default function CikOverview() {

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

            <Section>
                <Title>The company made <Million value={narrative?.revenueTalkingPoint?.data} /> in the most recent year</Title>
                <p>{narrative?.revenueTalkingPoint?.forwardCommentary}</p>
            </Section>

            <Section>
                <Title>They spent <Million value={narrative?.variableCostTalkingPoint?.data} /> in varaible cost</Title>
                <p>{narrative?.variableCostTalkingPoint?.forwardCommentary}</p>
            </Section>

            <Section>
                <Title>Fixed cost, investments in research and development was <Million value={narrative?.fixedCostTalkingPoint?.data} /></Title>
                <p>{narrative?.fixedCostTalkingPoint?.forwardCommentary}</p>
            </Section>

            <Section>
                <Title>Interest Paid, Taxes was <Million value={narrative?.otherExpensesTalkingPoint?.data} /> </Title>
            </Section>

            <Section>
                <Title>What's Left for you the shareholder?</Title>
                <p><DollarPerShare value={narrative?.epsTalkingPoint?.data} /></p>
            </Section>

            <Section>
                <Title>If the does not grow it's sales, how much is it worth?</Title>
                <p><DollarPerShare value={narrative?.noGrowthValueTalkingPoint?.data} /></p>
            </Section>

            <Section>
                <Title>How much is sales expected to grow?</Title>
                <p><Percent value={narrative?.growthTalkingPoint?.data} /></p>
            </Section>

            <Section>
                <Title>At this growth rate, what is the stock worth?</Title>
                <p><DollarPerShare value={narrative?.targetPriceTalkingPoint?.data} /></p>
            </Section>
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
