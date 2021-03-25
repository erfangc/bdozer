export function year(period: number | string) {
    const now = new Date().getFullYear()
    if (typeof period === 'string') {
        return now + parseInt(period)
    } else {
        return now + period
    }
}