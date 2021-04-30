import React from 'react'
import {ManualProjections} from "../../../../client";
import {Title} from "../../../Common/Title";
import {PrimaryButton} from "../../../Common/PrimaryButton";
import {simpleMoney} from "../../../../simple-number";
import {useRouter} from "next/router";
import {SecondaryButton} from "../../../Common/SecondaryButton";

interface Props {
    manualProjections: ManualProjections
    back: () => void
    close: () => void
    onConfirm: (projections: ManualProjections) => void
}

/**
 * This component just displays the Zacks estimates
 * @param model
 * @param onConfirm
 * @param back
 * @constructor
 */
export function ManualProjectionsPreview({manualProjections, onConfirm, back, close}: Props) {

    const router = useRouter()

    return (
        <div>
            {
                manualProjections.manualProjections.length === 0
                    ?
                    <>
                        <Title>Sorry, we could not find an revenue estimate</Title>
                        <PrimaryButton onClick={router.back}>Back</PrimaryButton>
                    </>
                    : <>
                        <Title>Preview Future Revenues</Title>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 my-8">
                            {manualProjections.manualProjections.map(({fiscalYear, value}) => {
                                return (
                                    <div key={fiscalYear}>
                                        <h3 className="font-extrabold">{fiscalYear}</h3>
                                        <p>{simpleMoney(value)}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="space-x-2">
                            <PrimaryButton onClick={() => onConfirm(manualProjections)}>Ok</PrimaryButton>
                            <SecondaryButton onClick={back}>Back</SecondaryButton>
                            <SecondaryButton onClick={close}>Close</SecondaryButton>
                        </div>
                    </>
            }
        </div>
    )
}