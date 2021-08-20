import React, {useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {Logo} from "../Pages/Home/Logo";
import Link from "next/link";
import {PrimaryButton} from "../Common/PrimaryButton";
import {NavSearch} from "./NavSearch";
import {MenuIcon} from "./MenuIcon";

export function Nav() {
    return (
        <>
            <Desktop/>
            <Mobile/>
        </>
    )
}

export function Desktop() {

    const {isAuthenticated, loginWithRedirect, logout} = useAuth0()

    function login() {
        loginWithRedirect();
    }

    function signup() {
        loginWithRedirect({screen_hint: 'signup'});
    }

    return (
        <nav className="hidden lg:flex bg-chili-100 h-20 text-white items-center justify-between">
            <div className="flex space-x-16">
                <Logo/>
                {
                    isAuthenticated ?
                        <ul className="hidden lg:flex items-center space-x-12 text-lime-100">
                            <li><Link href='/watch-list'>Watch List</Link></li>
                            <li><Link href='/search'>Stocks</Link></li>
                        </ul> : null
                }
            </div>
            {
                isAuthenticated ?
                    <div className="space-x-4 pr-12 flex">
                        <NavSearch/>
                        <button
                            className="text-lime-100"
                            onClick={() => logout({returnTo: window.location.origin})}
                        >
                            Log Out
                        </button>
                    </div>
                    :
                    <div className="space-x-4 pr-12 flex">
                        <PrimaryButton onClick={signup}>Register Today</PrimaryButton>
                        <NavSearch/>
                        <button className="text-lime-100" onClick={login}>Log In</button>
                    </div>
            }
        </nav>
    );
}

function Mobile() {

    const {isAuthenticated, loginWithRedirect, logout} = useAuth0()

    const [active, setActive] = useState(false)

    function login() {
        loginWithRedirect();
    }

    function signup() {
        loginWithRedirect({screen_hint: 'signup'});
    }

    return (
        <nav className="lg:hidden bg-chili-100 h-20 text-white items-center flex justify-between antialiased relative">
            <Logo/>
            <MenuIcon onClick={() => setActive(!active)}/>
            <ul className={`absolute w-screen bg-avocado-100 transition duration-500 z-10 top-20 ${active ? 'max-h-screen' : 'max-h-0'} overflow-hidden flex flex-col items-center justify-center`}>
                <li className="py-4 w-full text-center"><Link href='/watch-list'>Watch List</Link></li>
                <li className="py-4 w-full text-center"><Link href='/search'>Stocks</Link></li>
                {
                    !isAuthenticated ?
                        <>
                            <li className="py-4 w-full text-center" onClick={signup}>Sign Up</li>
                            <li className="py-4 w-full text-center" onClick={login}>Login</li>
                        </>
                        :
                        <li
                            className="py-4 w-full text-center"
                            onClick={() => logout({returnTo: window.location.origin})}
                        >
                            Logout
                        </li>
                }
            </ul>

        </nav>
    );
}