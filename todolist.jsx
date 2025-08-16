import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { FaTrash, FaPen, FaCheckCircle, FaSave, FaTimes } from 'react-icons/fa';
import "./ToDoList.css";
import "./App.css";

function ToDoList() {
    let [todos, setTodos] = useState([{ task: "Sample", id: uuidv4(), isDeleting: false, isDone: false, isEditing: false, isAnimating: false }]);
    let [newTodo, setNewTodo] = useState("");

    let addNewTask = () => {
        if (newTodo.trim() === "") {
            return;
        }
        setTodos((prevTodos) => {
            return [...prevTodos, { task: newTodo.trim(), id: uuidv4(), isDeleting: false, isDone: false, isEditing: false, isAnimating: false }];
        });
        setNewTodo("");
    };

    let updateTodo = (event) => {
        setNewTodo(event.target.value);
    };

    let deleteToDo = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, isDeleting: true } : todo
            )
        );

        setTimeout(() => {
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        }, 600);
    };

    let uppercaseAll = () => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => ({
                ...todo,
                task: todo.task.toUpperCase(),
            }))
        );
    };

    let toggleDone = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, isDone: !todo.isDone, isAnimating: true } : todo
            )
        );
        setTimeout(() => {
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === id ? { ...todo, isAnimating: false } : todo
                )
            );
        }, 500);
    };
    
    // NEW FUNCTIONALITY FOR EDITING
    let handleEdit = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, isEditing: true } : todo
            )
        );
    };

    let saveEdit = (id, newText) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, task: newText, isEditing: false, isAnimating: true } : todo
            )
        );
        setTimeout(() => {
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === id ? { ...todo, isAnimating: false } : todo
                )
            );
        }, 500);
    };
    
    let cancelEdit = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, isEditing: false } : todo
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
                    onKeyDown={(e) => e.key === 'Enter' && addNewTask()}
                />
                <button className="add-button" onClick={addNewTask}>Add</button>
            </div>

            <ul className="task-list">
                {todos.map((todo) => (
                    <li key={todo.id} className={`task-item ${todo.isDeleting ? 'deleting' : ''}`}>
                        {todo.isEditing ? (
                            <input
                                type="text"
                                className="edit-input"
                                defaultValue={todo.task}
                                autoFocus
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        saveEdit(todo.id, e.target.value);
                                    }
                                    if (e.key === 'Escape') {
                                        cancelEdit(todo.id);
                                    }
                                }}
                            />
                        ) : (
                            <span className={`task-text ${todo.isDone ? 'completed' : ''}`}>
                                {todo.task}
                            </span>
                        )}
                        <div className="button-group">
                            {todo.isEditing ? (
                                <>
                                    <button onClick={() => saveEdit(todo.id, document.querySelector('.edit-input').value)} title="Save"><FaSave /></button>
                                    <button onClick={() => cancelEdit(todo.id)} title="Cancel"><FaTimes /></button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => deleteToDo(todo.id)} title="Delete"><FaTrash /></button>
                                    <button onClick={() => handleEdit(todo.id)} title="Edit"><FaPen /></button>
                                    <button onClick={() => toggleDone(todo.id)} className={todo.isAnimating ? 'done-animating' : ''} title="Mark as Done"><FaCheckCircle /></button>
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

            <button className="uppercase-all-button" onClick={uppercaseAll}>Uppercase All</button>
        </div>
    );
}

export default ToDoList;