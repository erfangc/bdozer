import React, {useEffect, useState} from 'react'
import {useFactAutoFiller} from "../../../../api-hooks";
import {Item, ItemTypeEnum, Model, PercentOfRevenueAutoFill} from "../../../../client";
import {NumberFormatValues} from "react-number-format";
import {NumberInput} from "../../../Common/NumberInput";
import {GhostButton} from "../../../Common/GhostButton";
import {simplePercent} from "../../../../simple-number";

interface Props {
    item: Item
    model: Model
    onSubmit: (Item) => void
}

export function PercentOfRevenueEditor({item, model, onSubmit}: Props) {

    const factAutoFiller = useFactAutoFiller()
    const [percentOfRevenueAutoFills, setPercentOfRevenueOptions] = useState<PercentOfRevenueAutoFill[]>([])
    const [value, setValue] = useState((item?.percentOfRevenue?.percentOfRevenue ?? 0) * 100)

    async function init() {
        const {data: percentOfRevenueOptions} = await factAutoFiller.getPercentOfRevenueAutoFills(item.name, model)
        setPercentOfRevenueOptions(percentOfRevenueOptions)
    }

    useEffect(() => {
        init()
    }, [])

    async function autoFill(option: PercentOfRevenueAutoFill) {
        const newValue = option.percentOfRevenue.percentOfRevenue * 100;
        setValue(newValue)
        handleSubmit(newValue)
    }

    function handleChange({floatValue}: NumberFormatValues) {
        setValue(floatValue)
    }

    function handleSubmit(value: number) {
        const updatedItem: Item = {
            ...item,
            type: ItemTypeEnum.PercentOfRevenue,
            percentOfRevenue: {
                ...item.percentOfRevenue,
                percentOfRevenue: value / 100.0
            }
        }
        onSubmit(updatedItem)
    }

    return (
        <div>
            <NumberInput
                value={value}
                label="Percent of Revenue"
                onValueChange={handleChange}
                onBlur={() => handleSubmit(value)}
            />
            {
                !!percentOfRevenueAutoFills.length
                ?
                    <div className="space-y-2 flex flex-col mt-2">
                        <label className="text-sm">Quick Autofill Options:</label>
                        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                            {
                                percentOfRevenueAutoFills.map(autoFillOption => {
                                    const percentOfRevenue = autoFillOption.percentOfRevenue.percentOfRevenue;
                                    return (
                                        <GhostButton key={autoFillOption.label} onClick={() => autoFill(autoFillOption)}>
                                            {autoFillOption.label} {simplePercent(percentOfRevenue)}
                                        </GhostButton>
                                    );
                                })
                            }
                        </div>
                    </div>
                : null
            }
        </div>
    )
}