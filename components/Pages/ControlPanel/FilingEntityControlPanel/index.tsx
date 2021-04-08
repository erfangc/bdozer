import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useFilingEntityManager, useFilingEntityManagerUnsecured } from '../../../../api-hooks'
import { FilingEntity } from '../../../../client'
import { PrimaryButton } from '../../../Common/PrimaryButton'
import { SecondaryButton } from '../../../Common/SecondaryButton'
import { Title } from '../../../Common/Title'
import { FilingEntityCard } from '../FilingEntityCard'
import { Message } from '../Message'
import { Loading } from '../StockAnalysisControlPanel/Toolbar/Svgs'

export default function FilingEntityControlPanel() {
    const router = useRouter()

    const { cik } = router.query

    const filingEntityManagerUnsecured = useFilingEntityManagerUnsecured()
    const filingEntityManager = useFilingEntityManager()
    const [filingEntity, setFilingEntity] = useState<FilingEntity>()
    const [loading, setLoading] = useState(false)

    async function init() {
        const { data: filingEntity } = await filingEntityManagerUnsecured.getFilingEntity(cik as string)
        setFilingEntity(filingEntity)
    }

    async function bootstrap() {
        setLoading(true)
        await filingEntityManager.bootstrapFilingEntity(filingEntity?.cik)
        await init()
        setLoading(false)
    }

    useEffect(() => {
        if (cik) {
            init()
        }
    }, [cik])

    const status = filingEntity?.statusMessage

    let message = null
    if (status === "Bootstrapping") {
        message = (
            <Message>
                Facts about this company is currently being parsed from the SEC, please check back later
                <br />
                <span className="text-sm">You need to do this before building stock analyses for this company</span>
            </Message>
        )
    } else if (status !== "Completed") {
        message = (
            <Message>
                Facts about this entity has not been bootstrapped from SEC yet <code>Click "Bootstrap" to it do</code>
                <br />
                <span className="text-sm">You need to do this before building stock analyses for this company</span>
                <PrimaryButton className="mt-4 w-32" onClick={bootstrap}>{loading ? <Loading></Loading> : 'Bootstrap'}</PrimaryButton>
            </Message>
        )
    }

    return (
        <main className="container mx-auto py-20 space-y-8">
            <div className="space-y-4">
                <Title>Filing Entity Summary</Title>
                <FilingEntityCard filingEntity={filingEntity} />
            </div>
            {message}
            <Link href="/control-panel">
                <SecondaryButton>Back</SecondaryButton>
            </Link>
        </main>
    )
}
