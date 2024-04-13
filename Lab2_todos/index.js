
const fs = require('fs');
const express = require('express');
const { error } = require('console');
const app = express();

app.use(express.json());

app.get('/todos', (req, res) => {
    console.log(`Get request received`);
    fs.readFile('./todos.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading data. Please try again later.');
        } else {
            console.log(data);
            res.json(JSON.parse(data)); // Parse JSON string to send as JSON response
        }
    });
});

app.post('/todos', (req, res) => {
    console.log(`Post request received`);
    let newTodo = req.body;
    console.log(newTodo);
    fs.readFile('./todos.json', (error, data) => {
        if (error) {
            console.log(error);
            res.status(500).send(`Reading file failed`);
        } else {
            let todos = JSON.parse(data);
            todos.push(newTodo);
            console.log(todos);
            // Convert the todos array back to JSON format
            const todosJson = JSON.stringify(todos);
            // Write the updated todos array back to the file
            fs.writeFile('./todos.json', todosJson, 'utf-8', (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Writing to file failed');
                } else {
                    res.send(newTodo);
                }
            });
        }
    });
});

app.patch('/todos', (req, res) => {
    console.log(`Patch request received`);
    console.log(req.body);
    fs.readFile('./todos.json', (error, data) => {
        if (error) {
            console.log(error);
            res.status(500).send(`Reading file failed`);
        } else {
            let todos = JSON.parse(data);
            // Assuming req.body contains the updated todo object
            // Find the index of the todo with the same id as req.body
            const index = todos.findIndex(todo => todo.title === req.body.title);
            if (index !== -1) {
                // Update the todo object at the found index
                todos[index] = req.body;
                console.log(todos);
                // Write the updated todos array back to the file
                fs.writeFile('./todos.json', JSON.stringify(todos), 'utf-8', (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('Writing to file failed');
                    } else {
                        res.send(todos);
                    }
                });
            } else {
                res.status(404).send('Todo not found');
            }
        }
    });
});

app.put('/todos', (req, res) => {
    console.log(`put request received`);
    console.log(req.body);
    fs.readFile('./todos.json', (error, data) => {
        if (error) {
            console.log(error);
            res.status(500).send(`Reading file failed`);
        } else {
            let todos = JSON.parse(data);
            // Assuming req.body contains the updated todo object
            // Find the index of the todo with the same id as req.body
            const index = todos.findIndex(todo => todo.title === req.body.title);
            if (index !== -1) {
                // Update the todo object at the found index
                todos[index] = req.body;
                console.log(todos);
                // Write the updated todos array back to the file
                fs.writeFile('./todos.json', JSON.stringify(todos), 'utf-8', (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('Writing to file failed');
                    } else {
                        res.send(todos);
                    }
                });
            } else {
                res.status(404).send('Todo not found');
            }
        }
    });
});

app.delete('/todos', (req, res) => {
    console.log(`DELETE request received`);
    let todoToDelete = req.body;
    console.log(todoToDelete);
    fs.readFile('./todos.json', (error, data) => {
        if (error) {
            console.error(error);
            res.status(500).send(`Reading file failed`);
        } else {
            let todos = JSON.parse(data);
            const index = todos.findIndex(todo => todo.title === todoToDelete.title);
            if (index !== -1) {
                // Remove the todo from the array
                const deletedTodo = todos.splice(index, 1)[0]; // Removed todo will be at index 0
                console.log(todos);
                // Write the updated todos array back to the file
                fs.writeFile('./todos.json', JSON.stringify(todos), 'utf-8', (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('Writing to file failed');
                    } else {
                        res.send(`${JSON.stringify(deletedTodo)} deleted successfully.`);
                    }
                });
            } else {
                res.status(404).send('Todo not found');
            }
        }
    });
});

const port = 3333 ;
app.listen(port, ()=> console.log(`server listening on http://localhost:${port}...`));