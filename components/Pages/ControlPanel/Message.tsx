import React from 'react'
import { ReactNode } from 'react'

interface MessageProps {
    children: ReactNode
}

export function Message(props: MessageProps) {
    return (
        <blockquote className="text-lg pl-8 py-4 border-l-4 border-blueGray-500">
            {props.children}
        </blockquote>
    )
}