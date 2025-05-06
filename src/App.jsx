import { getDatabase, onValue, push, ref, remove, set, update } from "firebase/database";
import React, { useEffect, useState } from "react";

const App = () => {
  const db = getDatabase();

  let [task, setTask] = useState("");
  let [description, setDescription] = useState("");
  let [status, setStatus] = useState("pending");

  let [allTodos, setAllTodos] = useState([]);

  // Edit modal states
  let [editModal, setEditModal] = useState(false);
  let [editId, setEditId] = useState("");
  let [updatedTask, setUpdatedTask] = useState("");
  let [updatedDescription, setUpdatedDescription] = useState("");
  let [updatedStatus, setUpdatedStatus] = useState("pending");

  const handleSubmit = () => {
    if (!task.trim()) return alert("Task name is required");

    set(push(ref(db, "todos/")), {
      name: task,
      description,
      status,
    }).then(() => {
      setTask("");
      setDescription("");
      setStatus("pending");
      alert("Task added");
    });
  };

  const handleUpdate = () => {
    update(ref(db, "todos/" + editId), {
      name: updatedTask,
      description: updatedDescription,
      status: updatedStatus,
    }).then(() => {
      setEditModal(false);
    });
  };

  const handleDelete = (id) => {
    remove(ref(db, "todos/" + id));
  };

  console.log(allTodos);

  const openEditModal = (id) => {
    const todo = allTodos.find((t) => t.key === id);
    setEditId(id);
    setUpdatedTask(todo.name);
    setUpdatedDescription(todo.description);
    setUpdatedStatus(todo.status);
    setEditModal(true);
  };

  useEffect(() => {
    const todosRef = ref(db, "todos/");
    onValue(todosRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push({ ...item.val(), key: item.key });
      });
      setAllTodos(array);
    });
  }, []);

  return (
    <div className="mx-auto w-[400px] text-center py-10">
      <h1 className="text-xl font-bold mb-4">Add Todo</h1>

      <input
        onChange={(e) => setTask(e.target.value)}
        value={task}
        placeholder="Task Name"
        className="border px-3 py-1 my-1 w-full"
      />
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        placeholder="Description"
        className="border px-3 py-1 my-1 w-full"
      />
      <select
        onChange={(e) => setStatus(e.target.value)}
        value={status}
        className="border px-3 py-1 my-1 w-full"
      >
        <option value="pending">Pending</option>
        <option value="done">Done</option>
      </select>

      <button
        onClick={handleSubmit}
        className="bg-teal-500 text-white py-2 px-4 rounded mt-2"
      >
        Submit
      </button>

      <ul className="mt-6 text-left">
        {allTodos.map((item) => (
          <li key={item.key} className="my-3 p-2 border rounded">
            <div><strong>{item.name}</strong> - <em>{item.status}</em></div>
            <div>{item.description}</div>
            <div className="mt-2">
              <button onClick={() => handleDelete(item.key)} className="bg-red-500 text-white px-3 py-1 rounded mr-2">Delete</button>
              <button onClick={() => openEditModal(item.key)} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
            </div>
          </li>
        ))}
      </ul>

      {editModal && (
        <div className="w-[400px] py-10 px-5 absolute top-10 left-[50%] translate-x-[-50%] bg-gray-100 border shadow rounded-md z-50">
          <h2 className="text-lg font-semibold mb-3">Edit Task</h2>
          <input
            onChange={(e) => setUpdatedTask(e.target.value)}
            value={updatedTask}
            placeholder="Task Name"
            className="border px-3 py-1 my-1 w-full"
          />
          <input
            onChange={(e) => setUpdatedDescription(e.target.value)}
            value={updatedDescription}
            placeholder="Description"
            className="border px-3 py-1 my-1 w-full"
          />
          <select
            onChange={(e) => setUpdatedStatus(e.target.value)}
            value={updatedStatus}
            className="border px-3 py-1 my-1 w-full"
          >
            <option value="pending">Pending</option>
            <option value="done">Done</option>
          </select>
          <div className="mt-4 flex justify-between">
            <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded">Update</button>
            <button onClick={() => setEditModal(false)} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
