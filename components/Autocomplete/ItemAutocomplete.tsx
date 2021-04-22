import React, {ChangeEvent} from 'react'
import {Item, Model} from "../../client";

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    model?: Model
    initialValue?: string
    wrapperClassName?: string
    choicesContainerClassName?: string
    choiceClassName?: string
    onItemSelect: (item: Item) => void
}

interface State {
    activeIdx?: number
    activeItem?: Item
    choices: Item[]
    term?: string
}

/**
 * A class component for Item autocompletion to assist with
 * quick editing of the model that needs to reference other items
 */
export class ItemAutocomplete extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            choices: [],
            activeIdx: undefined,
            activeItem: undefined,
            term: props.initialValue || '',
        }
    }

    ref = React.createRef<HTMLInputElement>();

    handleChange = ({currentTarget}: ChangeEvent<HTMLInputElement>) => {
        const term = currentTarget.value
        this.refreshChoices(currentTarget.value)
        this.setState({term});
    }

    refreshChoices = (term: string) => {
        if (term === '') {
            this.setState({choices: []});
        } else {
            const model = this.props.model
            const items = [...(model?.incomeStatementItems || []), ...(model?.balanceSheetItems || [])];
            const choices = items.filter(item => {
                const lowerCaseTerm = term.toLowerCase()
                const nameMatch = item.name.toLowerCase().indexOf(lowerCaseTerm) !== -1
                const descriptionMatch = item.description.toLowerCase().indexOf(lowerCaseTerm) !== -1
                return nameMatch || descriptionMatch
            }).slice(0, 5)
            if (choices.length > 0) {
                this.setState({choices: choices, activeIdx: 0, activeItem: choices[0]});
            } else {
                this.setState({choices: choices,});
            }
        }
    }

    keyboardListener = (event) => {
        if (document.activeElement !== this.ref.current) {
            return
        }
        if (event.keyCode === 38) {
            event.preventDefault()
            // up arrow
            this.up()
        } else if (event.keyCode === 40) {
            event.preventDefault()
            // down arrow
            this.down()
        } else if (event.keyCode === 13) {
            event.preventDefault()
            // enter key
            this.enter()
        } else if (event.keyCode === 27) {
            event.preventDefault()
            // escape key
            this.escape()
        }
    }

    select = (idx: number) => {
        const item = this.state.choices[idx]
        this.setState({
            activeItem: item,
            activeIdx: idx
        });
    }


    deselect = () => {
        this.setState({
            activeIdx: undefined,
            activeItem: undefined
        });
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyboardListener, false);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.keyboardListener, false);
    }

    up = () => {
        const activeIdx = this.state.activeIdx
        if (activeIdx === undefined) {
            this.select(0)
        } else if (activeIdx !== 0) {
            this.select(activeIdx - 1)
        }
    }

    down = () => {
        const activeIdx = this.state.activeIdx
        const choices = this.state.choices
        if (activeIdx === undefined) {
            this.select(0)
        } else if (activeIdx !== choices.length - 1) {
            console.log(activeIdx, activeIdx + 1)
            this.select(activeIdx + 1)
        }
    }

    enter = () => {
        const activeItem = this.state.activeItem
        this.props.onItemSelect(activeItem)
        this.setState({choices: [], activeItem: undefined, activeIdx: undefined, term: activeItem.name});
        this.ref.current?.focus()
    }

    escape = () => {
        this.setState({
            choices: [],
            activeItem: undefined,
            activeIdx: undefined,
        });
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({
            term: nextProps.initialValue || ''
        });
    }

    render() {

        const {choices, activeIdx, term} = this.state
        const {className, wrapperClassName, choicesContainerClassName, choiceClassName, ...props} = this.props

        return (
            <div className={`relative text-blueGray-100 ${wrapperClassName}`}>
                <input
                    ref={this.ref}
                    value={term}
                    type="text"
                    onChange={this.handleChange}
                    placeholder="Search item"
                    className={`py-2 border-0 placeholder-blueGray-400 bg-blueGray-700 ${className}`}
                    {...props}
                />
                <ul
                    className={`mt-1 cursor-pointer absolute top-full overflow-hidden z-10 ${choicesContainerClassName}`}
                >
                    {choices.map((item, idx) => {
                        const {name, description} = item
                        const active = activeIdx === idx
                        return (
                            <li
                                key={name}
                                className={`overflow-hidden px-2 py-3 transition ease-in ${active ? 'bg-blue-600' : ''} ${choiceClassName}`}
                                onMouseEnter={() => this.select(idx)}
                                onMouseLeave={this.deselect}
                                onClick={this.enter}
                            >
                                {description ?? name}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
