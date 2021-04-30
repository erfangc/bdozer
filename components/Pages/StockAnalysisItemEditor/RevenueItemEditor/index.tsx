import React, {useEffect, useState} from 'react'
import {
    Discrete,
    Item,
    ItemTypeEnum,
    Model,
    RevenueModel,
} from "../../../../client";
import {Carousel} from "../../../Carousel";
import {Slide} from "../../../Carousel/Slide";
import {ZacksEstimates} from "./ZacksEstimates";
import {useRouter} from "next/router";
import {useRevenueModeler} from "../../../../api-hooks";

interface Props {
    model: Model
    item: Item
    onSubmit: (item?: Item) => void
}

export function RevenueItemEditor({item, onSubmit, model}: Props) {
    const router = useRouter()
    const {id} = router.query
    const revenueModelApi = useRevenueModeler()
    const [revenueModel, setRevenueModel1] = useState<RevenueModel>({
        stockAnalysisId: id as string,
        // @ts-ignore
        _id: id as string,
    })

    const revenueModelerApi = useRevenueModeler()

    async function setRevenueModel(revenueModel: RevenueModel) {
        setRevenueModel1(revenueModel)
        await revenueModelApi.saveRevenueModel(revenueModel)
    }

    async function init() {
        try {
            const {data: revenueModel} = await revenueModelerApi.getRevenueModel(id as string);
            if (revenueModel) {
                setRevenueModel1(revenueModel);
            }
        } catch (e) {
            console.error(e);
        }
    }

    function goToDescription() {
        goTo('DescriptionEditor')
    }

    function goToValueEditor() {
        goTo('ValueEditor')
    }

    function goToZacksEstimates() {
        goTo('ZacksEstimates')
    }

    function goToRevenueDriverChooser() {
        goTo('RevenueDriverChooser')
    }

    function goToDriverBased() {
        goTo('DriverBased')
    }

    function handleNextOnRevenueDriverChoosen() {
        console.log(revenueModel)
    }

    function goTo(id: string) {
        const asPath = router.asPath.split('#')[0]
        router.push(`${asPath}/#${id}`)
    }

    useEffect(() => {
        init()
    }, [])

    function submit(discrete: Discrete) {
        const newItem: Item = {
            ...item,
            type: ItemTypeEnum.Discrete,
            discrete,
        };
        onSubmit(newItem)
    }

    function done() {
    }

    return (
        <main className="max-w-prose mx-auto container px-4">
            <Carousel>
                <Slide id="RevenueDriverChooser" className="pt-20">
                </Slide>
                <Slide id="ZacksEstimates" className="pt-20">
                </Slide>
                <Slide id="DriverBased" className="pt-20">
                </Slide>
                <Slide id="DescriptionEditor" className="pt-20">
                </Slide>
                <Slide id="ValueEditor" className="pt-20">
                </Slide>
            </Carousel>
        </main>
    )
}
