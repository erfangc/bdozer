import { NumberFormatValues } from "react-number-format";
import { Item, Model } from "../../../client";
import { NumberInput } from "../../NumberInput";
import { PrimaryButton } from "../../PrimaryButton";

interface BalanceSheetItemEditorProps {
    model: Model
    item: Item
    onChange: (newModel: Model) => void
}

export function BalanceSheetItemEditor({ item, model, onChange }: BalanceSheetItemEditorProps) {

    function updateHistoricalValue({ floatValue }: NumberFormatValues) {
        const updatedItem: Item = {
            ...item,
            historicalValue: floatValue
        }
        const updatedItems = model.balanceSheetItems?.map(oldItem => {
            if (oldItem.name === item.name) {
                return updatedItem
            } else {
                return oldItem
            }
        })
        onChange({ ...model, balanceSheetItems: updatedItems })
    }

    return (
        <div className="absolute z-10 top-0 left-full ml-4 bg-blueGray-800 px-20 py-8 rounded-lg shadow-md flex-col space-y-8 w-96">
            <p className="text-lg font-bold">{item.description ?? item.name}</p>
            <NumberInput
                onValueChange={updateHistoricalValue}
                label={`Historical Value`}
                value={item.historicalValue}
            />
            <PrimaryButton>Confirm</PrimaryButton>
        </div>
    );

}
