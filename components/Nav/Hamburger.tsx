import Link from 'next/link'
import React, {useState} from 'react'

export function Hamburger() {
    const [open, setOpen] = useState(false)
    function toggle() {
        setOpen(!open)
    }
    return (
        <div className="relative lg:hidden text-blueGray-50">
            <button onClick={toggle} className="focus:outline-none mt-2 ml-4">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 24H28V21.3333H4V24ZM4 17.3333H28V14.6667H4V17.3333ZM4 8V10.6667H28V8H4Z" fill="#F8FAFC" />
                </svg>
            </button>
            <ul className={`z-10 bg-blueGray-700 w-full absolute flex-col space-y-4 transition-height ease-linear ${open ? 'h-screen' : 'h-0 overflow-hidden'}`}>
                <Link href="/">
                    <li className="text-center mt-6 py-4">Home</li>
                </Link>
                <Link href="/browse">
                    <li className="text-center py-4">Browse</li>
                </Link>
                <Link href="/control-panel">
                    <li className="text-center py-4">Control Panel</li>
                </Link>
            </ul>
        </div>
    )
}