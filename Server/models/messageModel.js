import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    senderDeleted:{
        type: Boolean,
        default: false
    },
   recipientDeleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const Message = mongoose.model('message', messageSchema);
export default Message;