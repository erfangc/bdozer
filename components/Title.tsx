
export function Title({ className, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
    return <h1 {...props} className={`text-4xl font-semibold text-blueGray-200 ${className}`} />
}