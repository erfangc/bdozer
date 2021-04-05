import { FilingEntity } from "../../../client";

export function FilingEntityCard({ filingEntity }: { filingEntity: FilingEntity }) {
    return (
        <>
            <div className='bg-blueGray-700 shadow-md rounded-md grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-6 px-4 gap-4'>
                <div className="flex flex-col">
                    <div className="font-light text-sm">Name</div>
                    <span className="font-semibold">{filingEntity?.name}</span>
                </div>
                <div className="flex flex-col">
                    <div className="font-light text-sm">Trading Symbol</div>
                    <span className="font-semibold">{filingEntity?.tradingSymbol}</span>
                </div>
                <div className="flex flex-col">
                    <div className="font-light text-sm">SIC Description</div>
                    <span className="font-semibold">{filingEntity?.sicDescription}</span>
                </div>
                <div className="flex flex-col">
                    <div className="font-light text-sm">Exchange</div>
                    <span className="font-semibold space-x-1">{filingEntity?.exchanges.map(exchange => <span>{exchange}</span>)}</span>
                </div>
            </div>
            <p className="self-end text-sm">
                <div className="font-light text-blueGray-300">Last Updated</div>
                <div className="text-blueGray-200">{new Date(filingEntity.lastUpdated).toLocaleString()}</div>
            </p>
        </>
    )
}