const { Router } = require('express');
const { getAllTasks, getTask, createTask, deleteTask, updateTask } = require('../controllers/tasks.controller')
const router = Router();

router.get('/api/tasks', getAllTasks);

router.get('api/tasks/:id', getTask);

router.post('api/tasks', createTask);

router.delete('api/tasks/:id', deleteTask);

router.put('api/tasks/:id', updateTask);
module.exports = router