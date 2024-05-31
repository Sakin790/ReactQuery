import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

const App = () => {
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

  console.log(isSuccess);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <h2>{todo.todo}</h2>
          <p>Completed: {todo.completed ? "Yes" : "No"}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
