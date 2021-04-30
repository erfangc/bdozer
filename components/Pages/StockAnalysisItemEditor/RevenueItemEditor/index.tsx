import React, {useEffect, useState} from 'react'
import {
    Item,
    ItemTypeEnum,
    ManualProjections,
    Model,
    RevenueModel,
    RevenueModelRevenueDriverTypeEnum,
} from "../../../../client";
import {Carousel} from "../../../Carousel";
import {Slide} from "../../../Carousel/Slide";
import {ManualProjectionsPreview} from "./ManualProjectionsPreview";
import {useRouter} from "next/router";
import {useRevenueModeler, useZacksEstimates} from "../../../../api-hooks";
import {RevenueDriverChooser} from "./RevenueDriverChooser";
import {ARPU} from "./ARPU";

interface Props {
    model: Model
    item: Item
    onSubmit: (item?: Item) => void
    onClear: () => void
    onDismiss: () => void
}

export function RevenueItemEditor({item, onSubmit, model, onDismiss, onClear}: Props) {
    const router = useRouter()
    const {id} = router.query

    const revenueModelApi = useRevenueModeler()
    const zacksEstimatesApi = useZacksEstimates()
    const revenueModelerApi = useRevenueModeler()

    const [revenueModel, setRevenueModel1] = useState<RevenueModel>({
        stockAnalysisId: id as string,
        // @ts-ignore
        _id: id as string,
    })
    const [manualProjections, setManualProjections] = useState<ManualProjections>({manualProjections: []})
    const [zacksEstimates, setZacksEstimates] = useState<ManualProjections>({manualProjections: []})

    async function setRevenueModel(revenueModel: RevenueModel) {
        setRevenueModel1(revenueModel)
        await revenueModelApi.saveRevenueModel(revenueModel)
    }

    async function init() {
        try {
            const {data: revenueModel} = await revenueModelerApi.getRevenueModel(id as string);
            const {data: manualProjections} = await zacksEstimatesApi.revenueProjections(model.ticker)
            setManualProjections(manualProjections)
            setZacksEstimates(manualProjections)
            if (revenueModel) {
                setRevenueModel1(revenueModel);
            }
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * Determines the correct next slide to send the user to
     * given a change in choice of revenue driver
     */
    function handleDriverChange() {
        if (revenueModel.revenueDriverType === RevenueModelRevenueDriverTypeEnum.ZacksEstimates) {
            setManualProjections(zacksEstimates)
            goTo('ManualProjectionsPreview');
        } else if (revenueModel.revenueDriverType === RevenueModelRevenueDriverTypeEnum.AverageRevenuePerUserTimesActiveUser) {
            goTo('ARPU');
        } else if (revenueModel.revenueDriverType === undefined) {
            onClear()
        }
    }

    async function handleARPUChange(revenueModel: RevenueModel) {
        await setRevenueModel(revenueModel);
        const {data: manualProjections} = await revenueModelApi.modelRevenue({revenueModel, model});
        setManualProjections(manualProjections);
        goTo('ManualProjectionsPreview');
    }

    function goTo(id: string) {
        const asPath = router.asPath.split('#')[0]
        router.push(`${asPath}/#${id}`)
    }

    useEffect(() => {
        init()
    }, [])

    function handleSubmit(manualProjections: ManualProjections) {
        const newItem: Item = {
            ...item,
            type: ItemTypeEnum.ManualProjections,
            manualProjections,
        };
        onSubmit(newItem)
    }

    return (
        <main className="max-w-prose mx-auto container px-4">
            <Carousel>
                <Slide id="RevenueDriverChooser" className="pt-20">
                    <RevenueDriverChooser
                        revenueModel={revenueModel}
                        setRevenueModel={setRevenueModel}
                        next={handleDriverChange}
                        close={onDismiss}
                    />
                </Slide>
                <Slide id="ARPU" className="pt-20">
                    <ARPU
                        revenueModel={revenueModel}
                        onSubmit={handleARPUChange}
                        back={() => goTo('RevenueDriverChooser')}
                        close={onDismiss}
                    />
                </Slide>
                <Slide id="ManualProjectionsPreview" className="pt-20">
                    <ManualProjectionsPreview
                        manualProjections={manualProjections}
                        back={() => goTo('RevenueDriverChooser')}
                        onConfirm={handleSubmit}
                        close={onDismiss}
                    />
                </Slide>
            </Carousel>
        </main>
    );
}