import { Item } from "../../../../client";
import { TextInput } from "../../../TextInput";

export function ItemDescriptionInput(props: { item: Item, onChange: (newValue) => void }) {
    const { item, onChange } = props;
    return (
        <TextInput
            label="Description"
            value={item.description}
            className="w-96"
            onChange={({ currentTarget: { value } }) => onChange(value)}
            placeholder="ex: Commercial Aircraft"
        />
    )
}