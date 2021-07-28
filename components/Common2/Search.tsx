import React from 'react';

export function Search() {
    return (
        <div className="h-16  border-chili-100 rounded flex items-center bg-white w-full">
            <input type="text" className="pl-4 h-full border-0 rounded flex-grow" placeholder="Search a stock to analyse for free ..." />
            <button className="bg-lime-100 h-10 px-6 mr-4 rounded">Search</button>
        </div>
    )
}
