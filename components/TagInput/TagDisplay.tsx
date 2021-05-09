import { Tag } from "../../client";
import { Close } from "../Common/Svgs";
import React from "react";
interface Props {
    tag: Tag
    onDelete?: () => void
}
export function TagDisplay({ tag, onDelete }: Props) {
    return (
        <span
            className="px-1.5 py-0.5 rounded border border-blue-500 bg-blue-900 text-blue-400 flex justify-between h-8 items-center space-x-4">
            <span className="overflow-x-hidden overflow-x-ellipsis whitespace-nowrap">{tag['_id']}</span>
            {
                onDelete
                ?
                    <button
                        onClick={() => onDelete()}
                        className="transition ease-in hover:text-blue-200 hover:bg-blue-500 rounded"
                    >
                        <Close />
                    </button>
                : null
            }
        </span>
    )
}