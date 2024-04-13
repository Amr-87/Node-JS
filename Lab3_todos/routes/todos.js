const express = require('express')
const router = express.Router() 
const { getAllTodos, getTodoById, patchTodoById, addTodo, deleteTodoById } = require('../controllers/todos')

router.route('/').get(getAllTodos).post(addTodo)
router.route('/:id').get(getTodoById).patch(patchTodoById).delete(deleteTodoById)

//router.get('/',getAllTodos)
//router.post('/', addTodo)

// router.get('/:id',getTodoById)
// router.patch('/:id',patchTodoById)
// router.delete('/:id',deleteTodoById)

//router.put('/', putTodo)

module.exports = router