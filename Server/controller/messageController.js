import mongoose from "mongoose";
import User from "../models/userModel.js";
import Message from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
    const { recipientId, content } = req.body;
    try {
        const sender = await User.findById(req.user._id);
        if(!sender) {
            return res.status(404).send({message: "Sender not found"});
        }

        const recipient = await User.findById(recipientId);

        if(!recipient){
            return res.status(404).send({message: 'Recepient not found'});
        }

        const message = new Message({
            sender,
            recipient,
            content
        });

        await message.save();

        res.status(201).send({message: "message sent successfully", message});
    } catch (error) {
        res.status(500).send({message: "Error in sending message"});
    }
}

export const getMessage = async (req, res) => {
    const userId = req.user._id;
    const { userId: otherUserId } = req.params;
    try {
        const messages = await Message.find({
            $or: [
                {
                    sender: userId,
                    recipient: otherUserId
                },
                {
                    sender: otherUserId,
                    recipient: userId
                }
            ]
        }).sort({created: 1});

        res.status(200).send({ message: "Messages fetched successfully", messages });
    } catch (error) {
        res.status(500).send({message: "Error in getting message"});
    }
}

export const deleteMessageFormSender = async (req, res) => {
    const { messageId } = req.params;
    try {

        const message = await Message.findById(messageId);

        if(!message){
            return res.status(404).send({message: "Message not found"});
        }

        if(message.sender.toString() !== req.user._id.toString()){
            return res.status(403).send({message: "Unauthorized action"});
        }

        message.senderDeleted = true;

        if(message.recipientDeleted){
           await message.deleteOne();
        }
        else{
            await message.save();
        }

        res.status(200).send({message: "Message deleted from your side"});
        
    } catch (error) {
        res.status(500).send({message: "Error deleting sender's message"});
    }
}


export const deleteMessageFromRecipient = async (req, res) => {
    const { messageId } = req.params;

    try {
        const message = await Message.findById(messageId);

       
        if (!message) {
            return res.status(404).send({ message: "Message not found" });
        }

        if (message.recipient.toString() !== req.user._id.toString()) {
            return res.status(403).send({ message: "Unauthorized action. Only the recipient can delete this message." });
        }

        message.recipientDeleted = true;

        if (message.senderDeleted) {
            await message.deleteOne();
        } else {
            await message.save();
        }

        res.status(200).send({ message: "Message deleted from recipient's side successfully." });
    } catch (error) {
        console.error("Error deleting message:", error);
        res.status(500).send({ message: "Error deleting message from recipient's side." });
    }
};


export const deleteMessageFromBothSideBySender = async (req, res) => {
    const { messageId } = req.params;
    try {

        const message = await Message.findById(messageId);

        if(!message){
            return res.status(404).send({message: "Message not found"});
        }

        if(message.sender.toString() !== req.user._id.toString()){
            return res.status(403).send({message: "Unauthorized action"});
        }


        await message.deleteOne();

        res.status(200).send({message: "Message deleted from by sender"});
        
    } catch (error) {
        res.status(500).send({message: "Error deleting message"});
    }
}


export const deleteMessageFromBoth = async (req, res) => {
    const { messageId } = req.params;
    try {
        const message = await Message.findById(messageId);

        if(!message) {
            return res.status(404).send({message: "Message not found"});
        }

        if(message.sender.toString() !== req.user._id.toString() && message.recipient.toString() !== req.user._id.toString()){
            return res.status(403).send({message: "Unauthorized action"});
        }

        await message.deleteOne();
        res.status(200).send({ message: "Message deleted from both sides" });
    } catch (error) {
        res.status(500).send({message: "Failed to delete this message"});
    }
}