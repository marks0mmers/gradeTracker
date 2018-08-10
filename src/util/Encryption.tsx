import * as CryptoJS from "crypto-js";

export const encryptByDES = (message: string) => {
    const words = CryptoJS.enc.Utf8.parse(message); // WordArray object
    return CryptoJS.enc.Base64.stringify(words); // string: 'SGVsbG8gd29ybGQ='
};

export const decryptByDES = (encoded: string) => {
    const words = CryptoJS.enc.Base64.parse(encoded);
    return CryptoJS.enc.Utf8.stringify(words);
};
