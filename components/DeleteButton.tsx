export function DeleteButton({ className, children, ...props }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button className={`text-red-500 rounded-sm px-4 py-1 ${className}`} {...props}>
            {children}
        </button>
    )
}