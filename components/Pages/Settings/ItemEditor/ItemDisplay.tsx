import React, { Component } from "react"
import NumberFormat from "react-number-format"
import { Item, Model } from "../../../../client"
import { ItemEditor } from "."
import { Attention as Manual, Check } from "./Svgs"

interface ItemComponentProps {
    overriden?: boolean
    item: Item
    onChange: (newItem: Item) => void
    onClear: (item: Item) => void
}

interface State {
    editorOpen: boolean
}

export class ItemDisplayComponent extends Component<ItemComponentProps, State> {

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
        const { item, overriden } = this.props
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
                <span>{item.description ?? item.name}</span>
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
