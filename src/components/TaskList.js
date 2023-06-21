import React, { useEffect, useState } from 'react';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log('Error fetching tasks', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
      });
      fetchTasks();
    } catch (error) {
      console.log('Error deleting task', error);
    }
  };

  const toggleCompleted = async (taskId, completed) => {
    try {
      await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
      });
      fetchTasks();
    } catch (error) {
      console.log('Error toggling completed status', error);
    }
  };

  return (
    <div className="TaskList">
      <h2>Task List</h2>
      {tasks.map((task) => (
        <div key={task.id} className="task">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
          <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
          <div className="toggle-buttons">
            <button onClick={() => toggleCompleted(task.id, true)}>Yes</button>
            <button onClick={() => toggleCompleted(task.id, false)}>No</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;

