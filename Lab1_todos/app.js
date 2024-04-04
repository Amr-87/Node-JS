//Main
const [, , command, title1, title2] = process.argv; // Destructuring process.argv
const fs = require('fs');

switch (command) {
    case 'create':
        if (!title1) {
            console.log("Please provide a title for the todo item.");
            break;
        }
        try {
            let todos = [];
            try {
                todos = JSON.parse(fs.readFileSync('./todos.json', 'utf-8'));
            } catch (error) {
                console.log("File 'todos.json' is empty or doesn't exist. Creating a new file.");
            }
            todos.push({ title: title1 });
            fs.writeFileSync('./todos.json', JSON.stringify(todos), 'utf-8');
            console.log(`Added '${title1}' to 'todos.json'.`);
        } catch (error) {
            console.error("Error reading/writing 'todos.json':", error);
        }
        if (title2) {
            try {
                let todos = [];
                try {
                    todos = JSON.parse(fs.readFileSync('./todos.json', 'utf-8'));
                } catch (error) {
                    console.log("File 'todos.json' is empty or doesn't exist. Creating a new file.");
                }
                todos.push({ title: title2 });
                fs.writeFileSync('./todos.json', JSON.stringify(todos), 'utf-8');
                console.log(`Added '${title2}' to 'todos.json'.`);
            } catch (error) {
                console.log("Error 2 reading/writing 'todos.json':", error);
            }
        }
        break;

    case 'list':
        fs.readFile('./todos.json', 'utf-8', (err, data) => {
            if (err) {
                console.error("Error reading 'todos.json':", err);
            } else {
                console.log("Contents of 'todos.json': \n", JSON.parse(data));
            }
        });
        break;

    case 'update':
        if (title1 && title2) {
            try {
                let todos = JSON.parse(fs.readFileSync('./todos.json', 'utf-8'));
                const todoToUpdate = todos.find(todo => todo.title === title1);
                if (todoToUpdate) {
                    todoToUpdate.title = title2;
                    fs.writeFileSync('./todos.json', JSON.stringify(todos), 'utf-8');
                    console.log(`Updated '${title1}' to '${title2}' in 'todos.json' successfully.`);
                    console.log("Updated Todos: \n", todos); // Log the updated todos array
                } else {
                    console.log(`Todo item with title "${title1}" not found.`);
                }
            } catch (error) {
                console.log('Error while updating:', error);
            }
        } else {
            console.log('Please provide both old and new titles for updating.');
        }
        break;
    
    case 'delete':
        if (title1) {
            try {
                let todos = JSON.parse(fs.readFileSync('./todos.json', 'utf-8'));
                let indexToDelete = todos.findIndex(todo => todo.title === title1);
                if (indexToDelete !== -1) {
                    let deletedTodo = todos.splice(indexToDelete, 1);
                    fs.writeFileSync('./todos.json', JSON.stringify(todos), 'utf-8');
                    console.log(`Deleted todo item "${title1}" successfully.`);
                    console.log("Deleted Todo:", ...deletedTodo); // Log the deleted todo item
                } else {
                    console.log(`Todo item with title "${title1}" not found.`);
                }
            } catch (error) {
                console.log('Error while deleting:', error);
            }
        } else {
            console.log('Please provide the title of the todo item to delete.');
        }
        break;
    
    default:
        console.log("Invalid command. Please use 'create' or 'list'.");
}