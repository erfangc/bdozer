import { useState } from "react";
import { Item } from "../../../../../../client";
import { TextInput } from "../../../../../Common/TextInput";

export function ItemDescriptionInput(props: { item: Item, onChange: (newValue) => void }) {
    const { item, onChange } = props;
    const [value, setValue] = useState(item.description)
    return (
        <TextInput
            label="Description"
            value={value}
            className="w-96"
            onChange={({ currentTarget: { value } }) => setValue(value)}
            onBlur={() => onChange(value)}
            placeholder="ex: Commercial Aircraft"
        />
    )
}