export function SecondaryButton({ className, children, ...props }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button className={`text-blueGray-100 bg-blueGray-900 rounded-sm px-3 ${className}`} {...props}>
            {children}
        </button>
    )
}