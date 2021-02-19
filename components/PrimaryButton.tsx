export function PrimaryButton({ className, children, ...props }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button className={`bg-blue-600 text-blueGray-50 rounded-sm py-1 px-4 ${className}`} {...props}>{children}</button>
    )
}