export function PrimaryButton({ className, children, ...props }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button className={`bg-blue-600 text-blueGray-50 rounded-sm py-1 px-4 transition ease-linear hover:bg-blue-700 ${className}`} {...props}>{children}</button>
    )
}