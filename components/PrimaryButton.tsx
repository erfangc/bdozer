export function PrimaryButton({ className, children, disabled, ...props }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button
            className={`bg-blue-600 text-blueGray-50 rounded py-2 px-4 transition ease-linear hover:bg-blue-700 focus:outline-none flex items-center ${className}`}
            {...props}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
