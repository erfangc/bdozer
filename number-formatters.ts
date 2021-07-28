/**
 * Formats a number into something more readable
 *
 * @param origInput the original number that you wish to format
 * @param short abbreviate the output from "million" to "M" and "billion" to "B" etc.
 */
export function readableNumber(origInput: number | string, short?: boolean): string {
    const input = typeof origInput === 'string' ? parseFloat(origInput) : origInput
    const suffix = short ? ["K", "MM", "B", "T"] : ["Thousand", "Million", "Billion", "Trillion"];
    /*
    split between decimal and non-decimal portions
     */
    const inputStr = input.toString();
    const isNegative = input < 0;
    const [wholeNumber, ] = isNegative ? inputStr.substr(1, inputStr.length).split(".") :  inputStr.split(".")
    const leadingSignificantDigits = wholeNumber.length % 3 === 0 ? 3 : wholeNumber.length % 3;
    const order = leadingSignificantDigits === 3 ? Math.floor(wholeNumber.length / 4) : Math.floor(wholeNumber.length / 3)

    if (order > 0) {
        const chosenSuffix = suffix[order - 1]
        const remainder = wholeNumber.substr(0, leadingSignificantDigits)
        if (remainder.length === 1) {
            const decimal = wholeNumber.substr(leadingSignificantDigits, 2)
            return `${isNegative ? '-' : ''}${remainder}.${decimal} ${chosenSuffix}`;
        } else if (remainder.length === 2) {
            const decimal = wholeNumber.substr(leadingSignificantDigits, 1)
            return `${isNegative ? '-' : ''}${remainder}.${decimal} ${chosenSuffix}`;
        } else {
            return `${isNegative ? '-' : ''}${remainder} ${chosenSuffix}`;
        }
    } else {
        return input.toFixed(2)
    }

}

export function readableMoney(input: number | string, short?: boolean) {
    const number = readableNumber(input, short);
    const value = typeof input === 'string' ? parseFloat(input) : input
    if (value < 0) {
        return `-$${number.substr(1, number.length)}`;
    } else {
        return `$${number}`;
    }

}

export function readablePercent(number: number, decimals: number = 1) {
    return `${(number * 100).toFixed(decimals)}%`
}