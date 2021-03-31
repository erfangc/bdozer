import React from "react";
import { Model, Item } from "../../client";
import { SmallGhostButton } from "../Common/GhostButton";
import { ItemChooser } from "./ItemChooser";

interface ToolbarProps {
    model: Model
    chosenItems: Item[]
    setStacking: (value) => void
    setType: (value) => void
    setChosenItems: (value) => void
}

export function Toolbar({
    chosenItems,
    model,
    setChosenItems,
    setStacking,
    setType
}: ToolbarProps) {
    return (
        <div className="flex space-x-6 mb-2">
            <div className="flex-col space-y-1">
                <p className="text-sm">Stack Behavior:</p>
                <div className="flex space-x-1">
                    <SmallGhostButton onClick={() => setStacking(undefined)}>No Stacking</SmallGhostButton>
                    <SmallGhostButton onClick={() => setStacking('normal')}>Stack</SmallGhostButton>
                    <SmallGhostButton onClick={() => setStacking('percent')}>As Percentage</SmallGhostButton>
                </div>
            </div>
            <div className="flex-col space-y-1">
                <p className="text-sm">Chart Type:</p>
                <div className="flex space-x-1">
                    <SmallGhostButton onClick={() => setType('area')} >Area</SmallGhostButton>
                    <SmallGhostButton onClick={() => setType('column')} >Column</SmallGhostButton>
                    <SmallGhostButton onClick={() => setType('line')} >Line</SmallGhostButton>
                </div>
            </div>
            <ItemChooser
                chosenItems={chosenItems}
                model={model}
                onChange={newChosenItems => setChosenItems(newChosenItems)}
            />
        </div>
    )
}