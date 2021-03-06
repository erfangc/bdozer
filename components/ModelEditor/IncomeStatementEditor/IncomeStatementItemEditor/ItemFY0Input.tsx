import React, { useState } from "react";
import NumberFormat from "react-number-format";
import { useMxParserApi } from "../../../../apiHooks";
import { Item } from "../../../../client";

interface ItemFY0InputProps {
    item: Item
    onChange: (newValue: any) => void
}

/**
 * This component should be able to accept and perform arthmetics
 */
export function ItemFY0Input({ item, onChange }: ItemFY0InputProps) {

    const [value, setValue] = useState(item.historicalValue)
    const [editing, setEditing] = useState(false)
    const [evalResult, setEvalResult] = useState<number | 'Error'>(undefined)
    const mxparser = useMxParserApi()

    /**
     * process the key stroke and evaluate the content so far
     */
    async function processChange(newValue: any) {

        setValue(newValue)

        try {
            const {
                data: { error, value }
            } = await mxparser.evaluate({ formula: newValue })
            if (!error) {
                setEvalResult(value)
            } else {
                setEvalResult('Error')
            }
        } catch (e) {
            // TODO handle this
        }

    }

    function beginEditing() {
        setEditing(true)
    }

    //
    // submit the change if it is valid
    //
    function attemptSubmit() {
        if (evalResult !== undefined && typeof evalResult === 'number') {
            setValue(evalResult)
            onChange(evalResult)
            setEvalResult(undefined)
            setEditing(false)
        }
    }

    return (
        <div className="flex-col flex">
            <label htmlFor={item.name} className="mb-2 text-sm">FY0 (Historical Value)</label>
            <div className="relative flex">
                {
                    editing
                        ?
                        <NumberFormat
                            thousandSeparator
                            decimalScale={1}
                            name={item.name}
                            value={value}
                            displayType='text'
                            placeholder="ex: 100,000"
                            onClick={beginEditing}
                            className="border border-blueGray-500 bg-blueGray-900 text-blueGray-50 rounded-sm px-3 py-2 focus:outline-none flex-grow"
                        />
                        :
                        <input
                            type="text"
                            value={value}
                            onChange={({ currentTarget: { value } }) => processChange(value)}
                            onKeyDown={({ key }) => key === 'Enter' ? attemptSubmit() : null}
                            onBlur={attemptSubmit}
                            className="border border-blueGray-500 bg-blueGray-900 text-blueGray-50 rounded-sm px-3 py-2 focus:outline-none flex-grow"
                        />
                }
                {
                    evalResult
                        ?
                        <div className="absolute inset-y-full bg-blueGray-700 px-2 rounded h-12 flex items-center mt-1">
                            <span className="text-base font-light mr-2">Result:</span>
                            {
                                typeof evalResult === 'number'
                                    ?
                                    <>
                                        <NumberFormat value={evalResult} displayType="text" className="text-base font-semibold" thousandSeparator decimalScale={2} />
                                        <span className="text-sm font-light ml-2">(Press Enter to Confirm)</span>
                                    </>
                                    : evalResult
                            }
                        </div>
                        : null
                }
                <button
                    className="transition ease-linear hover:bg-blueGray-700 rounded px-2 ml-1 focus:outline-none"
                    onClick={attemptSubmit}
                >
                    <Refresh />
                </button>
            </div>
            <p className="text-sm text-blueGray-400 mt-2">(Hint) you can do arthemtics in this field</p>
        </div>
    )
}

function Refresh() {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.33337 26.6667V17.3334H14.6667L10.3774 21.6267C11.8573 23.1401 13.8833 23.9952 16 24C19.386 23.995 22.4021 21.859 23.5307 18.6667H23.5547C23.7074 18.2328 23.823 17.7868 23.9 17.3334H26.5827C25.9108 22.6666 21.3754 26.6665 16 26.6667H15.9867C13.1584 26.6751 10.4443 25.5517 8.44937 23.5467L5.33337 26.6667ZM8.09871 14.6667H5.41604C6.08771 9.3355 10.62 5.33622 15.9934 5.33331H16C18.8289 5.32425 21.5437 6.44781 23.5387 8.45336L26.6667 5.33331V14.6667H17.3334L21.6294 10.3734C20.1479 8.85822 18.1191 8.00288 16 8.00003C12.6141 8.00503 9.59801 10.1411 8.46937 13.3334H8.44537C8.29145 13.7668 8.17589 14.213 8.10004 14.6667H8.09871Z" fill="#3B82F6" />
        </svg>
    )
}