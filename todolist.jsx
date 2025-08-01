import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./ToDoList.css"; // import CSS

function ToDoList() {
    let [todos, settodos] = useState([{ task: "Sample", id: uuidv4() }]);
    let [newTodo, setnewTodo] = useState("");

    let addNewTask = () => {
        settodos((prevTodos) => {
            return [...prevTodos, { task: newTodo, id: uuidv4() }];
        });
        setnewTodo("");
    };

    let updateTodo = (event) => {
        setnewTodo(event.target.value);
    };

    let deleteToDo = (id) => {
        let newcopy = todos.filter((todo) => todo.id !== id);
        settodos(newcopy);
    };

    let UpperCaseAll = () => {
        settodos((prevupdate) =>
            prevupdate.map((todo) => ({
                ...todo,
                task: todo.task.toUpperCase(),
            }))
        );
    };

    let UpperCaseOne = (id) => {
        settodos((prevupdate) =>
            prevupdate.map((todo) =>
                todo.id === id ? { ...todo, task: todo.task.toUpperCase() } : todo
            )
        );
    };

    let Done = (id) => {
        settodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, task: "✅ " + todo.task } : todo
            )
        );
    };

    return (
        <div className="todo-container">
            <h1 className="title">To Do List</h1>
            <div className="input-section">
                <input
                    className="task-input"
                    placeholder="Add a task"
                    value={newTodo}
                    onChange={updateTodo}
                />
                <button className="add-button" onClick={addNewTask}>Add</button>
            </div>

            <ul className="task-list">
                {todos.map((todo) => (
                    <li key={todo.id} className="task-item">
                        <span className="task-text">{todo.task}</span>
                        <div className="button-group">
                            <button onClick={() => deleteToDo(todo.id)}>Delete</button>
                            <button onClick={() => UpperCaseOne(todo.id)}>UpperCase</button>
                            <button onClick={() => Done(todo.id)}>Mark as Done</button>
                        </div>
                    </li>
                ))}
            </ul>

            <button className="uppercase-all" onClick={UpperCaseAll}>UpperCase All</button>
        </div>
    );
}

export default ToDoList;
