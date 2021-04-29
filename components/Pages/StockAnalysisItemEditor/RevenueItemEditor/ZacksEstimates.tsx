import React, {useEffect, useState} from 'react'
import {useZacksEstimates} from "../../../../api-hooks";
import {Discrete, Model} from "../../../../client";
import {Title} from "../../../Common/Title";
import {PrimaryButton} from "../../../Common/PrimaryButton";
import {simpleMoney} from "../../../../simple-number";
import {useRouter} from "next/router";
import {SecondaryButton} from "../../../Common/SecondaryButton";

interface Props {
    model: Model
    onConfirm: (discrete: Discrete) => void
    back: () => void
}

export function ZacksEstimates({model, onConfirm, back}: Props) {

    const zacksEstimates = useZacksEstimates()
    const [data, setData] = useState<Discrete>({formulas: {}})
    const router = useRouter()

    async function init() {
        try {
            const {data} = await zacksEstimates.revenueProjections(model.ticker)
            setData(data)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        init()
    }, [])


    return (
        <div>
            {
                Object.keys(data.formulas).length === 0
                    ?
                    <>
                        <Title>Sorry, we could not find an revenue estimate for {model.ticker}</Title>
                        <PrimaryButton onClick={router.back}>Back</PrimaryButton>
                    </>
                    : <>
                        <Title>Zack's Estimates</Title>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 my-8">
                            {Object.keys(data.formulas).map(key => {
                                return (
                                    <div key={key}>
                                        <h3 className="font-extrabold">{key}</h3>
                                        <p>{simpleMoney(parseFloat(data.formulas[key]))}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="space-x-2">
                            <PrimaryButton onClick={() => onConfirm(data)}>Ok</PrimaryButton>
                            <SecondaryButton onClick={back}>Back</SecondaryButton>
                        </div>
                    </>
            }
        </div>
    )
}