import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

const App = () => {
  const getTodos = async () => {
    const response = await axios.get("http://localhost:3000/todos"); // Corrected endpoint URL for todos
    return response.data.posts;
  };

  const {
    isLoading,
    isError,
    error,
    data: todos,
  } = useQuery({
    queryKey: ["todos"], // Ensured lowercase for consistency
    queryFn: getTodos,
    staleTime: 10000, // 10 seconds of stale data tolerance
  });

  return (
    <div>
      <h2>
        {isLoading
          ? "Loading todos..."
          : isError
          ? "Error loading todos"
          : `Received ${todos.length} todos`}
      </h2>
      {/* Conditionally render todos list only if data is available and not loading or errored */}
      {todos && !isLoading && !isError && (
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
