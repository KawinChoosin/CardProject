const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/database");
const Todo = require("./models/todo");

const app = express();
const port = 2222;

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("access-control-allow-origin", ""); // หรือไม่ตั้งค่าเลย
  next();
});

// Sync database
sequelize.sync();

// Get all todos
app.get("/todos", async (req, res) => {
  const todos = await Todo.findAll();
  res.json(todos);
});

// Create a new todo
app.post("/todos", async (req, res) => {
  const { topic, name, url, detail, done } = req.body;
  const newTodo = await Todo.create({ topic, name, url, detail, done });
  res.json(newTodo);
});

// Update a todo
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { topic, name, url, detail, done } = req.body;
  await Todo.update({ topic, name, url, detail, done }, { where: { id } });
  const updatedTodo = await Todo.findByPk(id);
  res.json(updatedTodo);
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  await Todo.destroy({ where: { id } });
  res.json({ message: "Todo deleted" });
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
