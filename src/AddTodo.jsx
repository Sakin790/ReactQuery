import React from "react";
import { useMutation } from "@tanstack/react-query";

const AddTodo = () => {
  const addTodo = async (newTodo) => {
    const response = await axios.post(
      "https://dummyjson.com/todos/add",
      newTodo
    );
    return response.data;
  };
  const mutation = useMutation({
    mutationFn: addTodo,
  });

  console.log(mutation);

  return (
    <div>
      {mutation.isPending ? (
        "Adding todo..."
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>Todo added!</div> : null}

          <button
            onClick={() => {
              mutation.mutate({ id: new Date(), title: "Do Laundry" });
            }}
          >
            Create Todo
          </button>
        </>
      )}
    </div>
  );
};

export default AddTodo;
