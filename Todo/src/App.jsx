import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

const App = () => {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();

  const handleInput = (e) => {
    setText(e.target.value);
  };

  const createTodo = async (newTodo) => {
    const response = await fetch("https://dummyjson.com/todos/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: newTodo }),
    });
    return response.json();
  };

  const todoMutation = useMutation(createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      setText(""); // Clear the input field after a successful addition
    },
    onError: () => {
      console.log("Error");
    },
  });

  const getTodos = async () => {
    const response = await axios.get("https://dummyjson.com/todos");
    return response.data.todos;
  };

  const {
    isLoading,
    error,
    data: todos,
    isSuccess,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
    staleTime: 10000,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest">Todo List</h1>
          <div className="flex mt-4">
            <input
              onChange={handleInput}
              value={text}
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              placeholder="Add Todo"
            />
            <button
              onClick={() => todoMutation.mutate(text)}
              className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
            >
              Add
            </button>
          </div>
        </div>
        <div>
          {isSuccess &&
            todos.map((todo) => (
              <div key={todo.id} className="flex mb-4 items-center">
                <p
                  className={`w-full text-grey-darkest ${
                    todo.completed ? "line-through text-green" : ""
                  }`}
                >
                  {todo.todo}
                </p>
                <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green">
                  Done
                </button>
                <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">
                  Remove
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
