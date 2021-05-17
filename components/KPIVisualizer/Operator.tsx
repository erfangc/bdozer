import React from 'react';
import {ItemTypeEnum} from "../../client";

interface Props {
    itemType: ItemTypeEnum
}

export function Operator({itemType}: Props) {
    return (
        <div className="ml-4 text-xl font-extrabold">
            {
                itemType === ItemTypeEnum.ProductOfOtherItems ? 'x'
                    : itemType === ItemTypeEnum.SumOfOtherItems ? '+' : null
            }
        </div>
    );
}