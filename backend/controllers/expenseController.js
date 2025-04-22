const db = require("../config/db");
const firebaseAdmin = require("../config/firebaseConfig"); // Ruta a la configuración de Firebase
const { v4: uuidv4 } = require("uuid"); // Para generar un nombre único para la imagen

const createExpense = async (req, res) => {
  const { user_id, name, amount, date, fixed } = req.body;
  const receiptFile = req.file;

  console.log("Datos recibidos:", { user_id, name, amount, date, fixed });

  if (!user_id || !name || !amount || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    let receiptUrl = null;

    if (receiptFile) {
      const bucket = firebaseAdmin.storage().bucket();
      const fileName = `receipts/${uuidv4()}_${receiptFile.originalname}`;
      const file = bucket.file(fileName);

      await file.save(receiptFile.buffer, {
        contentType: receiptFile.mimetype,
        public: true,
      });

      receiptUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
    }

    const query = `
      INSERT INTO expenses (user_id, name, amount, date, fixed, receipt_url)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [user_id, name, amount, date, fixed ?? false, receiptUrl],
      (err, result) => {
        if (err) {
          console.error("Error inserting expense:", err);
          return res.status(500).json({ error: "Failed to create expense" });
        }

        res.status(201).json({
          message: "Expense created successfully",
          expenseId: result.insertId,
          receiptUrl,
        });
      }
    );
  } catch (error) {
    console.error("Error uploading receipt:", error);
    return res.status(500).json({ error: "Failed to process expense" });
  }
};

module.exports = { createExpense };
