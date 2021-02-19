import { Item } from "../../../client";

export function ItemDescriptionInput(props: { item: Item }) {
    const { item } = props;
    return (
        <input
            type="text"
            name={item.name}
            value={item.description}
            placeholder="ex: Commercial Aircraft"
            className="border border-blueGray-500 bg-blueGray-900 text-blueGray-50 rounded-sm px-3 py-2"
        />
    )
}