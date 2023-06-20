import React, { useEffect, useState } from 'react';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:3000/tasks');
    const data = await response.json();
    setTasks(data);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE',
    });
    fetchTasks();
  };

  return (
    <div>
      <h2>Task List</h2>
      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => handleDelete(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
