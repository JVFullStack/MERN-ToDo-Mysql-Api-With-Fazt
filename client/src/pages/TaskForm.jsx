import { Form, Formik } from "formik";
import { useTasks } from "../Context/TaskProvider";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function TaskForm() {
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const response = await getTask(params.id);
        setTask({ title: response.title, description: response.description });
      }
    };
    loadTask();
  }, []);
  return (
    <div className="">
      <Formik
        initialValues={task}
        enableReinitialize={true} // Permite actualizar lo valores si usamos useState
        onSubmit={async (values) => {
          if (params.id) await updateTask(params.id, values);
          else await createTask(values);
          // setRefreshPage(!refreshPage);
          navigate("/");
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10"
          >
            <h1 className="text-xl font-bold uppercase text-center">
              {params.id ? "Edit Task" : "Create Task"}
            </h1>
            <label className="block">Title</label>
            <input
              type="text"
              name="title"
              value={values.title || ""}
              placeholder="Write a title..."
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleChange}
            />
            <label className="block">Description</label>
            <textarea
              name="description"
              value={values.description || ""}
              placeholder="Write a description..."
              className="px-2 py-1 rounded-sm w-full"
              onChange={handleChange}
            ></textarea>

            <button type="submit" disabled={isSubmitting} className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md">
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TaskForm;
