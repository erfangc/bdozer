import { notificationStore, Notification } from "./NotificationStore"

export function Message({ notification, onDismiss }: { notification: Notification, onDismiss: () => void }) {
    return (
        <li className="py-3 px-4 bg-red-600 rounded-lg shadow-lg text-gray-50 text-left flex justify-between space-x-8">
            <div>
                <span className="font-bold">
                    Error Message
          </span>
                <p className="text-sm font-light text-l">
                    {notification?.message ?? 'An unknown server error have occurred'}
                </p>
            </div>
            <a className="self-center text-sm text-blueGray-50" onClick={onDismiss}>
                Dismiss
            </a>
        </li>
    )
}