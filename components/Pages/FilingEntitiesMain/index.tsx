import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'
import {useFilingEntityManagerUnsecured} from '../../../api-hooks'
import {FilingEntity} from '../../../client'
import {SecondaryButton} from '../../Common/SecondaryButton'
import {Title} from '../../Common/Title'
import {FilingEntityCard} from '../../FilingEntityCard'
import {Message} from '../ControlPanel/Message'

export default function FilingEntityControlPanel() {
    const router = useRouter()

    const {cik} = router.query

    const filingEntityManagerUnsecured = useFilingEntityManagerUnsecured()
    const [filingEntity, setFilingEntity] = useState<FilingEntity>()
    const [loading] = useState(false)

    async function init() {
        const {data: filingEntity} = await filingEntityManagerUnsecured.getFilingEntity(cik as string)
        setFilingEntity(filingEntity)
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
            <br/>
            If you feel like something has gone wrong and want to re-parse SEC's website, please click <code>Bootstrap
            Again</code>
            <br/>
        </Message>
    )
    if (status === "Bootstrapping") {
        message = (
            <Message>
                Facts about this company is currently being parsed from the SEC, please check back later
                <br/>
                <span className="text-sm">You need to do this before building stock analyses for this company</span>
            </Message>
        )
    } else if (status !== "Completed") {
        message = (
            <Message>
                Facts about this entity has not been bootstrapped from SEC yet <code>Click "Bootstrap" to it do</code>
                <br/>
                <span className="text-sm">You need to do this before building stock analyses for this company</span>
            </Message>
        )
    }

    return (
        <main className="container mx-auto mt-12 px-4 space-y-8">
            <div className="space-y-4">
                <Title>Filing Entity Summary</Title>
                <FilingEntityCard filingEntity={filingEntity} loading={loading}/>
            </div>
            {message}
            <div className="flex space-x-2">
                <SecondaryButton onClick={router.back}>Back</SecondaryButton>
            </div>
        </main>
    )
}
