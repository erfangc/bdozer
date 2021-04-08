import React, { Component } from "react"
import { notificationStore, Notification } from "./NotificationStore"
import { Message } from "./Message"

interface State {
    notifications: Notification[]
}

export class Notifications extends Component<{}, State> {

    private subscriptionHandle: number = null

    constructor(props) {
        super(props)
        this.state = { notifications: [] }
    }

    componentDidMount() {
        this.subscriptionHandle = notificationStore.subscribe(
            newNotifications => {
                this.setState({ notifications: newNotifications })
            }
        )
    }

    componentWillUnmount() {
        notificationStore.unsubscribe(this.subscriptionHandle)
    }

    dismissError = (id: string) => {
        notificationStore.dismissNotification(id)
    }

    render() {
        const { notifications } = this.state
        return notifications.length
            ?
            <div
                className="fixed top-2 right-2 z-10 px-4 py-3 bg-red-500 rounded-lg shadow-lg font-semibold text-lg text-blueGray-50 w-32 text-center transition ease-linear hover:bg-red-400 cursor-pointer"
            >
                <span className="rounded-full bg-red-700 px-2 mr-2">{notifications.length}</span>
                <span>Notifications</span>
                <ul className="absolute top-full right-0 mt-2 text-gray-700 flex-col space-y-4 whitespace-nowrap">
                    {
                        notifications.map(
                            notification =>
                                <Message
                                    key={notification?.id}
                                    notification={notification}
                                    onDismiss={() => this.dismissError(notification.id)}
                                />
                        )
                    }
                </ul>
            </div>
            : null
    }
}
