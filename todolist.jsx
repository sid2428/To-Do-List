import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./ToDoList.css";

function ToDoList() {
    const [todos, setTodos] = useState([{ task: "Sample", id: uuidv4() }]);
    const [newTodo, setNewTodo] = useState("");

    const addNewTask = () => {
        if (newTodo.trim() === "") return;
        setTodos(prev => [...prev, { task: newTodo, id: uuidv4() }]);
        setNewTodo("");
    };

    const updateTodo = (e) => {
        setNewTodo(e.target.value);
    };

    const deleteToDo = (id) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    const upperCaseAll = () => {
        setTodos(prev => prev.map(todo => ({
            ...todo,
            task: todo.task.toUpperCase()
        })));
    };

    const upperCaseOne = (id) => {
        setTodos(prev => prev.map(todo =>
            todo.id === id
                ? { ...todo, task: todo.task.toUpperCase() }
                : todo
        ));
    };

    const markDone = (id) => {
        setTodos(prev => prev.map(todo =>
            todo.id === id
                ? { ...todo, task: "✅ " + todo.task }
                : todo
        ));
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
                {todos.map(todo => (
                    <li key={todo.id} className="task-item">
                        <span className="task-text">{todo.task}</span>
                        <div className="button-group">
                            <button onClick={() => deleteToDo(todo.id)}>Delete</button>
                            <button onClick={() => upperCaseOne(todo.id)}>UpperCase</button>
                            <button onClick={() => markDone(todo.id)}>Mark Done</button>
                        </div>
                    </li>
                ))}
            </ul>

            <button className="uppercase-all" onClick={upperCaseAll}>UpperCase All</button>
        </div>
    );
}

export default ToDoList;
