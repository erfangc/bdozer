import {useAuth0} from '@auth0/auth0-react'
import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'
import {v4 as uuid} from 'uuid'
import {basePath, useIssues, useStockAnalysis} from '../../../../api-hooks'
import {Issue, StockAnalysis2} from '../../../../client'
import {ExcelDownloading, ExcelIcon} from '../../../Common/DownloadToExcel'
import {Notification, notificationStore} from '../../../Notifications/NotificationStore'
import {ToolButton} from './ToolButton'
import {Loading, Play, Preview, Publish, Settings, Table, Unpublish, Warning} from "../../../Common/Svgs";
import {Published} from "../../../Publish/Publish";

interface Props {
    loading: boolean
    setLoading: (boolean) => void
    stockAnalysis: StockAnalysis2
    setStockAnalysis: (stockAnalysis: StockAnalysis2) => void
}

export default function Toolbar({loading, setLoading, stockAnalysis, setStockAnalysis}: Props) {

    const {getIdTokenClaims} = useAuth0()
    const router = useRouter()
    const {id} = router.query
    const stockAnalysisApi = useStockAnalysis()
    const issuesApi = useIssues()
    const [issues, setIssues] = useState<Issue[]>()
    const [downloading, setDownloading] = useState(false)

    async function init() {
        const {data:issues} = await issuesApi.findIssues(id as string)
        setIssues(issues)
    }

    async function refresh() {
        setLoading(true)
        try {
            const resp = await stockAnalysisApi.refreshStockAnalysis(stockAnalysis)
            await updateStockAnalysis(resp.data)
        } catch (e) {
            console.error(e);
        }
        setLoading(false)
    }

    async function navigateToFullOutput() {
        router.push(`/control-panel/stock-analyses/${stockAnalysis['_id']}/full-output`)
    }

    async function publish() {
        const id = stockAnalysis['_id'];
        await stockAnalysisApi.publish(id)
        router.push(`/published-stock-analyses/${id}/narrative2`)
    }

    async function unpublish() {
        const id = stockAnalysis['_id']
        await stockAnalysisApi.unpublish(id)
        const notification: Notification = {
            id: uuid(),
            delay: 100,
            message: 'Unpublish successful',
            timestamp: new Date(),
        };
        notificationStore.addNotification(notification)
    }

    async function navigateToPreview() {
        router.push(`/control-panel/stock-analyses/${stockAnalysis['_id']}/preview`)
    }

    async function navigateToModelSettings() {
        router.push(`/control-panel/stock-analyses/${stockAnalysis['_id']}/model-settings`)
    }

    async function navigateToIssues() {
        router.push(`/control-panel/stock-analyses/${stockAnalysis['_id']}/issues-summary`)
    }

    async function updateStockAnalysis(stockAnalysis: StockAnalysis2) {
        try {
            setStockAnalysis(stockAnalysis)
        } catch (e) {
            console.error(e);
        }
    }

    async function downloadModel() {
        const {__raw} = await getIdTokenClaims()
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

    useEffect(() => {init()}, [])
    const noIssues = issues?.length === 0 || !issues
    return (
        <div className="relative">
            {stockAnalysis?.published ? <Published/> : null}
            <div className="grid grid-cols-4 gap-1 md:flex md:space-x-5 px-3 pt-2 pb-1 bg-blueGray-800 rounded">
                <ToolButton onClick={refresh} loading={loading} label="Rerun">
                    {loading ? <Loading/> : <Play/>}
                </ToolButton>
                <ToolButton onClick={navigateToFullOutput} loading={loading} label="Table">
                    <Table/>
                </ToolButton>
                <ToolButton onClick={navigateToPreview} loading={loading} label="Preview">
                    <Preview/>
                </ToolButton>
                <ToolButton onClick={publish} loading={loading} label="Publish">
                    <Publish/>
                </ToolButton>
                <ToolButton onClick={unpublish} loading={loading} label="Unpublish">
                    <Unpublish/>
                </ToolButton>
                <ToolButton onClick={navigateToModelSettings} loading={loading} label="Settings">
                    <Settings/>
                </ToolButton>
                <ToolButton onClick={navigateToIssues} loading={loading} disabled={loading || noIssues} label="Issues" className="relative">
                    {noIssues ? null : <span className="absolute -top-2 -right-2 rounded-full bg-amber-600 w-6 h-6">{issues?.length}</span>}
                    <Warning/>
                </ToolButton>
                <ToolButton onClick={downloadModel} loading={downloading} label="Download">
                    {downloading ? <ExcelDownloading/> : <ExcelIcon/>}
                </ToolButton>
            </div>
        </div>
    )
}


