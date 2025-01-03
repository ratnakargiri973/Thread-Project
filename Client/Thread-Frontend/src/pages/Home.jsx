
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { AiFillLike } from "react-icons/ai";
import instance from "../axiosConfig";
import { ToastContainer, toast } from 'react-toastify';
import { FaPlusSquare } from "react-icons/fa";

function Home() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [comment, setComment] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [updatedComment, setUpdatedComment] = useState("");
    const notify = () => toast("Your post deleted successfully!!!");

    useEffect(() => {
        fetchPosts();
    }, []);

    async function fetchPosts() {
        try {
            const response = await instance.get("/post");
            setPosts(response.data.posts);
            setError(null);
        } catch (error) {
            setError(error.response?.data?.message || "Failed to fetch posts.");
        }
    }

    async function handleLike(postId) {
        try {
            const response = await instance.post(`/post/like/${postId}`);
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId
                        ? { ...post, likes: response.data.post.likes || [] }
                        : post
                )
            );
        } catch (error) {
            console.error("Failed to like the post:", error.response?.data?.message || error.message);
        }
    }

    async function handleComment(postId, e) {
        e.preventDefault();
        try {
            const response = await instance.post(`/post/comment/${postId}`, { comment });
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId
                        ? { ...post, comments: response.data.post.comments || [] }
                        : post
                )
            );
            setComment("");
        } catch (error) {
            console.error("Failed to add comment:", error.response?.data?.message || error.message);
        }
    }

    async function handleDeleteComment(postId, commentId) {
        try {
            const response = await instance.delete(`/post/${postId}/comment/delete/${commentId}`);
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId
                        ? { ...post, comments: response.data.comments || [] }
                        : post
                )
            );
        } catch (error) {
            console.error("Failed to delete comment:", error.response?.data?.message || error.message);
        }
    }

    async function handleEditComment(postId, commentId) {
        try {
            const response = await instance.put(`/post/${postId}/comment/edit/${commentId}`, {
                comment: updatedComment,
            });
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId
                        ? { ...post, comments: response.data.comments || [] }
                        : post
                )
            );
            setEditingCommentId(null);
            setUpdatedComment(""); 
        } catch (error) {
            console.error("Failed to edit comment:", error.response?.data?.message || error.message);
        }
    }

    async function handleDeletePost(postId){
       try {
          const response = await instance.delete('/post/delete/' + postId);
          console.log(response.data);
          notify()
       } catch (error) {
        console.log(error);
       }
    }

    return (
      <>
        <div className="min-h-screen w-full p-6 flex justify-center gap-12">
           
            <div className="w-1/2 py-4 px-2 flex flex-col items-center gap-4 bg-pink-200 rounded">
                <h3 className="font-bold text-2xl">Posts</h3>
                {error && <p className="text-red-500">{error}</p>}
                {posts.length === 0 && !error && <p>No posts available.</p>}
                {posts.length > 0 &&
                    posts.map((post) => (
                      
                      
                        <div
                            key={post._id}
                            className="p-4 w-full max-w-3xl flex flex-col gap-4 shadow-lg bg-white rounded w-3/4 items-center"
                        >
                         <Link className=" w-full flex justify-end text-red-300 hover:text-red-500" onClick={() => handleDeletePost(post._id)}> <MdDelete /></Link>
                            <>
                            <h3 className="text-lg font-semibold">{post.title}</h3>
                            <img src={post.image} alt=""  className="w-96 h-96"/>
                            <p className="text-gray-600">{post.content}</p>
                            <div className="text-sm text-gray-500">
                                By {post.author || "Unknown"} on{" "}
                                {new Date(post.createdAt).toLocaleDateString()}
                            </div>
                            <div className="flex flex-col">
                                    <AiFillLike onClick={() => handleLike(post._id)}/> <p>{(post.likes || []).length || 0}</p>
                            </div>
                            <div className="mt-2">
                                <h4 className="font-semibold">Comments</h4>
                                <ul className="mt-2">
                                    {(post.comments || []).length > 0 ? (
                                        post.comments.map((comment) => (
                                            <div key={comment._id} className="flex flex-col gap-2">
                                                {editingCommentId === comment._id ? (
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            value={updatedComment}
                                                            onChange={(e) =>
                                                                setUpdatedComment(e.target.value)
                                                            }
                                                            className="border p-2 flex-1 rounded"
                                                            placeholder="Edit your comment..."
                                                        />
                                                        <button
                                                            onClick={() =>
                                                                handleEditComment(post._id, comment._id)
                                                            }
                                                            className="bg-green-500 text-white px-4 py-2 rounded"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setEditingCommentId(null);
                                                                setUpdatedComment("");
                                                            }}
                                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex gap-3">
                                                        <li className="text-gray-700">{comment.comment}</li>
                                                        <p className="text-gray-500">By {comment.user}</p>
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => {
                                                                    setEditingCommentId(comment._id);
                                                                    setUpdatedComment(comment.comment);
                                                                }}
                                                            >
                                                                <CiEdit />
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handleDeleteComment(post._id, comment._id)
                                                                }
                                                            >
                                                                <MdDelete />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p>No comments yet</p>
                                    )}
                                </ul>
                                <form
                                    onSubmit={(e) => handleComment(post._id, e)}
                                    className="mt-2 flex gap-2"
                                >
                                    <input
                                        type="text"
                                        name="comment"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Add a comment..."
                                        className="border p-2 flex-1 rounded"
                                    />
                                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                                        Submit
                                    </button>
                                </form>
                            </div>
                            </>
                        </div>
                    ))}  
            </div>
            <div className=" h-12">
                <Link to="/posts/add" className="bg-blue-500 text-white font-bold px-8 py-2 rounded text-center">
                 Click to Post
                </Link>
            </div>
            </div>
             <ToastContainer
                 position="top-center"
                 autoClose={5000}
                 hideProgressBar={false}
                 newestOnTop={false}
                 closeOnClick={false}
                 rtl={false}
                 pauseOnFocusLoss
                 draggable
                 pauseOnHover
                 theme="dark"
                 // transition={Bounce}
                 />
                 </>
        // </div>
    );
}

export default Home;
