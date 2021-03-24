import { App } from "../components/App";

function SettingsComponent() {
    return (
        <main className="text-4xl font-bold text-white flex-grow h-screen flex items-center justify-center">
            <h1 className="">
                Advanced Panel
            </h1>
        </main>
    )
}

export default function SettingsPage() {
    return (
        <App>
            <SettingsComponent />
        </App>
    )
}