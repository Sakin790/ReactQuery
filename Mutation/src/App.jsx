import { useState } from "react";
import { fetchPosts } from "./api/api";
import { createPost } from "./api/api";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

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
      id: Date.now(),
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
        </div>
      ))}
    </div>
  );
};

export default App;
