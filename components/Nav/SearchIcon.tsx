import React from "react";

interface SearchIconProps {
    onClick: () => void
}

export function SearchIcon({onClick}: SearchIconProps) {
    return (
        <button onClick={onClick}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M20.6667 18.6667H19.6067L19.24 18.3C20.5467 16.7867 21.3333 14.82 21.3333 12.6667C21.3333 7.88 17.4533 4 12.6667 4C7.88 4 4 7.88 4 12.6667C4 17.4533 7.88 21.3333 12.6667 21.3333C14.82 21.3333 16.7867 20.5467 18.3 19.2467L18.6667 19.6133V20.6667L25.3333 27.32L27.32 25.3333L20.6667 18.6667ZM12.6667 18.6667C9.35333 18.6667 6.66667 15.98 6.66667 12.6667C6.66667 9.35333 9.35333 6.66667 12.6667 6.66667C15.98 6.66667 18.6667 9.35333 18.6667 12.6667C18.6667 15.98 15.98 18.6667 12.6667 18.6667Z"
                    fill="#B4DD62"
                />
            </svg>
        </button>
    );
}