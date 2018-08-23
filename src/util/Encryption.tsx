
export const encryptByDES = (message: string) => {
    const charCodeArray: number[] = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < message.length; i++) {
        // tslint:disable-next-line:no-bitwise
        charCodeArray.push(message.charCodeAt(i) << 5);
    }
    return JSON.stringify(charCodeArray);
};

export const decryptByDES = (encoded: string) => {
    const encodedArray: number[] = JSON.parse(encoded);
    const charCodeArray: number[] = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < encodedArray.length; i++) {
        // tslint:disable-next-line:no-bitwise
        charCodeArray.push(encodedArray[i] >> 5);
    }
    return String.fromCharCode(...charCodeArray);
};
