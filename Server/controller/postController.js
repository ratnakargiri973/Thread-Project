import mongoose from "mongoose";
import Post from "../models/postModel.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const createPost = async (req, res) => {
   try {
    const imageObj = await uploadToCloudinary(req.file.buffer);
    const {title, content} = req.body;
    const post = new Post({
        title,
        content,
        image: imageObj.secure_url,
        author: req.user.username,
        authorId: req.user._id,
        likes: [],
        comments: [],
    });

    await post.save();
    res.status(201).json({message: "Your post uploaded successfully", post});
   } catch (error) {
    res.status(500).json({message: "Error uploading post", error});
   }
}

export const likePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user._id;

        const post = await Post.findById(postId);

        if(!post) {
            return res.status(404).json({message: "Post not found"});
        }

        if(post.likes.includes(userId)){
            post.likes = post.likes.filter((id) => id.toString() !== userId.toString())
        }
        else{
            post.likes.push(userId);
        }

        await post.save();
        await post.populate("likes");

        res.status(200).json({message: "Post liked successfully", post});
    } catch (error) {
        res.status(500).json({ message: "Error liking/unliking post", error });
    }
}

export const commentOnPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { comment } = req.body;
        
        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({message: "Post not found"});
        };

        post.comments.push({
            user:  req.user.username, 
            userId: req.user._id,
            comment
        });

        await post.save();
        await  post.populate("comments.comment");

        res.status(201).json({message: "Comment added successfully", post});
    } catch (error) {
        res.status(500).json({message: "Error adding comment", error })
    }
}

export const allPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({message: "Success", posts});
    } catch (error) {
        res.status(500).json({message: "Error fetching posts", error});
    }
}


export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "Given ID is not in proper format" });
        }

        const postToDelete = await Post.findById(postId);

        if (!postToDelete) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (postToDelete.authorId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this post" });
        }

       
        await Post.findByIdAndDelete(postId);

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ message: "Error deleting blog", error: error.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user._id;
        const {title, content} = req.body;

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "Given ID is not in proper format" });
        }

        const postToEdit = await Post.findById(postId);

        if (!postToEdit) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (postToEdit.authorId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You are not authorized to update this post" });
        }

        await Blog.findByIdAndUpdate(blogId, {title, content});

        res.status(200).json({message: "post updated successfuly"});
    } catch (error) {
        res.status(500).json({message: "Error updating post"});
    }  
}


export const deleteComment = async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        const userID = req.user._id;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const comment = post.comments.id(commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.userId.toString() !== userID.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this comment" });
        }

        post.comments = post.comments.filter((c) => c._id.toString() !== commentId);

        await post.save();

        res.status(200).json({ message: "Comment deleted successfully", comments: post.comments });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ message: "Error deleting comment", error });
    }
};

export const editComment = async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        const userID = req.user._id;

        const { comment: updatedComment } = req.body;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const comment = post.comments.id(commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.userId.toString() !== userID.toString()) {
            return res.status(403).json({ message: "You are not authorized to edit this comment" });
        }

        comment.comment = updatedComment;

        await post.save();

        res.status(200).json({ message: "Comment edited successfully", comments: post.comments });
    } catch (error) {
        console.error("Error editing comment:", error);
        res.status(500).json({ message: "Error editing comment", error });
    }
};