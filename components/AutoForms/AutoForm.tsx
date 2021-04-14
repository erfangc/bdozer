import React, {FocusEvent, useState} from "react";
import { NumberInput } from "../Common/NumberInput";
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
}

export function AutoForm({ body, schema, onSubmit }: AutoFormProps) {

    const defensiveCopy = { ...body }
    schema.map(el => {
        if (el.type === 'percent') {
            defensiveCopy[el.name] = defensiveCopy[el.name] * 100
        }
    })

    const [formState, setFormState] = useState<any>(defensiveCopy)

    function handleSubmit(event: FocusEvent<HTMLElement>) {
        const newState = {...formState}
        schema.map(property => {
            if (property.type == 'percent') {
                newState[property.name] = newState[property.name] / 100
            }
        })
        console.log(newState)
        onSubmit(newState)
    }

    function updatePropertyValue(name: string, newValue: any) {
        const newState = { ...formState, [name]: newValue };
        setFormState(newState)
    }

    const components = schema.map(property => {
        const { type, label, fullLength, name } = property
        const value = formState[name]

        let component = null
        if (type === 'string') {
            component = (
                <div key={name} className={fullLength ? 'col-span-full' : ''}>
                    <TextInput
                        key={name}
                        value={value}
                        label={label}
                        onChange={({ currentTarget: { value } }) => updatePropertyValue(name, value)}
                        onBlur={handleSubmit}
                    />
                </div>
            )
        } else if (type === 'textarea') {
            component = (
                <div key={name} className={fullLength ? 'col-span-full' : ''}>
                    <TextArea
                        key={name}
                        value={value}
                        label={label}
                        onChange={({ currentTarget: { value } }) => updatePropertyValue(name, value)}
                        onBlur={handleSubmit}
                    />
                </div>
            )
        } else if (type === 'number' || type === 'percent') {
            component = (
                <div key={name} className={fullLength ? 'col-span-full' : ''}>
                    <NumberInput
                        key={name}
                        value={value}
                        label={label}
                        onValueChange={({ floatValue }) => updatePropertyValue(name, floatValue)}
                        onBlur={handleSubmit}
                    />
                </div>
            )
        } else if (type === 'integer') {
            component = (
                <div key={name} className={fullLength ? 'col-span-full' : ''}>
                    <NumberInput
                        key={name}
                        value={value}
                        label={label}
                        onValueChange={({ floatValue }) => updatePropertyValue(name, floatValue)}
                        decimalScale={0}
                        onBlur={handleSubmit}
                    />
                </div>
            )
        }

        return component
    });

    return (
        <div className="flex-col space-y-6">
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" >
                {components}
            </form>
        </div>
    )
}