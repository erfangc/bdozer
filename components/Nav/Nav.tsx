import React from "react"
import { Logo } from "./Logo"
import { ModelIcon, NavButton, Settings } from "./NavButton"
import { useAuth0 } from '@auth0/auth0-react'
import { useRouter } from 'next/router'

interface NavProps {

}

export function Nav(props: NavProps) {

    const { user, logout } = useAuth0()
    const router = useRouter()

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
                    <NavButton active={router.pathname.endsWith('/browse')} linkTo="/browse" />
                    <NavButton active={router.pathname.endsWith("/narrative2")} icon={<ModelIcon />} linkTo="/browse" />
                    <NavButton active={router.pathname === '/settings'} icon={<Settings />} linkTo="/settings" />
                </div>
            </div>
            <div className="text-blueGray-50 pb-6 flex-col space-y-2 flex items-center">
                {
                    user
                        ?
                        <>
                            <img src={user?.picture} className="w-10 h-10 rounded-full" alt="" />
                            <a
                                className="text-sm cursor-pointer hover:bg-blueGray-400 hover:text-blueGray-900 rounded transition ease-linear p-2"
                                onClick={() => logout({ returnTo: origin })}
                            >
                                Logout
                        </a>
                        </>
                        : null
                }
            </div>
        </nav>
    )
}
