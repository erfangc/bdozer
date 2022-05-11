import React, {useState} from "react";
import {StockAnalysis2} from "../../../../client";
import {basePath} from "../../../../api-hooks";
import {Button} from "../../../Common/Button";

interface DownloadToExcelProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    stockAnalysis: StockAnalysis2
}

export function DownloadToExcel({ stockAnalysis }: DownloadToExcelProps) {
    const [loading, setLoading] = useState(false)
    async function downloadModel() {
        setLoading(true)
        const id = stockAnalysis['_id'];
        const url = `${basePath}/public/published-stock-analyses/${id}/excel-download`
        fetch(url,
            {
                headers: {
                    'content-type': 'application/vnd.ms-excel;charset=UTF-8',
                },
                method: 'GET'
            })
            .then(res => res.blob()
                .then(blob => {
                    const filename = `${id}.xlsx`
                    if ((window.navigator as any).msSaveOrOpenBlob) {
                        (navigator as any).msSaveBlob(blob, filename)
                    } else {
                        const a = document.createElement('a')
                        document.body.appendChild(a)
                        a.href = window.URL.createObjectURL(blob)
                        a.download = filename
                        a.target = '_blank'
                        a.click()
                        a.remove()
                        window.URL.revokeObjectURL(url)
                    }
                    setLoading(false)
                }))
    }
    return (
        <Button onClick={downloadModel} className="w-36 flex justify-center">
            {loading ? <Loader/> : 'Download Model'}
        </Button>
    )
}

function Loader() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin fill-current">
            <path d="M15.55 5.55L11 1V4.07C7.06 4.56 4 7.92 4 12C4 16.08 7.05 19.44 11 19.93V17.91C8.16 17.43 6 14.97 6 12C6 9.03 8.16 6.57 11 6.09V10L15.55 5.55ZM19.93 11C19.76 9.61 19.21 8.27 18.31 7.11L16.89 8.53C17.43 9.28 17.77 10.13 17.91 11H19.93ZM13 17.9V19.92C14.39 19.75 15.74 19.21 16.9 18.31L15.46 16.87C14.71 17.41 13.87 17.76 13 17.9ZM16.89 15.48L18.31 16.89C19.21 15.73 19.76 14.39 19.93 13H17.91C17.77 13.87 17.43 14.72 16.89 15.48V15.48Z" />
        </svg>

    )
}
