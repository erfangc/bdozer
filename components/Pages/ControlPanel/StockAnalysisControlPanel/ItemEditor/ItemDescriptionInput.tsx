import {useState} from "react";
import {Item} from "../../../../../client";
import {TextArea} from "../../../../Common/Textarea";

export function ItemDescriptionInput(props: { item: Item, onChange: (newValue) => void }) {
    const {item, onChange} = props;
    const [value, setValue] = useState(item.description)
    return (
        <TextArea
            label="Description"
            value={value}
            className="min-w-full"
            onChange={({currentTarget: {value}}) => setValue(value)}
            onBlur={() => onChange(value)}
            placeholder="ex: Commercial Aircraft"
        />
    )
}