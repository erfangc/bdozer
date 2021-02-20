export function DeleteButton({ className, children, ...props }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button className={`text-red-500 rounded-sm px-4 py-1 hover:bg-red-500 hover:text-blueGray-50 transition ease-linear ${className}`} {...props}>
            {children}
        </button>
    )
}