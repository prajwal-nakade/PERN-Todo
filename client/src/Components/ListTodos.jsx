import React, { useEffect, useState } from "react";
import EditTodo from "./EditTodo.jsx";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);

  console.log(todos);
  return (
    <div className="w-full">
      <div className="max-w-4xl my-5 mx-auto">
        <h1 className="font-bold text-2xl text-center mb-4">List Todos</h1>

        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left border-b">Description</th>
              <th className="p-3 text-left border-b">Edit</th>
              <th className="p-3 text-left border-b">Delete</th>
            </tr>
          </thead>

          <tbody>
            {
              //   <tr className="hover:bg-gray-50">
              //   <td className="p-3 border-b">John</td>
              //   <td className="p-3 border-b">Edit</td>
              //   <td className="p-3 border-b">Delete</td>
              // </tr>
            }
            {todos.map((todo) => (
              <tr className="hover:bg-gray-50" key={todo.todo_id}>
                <td className="p-3 border-b">{todo.description}</td>
                <td className=" border-b">
                  
                    <EditTodo  todo={todo}/>
                  
                </td>
                <td className="p-3 border-b">
                  <button
                    className="bg-red-500 hover:bg-red-600 rounded-md px-2 py-1 text-white"
                    onClick={() => {deleteTodo(todo.todo_id)}}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListTodos;
