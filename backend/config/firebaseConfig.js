const admin = require("firebase-admin");

// Inicializa Firebase Admin con el archivo de credenciales
admin.initializeApp({
  credential: admin.credential.cert(
    require("../firebase/financetracker-45f8f-firebase-adminsdk-fbsvc-2d74c05347.json")
  ), // Ruta del archivo .json
  storageBucket: "financetracker-45f8f.appspot.com", // Aquí va el nombre de tu bucket de Firebase Storage
});

module.exports = admin;
