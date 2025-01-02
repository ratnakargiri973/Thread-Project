import express from 'express'
import { protectRoute } from '../middlewares/auth.js';
import { followerAndFollowingsCountProfile, followersAndFollowingsCount, followUser, getFollowStatus, unfollowUser } from '../controller/folllowerController.js';

const followRouter = express.Router();

followRouter.post("/follow/:id", protectRoute, followUser);
followRouter.delete('/unfollow/:id', protectRoute, unfollowUser);
followRouter.get('/count', protectRoute, followerAndFollowingsCountProfile);
followRouter.get('/count/:id', protectRoute, followersAndFollowingsCount);
followRouter.get('/status/:id', protectRoute, getFollowStatus);

export default followRouter;