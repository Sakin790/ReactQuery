import { useState } from "react";
import { fetchPosts } from "./api/api";
import { createPost } from "./api/api";
import { deletePost } from "./api/api";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const queryClient = useQueryClient();
  const [post, setPost] = useState("");

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      console.log("success bro!");
    },
  });

  const handleAddPost = (post) => {
    createPostMutation.mutate({
      id: uuidv4(),
      title: post,
    });

    setPost("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (post.trim()) {
      handleAddPost(post);
    }
  };

  const {
    isLoading,
    isError,
    data: posts,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleDelete = (id) => {
    deletePostMutation.mutate(id);
    console.log("Object deleted!");
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder="Enter post title"
        />
        <button type="submit">Submit</button>
      </form>

      {posts.map((post) => (
        <div key={post.id}>
          <h4 style={{ cursor: "pointer" }}>{post.title}</h4>
          <button
            onClick={() => {
              handleDelete(post.id);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default App;
