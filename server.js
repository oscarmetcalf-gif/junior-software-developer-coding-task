const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// POST /tasks — Create new task
app.post("/tasks", (req, res) => {
  const { title, description, status, dueDate } = req.body;

  // Validation
  if (!title || !status || !dueDate) {
    return res.status(400).json({
      success: false,
      message: "Title, status and dueDate are required."
    });
  }

  const sql = `INSERT INTO tasks (title, description, status, dueDate)
               VALUES (?, ?, ?, ?)`;

  db.run(sql, [title, description, status, dueDate], function (err) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error saving task.",
        error: err
      });
    }

    // Return the saved task
    res.status(201).json({
      success: true,
      message: "Task created successfully.",
      task: {
        id: this.lastID,
        title,
        description,
        status,
        dueDate
      }
    });
  });
});

// Start server
const PORT = 5000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
