import { useState } from "react";
import { SiTask } from "react-icons/si";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md"

export default function App() {
  const [tasks, setTasks] = useState([]); //array com as tarefas adicionadas
  const [newTask, setNewTask] = useState(''); //string das tarefas no input

  //pegar o valor do evento, ou seja, newtask passa a ser o valor que metemos no input
  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  //Para adicionar tarefa... se o valor de newtask for diferente de uma string vazia(basicamente se estiver preenchida)...
  //Básicamente corta o que for diferente de vazio
  //definimos o valor de tasks como os antigo valores já lá colocados e o valor de newtask(o que metemos novo), não completo..
  //setnewtasks fica vazio apos submeter novo valor
  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  //Para apagar tarefa
  //TaskId representa o id do item que queremos excluir
  //Básicamente cria uma novo array excluindo o item correspondente ao taskId
  //verifica se o id (taskId) é diferente do id dessa tarefa.. e só exclui o que for diferente
  //Básicamente o filter cria
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  //para gerir tarefa
  //Ao clicar .. se a tarefa tiver concluida..ficará o oposto e vice-versa
  //o método map cria uma nova lista de tarefas,
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
              {task.completed ? 'Undo ' : 'Complete '}
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