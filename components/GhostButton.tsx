
export function GhostButton({ className, children, ...props }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button className={`h-8 border-blue-500 text-blue-500 text-base border px-4 rounded-sm transition ease-linear hover:bg-blue-500 hover:text-blueGray-50 ${className}`} {...props}>
            {children}
        </button>
    )
}
