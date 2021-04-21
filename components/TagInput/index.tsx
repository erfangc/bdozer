import React, {ChangeEvent, useEffect, useState} from 'react'
import {useTags} from "../../api-hooks";
import {Tag} from "../../client";
import {Delete, Plus} from "../Common/Svgs";
import {TagAutocompleteItem} from "./TagAutocompleteItem";
import {TagDisplay} from "./TagDisplay";

interface Props {
    label?: string
    placeholder?: string
    selected?: string[]
    onChange: (tag: Tag[]) => void
}

export function TagInput(props: Props) {

    const tagsApi = useTags()

    const [term, setTerm] = useState<string | undefined>()
    const [tags, setTags] = useState<Tag[]>([])
    const [selected, setSelected] = useState<Tag[]>(props.selected?.map(it => ({_id: it})) as any || [])

    useEffect(() => {
        setSelected(props.selected?.map(it => ({_id: it})) as any || [])
    }, [props.selected])

    function selectTag(tag: Tag) {
        const updatedSelected = [
            ...selected.filter(it => it['_id'] !== tag['_id']),
            tag
        ];
        setSelected(updatedSelected)
        setTerm('')
        setTags([])
        props.onChange(updatedSelected)
    }

    function deselectTag(tag: Tag) {
        const updatedSelected = [
            ...selected.filter(it => it['_id'] !== tag['_id']),
        ];
        setSelected(updatedSelected)
        props.onChange(updatedSelected)
    }

    async function create() {
        const tag = {
            _id: term,
        } as any;
        await tagsApi.saveTag(tag)
        const updatedSelected = [...selected, tag];
        setSelected(updatedSelected)
        setTags([])
        setTerm('')
        props.onChange(updatedSelected)
    }

    async function deleteTag(event: React.MouseEvent<HTMLButtonElement>, tag: Tag) {
        event.preventDefault()
        event.stopPropagation()
        await tagsApi.deleteTag(tag['_id'])
        const updatedSelected = [
            ...selected.filter(it => it['_id'] !== tag['_id']),
        ];
        setSelected(updatedSelected)
        setTags([])
        setTerm('')
        setTags([])
        props.onChange(updatedSelected)
    }

    async function handleTermChange({target}: ChangeEvent<HTMLInputElement>) {
        const term = target.value;
        if (term === '') {
            setTerm(undefined)
            setTags([])
        } else {
            setTerm(term)
            const {data: tags} = await tagsApi.findTag(term)
            setTags(tags.filter(tag => selected.find(it => it['_id'] === tag['_id']) === undefined))
        }
    }

    const showCreate = tags.find(it => it['_id'] !== term) !== undefined || tags.length === 0

    return (
        <div className="relative w-80">
            <span className="text-sm font-semibold text-blueGray-400">{props.label ?? 'Filtering on Tags:'}</span>
            <div className="mb-2 grid grid-cols-2 gap-2 w-full">
                {
                    selected.length === 0
                        ? <span className="h-8"/>
                        : selected.map(tag => <TagDisplay key={tag['_id']} tag={tag}
                                                            onDelete={() => deselectTag(tag)}/>)
                }
            </div>
            <input
                placeholder={props.placeholder ?? "Search tags"}
                className="text-blueGray-50 py-2 focus:outline-none bg-blueGray-700 placeholder-blueGray-400 border-none rounded w-full"
                type="text" value={term} onChange={handleTermChange}
            />
            {
                term || tags.length > 0
                    ?
                    <ul
                        className={`absolute cursor-pointer bg-blueGray-700 py-2 top-full shadow-md w-full rounded mt-1 ease-in transition-all overflow-hidden z-10`}
                        style={{
                            height: tags.length > 0 ? `${(tags.length + 1) * 40 + 24}px` : showCreate ? 56 : 0
                        }}
                    >
                        {tags.map(tag => (
                            <li
                                onClick={() => selectTag(tag)}
                                className="px-4 py-1 hover:bg-blueGray-900 flex items-center justify-between transition-all ease-in"
                                key={tag['_id']}
                            >
                                <span
                                    className="px-1 py-0.5 rounded border border-blue-500 bg-blue-900 text-blue-400 flex justify-between items-center space-x-4"
                                >
                                    {tag['_id']}
                                </span>
                                <button
                                    onClick={event => deleteTag(event, tag)}
                                    className="text-blueGray-300 hover:text-blueGray-100 p-1 rounded hover:bg-blueGray-700">
                                    <Delete/>
                                </button>
                            </li>
                        ))}
                        {
                            showCreate
                                ?
                                <li
                                    className="border-t border-blueGray-600 mt-1 px-4 py-2 hover:bg-blueGray-900 flex items-center transition-all ease-in"
                                    key="new"
                                    onClick={create}
                                >
                                    <Plus/>
                                    <span className="pl-2">Create {<TagAutocompleteItem tag={{_id: term} as any}/>}</span>
                                </li>
                                : null
                        }
                    </ul>
                    : null
            }
        </div>
    )
}