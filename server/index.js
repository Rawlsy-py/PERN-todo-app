const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db")

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//
// Create a todo
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );
    } catch (err) {
        console.error(err.message);
    }
})

// get all todos
app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")

    } catch (err) {
        console.error(err.message)
    }
})

// get a todo
app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",
            [id]
        );
    } catch (err) {
        console.error(err.message)
    }
})

// update a todo
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
        );
    } catch (err) {
        console.error(err.message)
    }
})

// delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const delteTodo = await pool.query("DELETE FROM todo WEHRE id = $1",
            [id]
        );
    } catch (err) {
        console.err(err.message)
    }
})

// check server is running
app.listen(3000, () => {
    console.log("server has started on port 3000");
});