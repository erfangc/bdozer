import { useAuth0 } from '@auth0/auth0-react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { basePath, useFilingEntityManagerUnsecured, useStockAnalysisCrud, useStockAnalysisPublication, useStockAnalysisWorkflow } from '../../../api-hooks'
import { FilingEntity, StockAnalysis2 } from '../../../client'
import { SubTitle, Title } from '../../Common/Title'
import { notificationStore } from '../../Notifications/NotificationStore'
import { ExcelDownloading, ExcelIcon } from './DownloadToExcel'
import Editor from './Editor'
import { FilingEntityCard } from './FilingEntityCard'
import StockAnalysisSummary from './StockAnalysisSummary'

export const Completed = "Completed"
export const Bootstrapping = "Bootstrapping"
export const Created = "Created"

export function ControlPanel() {

    const { getIdTokenClaims } = useAuth0()
    const router = useRouter()
    const [filingEntity, setFilingEntity] = useState<FilingEntity>()
    const [loading, setLoading] = useState(false)
    const [downloading, setDownloading] = useState(false)
    const filingEntityManagerUnsecured = useFilingEntityManagerUnsecured()

    const stockAnalysisCrud = useStockAnalysisCrud()
    const stockAnalysisWorkflow = useStockAnalysisWorkflow()
    const stockAnalysisPublication = useStockAnalysisPublication()

    const [stockAnalysis, setStockAnalysis] = useState<StockAnalysis2>()

    const { id } = router.query

    async function init() {
        try {
            const { data: stockAnalysis } = await stockAnalysisCrud.getStockAnalysis(id as string)
            const { data: filingEntity } = await filingEntityManagerUnsecured.getFilingEntity(stockAnalysis.cik)
            setFilingEntity(filingEntity)
            setStockAnalysis(stockAnalysis)
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if (id) {
            init()
        }
    }, [id])

    async function refresh() {
        setLoading(true)
        try {
            const resp = await stockAnalysisWorkflow.refresh(stockAnalysis)
            updateStockAnalysis(resp.data)
        } catch (e) {
            console.error(e);
        }
        setLoading(false)
    }

    async function navigateToFullOutput() {
        router.push(`/control-panel/stock-analyses/${stockAnalysis['_id']}/full-output`)
    }

    async function publish() {
        await stockAnalysisPublication.publishStockAnalysis(stockAnalysis)
        router.push(`/published-stock-analyses/${stockAnalysis['_id']}/narrative2`)
    }

    async function unpublish() {
        await stockAnalysisPublication.unpublishStockAnalysis(stockAnalysis['_id'])
        notificationStore.addNotification(
            { delay: 100, id: uuid(), message: 'Unpublish successful', timestamp: new Date() }
        )
    }

    async function navigateToPreview() {
        router.push(`/control-panel/stock-analyses/${stockAnalysis['_id']}/preview`)
    }

    async function updateStockAnalysis(stockAnalysis: StockAnalysis2) {
        setLoading(true)
        try {
            await stockAnalysisCrud.saveStockAnalysis(stockAnalysis)
            setStockAnalysis(stockAnalysis)
        } catch (e) {
            console.error(e);
        }
        setLoading(false)
    }

    async function downloadModel() {
        const { __raw } = await getIdTokenClaims()
        setDownloading(true)
        const url = `${basePath}/api/stock-analyzer/workflow/${stockAnalysis['_id']}/download`
        fetch(url,
            {
                headers: {
                    'content-type': 'application/vnd.ms-excel;charset=UTF-8',
                    'authorization': `Bearer ${__raw}`
                },
                method: 'GET'
            })
            .then(res => res.blob()
                .then(blob => {
                    const filename = `${id}.xlsx`
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
                    setDownloading(false)
                }))
    }

    const statusMessage = filingEntity?.statusMessage

    return (
        <main className="container mx-auto px-4 py-20 space-y-12">
            <section className="flex flex-col space-y-6">
                <Title>Summary</Title>
                <FilingEntityCard filingEntity={filingEntity} />
                <StockAnalysisSummary stockAnalysis={stockAnalysis} loading={loading} />
            </section>
            <section className="flex flex-col space-y-6">
                <SubTitle>Inputs</SubTitle>
                {
                    statusMessage !== Completed
                        ? null
                        :
                        <div className="grid grid-cols-4 gap-2 md:flex md:space-x-5 p-4 bg-blueGray-800 rounded">
                            <ToolButton onClick={refresh} loading={loading} label="Rerun">
                                {loading ? <Loading /> : <Play />}
                            </ToolButton>
                            <ToolButton onClick={navigateToFullOutput} loading={loading} label="Table">
                                <Table />
                            </ToolButton>
                            <ToolButton onClick={navigateToPreview} loading={loading} label="Preview">
                                <Preview />
                            </ToolButton>
                            <ToolButton onClick={publish} loading={loading} label="Publish">
                                <Publish />
                            </ToolButton>
                            <ToolButton onClick={unpublish} loading={loading} label="Unpublish">
                                <Unpublish />
                            </ToolButton>
                            <ToolButton onClick={downloadModel} loading={downloading} label="Download">
                                {downloading ? <ExcelDownloading /> : <ExcelIcon />}
                            </ToolButton>
                        </div>
                }
                <Editor
                    filingEntity={filingEntity}
                    stockAnalysis={stockAnalysis}
                    onFilingEntityUpdate={setFilingEntity}
                    onStockAnalysisUpdate={updateStockAnalysis}
                />
            </section>
        </main >
    )
}

interface ToolButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    label: string
    loading?: boolean
}

function ToolButton({ label, loading, children, className, ...props }: ToolButtonProps) {
    return (
        <div className="flex flex-col space-y-1 justify-center items-center">
            <button className={`bg-blueGray-600 rounded-md shadow-lg px-4 py-2 focus:outline-none hover:shadow-none transition ease-linear ${className}`} disabled={loading} {...props}>
                {children}
            </button>
            <span className="text-sm text-blueGray-200">{label}</span>
        </div>
    )
}

function Play() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 16.5V7.5L16 12L10 16.5Z" fill="#F8FAFC" />
        </svg>
    )
}

function Table() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 5V8H5V5H19ZM19 10V14H5V10H19ZM5 19V16H19V19H5Z" fill="#F8FAFC" />
        </svg>
    )
}

function Preview() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM19 19H5V7H19V19ZM12 10.5C13.84 10.5 15.48 11.46 16.34 13C15.48 14.54 13.84 15.5 12 15.5C10.16 15.5 8.52 14.54 7.66 13C8.52 11.46 10.16 10.5 12 10.5ZM12 9C9.27 9 6.94 10.66 6 13C6.94 15.34 9.27 17 12 17C14.73 17 17.06 15.34 18 13C17.06 10.66 14.73 9 12 9ZM12 14.5C11.17 14.5 10.5 13.83 10.5 13C10.5 12.17 11.17 11.5 12 11.5C12.83 11.5 13.5 12.17 13.5 13C13.5 13.83 12.83 14.5 12 14.5Z" fill="#F8FAFC" />
        </svg>
    )
}

function Publish() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 4H19V6H5V4ZM5 14H9V20H15V14H19L12 7L5 14ZM13 12V18H11V12H9.83L12 9.83L14.17 12H13Z" fill="#F8FAFC" />
        </svg>
    )
}

function Unpublish() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.94014 5.12L6.49014 3.66C8.07014 2.61 9.96014 2 12.0001 2C17.5201 2 22.0001 6.48 22.0001 12C22.0001 14.04 21.3901 15.93 20.3401 17.51L18.8801 16.05C19.5901 14.86 20.0001 13.48 20.0001 12C20.0001 7.59 16.4101 4 12.0001 4C10.5201 4 9.14014 4.41 7.94014 5.12ZM17.6601 9.53L16.2501 8.12L13.6001 10.77L15.0101 12.18L17.6601 9.53ZM19.7801 22.61L17.5101 20.34C15.9301 21.39 14.0401 22 12.0001 22C6.48014 22 2.00014 17.52 2.00014 12C2.00014 9.96 2.61014 8.07 3.66014 6.49L1.39014 4.22L2.80014 2.81L21.1801 21.19L19.7801 22.61ZM16.0601 18.88L12.1801 15L10.5901 16.59L6.35014 12.35L7.76014 10.94L10.5901 13.77L10.7701 13.59L5.12014 7.94C4.41014 9.14 4.00014 10.52 4.00014 12C4.00014 16.41 7.59014 20 12.0001 20C13.4801 20 14.8601 19.59 16.0601 18.88Z" fill="#F8FAFC" />
        </svg>
    )
}

function Loading() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin">
            <path d="M12 6V9L16 5L12 1V4C7.58 4 4 7.58 4 12C4 13.57 4.46 15.03 5.24 16.26L6.7 14.8C6.25 13.97 6 13.01 6 12C6 8.69 8.69 6 12 6ZM18.76 7.74L17.3 9.2C17.74 10.04 18 10.99 18 12C18 15.31 15.31 18 12 18V15L8 19L12 23V20C16.42 20 20 16.42 20 12C20 10.43 19.54 8.97 18.76 7.74V7.74Z" fill="#F8FAFC" />
        </svg>
    )
}