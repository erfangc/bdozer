import React, {useState} from 'react'
import {Item} from "../../../client";
import {NumberFormatValues} from "react-number-format";
import {NumberInput} from "../../Common/NumberInput";
import {GhostButton} from "../../Common/GhostButton";
import {Plus} from "../../Common/Svgs";

interface DiscreteEditorProps {
    item: Item
    onSubmit: (Item) => void
}

function str2Number(formulas: { [p: string]: string }) {
    return Object.keys(formulas).reduce((previousValue, key) => ({
        ...previousValue,
        [key]: parseFloat(formulas[key])
    }), {})
}

export function DiscreteEditor({item, onSubmit}: DiscreteEditorProps) {

    const discrete = item.discrete ?? {formulas: {}}

    const [formulas, setFormulas] = useState(str2Number(discrete.formulas))
    const keys = Object.keys(formulas).sort()

    function handleChange(key, values: NumberFormatValues) {
        setFormulas({...formulas, [key]: values.floatValue})
    }

    function handleSubmit() {
        onSubmit({...item, discrete: {...discrete, formulas}})
    }

    function add() {
        const lastKey = keys[keys.length - 1]
        const lastValue = formulas[lastKey]
        const key = keys.length === 0 ? 1 : parseInt(lastKey) + 1;
        const updatedFormula = {
            ...formulas, [key]: lastValue
        }
        const newItem = {
            ...item,
            discrete: {...discrete, formulas: updatedFormula}
        }
        setFormulas((updatedFormula))
        onSubmit(newItem)
    }

    function remove(key: string) {
        const updatedFormulas = {
            ...formulas
        }
        delete updatedFormulas[key]
        const newItem = {
            ...item,
            discrete: {...discrete, formulas: updatedFormulas}
        }
        onSubmit(newItem)
        setFormulas(updatedFormulas)
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
                {keys.map(key => {
                    return (
                        <div key={key} className="flex space-x-1">
                            <NumberInput
                                value={formulas[key]}
                                label={key.toString()}
                                onValueChange={values => handleChange(key, values)}
                                onBlur={handleSubmit}
                            />
                            <button
                                onClick={() => remove(key)}
                                className="fill-current text-blueGray-500 hover:text-blueGray-400 transition ease-linear mt-6 focus:outline-none"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px">
                                    <path d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                                </svg>
                            </button>
                        </div>
                    )
                })}
            </div>
            <GhostButton onClick={add} className="font-semibold"><Plus/>Year</GhostButton>
        </div>
    );
}