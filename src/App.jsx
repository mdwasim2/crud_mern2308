import React, { useEffect, useState } from "react";
import { getDatabase, ref, set, push, onValue } from "firebase/database";

const App = () => {
  let [task, setTask] = useState("");
  let [alltodos, setAlltodos] = useState([]);
  let handleTask = (e) => {
    setTask(e.target.value);
  };

  let handleSubmit = () => {
    const db = getDatabase();
    set(push(ref(db, "todos/")), {
      name: task,
    }).then(() => {
      setTask("");
      alert("task added ");
    });
  };

  useEffect(() => {
    const db = getDatabase();
    const todosRef = ref(db, "todos/");
    onValue(todosRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push(item.val());
      });
      setAlltodos(array);
    });
  }, []);

  console.log(alltodos);
  return (
    <div className=" mx-auto w-[400px] text-center ">
      <h1>Add todo </h1>
      <input
        onChange={handleTask}
        placeholder="Enter Your Task"
        className=" border my-3 px-3 "
        type="text"
        value={task}
      />{" "}
      <br />
      <button
        onClick={handleSubmit}
        className=" bg-teal-500 py-2 px-4 rounded-md text-white uppercase "
      >
        submit
      </button>
      <ul>
        {alltodos.map((item) => {
          return <li>{item.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default App;
