import { useAuth0 } from '@auth0/auth0-react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useStockAnalysisWorkflow, useStockAnalysisPublication, basePath, useStockAnalysisCrud } from '../../../../api-hooks'
import { StockAnalysis2 } from '../../../../client'
import { notificationStore } from '../../../Notifications/NotificationStore'
import { ExcelDownloading, ExcelIcon } from '../DownloadToExcel'
import { Loading, Play, Table, Preview, Publish, Unpublish } from './Svgs'
import { ToolButton } from './ToolButton'
import { v4 as uuid } from 'uuid'

interface Props {
    loading: boolean
    setLoading: (boolean) => void
    stockAnalysis: StockAnalysis2
    setStockAnalysis: (stockAnalysis: StockAnalysis2) => void
}

export default function Toolbar({ loading, setLoading, stockAnalysis, setStockAnalysis }: Props) {

    const { getIdTokenClaims } = useAuth0()
    const router = useRouter()
    const { id } = router.query
    const stockAnalysisWorkflow = useStockAnalysisWorkflow()
    const stockAnalysisCrud = useStockAnalysisCrud()
    const stockAnalysisPublication = useStockAnalysisPublication()
    const [downloading, setDownloading] = useState(false)

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
        try {
            await stockAnalysisCrud.saveStockAnalysis(stockAnalysis)
            setStockAnalysis(stockAnalysis)
        } catch (e) {
            console.error(e);
        }
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

    return (
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
    )
}
