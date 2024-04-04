const fs = require('fs');

// Function to read todos from file
function readTodosFromFile() {
    try {
        return JSON.parse(fs.readFileSync('./todos.json', 'utf-8'));
    } catch (error) {
        console.log("Error reading 'todos.json':", error);
        return [];
    }
}

// Function to write todos to file
function writeTodosToFile(todos) {
    fs.writeFileSync('./todos.json', JSON.stringify(todos), 'utf-8');
}

// Function to add a todo
function addTodo(title) {
    const todos = readTodosFromFile();
    todos.push({ title });
    writeTodosToFile(todos);
    console.log(`Added '${title}' to 'todos.json'.`);
}

// Function to list todos
function listTodos() {
    const todos = readTodosFromFile();
    console.log("Contents of 'todos.json': \n", todos);
}

// Function to update a todo
function updateTodo(oldTitle, newTitle) {
    const todos = readTodosFromFile();
    const todoToUpdate = todos.find(todo => todo.title === oldTitle);
    if (todoToUpdate) {
        todoToUpdate.title = newTitle;
        writeTodosToFile(todos);
        console.log(`Updated '${oldTitle}' to '${newTitle}' in 'todos.json' successfully.`);
        console.log("Updated Todos: \n", todos);
    } else {
        console.log(`Todo item with title "${oldTitle}" not found.`);
    }
}

// Function to delete a todo
function deleteTodo(title) {
    const todos = readTodosFromFile();
    const indexToDelete = todos.findIndex(todo => todo.title === title);
    if (indexToDelete !== -1) {
        const deletedTodo = todos.splice(indexToDelete, 1);
        writeTodosToFile(todos);
        console.log(`Deleted todo item "${title}" successfully.`);
        console.log("Deleted Todo:", ...deletedTodo);
    } else {
        console.log(`Todo item with title "${title}" not found.`);
    }
}

// Main function
function main() {
    const [, , command, title1, title2] = process.argv; // Destructuring process.argv

    switch (command) {
        case 'create':
            if (!title1) {
                console.log("Please provide a title for the todo item.");
                break;
            }
            addTodo(title1);
            if (title2) {
                addTodo(title2);
            }
            break;

        case 'list':
            listTodos();
            break;

        case 'update':
            if (title1 && title2) {
                updateTodo(title1, title2);
            } else {
                console.log('Please provide both old and new titles for updating.');
            }
            break;

        case 'delete':
            if (title1) {
                deleteTodo(title1);
            } else {
                console.log('Please provide the title of the todo item to delete.');
            }
            break;

        default:
            console.log("Invalid command. Please use 'create', 'list', 'update', or 'delete'.");
    }
}

// Call the main function
main();