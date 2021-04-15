import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useFilingEntityManager, useFilingEntityManagerUnsecured } from '../../../../api-hooks'
import { FilingEntity } from '../../../../client'
import { DeleteButton } from '../../../Common/DeleteButton'
import { PrimaryButton } from '../../../Common/PrimaryButton'
import { SecondaryButton } from '../../../Common/SecondaryButton'
import { Title } from '../../../Common/Title'
import { FilingEntityCard } from '../FilingEntityCard'
import { Message } from '../Message'
import {Loading} from "../../../Common/Svgs";

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
        await filingEntityManager.bootstrapFilingEntity(cik as string)
        await init()
        setLoading(false)
    }

    useEffect(() => {
        if (cik) {
            init()
        }
    }, [cik])

    const status = filingEntity?.statusMessage

    let message = (
        <Message>
            Facts about this company has been parsed and stored, you are now free to create stock analyses for it. 
            <br />
            If you feel like something has gone wrong and want to re-parse SEC's website, please click <code>Bootstrap Again</code>
            <br />
            <DeleteButton className="mt-4 w-44" onClick={bootstrap}>{loading ? <Loading/> : 'Bootstrap Aagain'}</DeleteButton>
        </Message>
    )
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
                <PrimaryButton className="mt-4 w-32" onClick={bootstrap}>{loading ? <Loading/> : 'Bootstrap'}</PrimaryButton>
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
            <SecondaryButton onClick={router.back}>Back</SecondaryButton>
        </main>
    )
}
