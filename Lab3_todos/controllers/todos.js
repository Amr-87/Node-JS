
const todosModel = require('../models/todos')

const getAllTodos = async (req, res) => {
    try{
        let todos = await todosModel.find()
        res.json(todos)
    }
    catch(error){
        console.log(error);
        res.send('failed getting all todos')
    }
}

const getTodoById = async (req, res) => {
    let {id} = req.params
    try{
        let wantedTodo = await todosModel.findOne({_id: id})
        if (wantedTodo){
            res.json(wantedTodo)
        } 
        else{
            res.send('id does not exist')
        } 
    }
    catch(error){
        console.log(error);
        res.send('failed getting todo')
    }
}

const patchTodoById = async (req, res) => {
    let {id} = req.params
    let todo = req.body
    console.log(todo);

    try{
        let todoToEdit = await todosModel.findOneAndUpdate({_id: id}, todo)
        console.log(todoToEdit);
        res.json(todoToEdit);
    }
    catch(error){
        console.log(error);
        res.send('update failed')
    }   
}

// const putTodo = (req, res) => {
//     console.log(`put request received`);
//     console.log(req.body);
// }

const addTodo = async (req, res) => {
    let newTodo = req.body
    try{
        let addedTodo = await todosModel.create(newTodo)
        res.json(addedTodo)
    }
    catch(error){
        console.log(error);
        res.send('failed adding new todo')
    } 
}

const deleteTodoById = async (req, res) => {
    let {id} = req.params
    try{
        let deletedTodo = await todosModel.deleteOne({_id: id})
        res.json(deletedTodo)
        console.log(deletedTodo)
    }
    catch(error){
        console.log(error);
        res.send('failed deleting todo')
    }
}

module.exports = { getAllTodos, getTodoById, patchTodoById, addTodo, deleteTodoById }