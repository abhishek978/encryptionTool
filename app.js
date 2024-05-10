const express = require("express");
const ejs = require("ejs");
const { encryptPrivateKey, decryptPrivateKey } = require("./helper");

const app = express();
// const port = 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Route to render the form
app.get("/", (req, res) => {
  res.render("form", {
    encryptedPrivateKey: "",
    decryptedPrivateKey: "",
    encryptionKey: "",
    decryptionError: null
  });
});

// Route to handle encryption form submission
app.post("/encrypt", (req, res) => {
  const encryptionKey = req.body.encryptionKey;
  const dataToEncrypt = req.body.dataToEncrypt;

  // Encrypt the data using the encryption key
  const encryptedData = encryptPrivateKey(dataToEncrypt, encryptionKey);
  console.log("encryptedData in encrypted route", encryptedData);


  // Render the form with all relevant data
  console.log('end of encry route');
  res.render("form", {
    encryptedPrivateKey: encryptedData,
    decryptedPrivateKey: "",
    encryptionKey: encryptionKey,
    decryptionError: null
  });
});

// Route to handle decryption form submission
app.post("/decrypt", (req, res) => {
    console.log('in decrypt route');
    console.log(req.body)
    const encryptedData = req.body.dataToDecrypt;
    const encryptionKey = req.body.decryptionKey;
  
    try {
      // Decrypt the data using the encryption key
      const decryptedData = decryptPrivateKey(encryptedData, encryptionKey);
      console.log("Decrypted Data:", decryptedData);
  
      // Render the form with decrypted data
      res.render("form", {
        encryptedPrivateKey: "",
        decryptedPrivateKey: decryptedData,
        encryptionKey: "",
        decryptionError: null // Initialize to null even when there's no error
      });
    } catch (error) {
      // Handle decryption errors
      console.error("Decryption error:", error);
      res.render("form", {
        encryptedPrivateKey: "",
        decryptedPrivateKey: "",
        encryptionKey: "",
        decryptionError: error.message // Pass the decryption error message to the template
      });
    }
});



  
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
