import express from "express";
import cors from "cors";
import pg from "pg";
import { pool } from "./db.js";

const app = express();
// const allowedOrigin = ['http://localhost:5173']
app.use(cors({
  // origin:allowedOrigin
}));
app.use(express.json());

// Routes

app.post("/todos", async (req, res) => {
  try {
    const description = req.body.description;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description],
    );

    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/todos", async (req, res) => {
  try {
    const alltodos = await pool.query("SELECT * FROM todo");
    res.json(alltodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const description = req.body.description;

    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2 returning *",
      [description, id],
    );

    res.json("todo Updated");
  } catch (error) {
    console.error(error.message);
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json("Todo Deleted");
  } catch (error) {
    console.error(error.message);
  }
});

const port = 5000;
app.listen(port, (req, res) => {
  console.log(`server has started on port ${port}`);
});
