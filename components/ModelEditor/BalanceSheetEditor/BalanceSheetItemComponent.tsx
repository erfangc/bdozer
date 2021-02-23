import React, { Component } from "react"
import NumberFormat from "react-number-format"
import { Item, Model } from "../../../client"
import { Attention, Check } from "../Svgs"
import { BalanceSheetItemEditor } from "./BalanceSheetItemEditor"

interface ItemComponentProps {
    model: Model
    item: Item
    onChange: (newModel: Model) => void

}

interface State {
    editorOpen: boolean
}

export class BalanceSheetItemComponent extends Component<ItemComponentProps, State> {

    clickOutsideHandler = null
    node = null

    constructor(props) {
        super(props)
        this.clickOutsideHandler = (e) => {
            if (!this.node?.contains(e.target) && this.state.editorOpen) {
                this.setState({ editorOpen: false })
            }
        }
        this.state = { editorOpen: false }
    }

    componentDidMount() {
        document.addEventListener('click', this.clickOutsideHandler, false)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.clickOutsideHandler, false)
    }

    render() {
        const { item, onChange, model } = this.props
        const { editorOpen } = this.state
        // TODO fix this validation error
        const checked = item.expression || item.fixedCost || item.subscriptionRevenue || item.percentOfRevenue
        return (
            <div className="flex items-center w-96 justify-between relative" ref={node => { this.node = node }}>
                <span>{item.description ?? item.name}</span>
                <span className="flex items-center space-x-2 cursor-pointer" onClick={() => this.setState({ editorOpen: !editorOpen })}>
                    <NumberFormat
                        className="hover:text-blueGray-400"
                        thousandSeparator
                        decimalScale={0}
                        displayType='text'
                        value={item.historicalValue}
                    />
                    {checked ? <Check /> : <Attention />}
                </span>
                {
                    editorOpen
                        ? <BalanceSheetItemEditor item={item} onChange={onChange} model={model} />
                        : null
                }
            </div>
        )
    }
}
