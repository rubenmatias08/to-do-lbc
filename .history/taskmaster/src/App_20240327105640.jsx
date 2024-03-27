import { useState } from "react";
import { SiTask } from "react-icons/si";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md"
import { HiCheck } from "react-icons/hi";
import { FaUndo } from "react-icons/fa";

export default function App() {
  const [tasks, setTasks] = useState([]); 
  const [newTask, setNewTask] = useState('');

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleToggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };



  return (
    <>
    <div className="flex justify-center mx-auto mt-10 items-center text-white">
      <SiTask size={60}/>
      <h3 className="text-white text-xl mb-7 font-titleFont">Taskmaster</h3>
    </div>

    <div className="flex flex-col max-w-lg mx-auto mt-10 justify-center items-center border rounded-xl shadow px-5 py-4">
        <div className="flex flex-row space-x-2">
            <input
            className="border rounded p-2 h-6 text-md placeholder:font-extralight font-mono bg-white/90 focus:outline-none focus:bg-white" type="text"
            placeholder="add a new task"
            value={newTask}
            onChange={handleChange} />
            <button onClick={handleAddTask} className="text-white"><IoIosAddCircle size={20} className="text-white"/></button>
        </div>

        <div>
          <ul className="px-4 py-3 text-white">
            {tasks.map(task => (
            <li className="px-3 py-2 font-mono" key={task.id}>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text}
            </span>
            <button className="m-2 font-sans"onClick={() => handleToggleTask(task.id)}>
              {task.completed ? <FaUndo size={20} />: <HiCheck size={20} />}
            </button>
            <button onClick={() => handleDeleteTask(task.id)}><MdDelete size={20}/></button>
            </li>
        ))}
          </ul>
      </div>
    </div>
    </>
  );
}

//METER ICON DE TEREFA CONCLUIDA E DE UNDO