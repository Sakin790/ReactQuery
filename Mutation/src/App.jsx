import { useState } from "react";
import { fetchPosts, updatePost, createPost, deletePost } from "./api/api";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const queryClient = useQueryClient();
  const [post, setPost] = useState("");
  const [editingPost, setEditingPost] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      console.log("Post created successfully!");
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      console.log("Post updated successfully!");
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      console.log("Post deleted successfully!");
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

  const handleUpdate = (post) => {
    setEditingPost(post);
    setEditingTitle(post.title);
  };

  const handleSaveUpdate = () => {
    updatePostMutation.mutate({
      ...editingPost,
      title: editingTitle,
    });
    setEditingPost(null);
    setEditingTitle("");
  };

  const handleDelete = (id) => {
    deletePostMutation.mutate(id);
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
          {editingPost && editingPost.id === post.id ? (
            <div>
              <input
                type="text"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
              />
              <button onClick={handleSaveUpdate}>Save</button>
              <button onClick={() => setEditingPost(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <h4 style={{ cursor: "pointer" }}>{post.title}</h4>
              <button onClick={() => handleDelete(post.id)}>Delete</button>
              <button onClick={() => handleUpdate(post)}>Edit</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default App;
