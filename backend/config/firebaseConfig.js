const admin = require("firebase-admin");

// Inicializa Firebase Admin con el archivo de credenciales
admin.initializeApp({
  credential: admin.credential.cert(
    require("../firebaseAuth/financetracker-45f8f-firebase-adminsdk-fbsvc-cc3bc9f491.json")
  ), // Ruta del archivo .json
  storageBucket: "financetracker-45f8f.appspot.com", // Aquí va el nombre de tu bucket de Firebase Storage
});

module.exports = admin;
