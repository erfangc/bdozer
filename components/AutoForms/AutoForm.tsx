import { useState } from "react";
import { NumberInput } from "../NumberInput";
import { PrimaryButton } from "../PrimaryButton";

export interface Schema {
    type: 'number' | 'percent' | 'integer',
    name: string
    label?: string
    description?: string
    required?: boolean
}

interface AutoFormProps {
    body: any
    schema: Schema[]
    onSubmit: (body: any) => void
    useGrid?: boolean
}

export function AutoForm({ body, schema, onSubmit, useGrid }: AutoFormProps) {

    const defensiveCopy = { ...body }
    schema.map(el => {
        if (el.type === 'percent') {
            defensiveCopy[el.name] = defensiveCopy[el.name] * 100
        }
    })

    // TODO finish validation of errors
    const [formState, setFormState] = useState<any>(defensiveCopy)
    const [formErrors, setFormErrors] = useState<any>({})

    function handleSubmit(e) {
        e?.preventDefault()
        const newState = { ...formState }
        schema.map(el => {
            if (el.type == 'percent') {
                newState[el.name] = newState[el.name] / 100
            }
        })
        onSubmit(newState)
    }

    const components = schema.map(property => {
        const { type, label, description, name } = property
        const value = formState[name]

        function updatePropertyValue(newValue: any) {
            setFormState({ ...formState, [name]: newValue })
        }

        let component = null

        if (type === 'number' || type === 'percent') {
            component = (
                <NumberInput
                    key={name}
                    value={value}
                    label={label}
                    onValueChange={({ floatValue }) => updatePropertyValue(floatValue)}
                />
            )
        } else if (type === 'integer') {
            component = (
                <NumberInput
                    key={name}
                    value={value}
                    label={label}
                    onValueChange={({ floatValue }) => updatePropertyValue(floatValue)}
                    decimalScale={0}
                />
            )
        }

        return component
    });

    return (
        <div className="flex-col space-y-6">
            <form
                onSubmit={handleSubmit}
                className={
                    useGrid
                        ? "grid grid-flow-col grid-cols-3 grid-rows-4 gap-4"
                        : "flex-col space-y-6"
                }
            >
                {components}
            </form>
            <PrimaryButton onClick={handleSubmit}>
                Confirm &amp; Recalculate
            </PrimaryButton>
        </div>
    )
}