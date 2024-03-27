//React Hooks:
import { useState } from "react";
//Icons:
import { SiTask } from "react-icons/si";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md"
import { HiCheck } from "react-icons/hi";
import { FaUndo } from "react-icons/fa";
import { BsCodeSlash } from "react-icons/bs";
import { BiSolidBusiness } from "react-icons/bi";

function App() {
  const [tasks, setTasks] = useState([]); //Array com as tarefas adicionadas
  const [newTask, setNewTask] = useState(''); //Valor do input

//Pegar valor do input
  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

//Para adicionar uma tarefa , verifica se o valor de "newTask" não está vazio, se não estiver...adiciona esse valor a "tasks".
//Inicia como "completed: false", para que se assinale que a tarefa ainda não foi cumprida.
//Colocamos "setNewTask" como uma string vazia para que o campo do input fique vazio após o clique. 
  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

//Para apagar uma tarefa inserida, criamos um novo array através de filter(), onde é excluido o valor que é correspondente ao id dessa mesma tarefa. Ou seja, cria um array com todos os valores diferentes desse id especifico.
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

//Através do método map() é criado uma nova lista de tarefas onde o estado de conclusão da tarefa com o ID correspondente ao taskId altera consoante o seu estado actual.
//Ou seja, se o id da tarefa for correspondente muda o seu estado actual através desta condição.
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
            placeholder="Add a new task"
            value={newTask}
            onChange={handleChange} />
            <button onClick={addTask} className="text-white"><IoIosAddCircle size={20} className="text-white"/></button>
        </div>

        <div>
          <ul className="px-4 py-3 text-white">
            {tasks.map(task => (
            <li className="px-3 py-2 font-mono" key={task.id}>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none'}}>
              {task.text}
            </span>
            <button className="ml-6 font-sans"onClick={() => handleToggleTask(task.id)}>
              {task.completed ? <FaUndo size={15} />: <HiCheck size={25} />}
            </button>
            <button onClick={() => deleteTask(task.id)}><MdDelete size={20} color="orange"/></button>
            </li>
        ))}
          </ul>
      </div>
    </div>
    <div>
      <p className="flex justify-center mx-auto mt-5 text-white/80 font-mono">
        <BsCodeSlash size={20} className="mx-2"/>
        Developed by: Ruben Matias
      </p>
      <p className="flex justify-center mx-auto mt-5 text-white/80 font-mono">
        <BiSolidBusiness size={20} className="mx-2"/>
        LBC Global
      </p>
    </div>
    </>
  );
}

export default App;