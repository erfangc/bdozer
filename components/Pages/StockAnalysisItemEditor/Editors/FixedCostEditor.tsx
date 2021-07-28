import React, {useEffect, useState} from 'react'
import {useFactAutoFiller} from "../../../../api-hooks";
import {FixedCostAutoFill, Item, ItemTypeEnum, Model} from "../../../../client";
import {NumberFormatValues} from "react-number-format";
import {NumberInput} from "../../../Common/NumberInput";
import {GhostButton} from "../../../Common/GhostButton";
import {readableMoney} from "../../../../number-formatters";

interface Props {
    item: Item
    model: Model
    onSubmit: (Item) => void
}

export function FixedCostEditor({item, model, onSubmit}: Props) {

    const factAutoFiller = useFactAutoFiller()
    const [fixedCostAutoFills, setFixedCostAutoFills] = useState<FixedCostAutoFill[]>([])
    const [value, setValue] = useState(item?.fixedCost?.cost ?? 0)

    async function init() {
        const {data: fixedCostAutoFills} = await factAutoFiller.getFixedCostAutoFills(item.name, model)
        setFixedCostAutoFills(fixedCostAutoFills)
    }

    useEffect(() => {
        init()
    }, [])

    async function autoFill(option: FixedCostAutoFill) {
        const newValue = option.fixedCost.cost;
        setValue(newValue)
        handleSubmit(newValue)
    }

    function handleChange({floatValue}: NumberFormatValues) {
        setValue(floatValue)
    }

    function handleSubmit(value: number) {
        const updatedItem: Item = {
            ...item,
            type: ItemTypeEnum.FixedCost,
            fixedCost: {
                ...item.fixedCost,
                cost: value
            }
        }
        onSubmit(updatedItem)
    }

    return (
        <div>
            <NumberInput
                value={value}
                label="Fixed Cost"
                onValueChange={handleChange}
                onBlur={() => handleSubmit(value)}
            />
            {!!fixedCostAutoFills.length
            ?
                <div className="space-y-2 flex flex-col mt-2">
                    <label className="text-sm">Autofill Options:</label>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        {
                            fixedCostAutoFills.map(autoFillOption => {
                                const cost = autoFillOption.fixedCost.cost;
                                return (
                                    <GhostButton
                                        key={autoFillOption.label}
                                        onClick={() => autoFill(autoFillOption)}
                                    >
                                        {autoFillOption.label} {readableMoney(cost.toFixed(0))}
                                    </GhostButton>
                                );
                            })
                        }
                    </div>
                </div>
            : null}
        </div>
    )
}