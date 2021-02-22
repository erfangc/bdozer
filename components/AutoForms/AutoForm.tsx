import { useState } from "react";
import { NumberInput } from "../NumberInput";
import { PrimaryButton } from "../PrimaryButton";
import { SchemaObject } from "./OpenAPITypes";

interface AutoFormProps {
    body: any
    schema: SchemaObject
    onSubmit: (body: any) => void
}

export function AutoForm({ body, schema, onSubmit }: AutoFormProps) {

    const [formState, setFormState] = useState<any>(body)
    const [formErrors, setFormErrors] = useState<any>({})

    function handleSubmit() {
        onSubmit(formState)
    }

    const components = Object.keys(schema.properties).map(property => {
        const { type, description } = schema.properties[property] as SchemaObject
        const value = formState[property]

        function updatePropertyValue(newValue: any) {
            setFormState({ ...formState, [property]: newValue })
        }

        let component = null

        const label = description ?? property

        if (type === 'number') {
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
            {components}
            <PrimaryButton onClick={handleSubmit}>
                Confirm
            </PrimaryButton>
        </div>
    )
}