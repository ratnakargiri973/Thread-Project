import mongoose from "mongoose";
import User from "../models/userModel.js";

export const followUser = async (req, res) => {
    const { id } = req.params;

    try {
        const userToFollow = await User.findById(id);
        const user = await User.findById(req.user._id);

        if(!user || !userToFollow){
            return res.status(404).send({message: "User not found"});
        }

        if(!userToFollow.followers.includes(user._id)){
            userToFollow.followers.push(user);
            user.followings.push(userToFollow);
            await userToFollow.save();
            await user.save();
        }

        res.status(200).send({message: `${user.name} started following you`});
    } catch (error) {
        res.status(500).send({message: "Error following user"});
    }
}

export const unfollowUser = async (req, res) => {
    const {id} = req.params;

    try {
        const user = await User.findById(req.user._id);
        const userToUnfollow = await User.findById(id);

        if(!user || !userToUnfollow){
            return res.status(404).send({message: "User not found"});
        }

        userToUnfollow.followers = userToUnfollow.followers.filter(
            (followerId) => followerId.toString() !== req.user._id.toString()
        );

        user.followings = user.followings.filter(
            (followingId) => followingId.toString() !== userToUnfollow._id.toString()
        );

        await userToUnfollow.save();
        await user.save();

        res.status(200).send({ message: 'Unfollowed successfully' });
    } catch (error) {
        res.status(500).send({message: "Error unfollwing user"});
    }
}

export const followersAndFollowingsCount = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);

        if(!user){
            return res.status(404).send({message: "User not found"});
        }
        const totalFollowers = user.followers.length;
        const totalFollowings = user.followings.length;

        res.status(200).send({message: "Success", totalFollowers, totalFollowings});
    } catch (error) {
        res.status(500).send({message: "Failed to get followers and followings total count"})
    }
}

export const followerAndFollowingsCountProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if(!user){
            return res.status(404).send({message: "User not found"});
        }
        const totalFollowers = user.followers.length;
        const totalFollowings = user.followings.length;

        res.status(200).send({message: "Success", totalFollowers, totalFollowings});
    } catch (error) {
        res.status(500).send({message: "Failed to get followers and followings total count"})
    }
}

export const getFollowStatus = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(req.user._id);
        if(!user){
            return res.status(404).send({message:  "User not found"});
        }

        const isFollowing = user.followings.includes(id);
        res.status(200).send({message: "Success", isFollowing});
    } catch (error) {
        res.status(500).send({message: "Error fetching follow status"});
    }
}