const db = require("../config/db");
const { Storage } = require("@google-cloud/storage");
const firebaseAdmin = require("../config/firebaseConfig"); // Firebase config
const { v4: uuidv4 } = require("uuid"); // To generate unic name for the image

const getAllExpenses = (req, res) => {
  db.query("SELECT * FROM expenses", (err, results) => {
    if (err) {
      console.error("Error fetching expenses:", err);
      return res.status(500).json({ error: "Failed to retrieve expenses" });
    }

    res.json(results);
  });
};

const getUserExpenses = (req, res) => {
  const userId = req.user.userId;

  const query = `
    SELECT 
      expenses.*, 
      categories.id AS category_id,
      categories.name AS category_name, 
      categories.color AS category_color,
      categories.icon AS category_icon
    FROM expenses
    JOIN categories ON expenses.category_id = categories.id
    WHERE expenses.user_id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user expenses with categories:", err);
      return res.status(500).json({ error: "Failed to retrieve expenses" });
    }

    const formattedResults = results.map((expense) => {
      return {
        id: expense.id,
        name: expense.name,
        user_id: expense.user_id,
        amount: expense.amount,
        description: expense.description,
        date: expense.date,
        fixed: expense.fixed,
        image: expense.image,
        category: {
          id: expense.category_id, // Agregado el id de la categoría
          name: expense.category_name,
          color: expense.category_color,
          icon: expense.category_icon,
        },
      };
    });

    res.json(formattedResults);
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
      [userId, category, name, description, quantity, date, receiptUrl, fixed],
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

const editExpense = async (req, res) => {
  const userId = req.user.userId;
  const { id, name, description, quantity, date, fixed, category } = req.body;
  const receiptFile = req.file;

  if (!id || !name || !quantity || !date || !category) {
    return res
      .status(400)
      .json({ message: "Missing required fields to update expense." });
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

    const fields = [
      "name = ?",
      "description = ?",
      "amount = ?",
      "date = ?",
      "fixed = ?",
      "category_id = ?",
    ];

    const values = [name, description, quantity, date, fixed, category];

    if (receiptUrl) {
      fields.push("image = ?");
      values.push(receiptUrl);
    }

    const query = `
      UPDATE expenses
      SET ${fields.join(", ")}
      WHERE id = ? AND user_id = ?
    `;

    values.push(id, userId);

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error updating expense:", err);
        return res.status(500).json({ message: "Failed to update expense." });
      }

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Expense not found or not owned by user." });
      }

      res.status(200).json({ message: "Expense updated successfully." });
    });
  } catch (error) {
    console.error("Error uploading image or updating expense:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const deleteExpense = async (req, res) => {
  const userId = req.user.userId;
  const { id } = req.body;

  if (!id ) {
    return res
      .status(400)
      .json({ message: "Missing id to delete expense." });
  }

  try {
    const getImageQuery = `SELECT image FROM expenses WHERE id = ? AND user_id = ?`;
    db.query(getImageQuery, [id, userId], async (err, results) => {
      if (err) {
        console.error("Error getting image URL:", err);
        return res.status(500).json({ message: "Failed to get image." });
      }
      const imageUrl = results?.[0]?.image;

      if (imageUrl) {
        try {
          const bucket = firebaseAdmin.storage().bucket();
          const filePath = decodeURIComponent(
            imageUrl.split(`https://storage.googleapis.com/${bucket.name}/`)[1]
          );

          const file = bucket.file(filePath);
          await file.delete();
        } catch (firebaseErr) {
          console.error("No se pudo eliminar la imagen de Firebase:", firebaseErr);
        }
      }

    const deleteQuery = `
      DELETE FROM expenses
      WHERE id = ? AND user_id = ?
    `;

    db.query(deleteQuery, [id, userId], (err, result) => {
      if (err) {
        console.error("Error deleting expense:", err);
        return res.status(500).json({ message: "Failed to deleted expense." });
      }
      res.status(200).json({ message: "Expense deleted successfully." });
    });
  });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = {
  createExpense,
  getAllExpenses,
  getUserExpenses,
  editExpense,
  deleteExpense
};
