var CryptoJS = require("crypto-js");

const encrypt = (s) => {
    return CryptoJS.AES.encrypt(s, "Secret Passphrase").toString();
}

const decrypt = (s) => {
    return CryptoJS.AES.decrypt(s, "Secret Passphrase").toString();
}

export {encrypt, decrypt}