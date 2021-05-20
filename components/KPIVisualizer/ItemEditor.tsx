import React, {useEffect, useState} from "react";
import {Item, ItemTypeEnum, KPIMetadata, KPIMetadataFormatEnum} from "../../client";
import {PrimaryButton} from "../Common/PrimaryButton";
import {DangerButton} from "../Common/DangerButton";
import {Delete} from "../Common/Svgs";
import {OperatorRadioGroup} from "./OperatorRadioGroup";
import {KPIAssumptionsEditor} from "./KPIAssumptionsEditor";
import {KPIFormatChooser} from "./KPIAssumptionsEditor/KPIFormatChooser";
import {BasicInfoEditor} from "./BasicInfoEditor";

interface Props {
    kpi?: KPIMetadata
    item?: Item
    onSubmit: (
        newKPI: KPIMetadata, newItem: Item,
        kpi?: KPIMetadata, item?: Item,
    ) => void
    onDismiss: () => void
}

const initItem: Item = {
    name: '',
    type: ItemTypeEnum.Custom,
    formula: '0.0',
}

const initKPI: KPIMetadata = {
    itemName: '',
    format: KPIMetadataFormatEnum.Money,
}

/**
 *
 * @param props
 * @constructor
 */
export function ItemEditor(props: Props) {

    const {onSubmit, onDismiss} = props;

    const [item, setItem] = useState<Item>(props.item ?? initItem);
    const [kpi, setKPI] = useState<KPIMetadata>(props.kpi ?? initKPI);

    useEffect(() => {
        setItem(props.item);
        setKPI(props.kpi);
    }, [props.item, props.kpi]);

    function handleSubmit() {
        onSubmit(kpi, item, props.kpi, props.item);
    }

    function setOperator(newItemType: ItemTypeEnum) {
        // depending on the new itemType, we will have to transform
        // the old children to new children
        let newItem: Item
        if (newItemType === ItemTypeEnum.ProductOfOtherItems) {
            const components = item.sumOfOtherItems.components.map(component => {
                return {itemName: component.itemName};
            });
            newItem = {
                ...item,
                type: newItemType,
                productOfOtherItems: {
                    components
                }
            };
        } else if (newItemType === ItemTypeEnum.SumOfOtherItems) {
            const components = item.productOfOtherItems.components.map(component => {
                return {itemName: component.itemName, weight: 1};
            });
            newItem = {
                ...item,
                type: newItemType,
                sumOfOtherItems: {
                    components
                }
            };
        } else {
            // this should never happen
            return;
        }

        setItem(newItem);
    }

    function setFormat(newKPIFormat: KPIMetadataFormatEnum) {
        setKPI({...kpi, format: newKPIFormat});
    }

    const hasChildren = (
        (item?.type === ItemTypeEnum.SumOfOtherItems && item?.sumOfOtherItems)
        ||
        (item?.type === ItemTypeEnum.ProductOfOtherItems && item?.productOfOtherItems)
    )

    return (
        <div className="space-y-4">
            <BasicInfoEditor setItem={setItem} setKPI={setKPI} item={item} kpi={kpi}/>
            <KPIFormatChooser kpiFormat={kpi?.format} onChange={setFormat}/>
            {
                hasChildren
                    ?
                    <OperatorRadioGroup onChange={setOperator} item={item}/>
                    :
                    <KPIAssumptionsEditor onChange={setItem} item={item}/>
            }
            <div className="flex space-x-2">
                <PrimaryButton onClick={handleSubmit}>Save</PrimaryButton>
                <DangerButton onClick={onDismiss}><Delete/> Cancel</DangerButton>
            </div>
        </div>
    );
}

