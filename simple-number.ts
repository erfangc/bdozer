
export function simpleNumber(costOfIt) {

    let visualOfIt = costOfIt.toString();

    let visualLeng = 6;
    let maxLeng = 4;
    let letterArrayIndex = 0;

    let letterArray = [" Thousand", " Million", " Billion", " Trillion"];

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
