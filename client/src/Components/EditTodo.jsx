import React, { useState } from "react";

const EditTodo = ({ todo }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [description, setDescription] = useState(todo.description);

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description }),
        },
      );

      window.location("/");
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      {/* Open Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700"
      >
        Edit
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center border-b px-4 py-3">
              <h4 className="text-lg font-semibold">Edit Todo</h4>
              <button
                onClick={() => setIsOpen(false)
                    }
                className="text-gray-500 hover:text-gray-700 text-xl"
              ></button>
            </div>

            {/* Body */}
            <div className="p-4 w-full">
              <input
                type="text"
                className="border border-neutral-400  rounded-md w-full px-3 py-1"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>

            {/* Footer */}
            <div className="flex justify-end border-t px-4 py-3 gap-3">
              <button
                type="button"
                className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-600"
                onClick={(e) => {
                  updateDescription(e);
                }}
              >
                Edit
              </button>

              <button
                onClick={() => {setIsOpen(false) 
                     setDescription(todo.description)}}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTodo;
