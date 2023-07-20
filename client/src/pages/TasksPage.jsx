import { useEffect } from "react";
import TaskCard from "../components/TaskCard";
import { useTasks } from "../Context/TaskProvider";

function TasksPage() {
  const { tasks, loadTasks } = useTasks();
  useEffect(() => {
    loadTasks();
  }, [tasks]);

  function renderMain() {
    if(!tasks.length) return <h2>No tasks yet</h2>
    return tasks.map((task) => (
      <TaskCard task={task} key={task.id} />
    ))
  }

  return (
    <div>
      <h1 className="text-5xl text-white font-bold text-center">Tasks</h1>
      <div className="grid grid-cols-3 gap-2">
        {renderMain()}
      </div>
    </div>
  );
}

export default TasksPage;
