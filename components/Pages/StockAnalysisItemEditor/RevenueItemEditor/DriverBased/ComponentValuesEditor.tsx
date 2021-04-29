import {RevenueComponent, Value} from "../../../../../client";
import {NumberFormatValues} from "react-number-format";
import {NumberInput} from "../../../../Common/NumberInput";
import {DeleteButton} from "../../../../Common/DeleteButton";
import {Delete, Plus} from "../../../../Common/Svgs";
import {GhostButton} from "../../../../Common/GhostButton";
import React from "react";

interface ComponentValuesEditorProps {
    setComponent: (component: RevenueComponent) => void
    component: RevenueComponent
}

export function ComponentValuesEditor({setComponent, component}: ComponentValuesEditorProps) {
    const {label, values} = component

    function changeValues(values: Value[]) {
        setComponent({...component, values})
    }

    function add() {
        let lastValue: number = 0, lastYear: number = new Date().getFullYear()
        if (values.length > 0) {
            const {value, year} = values[values.length - 1];
            lastValue = value;
            lastYear = year;
        }
        setComponent({
            ...component,
            values: [...values, {value: lastValue, year: lastYear + 1,}]
        })
    }

    return (
        <div className="my-4">
            <label>Enter Values for <span className="font-extrabold">{label}</span></label>
            {values.map(({value, year}) => {

                function changeYear(e: NumberFormatValues) {
                    const updated = values.map(v => {
                        if (v.year === year) {
                            return {...v, year: e.floatValue}
                        } else {
                            return v
                        }
                    })
                    changeValues(updated)
                }

                function deleteYear() {
                    changeValues(values.filter(value => value.year !== year))
                }

                function changeValue(e: NumberFormatValues) {
                    const updated = values.map(v => {
                        if (v.year === year) {
                            return {...v, value: e.floatValue}
                        } else {
                            return v
                        }
                    })
                    changeValues(updated)
                }

                return (
                    <div key={year} className="flex flex-col space-y-2 my-4">
                        <div className="flex space-x-2 items-end">
                            <NumberInput
                                value={year}
                                onValueChange={changeYear}
                                thousandSeparator={false}
                                decimalScale={0}
                                label="Year"
                            />
                            <DeleteButton className="h-10" onClick={deleteYear}>
                                <Delete/>
                            </DeleteButton>
                        </div>
                        <NumberInput
                            value={value}
                            onValueChange={changeValue}
                            label="Value"
                        />
                    </div>
                )
            })}

            <GhostButton className="my-2" onClick={add}>
                <Plus/><span className="ml-1">Add</span>
            </GhostButton>
        </div>
    )
}