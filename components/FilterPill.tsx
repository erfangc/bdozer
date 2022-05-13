import React from "react";
import {ZacksDerivedAnalyticsTagsEnum} from "../client";
import {pillLabel} from "./filter-pill-labels";

interface FilterPillProps {
    tag: ZacksDerivedAnalyticsTagsEnum;
    onRemove: (tag: ZacksDerivedAnalyticsTagsEnum) => void;
}

export function FilterPill({tag, onRemove}: FilterPillProps) {
    return (
        <span className="text-navy-100 bg-lightGreen-100 rounded paragraph-medium px-2 py-1 flex items-center">
            {pillLabel(tag)}
            <button className="ml-2" onClick={() => onRemove(tag)}><CloseIcon/></button>
        </span>
    )
}

function CloseIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path
                d="M9.99984 1.66669C5.39567 1.66669 1.6665 5.39585 1.6665 10C1.6665 14.6042 5.39567 18.3334 9.99984 18.3334C14.604 18.3334 18.3332 14.6042 18.3332 10C18.3332 5.39585 14.604 1.66669 9.99984 1.66669ZM14.1665 12.9875L12.9873 14.1667L9.99984 11.1792L7.01234 14.1667L5.83317 12.9875L8.82067 10L5.83317 7.01252L7.01234 5.83335L9.99984 8.82085L12.9873 5.83335L14.1665 7.01252L11.179 10L14.1665 12.9875Z"
                fill="#0B1E33"/>
        </svg>
    );
}