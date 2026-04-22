import React from "react";
import { useState } from "react";

const dashboard = () => {
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      //   const data = await response.json()
      //   console.log(data);

      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center mx-auto ">
        <div className="w-6xl flex flex-col items-center justify-center mx-4 my-10 gap-5">
          <h1 className="text-3xl font-bold">PERN TODO LIST</h1>

          <form
            action=""
            className="flex w-full  justify-center mx-auto"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Add Your Todos Here.."
              className="w-full border border-neutral-400 rounded-md  px-4 py-1  "
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <button
              className="border border-neutral-400 bg-green-400 rounded-md w-40"
              type="submit"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default dashboard;
