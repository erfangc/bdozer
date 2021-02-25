
export function ModelSkeleton() {
    return (
        <>
            {[1, 2].map(i => (
                <div
                    key={i}
                    className="bg-blueGray-700 h-24 px-10 rounded-lg shadow text-blueGray-50 flex flex-col space-y-4 py-2 justify-center transition ease-linear hover:shadow-2xl cursor-pointer"
                >
                    <div className="h-4 bg-blueGray-500 rounded w-3/4"></div>
                    <div className="h-4 bg-blueGray-500 rounded w-3/4"></div>
                </div>
            ))}
        </>
    )
}
