const db = require("../config/db");
const firebaseAdmin = require("../config/firebaseConfig"); // Ruta a la configuración de Firebase
const { v4: uuidv4 } = require("uuid"); // Para generar un nombre único para la imagen

const getAllExpenses = (req, res) => {
  db.query("SELECT * FROM expenses", (err, results) => {
    if (err) {
      console.error("Error fetching incomes:", err);
      return res.status(500).json({ error: "Failed to retrieve incomes" });
    }

    res.json(results);
  });
};

const createExpense = async (req, res) => {
  const userId = req.user.userId; // Extract userId from the JWT payload
  const { category, name, description, quantity, date, fixed } = req.body;
  const receiptFile = req.file;

  if (
    userId == null ||
    category == null ||
    name == null ||
    quantity == null ||
    date == null ||
    fixed == null
  ) {
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
      INSERT INTO expenses (user_id, category_id, name, description, amount, date, image, fixed)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [
        userId,
        category,
        name,
        description,
        quantity,
        date,
        receiptUrl,
        fixed ? 1 : 0,
      ],
      (err, result) => {
        if (err) {
          console.error("Error inserting expense:", err);
          return res.status(500).json({ error: "Failed to create expense" });
        }

        res.status(201).json({
          message: "Expense created successfully",
          expense: {
            id: result.insertId,
            user_id: userId,
            category_id: category,
            name,
            description,
            amount: quantity,
            date,
            receiptUrl,
            fixed: fixed ?? false,
          },
        });
      }
    );
  } catch (error) {
    console.error("Error uploading receipt:", error);
    return res.status(500).json({ error: "Failed to process expense" });
  }
};

module.exports = { createExpense, getAllExpenses };
