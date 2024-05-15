const CryptoJS = require("crypto-js");

// Encryption function
function encryptPrivateKey(privateKey, encryptionKey) {
  const encrypted = CryptoJS.AES.encrypt(privateKey, encryptionKey).toString();
  const base64Encrypted = Buffer.from(encrypted).toString('base64');
  return base64Encrypted;
}

// Decryption function
function decryptPrivateKey(encryptedPrivateKey, encryptionKey) {
  const encrypted = Buffer.from(encryptedPrivateKey, 'base64').toString();
  const decrypted = CryptoJS.AES.decrypt(
    encrypted,
    encryptionKey
  ).toString(CryptoJS.enc.Utf8);
  
  // Check if decryption failed
  if (!decrypted) {
    throw new Error('Decryption failed: Incorrect encryption key');
  }
  
  return decrypted;
}

module.exports = { encryptPrivateKey, decryptPrivateKey };
