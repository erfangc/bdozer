
export function ModelEditorSkeleton() {
    return (
        <div className="w-96 animate-pulse flex flex-col space-y-12">
            {[1, 2, 3, 4, 5].map(i => (
                <div className="flex flex-col space-y-4" key={i}>
                    <div className="h-4 bg-blueGray-500 rounded w-3/4"></div>
                    <div className="h-4 bg-blueGray-500 rounded w-3/4"></div>
                    <div className="h-4 bg-blueGray-500 rounded w-3/4"></div>
                    <div className="h-4 bg-blueGray-500 rounded"></div>
                </div>
            ))}
        </div>
    )
}