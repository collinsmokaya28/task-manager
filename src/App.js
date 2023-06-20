import React from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

const App = () => {
  return (
    <div>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default App;

