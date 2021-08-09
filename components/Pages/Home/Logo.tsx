import React from 'react';

export function Logo() {
    return (
        <a className="font-bold pl-6 lg:pl-12 flex items-center space-x-2" href="/">
            <img src="/logo.svg" alt=""/>
            <span style={{fontSize: '26px'}} className="font-bold">Bdozer</span>
        </a>
    )
}