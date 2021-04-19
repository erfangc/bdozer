import React from 'react'

export function Navigation(props: { next?: string, prev?: string }) {
    return (
        <div className="grid grid-flow-row grid-cols-1 gap-4 lg:grid-cols-2 py-6">
            {props.prev ? <Backward target={props.prev} /> : null}
            {props.next ? <Forward target={props.next} /> : null}
        </div>
    )
}

function Forward(props: { target: string }) {
    return (
        <a href={`#${props.target}`} className="flex flex-col bg-blue-500 px-6 py-4 rounded">
            <span className="font-bold self-end">Continue</span>
        </a>
    )
}

function Backward(props: { target: string }) {
    return (
        <a href={`#${props.target}`} className="flex flex-col py-4 px-6 border rounded border-blueGray-500">
            <span className="font-bold">Back</span>
        </a>
    )
}
