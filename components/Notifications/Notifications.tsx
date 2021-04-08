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
            <ul className="fixed top-2 right-2 z-10 mt-2 text-gray-700 flex-col space-y-4 whitespace-nowrap">
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
            : null
    }
}
