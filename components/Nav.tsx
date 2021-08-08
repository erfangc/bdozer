import {Logo} from "./Pages/Home/Logo";
import {PrimaryButton} from "./Common/PrimaryButton";
import React from "react";
import {useAuth0} from "@auth0/auth0-react";

export function Nav() {

    const {isAuthenticated, loginWithRedirect, logout} = useAuth0()

    function login() {
        loginWithRedirect();
    }

    return (
        <nav className="bg-chili-100 h-20 text-white items-center flex justify-between antialiased">
            <div className="flex space-x-16">
                <Logo/>
                <ul className="flex items-center space-x-12 text-lime-100">
                    <li>Dashboard</li>
                    <li>Stocks</li>
                </ul>
            </div>
            {
                isAuthenticated ?
                    <div className="space-x-4 pr-12 hidden lg:block">
                        <button className="text-lime-100" onClick={() => logout()}>Log Out</button>
                    </div>
                    :
                    <div className="space-x-4 pr-12 hidden lg:block">
                        <PrimaryButton>Register Today</PrimaryButton>
                        <button className="text-lime-100" onClick={login}>Log In</button>
                    </div>
            }
        </nav>
    );
}