const express = require("express");

const router = express.Router();

let expenses = [];

// GET all expenses
router.get("/", (req, res) => {
  res.json(expenses);
});

// ADD expense
router.post("/", (req, res) => {

  const { title, amount, date } = req.body;

  const newExpense = {
    id: Date.now(),
    title,
    amount,
    date
  };

  expenses.push(newExpense);

  res.json(newExpense);
});

// DELETE expense
router.delete("/:id", (req, res) => {

  const id = req.params.id;

  expenses = expenses.filter(exp => exp.id != id);

  res.json({ message: "Expense deleted" });

});

module.exports = router;