import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useFilingEntityManagerApi } from '../../apiHooks'
import { FilingEntity } from '../../client'
import { App } from '../../components/App'

export default function StockOverview() {

    const router = useRouter()
    const filingEntityManagerApi = useFilingEntityManagerApi()

    const [filingEntity, setFilingEntity] = useState<FilingEntity>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const { cik } = router.query
        if (cik) {
            setLoading(true)
            filingEntityManagerApi
                .getFilingEntity(cik as string)
                .then(resp => {
                    setLoading(false)
                    setFilingEntity(resp.data)
                })
        }
    }, [])

    return (
        <App>
            <div className="bg-blueGray-700 text-xs text-blueGray-200 m-10 p-8 shadow-lg rounded-lg">
                {
                    filingEntity
                        ?
                        <pre className="font-mono">
                            {JSON.stringify(filingEntity, undefined, 4)}
                        </pre>
                        : null
                }
            </div>
        </App>
    )
}
