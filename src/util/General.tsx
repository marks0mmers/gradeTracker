export const leadingZeros = (numberOfZeros: number, numberToPad?: number) => {
    let s = numberToPad + "";
    while (s.length < numberOfZeros) {
        s = "0" + s;
    }
    return s;
};
