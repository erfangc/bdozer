import React, { Component } from "react"
import NumberFormat from "react-number-format"
import { ItemEditor } from "./ItemEditor"
import { Item, StockAnalysis2 } from "../../../../client"
import { Attention as Manual, Check } from "./ItemEditor/Svgs"
import { BetterPopover, Popover } from "../../../Popover"
import { ItemTimeSeries } from "../ItemTimeSeries"
import { ToolButton } from "./Toolbar/ToolButton"

interface Props {
    overriden?: boolean
    item: Item
    stockAnalysis: StockAnalysis2
    onChange: (newItem: Item) => void
    onClear: (item: Item) => void
}

interface State {
    editorOpen: boolean
}

export class ItemDisplay extends Component<Props, State> {

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

    handleChange = (item: Item) => {
        const { onChange } = this.props
        onChange(item)
        this.setState({ editorOpen: false })
    }

    handleClear = () => {
        const { item, onClear } = this.props
        onClear(item)
        this.setState({ editorOpen: false })
    }

    handleDismiss = () => {
        this.setState({ editorOpen: false })
    }

    render() {
        const { item, overriden, stockAnalysis } = this.props
        const { editorOpen } = this.state

        return (
            <div
                className={`flex items-center justify-between relative cursor-pointer`}
                ref={node => { this.node = node }}
            >
                {/* wrap around the outside of the component to simulate a border with negative padding */}
                <div
                    onClick={() => this.setState({ editorOpen: !editorOpen })}
                    className={`absolute -inset-2 border rounded-lg hover:border-opacity-100 transition ease-linear border-blueGray-600 border-opacity-0 hover:shadow-lg`}
                >
                </div>
                <div className="flex space-x-2">
                    <span>{item.description ?? item.name}</span>
                    <BetterPopover trigger={<History />}>
                        <ItemTimeSeries result={stockAnalysis} item={item} />
                    </BetterPopover>
                </div>
                <span className={`flex items-center space-x-2`}>
                    <NumberFormat
                        className="hover:text-blueGray-400"
                        thousandSeparator
                        decimalScale={0}
                        displayType='text'
                        value={item.historicalValue?.value}
                    />
                    {!overriden ? <Check /> : <Manual />}
                </span>
                {
                    editorOpen
                        ? <ItemEditor
                            item={item}
                            onChange={this.handleChange}
                            onClear={this.handleClear}
                            onDismiss={this.handleDismiss}
                        />
                        : null
                }
            </div>
        )
    }
}

function History() {
    return (
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline">
            <path d="M3.3335 6.13333H5.3335V12.6667H3.3335V6.13333ZM7.06683 3.33333H8.9335V12.6667H7.06683V3.33333V3.33333ZM10.8002 8.66666H12.6668V12.6667H10.8002V8.66666Z" fill="#F8FAFC" />
        </svg>
    )
}