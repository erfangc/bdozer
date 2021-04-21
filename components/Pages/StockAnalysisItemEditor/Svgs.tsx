import React from 'react'
import {Popover} from "../../Popover";

export function Attention() {
    return (
        <Popover trigger={
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.9998 21.3333L14.6665 26.6666H27.9998V21.3333H19.9998Z" fill="#F59E0B" />
                <path d="M16.08 9.58667L4 21.6667V26.6667H9L21.08 14.5867L16.08 9.58667ZM7.89333 24H6.66667V22.7733L16.08 13.36L17.3067 14.5867L7.89333 24Z" fill="#F59E0B" />
                <path d="M24.9468 10.72C25.4668 10.2 25.4668 9.35998 24.9468 8.83998L21.8268 5.71998C21.5602 5.45331 21.2268 5.33331 20.8802 5.33331C20.5468 5.33331 20.2002 5.46665 19.9468 5.71998L17.5068 8.15998L22.5068 13.16L24.9468 10.72Z" fill="#F59E0B" />
            </svg>
        }>
            This item uses manually overridden assumptions <pre>(click to edit)</pre>
        </Popover>
    )
}

export function Check() {
    return (
        <Popover
            trigger={
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26.6666 9.33331L27.92 6.58665L30.6666 5.33331L27.92 4.07998L26.6666 1.33331L25.4133 4.07998L22.6666 5.33331L25.4133 6.58665L26.6666 9.33331Z" fill="#22C55E"/>
                    <path d="M23.6133 12.16L19.84 8.38667C19.5733 8.13333 19.24 8 18.8933 8C18.5467 8 18.2133 8.13333 17.9467 8.38667L3.05333 23.28C2.53333 23.8 2.53333 24.64 3.05333 25.16L6.82666 28.9333C7.09333 29.2 7.42666 29.3333 7.77333 29.3333C8.12 29.3333 8.45333 29.2 8.72 28.9467L23.6133 14.0533C24.1333 13.5333 24.1333 12.68 23.6133 12.16ZM18.8933 11.2267L20.7733 13.1067L19.2133 14.6667L17.3333 12.7867L18.8933 11.2267ZM7.77333 26.12L5.89333 24.24L15.4533 14.6667L17.3333 16.5467L7.77333 26.12Z" fill="#22C55E"/>
                </svg>
            }
        >
            This item uses machine generated assumptions <pre>(click to override)</pre>
        </Popover>
    )
}

export function Nothing() {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        </svg>
    )
}