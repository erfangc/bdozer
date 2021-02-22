import { Item } from "../../../../client";

export function ItemDescriptionInput(props: { item: Item, onChange: (newValue) => void }) {
    const { item, onChange } = props;
    return (
        <input
            type="text"
            name={item.name}
            value={item.description}
            onChange={({ currentTarget: { value } }) => onChange(value)}
            placeholder="ex: Commercial Aircraft"
            className="border border-blueGray-500 bg-blueGray-900 text-blueGray-50 rounded-sm px-3 py-2 w-96"
        />
    )
}