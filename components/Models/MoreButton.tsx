import React, { useState } from "react";
import { DeleteButton } from "../Common/DeleteButton";
import { More } from "../Nav/NavButton";

export function MoreButton({ onDelete }: { onDelete: () => void }) {
    const [open, setOpen] = useState(false)

    function openDialog(e) {
        e.preventDefault();
        e.stopPropagation();
        setOpen(!open)
    }

    function handleDelete(e) {
        e.preventDefault();
        e.stopPropagation();
        onDelete()
    }

    return (
        <span className="relative" >
            <button
                onClick={openDialog}
                className="h-10 w-10 hover:bg-blueGray-600 transition rounded-full ease-linear flex items-center justify-center focus:outline-none"
            >
                <More />
            </button>
            {
                open ?
                    <div className="absolute top-full right-0 bg-blueGray-600 mt-1 rounded shadow-md">
                        <a onClick={handleDelete} className="hover:text-red-500 px-4 py-2 block transition ease-linear">
                            Delete
                        </a>
                    </div>
                    : null
            }
        </span>
    )
}