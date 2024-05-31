import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const App = () => {
  const [text, setText] = useState("");
  console.log(text);

  const getTodos = async () => {
    const response = await axios.get("https://dummyjson.com/todos");
    return response.data.todos;
  };

  const {
    isLoading,
    isError,
    data: Todo,
  } = useQuery({
    queryKey: ["Todo"],
    queryFn: getTodos,
    staleTime: 10000,
  });
  console.log(Todo);

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  if (isError) {
    return <div>{isError.message}</div>;
  }

  return (
    <div>
      <h2>Reaciving {Todo.length} todos</h2>
      <input
        onChange={(e) => setText(e.target.value)}
        value={text}
        type="text"
        placeholder="Enter Todo..."
      />
    </div>
  );
};

export default App;
