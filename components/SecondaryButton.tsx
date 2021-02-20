export function SecondaryButton({ className, children, ...props }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button className={`text-blueGray-100 bg-blueGray-900 rounded-sm px-3 transition ease-linear hover:bg-blueGray-800 ${className}`} {...props}>
            {children}
        </button>
    )
}