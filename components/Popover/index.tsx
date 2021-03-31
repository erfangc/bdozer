import React, { ReactNode, useState } from 'react'

interface PopoverProps {
    trigger: ReactNode
    children: ReactNode
}

export function Popover(props: PopoverProps) {
    const [visible, setVisible] = useState(false)
    function show() {
        setVisible(true)
    }
    function hide() {
        setVisible(false)
    }
    return (
        <a className="relative text-blue-300 mt-4 cursor-pointer underline" onClick={show} onMouseEnter={show} onMouseLeave={hide}>
            {props.trigger}
            {
                visible
                    ?
                    <div className="absolute top-full text-blueGray-50 p-4 border bg-blueGray-900 border-blueGray-500 rounded-md z-10 w-screen lg:w-screen lg:max-w-md">
                        {props.children}
                    </div>
                    : null
            }
        </a>
    )
}
