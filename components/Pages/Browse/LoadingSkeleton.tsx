import React from 'react'

export function LoadingSkeletons() {
    return <>
        {[1, 2, 3].map(i => (
            <div
                key={i}
                className="bg-blueGray-700 px-6 py-6 shadow-md flex-col flex space-y-4 cursor-pointer hover:bg-blueGray-600 transition ease-linear"
            >
                <div className="flex flex-col space-y-4">
                    <div className="flex justify-between">
                        <span className="w-48 h-8 bg-blueGray-500 rounded-md animate-pulse"></span>
                        <span className="w-24 h-8 bg-blueGray-500 rounded-md animate-pulse"></span>
                    </div>
                    <span className="flex space-x-4">
                        <div className="w-20 h-12 bg-blueGray-500 rounded-md animate-pulse">
                        </div>
                        <div className="w-20 h-12 bg-blueGray-500 rounded-md animate-pulse">
                        </div>
                    </span>
                </div>
            </div>
        ))}
    </>
}