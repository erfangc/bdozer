import React from 'react';

export function Logo() {
    return (
        <div className="font-bold pl-12 flex items-center space-x-2">
            <img className="h-4 w-4 bg-lime-100 border-0"></img>
            <span style={{ fontSize: '26px' }} className="font-bold">BDozer</span>
        </div>
    )
}