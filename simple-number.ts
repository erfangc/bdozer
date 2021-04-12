export function simpleNumber(costOfIt, short?: boolean) {

    let visualOfIt = costOfIt.toString();

    let visualLeng = 6;
    let maxLeng = 4;
    let letterArrayIndex = 0;

    let letterArray = short ? ["K", "MM", "B", "T"] : [" Thousand", " Million", " Billion", " Trillion"];

    let leng = 4;
    let slic = 1;

    for (let g = 0; g < visualOfIt.length; g++) {
        if (visualOfIt.length <= visualLeng) {
            if (leng < maxLeng) {
                leng = maxLeng;
            }

            if (visualOfIt.length === leng) {
                if (slic > 2) {
                    visualOfIt = costOfIt.toString().slice(0, slic) + letterArray[letterArrayIndex];
                    break;
                } else {
                    visualOfIt = costOfIt.toString().slice(0, slic) + "." + costOfIt.toString().slice(slic, 3) + letterArray[letterArrayIndex];
                    break;
                }
            } else {
                leng++;
                slic++;
            }
        } else {
            maxLeng += 3;
            visualLeng += 3;
            letterArrayIndex++;
        }
    }

    return visualOfIt;
}

export function simpleMoney(costOfIt, short?: boolean) {
    const number = simpleNumber(costOfIt, short)
    if (parseFloat(costOfIt) < 0) {
        return `-$${number.substr(1, number.length)}`;
    } else {
        return `$${number}`;
    }

}

export function simplePercent(number: number, decimals: number = 1) {
    return `${(number * 100).toFixed(decimals)}%`
}