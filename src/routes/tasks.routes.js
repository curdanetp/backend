const { Router } = require('express');
const { getAllTasks, getTask, createTask, deleteTask, updateTask,sayOk } = require('../controllers/tasks.controller')
const router = Router();

router.get('/', sayOk);

router.get('/tasks', getAllTasks);

router.get('/tasks/:id', getTask);

router.post('/tasks', createTask);

router.delete('/tasks/:id', deleteTask);

router.put('/tasks/:id', updateTask);
module.exports = router