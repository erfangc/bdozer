
export function Pill(props: { label: string, active: boolean, onClick: () => void }) {
    const { active, onClick, label } = props;
    return (
        <button
            className={`focus:outline-none ${active ? 'bg-blueGray-500' : 'border hover:bg-blueGray-500 border-blueGray-700'} rounded-full px-4 py-1 shadow-md`}
            onClick={onClick}
        >
            {label}
        </button>
    )
}