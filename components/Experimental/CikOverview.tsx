import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'
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

    const rows = filingEntity?.proFormaModel?.incomeStatementItems?.map(item => {
        const cells = item.historicalValues?.map(historicalValue => {
            return (
                <td
                    key={historicalValue.factId}
                    className="py-3 pl-2 border-b border-blueGray-500"
                >
                    <NumberFormat value={historicalValue.value} thousandSeparator displayType="text" />
                </td>
            )
        })

        return (
            <tr key={item.name} className="">
                <td
                    key='label'
                    className="py-3 pr-3 ext-sm font-bold"
                >
                    <div className="overflow-hidden overflow-ellipsis w-56 whitespace-nowrap">
                        {item.description ?? item.name}
                    </div>
                </td>
                {cells}
            </tr>
        )
    })

    let head = null
    if (filingEntity?.proFormaModel?.incomeStatementItems?.length) {
        const hv = filingEntity.proFormaModel.incomeStatementItems[0].historicalValues
        head = <tr>
            <th></th>
            {
                hv.map((h, idx) => {
                    return <th key={h.endDate ?? h.instant} className={`font-light ${idx === 0 ? 'font-bold' : null}`}>
                        {h.endDate ?? h.instant}
                    </th>
                })
            }
        </tr>
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
            <br />
            <table className="text-right mb-32">
                <thead>{head}</thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
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
