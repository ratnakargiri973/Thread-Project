
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: { type: String, ref: "user", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user"},
    comment: { type: String, required: true },
},
{timestamps: true});

const postSchema = new mongoose.Schema({
    title: { type: String},
    image:{
             type: String
    },
    content: { type: String },
    author: { type: String, ref: "user", required: true },
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    comments: [commentSchema],
}, 
{timestamps: true});

const Post = mongoose.model("post", postSchema);

export default Post;
