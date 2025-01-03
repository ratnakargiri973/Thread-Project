import express from 'express';
import { protectRoute } from '../middlewares/auth.js';
import { allPosts, commentOnPost, createPost, deleteComment, deletePost, editComment, likePost, updatePost } from '../controller/postController.js';
import upload from '../middlewares/multer.js';

const postRouter = express.Router();

postRouter.post("/add", protectRoute, upload.single("image"), createPost);
postRouter.post('/like/:postId', protectRoute, likePost);
postRouter.post('/comment/:postId', protectRoute, commentOnPost);
postRouter.get('/', allPosts);
postRouter.put("/edit/:postId", protectRoute, updatePost);
postRouter.delete('/delete/:postId', protectRoute, deletePost);
postRouter.delete("/:postId/comment/delete/:commentId", protectRoute, deleteComment);
postRouter.put("/:postId/comment/edit/:commentId", protectRoute, editComment);

export default postRouter;