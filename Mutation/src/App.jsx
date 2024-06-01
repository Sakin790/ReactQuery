import { useMutation, useQuery } from "@tanstack/react-query";
const App = () => {
  const getTodos = async () => {
    try {
      const response = await fetch("https://dummyjson.com/todos");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.todos;
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error;
    }
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

  return (
    <div>
      <h2>Reciving {Todo.length} todos....</h2>
    </div>
  );
};

export default App;
