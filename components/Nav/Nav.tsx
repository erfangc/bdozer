import React from "react"
import { Logo } from "./Logo"
import { NavButton, Settings } from "./NavButton"
import { useAuth0 } from '@auth0/auth0-react'

interface NavProps {

}

export function Nav(props: NavProps) {

    const { user, logout } = useAuth0()

    let origin = null
    if (typeof window !== 'undefined') {
        origin = window.location.origin
    }

    return (
        <nav className="hidden fixed inset-0 w-20 bg-blueGray-800 flex-col lg:flex items-center pt-8 justify-between">
            <div className="flex-col space-y-8">
                <Logo />
                <div className="h-px w-full border-b border-blueGray-700"></div>
                <div className="flex-col space-y-6">
                    <NavButton active />
                    <NavButton icon={<Settings />} />
                </div>
            </div>
            <div className="text-blueGray-50 pb-6 flex-col space-y-4 flex items-center">
                <img
                    src={user.picture} className="w-10 h-10 rounded-full" alt="Profile Picture"
                />
                <a
                    className="text-sm cursor-pointer hover:text-blueGray-400 transition ease-linear"
                    onClick={() => logout({ returnTo: origin })}
                >
                    Logout
                </a>
            </div>
        </nav>
    )
}
