import {Logo} from "./Pages/Home/Logo";
import {PrimaryButton} from "./Common/PrimaryButton";
import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import Link from 'next/link';

export function Nav() {

    const {isAuthenticated, loginWithRedirect, logout} = useAuth0()

    function login() {
        loginWithRedirect();
    }

    function signup() {
        loginWithRedirect({screen_hint: 'signup'});
    }

    return (
        <nav className="bg-chili-100 h-20 text-white items-center flex justify-between antialiased">
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
                    <div className="space-x-4 pr-12 hidden lg:block">
                        <button className="text-lime-100" onClick={() => logout()}>Log Out</button>
                    </div>
                    :
                    <div className="space-x-4 pr-12 hidden lg:block">
                        <PrimaryButton onClick={signup}>Register Today</PrimaryButton>
                        <button className="text-lime-100" onClick={login}>Log In</button>
                    </div>
            }
        </nav>
    );
}