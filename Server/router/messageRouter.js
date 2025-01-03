import express from 'express';
import { deleteMessageFormSender, deleteMessageFromBoth, deleteMessageFromBothSideBySender, deleteMessageFromRecipient, getMessage, sendMessage } from '../controller/messageController.js';
import { protectRoute } from '../middlewares/auth.js';

const messageRouter = express.Router();

messageRouter.post('/send', protectRoute, sendMessage);
messageRouter.get('/conversations/:userId', protectRoute, getMessage);
messageRouter.delete("/delete/sender/:messageId", protectRoute, deleteMessageFormSender);
messageRouter.delete("/delete/recipient/:messageId", protectRoute, deleteMessageFromRecipient);
messageRouter.delete('/delete/both/sender/:messageId', protectRoute, deleteMessageFromBothSideBySender);
messageRouter.delete('/delete/both/:messageId', protectRoute, deleteMessageFromBoth);

export default messageRouter;