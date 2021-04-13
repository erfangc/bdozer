import React from 'react'
import { useState } from 'react'
import { useEdgarExplorer, useFilingEntityManager, useFilingEntityManagerUnsecured } from '../../api-hooks'
import { EdgarEntity, EdgarEntitySource, FilingEntity } from '../../client'

interface Props {
    loading?: boolean
    className?: string
    onSubmit: (cik: FilingEntity) => void
}

export function FilingEntitySearch(props: Props) {
    const { onSubmit } = props
    const edgarExplorerApi = useEdgarExplorer()
    const filingEntityManagerUnsecured = useFilingEntityManagerUnsecured()
    const filingEntityManager = useFilingEntityManager()

    const [term, setTerm] = useState<string>()
    const [found, setFound] = useState<EdgarEntity[]>([])

    async function search(newTerm) {
        if (newTerm) {
            const { data } = await edgarExplorerApi.searchEntities(newTerm)
            setFound(data)
        } else {
            setFound([])
        }
    }

    async function submit(edgarEntity: EdgarEntity) {
        setFound([])
        const cik = edgarEntity['_id']
        const { data: filingEntity } = await filingEntityManagerUnsecured.getFilingEntity(cik)
        try {
            if (!filingEntity) {
                const resp = await filingEntityManager.createFilingEntity(cik)
                onSubmit(resp.data)
            } else {
                onSubmit(filingEntity)
            }

        } catch (e) {
            console.error(e);
        }
        setTerm('')
        setFound([])
    }

    function changeTerm(newTerm: string) {
        setTerm(newTerm)
        search(newTerm)
    }

    const entities = found.map(entity => {
        const source = entity['_source'] as EdgarEntitySource
        const id = entity['_id']
        return (
            <li
                key={id}
                className="px-4 py-2 cursor-pointer hover:bg-blueGray-900 text-sm flex justify-between items-center whitespace-nowrap transition ease-linear"
                onClick={() => submit(entity)}
            >
                <span className="w-56 md:w-96 overflow-hidden overflow-ellipsis">
                    {source.entity}
                </span>
                <span className="overflow-hidden overflow-ellipsis bg-blue-600 rounded p-2 text-blueGray-100 w-16 flex justify-center font-bold">
                    {source.tickers}
                </span>
            </li>
        )
    }).slice(0, 5)

    return (
        <div className={`text-blueGray-50 ${props.className}`}>
            <div className="relative container max-w-lg">
                <div className={`bg-blueGray-700 px-4 ${entities.length > 0 ? 'rounded-t' : 'rounded'}`}>
                    {
                        props.loading
                            ?
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline animate-spin">
                                <path d="M19.9998 6.66669V1.66669L13.3332 8.33335L19.9998 15V10C25.5165 10 29.9998 14.4834 29.9998 20C29.9998 21.6834 29.5832 23.2834 28.8332 24.6667L31.2665 27.1C32.5665 25.05 33.3332 22.6167 33.3332 20C33.3332 12.6334 27.3665 6.66669 19.9998 6.66669ZM19.9998 30C14.4832 30 9.99984 25.5167 9.99984 20C9.99984 18.3167 10.4165 16.7167 11.1665 15.3334L8.73317 12.9C7.43317 14.95 6.6665 17.3834 6.6665 20C6.6665 27.3667 12.6332 33.3334 19.9998 33.3334V38.3334L26.6665 31.6667L19.9998 25V30Z" fill="#E2E8F0" />
                            </svg>
                            :
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline">
                                <path d="M31.1283 32.6783L21.6033 23.1517C17.3661 26.1641 11.5274 25.4273 8.17146 21.4566C4.81552 17.4859 5.06194 11.606 8.73834 7.93001C12.4138 4.25242 18.2942 4.00494 22.2657 7.3607C26.2371 10.7165 26.9744 16.5558 23.9617 20.7933L33.4867 30.32L31.13 32.6767L31.1283 32.6783ZM15.8083 8.33332C12.6478 8.33261 9.92116 10.5511 9.27913 13.6457C8.6371 16.7403 10.2562 19.8605 13.1561 21.1171C16.0561 22.3737 19.4398 21.4214 21.2587 18.8368C23.0777 16.2521 22.8318 12.7455 20.67 10.44L21.6783 11.44L20.5417 10.3067L20.5217 10.2867C19.2747 9.03197 17.5773 8.32856 15.8083 8.33332Z" fill="#E2E8F0" />
                            </svg>
                    }
                    <input
                        autoFocus
                        value={term}
                        placeholder="Search for a company"
                        onChange={e => changeTerm(e.currentTarget.value)}
                        className="relative text-blueGray-50 pl-4 py-4 focus:outline-none bg-blueGray-700 placeholder-blueGray-400 text-lg"
                    />
                </div>

                {/* Autocomplete options */}
                <div
                    className={`absolute bg-blueGray-700 top-full shadow-md w-full rounded-b border-t ease-in transition-all ${entities.length > 0 ? 'border-blueGray-600' : 'border-blueGray-900'} overflow-hidden`}
                    style={{
                        height: entities.length > 0 ? `${(entities.length + 1) * 52 + 24}px` : 0
                    }}
                >
                    <h5 className="px-4 pt-8 text-sm font-bold text-blueGray-400">Companies Found</h5>
                    <ul className="py-2">
                        {entities}
                    </ul>
                </div>
            </div>
        </div>
    )
}

