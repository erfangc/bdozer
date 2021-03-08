import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useFilingEntityManagerApi } from '../../apiHooks'
import { FilingEntity } from '../../client'
import { PrimaryButton } from '../../components/PrimaryButton'

export default function CikOverview() {

    const router = useRouter()
    const filingEntityManagerApi = useFilingEntityManagerApi()

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
