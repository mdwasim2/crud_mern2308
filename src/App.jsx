import React, { useEffect, useState } from "react";
import { getDatabase, ref, set, push, onValue , remove, update} from "firebase/database";

const App = () => {

  const db = getDatabase();
  
  let [editModal, setEditModal]=useState(false)
  let [task, setTask] = useState("");
  let [alltodos, setAlltodos] = useState([]);
  let [updatedTask ,setUpdatedTask]=useState('')
  let [id, setId]=useState('')
  let handleTask = (e) => {
    setTask(e.target.value);
  };




  let handleSubmit = () => {

    set(push(ref(db, "todos/")), {
      name: task,
    }).then(() => {
      setTask("");
      alert("task added ");
    });
  };


  useEffect(() => {

    const todosRef = ref(db, "todos/");
    onValue(todosRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push({...item.val(), key:item.key});
      });
      setAlltodos(array);
    });
  }, []);

function handleDelete(id){

  remove(ref(db, "todos/" + id))
}


let handleEditModal=(id)=>{
  setId(id)
  setEditModal(true)
}

let handleUpdateTask=(e)=>{
  setUpdatedTask(e.target.value)
}

let handleUpdate=()=>{

  update(ref(db, "todos/" + id),{
    name:updatedTask
  }).then(()=>{
    setEditModal(false)
  })
}
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
          return <li className="my-3">{item.name} <button onClick={()=>handleDelete(item.key)} className=" bg-red-500 text-white px-3 rounded-full ">X</button> <button onClick={()=>handleEditModal(item.key)} className=" bg-blue-500 text-white px-3 rounded-full ">Edit</button></li>;
        })}
  {editModal && 
        <div className=" w-[400px]  py-10 absolute top-0 left-[50%] translate-x-[-50%] bg-gray-500  rounded-md">

          <input onChange={handleUpdateTask} type="text"  placeholder="Update your task"/>

          <button onClick={handleUpdate}  className=" bg-green-500   text-white">Update</button>
          <button onClick={()=>setEditModal(false)} className=" absolute top-2 right-2 bg-red-500 p-2 rounded-full">X</button>
        </div>
  
  }
      </ul>
    </div>
  );
};

export default App;
