import React, { Component } from "react"
import { ApiError, serverErrorStore } from "../../ServerErrorStore"
import { ErrorMessage } from "./ErrorMessage"

interface State {
    errors: ApiError[]
}

export class ServerErrors extends Component<{}, State> {

    private subscriptionHandle = null

    constructor(props) {
        super(props)
        this.state = { errors: [] }
    }

    componentDidMount() {
        this.subscriptionHandle = serverErrorStore.subscribe(
            newErrors => this.setState({ errors: newErrors })
        )
    }

    componentWillUnmount() {
        serverErrorStore.unsubscribe(this.subscriptionHandle)
    }

    dismissError = (id: string) => {
        serverErrorStore.dismissError(id)
    }

    render() {
        const { errors } = this.state
        return errors.length
            ?
            <div
                className="z-10 px-4 py-3 bg-red-500 rounded-lg shadow-lg font-semibold text-lg text-blueGray-50 w-32 text-center transition ease-linear hover:bg-red-400 cursor-pointer fixed bottom-2 left-2"
            >
                <span className="rounded-full bg-red-700 px-2 mr-2">
                    {errors.length}
                </span>
                <span>Errors</span>
                <ul className="absolute bottom-full left-0 mb-2 text-gray-700 flex-col space-y-4 whitespace-nowrap">
                    {
                        errors.map(
                            error => (
                                <ErrorMessage
                                    key={error?.id}
                                    error={error}
                                    onDismiss={() => this.dismissError(error.id)}
                                />
                            )
                        )
                    }
                </ul>
            </div>
            :
            null
    }
}
