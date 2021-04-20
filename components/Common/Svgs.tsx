import React from 'react'

interface Props extends React.SVGProps<SVGSVGElement> {
    size?: 16 | 24 | 32 | 40 | 48
}

function Base({children, className, size, ...props}: Props) {
    return (
        <svg className={`fill-current inline ${className}`} width={size ?? 24} height={size ?? 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            {children}
        </svg>
    )
}

export function Info(props: Props) {
    return (
        <Base {...props}>
            <path d="M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"/>
        </Base>
    )
}

export function Play(props: Props) {
    return (
        <Base {...props}>
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 16.5V7.5L16 12L10 16.5Z" />
        </Base>
    )
}

export function Table(props: Props) {
    return (
        <Base {...props}>
            <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 5V8H5V5H19ZM19 10V14H5V10H19ZM5 19V16H19V19H5Z" />
        </Base>
    )
}

export function Plus(props: Props) {
    return (
        <Base {...props}>
            <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
        </Base>
    )
}

export function History(props:Props) {
    return (
        <Base {...props}>
            <path d="M13 3C8.03 3 4 7.03 4 12H1L4.89 15.89L4.96 16.03L9 12H6C6 8.13 9.13 5 13 5C16.87 5 20 8.13 20 12C20 15.87 16.87 19 13 19C11.07 19 9.32 18.21 8.06 16.94L6.64 18.36C8.27 19.99 10.51 21 13 21C17.97 21 22 16.97 22 12C22 7.03 17.97 3 13 3ZM12 8V13L16.25 15.52L17.02 14.24L13.5 12.15V8H12Z"/>
        </Base>
    )
}

export function SearchIcon({className, ...props}: Props) {
    return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={`inline ${className}`} {...props}>
            <path d="M31.1283 32.6783L21.6033 23.1517C17.3661 26.1641 11.5274 25.4273 8.17146 21.4566C4.81552 17.4859 5.06194 11.606 8.73834 7.93001C12.4138 4.25242 18.2942 4.00494 22.2657 7.3607C26.2371 10.7165 26.9744 16.5558 23.9617 20.7933L33.4867 30.32L31.13 32.6767L31.1283 32.6783ZM15.8083 8.33332C12.6478 8.33261 9.92116 10.5511 9.27913 13.6457C8.6371 16.7403 10.2562 19.8605 13.1561 21.1171C16.0561 22.3737 19.4398 21.4214 21.2587 18.8368C23.0777 16.2521 22.8318 12.7455 20.67 10.44L21.6783 11.44L20.5417 10.3067L20.5217 10.2867C19.2747 9.03197 17.5773 8.32856 15.8083 8.33332Z" fill="#E2E8F0" />
        </svg>
    )
}

export function Preview(props: Props) {
    return (
        <Base {...props}>
            <path d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM19 19H5V7H19V19ZM12 10.5C13.84 10.5 15.48 11.46 16.34 13C15.48 14.54 13.84 15.5 12 15.5C10.16 15.5 8.52 14.54 7.66 13C8.52 11.46 10.16 10.5 12 10.5ZM12 9C9.27 9 6.94 10.66 6 13C6.94 15.34 9.27 17 12 17C14.73 17 17.06 15.34 18 13C17.06 10.66 14.73 9 12 9ZM12 14.5C11.17 14.5 10.5 13.83 10.5 13C10.5 12.17 11.17 11.5 12 11.5C12.83 11.5 13.5 12.17 13.5 13C13.5 13.83 12.83 14.5 12 14.5Z" />
        </Base>
    )
}

export function Publish(props: Props) {
    return (
        <Base {...props}>
            <path d="M5 4H19V6H5V4ZM5 14H9V20H15V14H19L12 7L5 14ZM13 12V18H11V12H9.83L12 9.83L14.17 12H13Z" />
        </Base>
    )
}

export function Unpublish(props: Props) {
    return (
        <Base {...props}>
            <path d="M7.94014 5.12L6.49014 3.66C8.07014 2.61 9.96014 2 12.0001 2C17.5201 2 22.0001 6.48 22.0001 12C22.0001 14.04 21.3901 15.93 20.3401 17.51L18.8801 16.05C19.5901 14.86 20.0001 13.48 20.0001 12C20.0001 7.59 16.4101 4 12.0001 4C10.5201 4 9.14014 4.41 7.94014 5.12ZM17.6601 9.53L16.2501 8.12L13.6001 10.77L15.0101 12.18L17.6601 9.53ZM19.7801 22.61L17.5101 20.34C15.9301 21.39 14.0401 22 12.0001 22C6.48014 22 2.00014 17.52 2.00014 12C2.00014 9.96 2.61014 8.07 3.66014 6.49L1.39014 4.22L2.80014 2.81L21.1801 21.19L19.7801 22.61ZM16.0601 18.88L12.1801 15L10.5901 16.59L6.35014 12.35L7.76014 10.94L10.5901 13.77L10.7701 13.59L5.12014 7.94C4.41014 9.14 4.00014 10.52 4.00014 12C4.00014 16.41 7.59014 20 12.0001 20C13.4801 20 14.8601 19.59 16.0601 18.88Z" />
        </Base>
    )
}

export function Loading(props: Props) {
    return (
        <Base {...props} className="animate-spin">
            <path d="M12 6V9L16 5L12 1V4C7.58 4 4 7.58 4 12C4 13.57 4.46 15.03 5.24 16.26L6.7 14.8C6.25 13.97 6 13.01 6 12C6 8.69 8.69 6 12 6ZM18.76 7.74L17.3 9.2C17.74 10.04 18 10.99 18 12C18 15.31 15.31 18 12 18V15L8 19L12 23V20C16.42 20 20 16.42 20 12C20 10.43 19.54 8.97 18.76 7.74V7.74Z" />
        </Base>
    )
}

export function LoadingNotSpinning(props: Props) {
    return (
        <Base {...props}>
            <path d="M12 6V9L16 5L12 1V4C7.58 4 4 7.58 4 12C4 13.57 4.46 15.03 5.24 16.26L6.7 14.8C6.25 13.97 6 13.01 6 12C6 8.69 8.69 6 12 6ZM18.76 7.74L17.3 9.2C17.74 10.04 18 10.99 18 12C18 15.31 15.31 18 12 18V15L8 19L12 23V20C16.42 20 20 16.42 20 12C20 10.43 19.54 8.97 18.76 7.74V7.74Z" />
        </Base>
    )
}

export function Settings(props: Props) {
    return (
        <Base {...props}>
            <path d="M19.4298 12.98C19.4698 12.66 19.4998 12.34 19.4998 12C19.4998 11.66 19.4698 11.34 19.4298 11.02L21.5398 9.37C21.7298 9.22 21.7798 8.95 21.6598 8.73L19.6598 5.27C19.5698 5.11 19.3998 5.02 19.2198 5.02C19.1598 5.02 19.0998 5.03 19.0498 5.05L16.5598 6.05C16.0398 5.65 15.4798 5.32 14.8698 5.07L14.4898 2.42C14.4598 2.18 14.2498 2 13.9998 2H9.99984C9.74984 2 9.53984 2.18 9.50984 2.42L9.12984 5.07C8.51984 5.32 7.95984 5.66 7.43984 6.05L4.94984 5.05C4.88984 5.03 4.82984 5.02 4.76984 5.02C4.59984 5.02 4.42984 5.11 4.33984 5.27L2.33984 8.73C2.20984 8.95 2.26984 9.22 2.45984 9.37L4.56984 11.02C4.52984 11.34 4.49984 11.67 4.49984 12C4.49984 12.33 4.52984 12.66 4.56984 12.98L2.45984 14.63C2.26984 14.78 2.21984 15.05 2.33984 15.27L4.33984 18.73C4.42984 18.89 4.59984 18.98 4.77984 18.98C4.83984 18.98 4.89984 18.97 4.94984 18.95L7.43984 17.95C7.95984 18.35 8.51984 18.68 9.12984 18.93L9.50984 21.58C9.53984 21.82 9.74984 22 9.99984 22H13.9998C14.2498 22 14.4598 21.82 14.4898 21.58L14.8698 18.93C15.4798 18.68 16.0398 18.34 16.5598 17.95L19.0498 18.95C19.1098 18.97 19.1698 18.98 19.2298 18.98C19.3998 18.98 19.5698 18.89 19.6598 18.73L21.6598 15.27C21.7798 15.05 21.7298 14.78 21.5398 14.63L19.4298 12.98V12.98ZM17.4498 11.27C17.4898 11.58 17.4998 11.79 17.4998 12C17.4998 12.21 17.4798 12.43 17.4498 12.73L17.3098 13.86L18.1998 14.56L19.2798 15.4L18.5798 16.61L17.3098 16.1L16.2698 15.68L15.3698 16.36C14.9398 16.68 14.5298 16.92 14.1198 17.09L13.0598 17.52L12.8998 18.65L12.6998 20H11.2998L11.1098 18.65L10.9498 17.52L9.88984 17.09C9.45984 16.91 9.05984 16.68 8.65984 16.38L7.74984 15.68L6.68984 16.11L5.41984 16.62L4.71984 15.41L5.79984 14.57L6.68984 13.87L6.54984 12.74C6.51984 12.43 6.49984 12.2 6.49984 12C6.49984 11.8 6.51984 11.57 6.54984 11.27L6.68984 10.14L5.79984 9.44L4.71984 8.6L5.41984 7.39L6.68984 7.9L7.72984 8.32L8.62984 7.64C9.05984 7.32 9.46984 7.08 9.87984 6.91L10.9398 6.48L11.0998 5.35L11.2998 4H12.6898L12.8798 5.35L13.0398 6.48L14.0998 6.91C14.5298 7.09 14.9298 7.32 15.3298 7.62L16.2398 8.32L17.2998 7.89L18.5698 7.38L19.2698 8.59L18.1998 9.44L17.3098 10.14L17.4498 11.27ZM11.9998 8C9.78984 8 7.99984 9.79 7.99984 12C7.99984 14.21 9.78984 16 11.9998 16C14.2098 16 15.9998 14.21 15.9998 12C15.9998 9.79 14.2098 8 11.9998 8ZM11.9998 14C10.8998 14 9.99984 13.1 9.99984 12C9.99984 10.9 10.8998 10 11.9998 10C13.0998 10 13.9998 10.9 13.9998 12C13.9998 13.1 13.0998 14 11.9998 14Z" />
        </Base>
    )
}

export function ChevronRight(props: Props) {
    return (
        <Base {...props}>
            <path d="M9.99997 6L8.58997 7.41L13.17 12L8.58997 16.59L9.99997 18L16 12L9.99997 6Z"/>
        </Base>

    )
}

export function ChevronLeft(props: Props) {
    return (
        <Base {...props}>
            <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"/>
        </Base>

    )
}

export function ChevronUp(props: Props) {
    return (
        <Base {...props}>
            <path d="M12 8L6 14L7.41 15.41L12 10.83L16.59 15.41L18 14L12 8Z"/>
        </Base>
    )
}

export function ChevronDown(props:Props) {
    return (
        <Base {...props}>
            <path d="M16.59 8.59003L12 13.17L7.41 8.59003L6 10L12 16L18 10L16.59 8.59003Z"/>
        </Base>
    )
}

export function Edit(props:Props) {
    return (
        <Base {...props}>
            <path d="M14.06 9.02L14.98 9.94L5.92 19H5V18.08L14.06 9.02V9.02ZM17.66 3C17.41 3 17.15 3.1 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C18.17 3.09 17.92 3 17.66 3V3ZM14.06 6.19L3 17.25V21H6.75L17.81 9.94L14.06 6.19V6.19Z" />
        </Base>
    )
}

export function Close(props:Props) {
    return(
        <Base {...props}>
            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" />
        </Base>
    )
}

export function Delete(props:Props) {
    return (
        <Base {...props}>
            <path d="M16 9V19H8V9H16ZM14.5 3H9.5L8.5 4H5V6H19V4H15.5L14.5 3ZM18 7H6V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7Z" />
        </Base>
    )
}

export function Warning(props:Props) {
    return (
        <Base {...props}>
                <path d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z"/>
        </Base>
    )
}
