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
}

export function AutoForm({ body, schema, onSubmit }: AutoFormProps) {

    const dcopy = { ...body }

    schema.map(el => {
        if (el.type === 'percent') {
            dcopy[el.name] = dcopy[el.name] * 100
        }
    })

    // TODO finish
    const [formState, setFormState] = useState<any>(dcopy)
    const [dirty, setDirty] = useState(false)
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
                    value={value}
                    label={label}
                    onValueChange={({ floatValue }) => updatePropertyValue(floatValue)}
                />
            )
        } else if (type === 'integer') {
            component = (
                <NumberInput
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
            <form onSubmit={handleSubmit} className="flex-col space-y-6">
                {components}
            </form>
            <PrimaryButton onClick={handleSubmit} disabled={!dirty}>
                Confirm &amp; Recalculate
            </PrimaryButton>
        </div>
    )
}