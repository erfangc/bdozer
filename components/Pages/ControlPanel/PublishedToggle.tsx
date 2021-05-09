import React from 'react'


interface Props {
    published?: boolean | '' | 'false' | 'true'
    setPublished: (published?: boolean) => void
}

export function PublishedToggle({setPublished, published}: Props) {

    async function viewUnpublished() {
        setPublished(false)
    }

    async function viewPublished() {
        setPublished(true)
    }

    async function viewAll() {
        setPublished(undefined)
    }

    return (
        <div>
            <button
                onClick={viewAll}
                className={`focus:outline-none border-l border-t border-b border-amber-700 transition ease-linear hover:bg-amber-500 hover:text-blueGray-800 px-2 py-1 rounded-l ${published == undefined || published === '' ? 'bg-amber-500 text-blueGray-800' : 'text-amber-600'}`}>
                All
            </button>
            <button
                onClick={viewUnpublished}
                className={`focus:outline-none border-t border-b border-amber-700 transition ease-linear hover:bg-amber-500 hover:text-blueGray-800 px-2 py-1 ${published == 'false' ? 'bg-amber-500 text-blueGray-800' : 'text-amber-600'}`}>
                Unpublished
            </button>
            <button
                onClick={viewPublished}
                className={`focus:outline-none border border-amber-700 transition ease-linear hover:bg-amber-500 hover:text-blueGray-800 px-2 py-1 rounded-r self-start md:self-end ${published == 'true' ? 'bg-amber-500 text-blueGray-800' : 'text-amber-600'}`}>
                Published
            </button>
        </div>
    )
}

