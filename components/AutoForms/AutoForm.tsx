import { useState } from "react";
import { NumberInput } from "../Common/NumberInput";
import { PrimaryButton } from "../Common/PrimaryButton";
import { TextArea } from "../Common/Textarea";
import { TextInput } from "../Common/TextInput";

export interface Schema {
    type: 'number' | 'percent' | 'integer' | 'string' | 'textarea',
    name: string
    label?: string
    description?: string
    required?: boolean
    fullLength?: boolean
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
        const { type, label, fullLength, name } = property
        const value = formState[name]

        function updatePropertyValue(newValue: any) {
            setFormState({ ...formState, [name]: newValue })
        }

        let component = null
        if (type === 'string') {
            component = (
                <div className={fullLength ? 'col-span-full' : ''}>
                    <TextInput
                        key={name}
                        value={value}
                        label={label}
                        onChange={({ currentTarget: { value } }) => updatePropertyValue(value)}
                    />
                </div>
            )
        } else if (type === 'textarea') {
            component = (
                <div className={fullLength ? 'col-span-full' : ''}>
                    <TextArea
                        key={name}
                        value={value}
                        label={label}
                        onChange={({ currentTarget: { value } }) => updatePropertyValue(value)}
                    />
                </div>
            )
        } else if (type === 'number' || type === 'percent') {
            component = (
                <div className={fullLength ? 'col-span-full' : ''}>
                    <NumberInput
                        key={name}
                        value={value}
                        label={label}
                        onValueChange={({ floatValue }) => updatePropertyValue(floatValue)}
                    />
                </div>
            )
        } else if (type === 'integer') {
            component = (
                <div className={fullLength ? 'col-span-full' : ''}>
                    <NumberInput
                        key={name}
                        value={value}
                        label={label}
                        onValueChange={({ floatValue }) => updatePropertyValue(floatValue)}
                        decimalScale={0}
                    />
                </div>
            )
        }

        return component
    });

    return (
        <div className="flex-col space-y-6">
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-3 gap-4"
            >
                {components}
            </form>
            <PrimaryButton onClick={handleSubmit}>
                Confirm &amp; Recalculate
            </PrimaryButton>
        </div>
    )
}