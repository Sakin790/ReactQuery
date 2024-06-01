import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const App = () => {
  const [text, setText] = useState(""); // Initialize text to an empty string

  const getTodos = async () => {
    try {
      const response = await fetch(
        "https://api.freeapi.app/api/v1/todos?query=reactjs&complete=false"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.todos || []; // Return an empty array if todos is missing
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error; // Re-throw for handling in useQuery
    }
  };

  const { isLoading, isError, error, data: todos } = useQuery({
    queryKey: ["Todo"],
    queryFn: getTodos,
    staleTime: 10000,
  });

  // Create a separate async function for createTodo
  const createTodo = async (newTodo) => {
    try {
      const response = await fetch("https://api.freeapi.app/api/v1/todos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTodo, description: "new title" }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const createdTodo = await response.json();
      // Assuming the API response includes the created todo data
      return createdTodo;
    } catch (error) {
      console.error("Error creating todo:", error);
      throw error; // Re-throw for handling in useMutation
    }
  };

  const todoMutation = useMutation(createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Todo"]);
      setText("");
    },
    onError: (error) => {
      console.error("Error creating todo:", error);
      // You can display an error message to the user here
    },
  });

  return (
    <div>
      <h2>Receiving todos...</h2>
      <br />
      <input
        onChange={(e) => setText(e.target.value)}
        value={text}
        type="text"
        placeholder="Create Todo"
      />
      <button onClick={() => todoMutation.mutate(text)}>Create</button>
      {isLoading && <p>Loading todos...</p>}
      {isError && <p>Error: {error.message}</p>}
      {todos && (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
