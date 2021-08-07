import React from 'react';
import {PrimaryButton} from '../../Common2/PrimaryButton';
import {Logo} from './Logo';

export function Nav() {
    return (
        <nav className="bg-chili-100 h-24 text-white items-center flex justify-between sticky top-0 z-10">
            <Logo/>
            <div className="space-x-4 pr-12 hidden">
                <PrimaryButton>Register Today</PrimaryButton>
                <button className="text-lime-100">Log In</button>
            </div>
        </nav>
    )
}