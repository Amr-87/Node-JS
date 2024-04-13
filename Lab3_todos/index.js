
const express = require('express');
const mongoose = require('mongoose')
const todosRouter = require('./routes/todos')
const usersRouter = require('./routes/users')

const app = express();

mongoose.connect('mongodb://localhost:27017/todosDB')
    .then(()=>console.log(`connected to db..`))
    .catch((error)=>console.log(error))

//middlewares
app.use(express.json());

//routes
app.use('/todos', todosRouter )
app.use('/users', usersRouter )

const port = 3333 ;
app.listen(port, ()=> console.log(`server listening on http://localhost:${port} ...`));