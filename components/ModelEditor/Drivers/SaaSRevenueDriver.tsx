export function SaaSRevenueDriver() {
    return (
        <div className="flex py-2 px-8 bg-blueGray-600 rounded-lg shadow space-x-12">
            <div className="flex-col flex justify-around">
                <span className="font-bold text-lg text-blueGray-200">SaaSRevenue</span>
                <span className="flex space-x-2">
                    <button className="text-blueGray-100 bg-blueGray-900 rounded-sm px-4 py-1">Edit</button>
                    <button className="text-red-500 rounded-sm px-4 py-1">Delete</button>
                </span>
            </div>
            <div className="flex-col flex justify-around">
                <span className="text-xs text-blueGray-100 whitespace-nowrap">Initial Subscribers</span>
                <span>150,000</span>
            </div>
            <div className="flex-col flex justify-around whitespace-nowrap">
                <span className="text-xs text-blueGray-100">ARR</span>
                <span>128</span>
            </div>
            <div className="flex-col flex justify-around whitespace-nowrap">
                <span className="text-xs text-blueGray-100">Eventual Subscribers</span>
                <span>300,000</span>
            </div>
        </div>
    )
}