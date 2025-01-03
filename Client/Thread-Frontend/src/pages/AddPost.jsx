import React, { useState } from 'react'
import instance from '../axiosConfig';
import { ToastContainer, toast } from 'react-toastify';

function AddPost() {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        image: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const notify = () => toast("Your Post uploaded successfully !!!");

    async function handleChange(e){
        if (e.target.name === "image") {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
          } else {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
          }
    }

    async function handleSubmit(e){
       e.preventDefault();
       e.preventDefault();
       const formdata = new FormData();
   
       formdata.append("title", formData.title);
       formdata.append("content", formData.content);
       formdata.append("image", formData.image);
       try {
        await instance.post("/post/add", formdata);
        setSuccess("Post added successfully");
        notify();
        setFormData({
           title:"",
           content: "",
           image: "",
           likes:"",
           comments:""
        });
        setError("");
       } catch (error) {
        setError(error.response?.data?.message || "Error adding post");
       }
    }
  return (
    <>
    <form
    onSubmit={handleSubmit}
    encType='multipart/form-data'
    className="space-y-4 max-w-md mx-auto p-4 mt-12 bg-green-200 rounded"
  >
    <h2 className="text-2xl font-bold">Add Post</h2>

    {error && <div className="text-red-500">{error}</div>}
    {success && <div className="text-green-500">{success}</div>}

    <div>
      <label className="block mb-1">Post Title</label>
      <input
        type="text"
        name='title'
        value={formData.title}
        onChange={handleChange}
        className="w-full border-none outline-none p-2 rounded"
      />
    </div>

    <div>
      <label className="block mb-1">Post Content</label>
      <textarea
        type="text"
        name='content'
        value={formData.content}
        onChange={handleChange}
        className="w-full border-none outline-none p-2 rounded"
      ></textarea>
    </div>

    <div>
        <input type="file" 
               name="image"
               className="w-full border-none outline-none p-2 rounded"
               onChange={handleChange} />
    </div>

    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
    >
      Post
    </button>
  </form>
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
  )
}

export default AddPost