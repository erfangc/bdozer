import {Item} from "../../../client";

export interface EditorProps {
    item?: Item
    onChange: (newItem: Item) => void
}