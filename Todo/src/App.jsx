import React from "react";
import { useQuery } from "@tanstack/react-query";

const fetchTodo = async () => {
  try {
    const response = await fetch("https://dummyjson.com/todos");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.todos;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

const App = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["Todo"],
    queryFn: fetchTodo,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>React Query....</h1>
      <ul>
        {data.map((todo) => (
          <li key={todo.id}>{todo.todo}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
