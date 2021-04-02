import React from 'react'

export function Navigation(props: { next?: string, prev?: string }) {
    return (
        <div className="flex flex-col space-y-4 py-6">
            {props.next ? <Forward target={props.next} /> : null}
            {props.prev ? <Backward target={props.prev} /> : null}
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
