import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { basePath, useFilingEntityManagerApi } from '../../apiHooks'
import { FilingEntity } from '../../client'
import { PrimaryButton } from '../../components/PrimaryButton'
import { useAuth0 } from '@auth0/auth0-react'

export default function CikOverview() {

    const router = useRouter()
    const filingEntityManagerApi = useFilingEntityManagerApi()
    const { getIdTokenClaims } = useAuth0();

    const [filingEntity, setFilingEntity] = useState<FilingEntity>()
    const [loading, setLoading] = useState(false)

    const { cik } = router.query

    useEffect(() => {
        if (cik) {
            setLoading(true)
            filingEntityManagerApi
                .getFilingEntity(cik as string)
                .then(resp => {
                    setLoading(false)
                    setFilingEntity(resp.data)
                })
        }
    }, [cik])

    async function downloadXls() {
        const { __raw } = await getIdTokenClaims()
        const url = `${basePath}/api/filing-entity-manager/1467623/proforma-model`
        fetch(url, {
            headers: {
                'content-type': 'application/vnd.ms-excel;charset=UTF-8',
                'authorization': `Bearer ${__raw}`
            },
            method: 'GET'
        })
            .then(res => res.blob().then(blob => {
                const filename = 'workbook.xlsx'
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
            }))

    }

    async function rerunModel() {
        const { data: model } = await filingEntityManagerApi.rerunModel(cik as string)
        setFilingEntity({ ...filingEntity, proFormaModel: model })
    }

    async function rebootstrap() {
        const { data: filingEntity } = await filingEntityManagerApi.bootstrapFilingEntity(cik as string)
        setFilingEntity(filingEntity)
    }

    return (
        <div className="bg-blueGray-700 text-blueGray-50 m-10 p-8 shadow-lg rounded-lg">
            <PrimaryButton className="mb-4 font-sans text-base" onClick={rerunModel}>
                Rerun Model
            </PrimaryButton>
            <PrimaryButton className="mb-4 font-sans text-base" onClick={rebootstrap}>
                Bootstrap Again
            </PrimaryButton>
            <PrimaryButton className="mb-4 font-sans text-base" onClick={downloadXls}>
                Download XLS
            </PrimaryButton>
            <br />
            <div>
                Status: {filingEntity?.statusMessage}
            </div>
            {
                filingEntity
                    ?
                    <>
                        <h5 className="font-mono font-bold">Filing Entity Raw Data:</h5>
                        <br />
                        <pre className="text-xs text-blueGray-200">
                            {JSON.stringify(filingEntity, undefined, 4)}
                        </pre>
                    </>
                    : null
            }
        </div>
    )
}
