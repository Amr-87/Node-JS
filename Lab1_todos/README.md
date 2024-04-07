# Node-JS

Node js Tutorial

Todo List CLI Application

This is a Command-Line Interface (CLI) application for managing a todo list stored in a JSON file. It allows users to create, list, update, and delete todo items from the list using simple commands.

Features
Add new todo items to the list
List all existing todo items
Update the title of an existing todo item
Delete a todo item from the list

Installation
Clone the repository to your local machine:

bash >
git clone https://github.com/Amr-87/Node-JS.git

Navigate to the project directory:

bash >
cd Lab1_todos

Create: Add a new todo item to the list. // you can use app.js or main.js same.
bash >
node app.js create "Todo item title"

List: List all existing todo items.
bash >
node app.js list

Update: Update the title of an existing todo item.
bash >
node app.js update "Old title" "New title"

Delete: Delete a todo item from the list.
bash >
node app.js delete "Todo item title"
Examples

Add a new todo item:
bash >
node app.js create "Finish project proposal"

List all todo items:
bash >
node app.js list

Update the title of an existing todo item:
bash >
node app.js update "Finish project proposal" "Submit project proposal"

Delete a todo item:
bash >
node app.js delete "Submit project proposal"

Contributing
Contributions are welcome! Please feel free to submit pull requests or open issues for bug fixes, new features, or improvements.

License
None.
