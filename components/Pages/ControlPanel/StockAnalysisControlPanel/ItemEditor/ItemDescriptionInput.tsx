import {ChangeEvent} from "react";
import {Item} from "../../../../../client";
import {TextArea} from "../../../../Common/Textarea";

interface Props {
    item: Item
    onSubmit: (Item) => void
}

export function ItemDescriptionInput(props: Props) {
    const {item, onSubmit} = props;

    function handleSubmit({currentTarget}: ChangeEvent<HTMLTextAreaElement>) {
        const newItem: Item = {
            ...item,
            description: currentTarget.value
        }
        onSubmit(newItem)
    }

    return (
        <TextArea
            label="Description"
            value={item.description}
            className="min-w-full"
            onChange={handleSubmit}
            placeholder="ex: Commercial Aircraft"
        />
    )
}