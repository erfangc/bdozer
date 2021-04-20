import { Tag } from "../../client";
import { Close } from "../Common/Svgs";
import React from "react";

export function TagDisplay({ tag, onDelete }: { tag: Tag, onDelete: () => void }) {
    return (
        <span
            className="px-1.5 py-0.5 rounded border border-blue-500 bg-blue-900 text-blue-400 flex justify-between items-center space-x-4">
            <span className="overflow-x-hidden overflow-x-ellipsis whitespace-nowrap">{tag['_id']}</span>
            <button
                onClick={() => onDelete()}
                className="transition ease-in hover:text-blue-200 hover:bg-blue-500 rounded"
            >
                <Close />
            </button>
        </span>
    )
}