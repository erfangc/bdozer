import React from "react";
import NumberFormat from "react-number-format";
import { basePath } from "../../../../api-hooks";
import { StockAnalysis } from "../../../../client";
import { Title } from "../../../Title";

interface Props {
    result: StockAnalysis
}

function DownloadToExcel(props: { onClick: () => void }) {
    return (
        <button
            onClick={props.onClick}
            className="focus:outline-none flex items-center text-sm px-2 py-1.5 rounded border border-emerald-700 text-emerald-500 transition ease-linear hover:bg-emerald-500 hover:text-emerald-50 w-full"
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.25 20.2505H12.75C12.336 20.2505 12 19.9145 12 19.5005C12 19.0865 12 4.91455 12 4.50055C12 4.08655 12.336 3.75055 12.75 3.75055H23.25C23.664 3.75055 24 4.08655 24 4.50055V19.5005C24 19.9145 23.664 20.2505 23.25 20.2505Z" fill="#E2E8F0" />
                <path d="M15.75 8.25055H12.75C12.336 8.25055 12 7.91455 12 7.50055C12 7.08655 12.336 6.75055 12.75 6.75055H15.75C16.164 6.75055 16.5 7.08655 16.5 7.50055C16.5 7.91455 16.164 8.25055 15.75 8.25055Z" fill="#059669" />
                <path d="M15.75 11.2505H12.75C12.336 11.2505 12 10.9145 12 10.5005C12 10.0865 12.336 9.75055 12.75 9.75055H15.75C16.164 9.75055 16.5 10.0865 16.5 10.5005C16.5 10.9145 16.164 11.2505 15.75 11.2505Z" fill="#059669" />
                <path d="M15.75 14.2505H12.75C12.336 14.2505 12 13.9145 12 13.5005C12 13.0865 12.336 12.7505 12.75 12.7505H15.75C16.164 12.7505 16.5 13.0865 16.5 13.5005C16.5 13.9145 16.164 14.2505 15.75 14.2505Z" fill="#059669" />
                <path d="M15.75 17.2506H12.75C12.336 17.2506 12 16.9146 12 16.5006C12 16.0866 12.336 15.7505 12.75 15.7505H15.75C16.164 15.7505 16.5 16.0866 16.5 16.5006C16.5 16.9146 16.164 17.2506 15.75 17.2506Z" fill="#059669" />
                <path d="M20.25 8.25055H18.75C18.336 8.25055 18 7.91455 18 7.50055C18 7.08655 18.336 6.75055 18.75 6.75055H20.25C20.664 6.75055 21 7.08655 21 7.50055C21 7.91455 20.664 8.25055 20.25 8.25055Z" fill="#059669" />
                <path d="M20.25 11.2505H18.75C18.336 11.2505 18 10.9145 18 10.5005C18 10.0865 18.336 9.75055 18.75 9.75055H20.25C20.664 9.75055 21 10.0865 21 10.5005C21 10.9145 20.664 11.2505 20.25 11.2505Z" fill="#059669" />
                <path d="M20.25 14.2505H18.75C18.336 14.2505 18 13.9145 18 13.5005C18 13.0865 18.336 12.7505 18.75 12.7505H20.25C20.664 12.7505 21 13.0865 21 13.5005C21 13.9145 20.664 14.2505 20.25 14.2505Z" fill="#059669" />
                <path d="M20.25 17.2506H18.75C18.336 17.2506 18 16.9146 18 16.5006C18 16.0866 18.336 15.7505 18.75 15.7505H20.25C20.664 15.7505 21 16.0866 21 16.5006C21 16.9146 20.664 17.2506 20.25 17.2506Z" fill="#059669" />
                <path d="M13.2285 0.923022C13.0575 0.780522 12.828 0.719022 12.612 0.764022L0.612 3.01402C0.2565 3.08002 0 3.38902 0 3.75052V20.2505C0 20.6105 0.2565 20.921 0.612 20.987L12.612 23.237C12.657 23.246 12.7035 23.2505 12.75 23.2505C12.924 23.2505 13.0935 23.1905 13.2285 23.078C13.401 22.9355 13.5 22.7225 13.5 22.5005V1.50052C13.5 1.27702 13.401 1.06552 13.2285 0.923022Z" fill="#047857" />
                <path d="M10.314 14.507L7.94254 11.7965L10.341 8.71255C10.596 8.38555 10.536 7.91455 10.2105 7.65955C9.88504 7.40455 9.41404 7.46455 9.15754 7.79005L6.93604 10.6461L5.06404 8.50705C4.78954 8.19205 4.31554 8.16355 4.00654 8.43655C3.69454 8.70955 3.66304 9.18355 3.93604 9.49405L5.99854 11.8521L3.90754 14.54C3.65254 14.867 3.71254 15.338 4.03804 15.593C4.17604 15.6995 4.33954 15.7505 4.50004 15.7505C4.72354 15.7505 4.94404 15.6515 5.09254 15.461L7.00504 13.001L9.18604 15.4925C9.33454 15.6635 9.54154 15.7505 9.75004 15.7505C9.92554 15.7505 10.101 15.689 10.2435 15.5645C10.5555 15.2915 10.587 14.8175 10.314 14.507Z" fill="#FAFAFA" />
            </svg>
            <span className="ml-4">Download Model</span>
        </button>
    )
}

export function Overview(props: Props) {
    const {
        result: {
            cik,
            model: { symbol, name },
            currentPrice,
            targetPrice,
        }
    } = props;

    const upside = (targetPrice / currentPrice - 1) * 100;

    async function downloadModel() {
        const url = `${basePath}/public/stock-analysis-excel-downloader/${cik}`
        fetch(url, {
            headers: {
                'content-type': 'application/vnd.ms-excel;charset=UTF-8',
            },
            method: 'GET'
        }).then(res => res.blob().then(blob => {
            const filename = `${cik}.xlsx`
            if (window.navigator.msSaveOrOpenBlob) {
                navigator.msSaveBlob(blob, filename)
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
        }))
    }

    return (
        <div className="flex justify-between items-center">
            <div className="flex-col flex space-y-2">
                <span className="text-blueGray-300">{name}</span>
                <div className="flex items-baseline">
                    <Title>{symbol}</Title>
                    <span className="ml-4">
                        <span className="text-blueGray-300">Latest Price</span> <span className={currentPrice < targetPrice ? `text-rose-500` : null}>${currentPrice.toFixed(2)}</span>
                    </span>
                </div>
            </div>
            <div className="flex-col space-y-2">
                <div className="flex flex-col justify-between shadow-lg space-y-1 px-6 py-3 bg-blueGray-700 rounded-md">
                    <span className="font-semibold">Target Price</span>
                    <div>
                        <NumberFormat className="font-light" value={targetPrice} displayType="text" prefix="$" decimalScale={2} />
                        <span className={`text-xs ml-3 ${upside > 0 ? 'text-lime-400' : 'text-rose-500'} font-bold`}>
                            {upside.toFixed(1)}% <span className="font-normal">{upside > 0 ? 'Upside' : 'Downside'}</span>
                        </span>
                    </div>
                </div>
                <DownloadToExcel onClick={downloadModel} />
            </div>

        </div>
    )
}
