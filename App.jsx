import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  
  const handleAddOrUpdateTask = () => {
    if (newTask.trim() === "") return;

    if (editIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === editIndex ? { ...task, text: newTask } : task
      );
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: newTask, completed: false }]);
    }
    setNewTask("");
  };
  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };
  const handleToggleCompleted = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };
  const handleEditTask = (index) => {
    setNewTask(tasks[index].text);
    setEditIndex(index);
  };
  return (
    <div className="App">
      <h1>React To-Do List</h1>
      {}
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a task..."
      />
      <button onClick={handleAddOrUpdateTask}>
        {editIndex !== null ? "Update Task" : "Add Task"}
      </button>

      {}
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            <span>{task.text}</span> -{" "}
            <span>{task.completed ? "Completed" : "Pending"}</span>
            <div>
              <button onClick={() => handleToggleCompleted(index)}>
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button onClick={() => handleEditTask(index)}>Edit</button>
              <button onClick={() => handleDeleteTask(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
