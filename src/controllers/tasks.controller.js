const pool = require('../db')
const getAllTasks = async (req, res, next) => {
    try {        
        const allTasks = await pool.query('SELECT * FROM tasks');
        return res.status(200).json(allTasks.rows);
    } catch (error) {
        next(error);
    }
}
const getTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
        if (task.rows.length === 0) return res.status(404).json({ "message": "Task not found" })
        return res.status(200).json(task.rows[0]);
    } catch (error) {
        next(error);
    }
}

const createTask = async (req, res, next) => {
    const { title, description } = req.body;
    try {
        const result = await pool.query('INSERT INTO tasks (title, description) VALUES ($1,$2) RETURNING *', [
            title,
            description
        ]);
        return res.status(200).json(result.rows[0]);
    } catch (error) {
        next(error);
    }

}

const deleteTask = async (req, res, next) => {
    try {        
        const { id } = req.params;        
        const task = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
        if (task.rowCount === 0) return res.status(404).json({ "message": "Task not found" })
        return res.sendStatus(204);
    } catch (error) {        
        next(error);
    }
}
const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const result = await pool.query('UPDATE tasks set title = $1, description=$2 WHERE id = $3 RETURNING *', [title, description, id]);
        if (task.rowCount === 0) return res.status(404).json({ "message": "Task not found" })
        console.log(id, title, description);
        return res.status(200).json(result.rows[0]);
    } catch (error) {
        next(error);
    }

}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
}