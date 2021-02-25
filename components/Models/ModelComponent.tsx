import React from "react";
import { Model } from "../../client";
import { MoreButton } from "./MoreButton";

interface ModelComponentProps {
    model: Model
    onClick: (model: Model) => void
    onDelete: (model: Model) => void
}

export function ModelComponent({ model, onClick, onDelete }: ModelComponentProps) {
    return (
        <div
            className="bg-blueGray-700 h-24 items-center px-8 rounded-lg shadow text-blueGray-50 flex justify-between transition ease-linear hover:shadow-2xl cursor-pointer"
            onClick={() => onClick(model)}
        >
            <div className="flex-col flex space-y-1">
                <span className="text-2xl font-bold">{model.name}</span>
                <span>{model.symbol ?? 'No Symbol'}</span>
            </div>
            <div className="flex-col flex space-y-1">
                <span className="font-semibold text-xs">Last Updated</span>
                <span>{new Date(model.updatedAt).toLocaleString()}</span>
            </div>
            <MoreButton onDelete={() => onDelete(model)} />
        </div>
    )
}

