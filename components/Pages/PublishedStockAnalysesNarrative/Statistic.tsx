import React, {ReactNode} from 'react'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    label: ReactNode
    value: ReactNode
}
export function Statistic({ label, value, ...props }: Props) {
    let v = value
    if (typeof value === 'string') {
        v = <div className="font-extrabold text-2xl">{value}</div>
    }
    return (
        <div {...props}>
            <div>{label}</div>
            {v}
        </div>
    )
}
