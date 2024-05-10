const CryptoJS = require("crypto-js");

// Encryption function
function encryptPrivateKey(privateKey, encryptionKey) {
  const encrypted = CryptoJS.AES.encrypt(privateKey, encryptionKey).toString();
  return encrypted;
}

// Decryption function
function decryptPrivateKey(encryptedPrivateKey, encryptionKey) {
  const decrypted = CryptoJS.AES.decrypt(
    encryptedPrivateKey,
    encryptionKey
  ).toString(CryptoJS.enc.Utf8);
  console.log('decrypted', decrypted);
  
  // Check if decryption failed
  if (!decrypted) {
    throw new Error('Decryption failed: Incorrect encryption key');
  }
  
  return decrypted;
}

module.exports = { encryptPrivateKey, decryptPrivateKey };
