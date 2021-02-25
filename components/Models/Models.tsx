import { useRouter } from "next/router"
import React, { useState, useEffect } from "react"
import { useModelsApi, useModelBuilderApi } from "../../ApiClientsHooks"
import { Model } from "../../client"
import { DeleteButton } from "../DeleteButton"
import { More } from "../Nav/NavButton"
import { PrimaryButton } from "../PrimaryButton"


export function Models() {

    const router = useRouter()
    const [models, setModels] = useState<Model[]>([])
    const [loading, setLoading] = useState(false)

    const modelsApi = useModelsApi()
    const modelBuilderApi = useModelBuilderApi()

    useEffect(() => {
        setTimeout(() => {
            modelsApi.listModels().then(({ data: models }) => {
                setModels(models)
                setLoading(false)
            })
            setLoading(true)
        })
    }, [])

    async function loadModels() {
        setLoading(true)
        const { data: models } = await modelsApi.listModels()
        setModels(models)
        setLoading(false)
    }

    function navigate(model: Model) {
        router.push(`/model-builder/${model['_id']}`)
    }

    async function onDelete(model: Model) {
        await modelsApi.deleteModel(model['_id'])
        loadModels()
    }

    const modelComponents = models.map(model => (
        <ModelComponent
            model={model}
            key={model['_id'] ?? model['get_id']}
            onClick={navigate}
            onDelete={onDelete}
        />
    ))

    async function createModel() {
        const { data: newModel } = await modelBuilderApi.createModel()
        const { data: savedModel } = await modelsApi.saveModel(newModel)
        navigate(savedModel)
    }

    return (
        <div className="flex-grow px-16 py-24">
            <h1 className="text-3xl font-bold text-blueGray-50">Models</h1>
            <p className="text-base mt-2 mb-10 text-blueGray-100">These are the models that are currently saved in the system. Click on one to edit it</p>
            <div className="space-y-10 flex flex-col w-1/2 mb-10">
                {loading ? null : modelComponents}
            </div>
            <PrimaryButton onClick={createModel}>Create a New Model</PrimaryButton>
        </div>
    )
}

interface ModelComponentProps {
    model: Model
    onClick: (model: Model) => void
    onDelete: (model: Model) => void
}

function ModelComponent({ model, onClick, onDelete }: ModelComponentProps) {
    return (
        <div
            className="bg-blueGray-700 px-8 py-4 rounded-lg shadow text-blueGray-50 flex justify-between transition ease-linear hover:shadow-2xl cursor-pointer"
            onClick={() => onClick(model)}
        >
            <div className="flex-col flex space-y-1">
                <span className="text-2xl font-bold">{model.name}</span>
                <span>{model.symbol ?? 'No Symbol'}</span>
            </div>
            <div className="flex-col flex space-y-1">
                <span className="font-semibold text-xs">Last Updated</span>
                <span>{new Date(model.updatedAt).toLocaleString()}</span>
            </div>
            <MoreButton onDelete={() => onDelete(model)} />
        </div>
    )
}

function MoreButton({ onDelete }: { onDelete: () => void }) {
    const [open, setOpen] = useState(false)

    function openDialog(e) {
        e.preventDefault();
        e.stopPropagation();
        setOpen(!open)
    }

    function handleDelete(e) {
        e.preventDefault();
        e.stopPropagation();
        onDelete()
    }

    return (
        <span className="relative" >
            <button
                onClick={openDialog}
                className="h-10 w-10 hover:bg-blueGray-600 transition rounded-full ease-linear flex items-center justify-center focus:outline-none"
            >
                <More />
            </button>
            {
                open ?
                    <div className="absolute top-full bg-blueGray-600 p-4 -mt-2 rounded-lg shadow-md">
                        <DeleteButton onClick={handleDelete}>
                            Delete
                        </DeleteButton>
                    </div>
                    : null
            }
        </span>
    )
}