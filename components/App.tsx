import React, { useEffect } from 'react'
import { ModelEditor } from '../components/ModelEditor/ModelEditor'
import { Nav } from '../components/Nav/Nav'
import { ServerErrors } from '../components/ServerErrors/ServerErrors'
import { useAuth0 } from '@auth0/auth0-react'

export function App() {
    const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
    if (isLoading) {
        return null
    } else if (!isAuthenticated) {
        loginWithRedirect()
        return null
    } else {
        return (
            <div className="bg-blueGray-900 min-h-screen antialiased">
                <Nav />
                <ServerErrors />
                <div className="lg:ml-20 px-16 pt-16 pb-96">
                    <ModelEditor />
                </div>
            </div>
        )
    }
}