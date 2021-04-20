import {Tag} from "../../client";
import React from "react";

export function TagAutocompleteItem({tag}: { tag: Tag }) {
    return (
        <span className="px-2 py-0.5 rounded border border-blue-500 bg-blue-900 text-blue-400">
            <span>{tag['_id']}</span>
        </span>
    )
}