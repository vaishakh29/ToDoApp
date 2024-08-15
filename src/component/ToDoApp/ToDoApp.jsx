import React, { useState } from 'react'
import "./todo.css";
const ToDoApp = () => {

    const [todos, setTodos] = useState(() => {
        const savedLists = localStorage.getItem('todos');
        return savedLists ? JSON.parse(savedLists) : [];
    });


    const [task, setTask] = useState('');
    const [editTask, setEditTask] = useState('');
    const [editId, setEditId] = useState(null);


    const handleAddTask = () => {
        const newId = todos.length + 1;
        const newItem = { task, id: newId };
        const updatedLists = [...todos, newItem];

        setTodos(updatedLists);
        localStorage.setItem('todos', JSON.stringify(updatedLists));

        setTask('');
    };

    const handleEdit = (id) => {
        const itemToEdit = todos.find((item, index) => index === id);
        setEditId(id);
        setEditTask(itemToEdit.task);
    };

    const handleDelete = (idToDelete) => {
        const updatedLists = todos.filter((item, index) => index !== idToDelete);
        setTodos(updatedLists);
        localStorage.setItem('todos', JSON.stringify(updatedLists));
    };

    const handleSaveEdit = () => {

        const updatedLists = todos.map((item, index) => index === editId ? { ...item, task: editTask } : item);

        setTodos(updatedLists);
        localStorage.setItem('todos', JSON.stringify(updatedLists));

        setEditId(null);
        setEditTask('');
    };


    return (
        <div className='todo-container'>

            <div className='contents'>
                <form onSubmit={handleAddTask} className='input-section'>
                    <h1>ToDo App</h1>
                    <input type="text" placeholder="Enter your Todo here.." value={task} onChange={(e) => setTask(e.target.value)} />
                </form>


                <ul>
                    {todos.map((item, index) => (
                        <li key={index}>
                            {editId === index ? (
                                <>
                                    <form className='edit-form' onSubmit={handleSaveEdit} >
                                        <input
                                            type="text" className='edit-input'
                                            value={editTask} maxlength="90"
                                            onChange={(e) => setEditTask(e.target.value)}
                                        />
                                        <button className='btns' onClick={handleSaveEdit}><i className="fa-solid fa-plus"></i></button>
                                    </form>
                                </>
                            ) : (
                                <div className='list-box'>
                                    <span className='content-box' onClick={() => handleEdit(index)}>
                                        {item.task}
                                    </span>

                                    <div className='btn-shadow' >
                                        <button className='btns' onClick={() => handleEdit(index)}><i className="fa-solid fa-pencil"></i></button>
                                        <button className='btns' onClick={() => handleDelete(index)}><i className="fa-regular fa-trash-can"></i></button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>


            </div>




        </div>
    )
}

export default ToDoApp
