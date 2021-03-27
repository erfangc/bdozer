export function year(period: number | string) {
    const now = new Date().getFullYear() - 1
    if (typeof period === 'string') {
        return now + parseInt(period)
    } else {
        return now + period
    }
}