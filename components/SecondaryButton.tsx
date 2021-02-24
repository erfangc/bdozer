export function SecondaryButton({ className, children, ...props }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button className={`text-blueGray-100 bg-blueGray-900 rounded px-3 transition ease-linear hover:bg-blueGray-800 focus:outline-none ${className}`} {...props}>
            {children}
        </button>
    )
}