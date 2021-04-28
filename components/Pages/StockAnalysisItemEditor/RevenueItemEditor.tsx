import React, {useState} from 'react'
import {Item, Model, RevenueModel, RevenueModelerControllerApi, RevenueModelOperatorEnum} from "../../../client";
import {TextInput} from "../../Common/TextInput";
import {Close} from "../../Common/Svgs";
import {TextArea} from "../../Common/Textarea";

interface Props {
    model: Model
    onSubmit: (item: Item) => void
    item: Item
}

const revenueModelerApi = new RevenueModelerControllerApi()

export function RevenueItemEditor({item, onSubmit, model}: Props) {

    const [revenueModel, setRevenueModel] = useState<RevenueModel>({
        component1: {
            description: '',
            values: [],
            label: '',
        },
        component2: {
            description: '',
            values: [],
            label: '',
        },
        operator: RevenueModelOperatorEnum.Times,
        stockAnalysisId: '-',
        get_id: ''
    })

    const {label, description} = revenueModel.component1

    const {
        label: label2,
        description: description2,
    } = revenueModel.component2

    const { operator } = revenueModel

    return (
        <div className="space-y-4">
            <hr/>
            <div className="flex space-x-2 items-center">
                <TextInput label="Component 1 Name" value={label}/>
                <span className="mt-6"><Close/></span>
                <TextInput label="Component 2 Name" value={label2}/>
            </div>
            <div className="flex space-x-2 items-center">
                <TextArea label="Description" value={description}/>
                <span className="w-2"/>
                <TextArea label="Description 2" value={description2}/>
            </div>
            <hr/>
        </div>
    )
}