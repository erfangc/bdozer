import React, { useState } from 'react'
import { useMarketing } from '../api-hooks'
import { FilingEntity } from '../client'
import { UnsecuredApp } from '../components/App'
import { Search } from '../components/Mvp/Search'
import { TextInput } from '../components/TextInput'

export default function RequestStockPage() {

    const [entities, setEntities] = useState<FilingEntity[]>([])
    const marketing = useMarketing()

    async function handleSubmit(entities: FilingEntity[]) {
        const requests = entities.map(entity => ({ cik: entity.cik, ticker: entity.tradingSymbol }))
        marketing.stockAnalysisRequest(requests)
        setEntities(entities)
    }

    async function submitEmail(email: string) {
        const requests = entities.map(entity => ({ cik: entity.cik, ticker: entity.tradingSymbol }))
        marketing.stockAnalysisInterest({
            email,
            requests
        })
    }

    return (
        <UnsecuredApp>
            <main className="flex-col flex flex-grow min-h-screen items-center justify-center text-blueGray-200">
                {
                    entities.length === 0
                        ? <Request onSubmit={handleSubmit} />
                        : <Confirm onSubmit={submitEmail} />
                }
            </main>
        </UnsecuredApp>
    )
}

function PrimaryButton({ className, children, ...props }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button
            className={`bg-blue-600 text-blueGray-50 rounded py-2 px-4 transition ease-linear hover:bg-blue-700 focus:outline-none flex items-center ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

function Confirm(props: { onSubmit: (email: string) => void }) {
    const [email, setEmail] = useState<string>()
    const [submitted, setSubmitted] = useState(false)

    function submit() {
        props.onSubmit(email)
        setSubmitted(true)
    }

    return (
        <section className="w-full px-4 xl:px-0 xl:w-2/5">
            <h1 className="text-2xl lg:text-6xl font-extrabold mb-4 lg:mb-8 w-full">Request Submitted!</h1>
            <p className="text-blueGray-300 mb-8">
                {
                    submitted
                        ? <>We will keep you posted on our progress via <b>{email}</b>. Thank you for your interest</>
                        : <>Your interest help us produce better analyses. If you'd like to be notified when the stock report is ready, enter your Email below. We won't send you marketing email</>
                }
            </p>
            {
                !submitted ?
                    <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2">
                        <TextInput
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            className="w-96"
                            value={email}
                            onChange={({ currentTarget: { value } }) => setEmail(value)}
                        />
                        <PrimaryButton onClick={submit}>Submit</PrimaryButton>
                    </div>
                    : null
            }
        </section>
    )
}

function Request({ onSubmit }: { onSubmit: (entities: FilingEntity[]) => void }) {

    const [entities, setEntities] = useState<FilingEntity[]>([])

    function submit() {
        onSubmit(entities)
        setEntities([])
    }

    function remove(entity: FilingEntity) {
        setEntities(entities.filter(e => e !== entity))
    }

    return (
        <section className="w-full px-4 xl:px-0 xl:w-2/5">
            <h1 className="text-2xl lg:text-6xl font-extrabold mb-4 lg:mb-8 w-full">Request Stock Coverage</h1>
            <p className="text-blueGray-300 mb-4 lg:mb-8">
                If you enjoyed our analysis so far, and would like for us to run our algorithm on a stock you are interested in, then
                just fill out the form below. We will initiate coverage when there is enough demand
            </p>
            <Search onSubmit={entity => setEntities([...entities, entity])} />
            <div className="flex flex-col space-y-4 mt-8">
                {
                    entities.map(entity => (
                        <div className="flex justify-between bg-blueGray-800 p-4 rounded">
                            <div className="flex-col space-y-3">
                                <p>
                                    <b>{entity.name}</b> ({entity.tradingSymbol}) <span className="text-sm">{entity.exchanges[0]}</span>
                                </p>
                                <p className="text-xs">
                                    {entity.sicDescription}
                                </p>
                            </div>
                            <div className="self-center">
                                <button className="text-blueGray-300" onClick={() => remove(entity)}>Remove</button>
                            </div>
                        </div>
                    ))
                }
            </div>
            {
                entities.length > 0
                    ? <PrimaryButton onClick={submit} className="mt-4">Request {entities.length} Stock{entities.length > 1 ? 's' : null}</PrimaryButton>
                    : null
            }
        </section>
    )
}
