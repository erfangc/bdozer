import { useRouter } from "next/router"
import React, { useState, useEffect } from "react"
import { Model } from "../../client"
import { PrimaryButton } from "../PrimaryButton"
import { ModelComponent } from "./ModelComponent"
import { ModelSkeleton } from "./ModelSkeleton"


export function Models() {

    const router = useRouter()
    const [models, setModels] = useState<Model[]>([])
    const [loading, setLoading] = useState(false)


    function navigate(model: Model) {
        router.push(`/model-builder/${model['_id']}`)
    }

    async function onDelete(model: Model) {
    }

    const modelComponents = models.map(model => (
        <ModelComponent
            model={model}
            key={model['_id'] ?? model['get_id']}
            onClick={navigate}
            onDelete={onDelete}
        />
    ))

    return (
        <div className="flex-grow px-16 py-24">
            <h1 className="text-3xl font-bold text-blueGray-50">Models</h1>
            <p className="text-base mt-2 mb-10 text-blueGray-100">These are the models that are currently saved in the system. Click on one to edit it</p>
            <div className="space-y-10 flex flex-col w-1/2 mb-10">
                {loading ? <ModelSkeleton /> : modelComponents}
            </div>
            <PrimaryButton>Create a New Model</PrimaryButton>
        </div>
    )
}
