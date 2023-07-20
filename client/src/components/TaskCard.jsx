import { useNavigate } from "react-router-dom";
import { useTasks } from "../Context/TaskProvider";

export default function TaskCard({ task }) {
  const { deleteTask, toggleTaskDone } = useTasks();
  const navigate = useNavigate();
  const handleDone = async () => {
    await toggleTaskDone(task.id);
  };
  return (
    <div className="bg-zinc-700 text-white rounded-md p-4">
      
      <div className="header flex justify-between">
        <h2 className="text-sm font-bold">{task.title}</h2>
        <span>{task.done ? "✔" : "❌"}</span>
      </div>

      <p className="text-xs">{task.description}</p>
      <span>{task.createdAt}</span>

      <div className="flex gap-x-1">
        <button
          className="bg-slate-300 px-2 py-1 text-black"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
        <button
          className="bg-slate-300 px-2 py-1 text-black"
          onClick={() => navigate(`/edit/${task.id}`)}
        >
          Editar
        </button>
        <button
          className="bg-slate-300 px-2 py-1 text-black"
          onClick={() => handleDone(task.done)}
        >
          Toggle Task
        </button>
      </div>
    </div>
  );
}
