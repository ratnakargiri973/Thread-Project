import React, { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { IoSend } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import instance from '../axiosConfig';
import { useAuth } from '../contexts/Auth';

function Message() {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [messageData, setMessageData] = useState([]);
    const { id } = useParams();
    const [userId, setUserId] = useState(null);

    const { user } = useAuth();

    useEffect(() => {
        setShowModal(true);
    }, []);

    useEffect(() => {
        if (user && user._id) {
            setUserId(user._id);
        }
    }, [user]);

    useEffect(() => {
        if (userId) {
            getMessage();
        }
    }, [userId]);

    const handleClose = () => {
        setShowModal(false);
        navigate('/users');
    };

    async function getMessage() {
        try {
            const response = await instance.get(`/message/conversations/${id}`);
            setMessageData(response.data.messages);
        } catch (error) {
            console.log("Error fetching messages:", error);
        }
    }

    const handleSend = async () => {
        if (!message.trim()) return;

        try {
            const response = await instance.post('/message/send', {
                recipientId: id,
                content: message,
            });

            setMessageData(prevState => [
                ...prevState,
                {
                    _id: response.data.message._id,
                    content: message,
                    sentAt: new Date().toLocaleString(),
                    sender: userId,
                },
            ]);

            setMessage("");
        } catch (error) {
            console.log("Error sending message:", error);
        }
    };

    async function handleDeleteBySenderFromBothside(messageId) {
        try {
            await instance.delete(`/message/delete/both/sender/${messageId}`);
            setMessageData(prevState => prevState.filter(msg => msg._id !== messageId));
        } catch (error) {
            console.log("Error deleting message:", error);
        }
    };

    const handleDeleteByRecipient = async (messageId) => {
        try {
            await instance.delete(`/message/delete/recipient/${messageId}`);
            setMessageData(prevState => prevState.filter(msg => msg._id !== messageId));
        } catch (error) {
            console.log("Error deleting message:", error);
        }
    };

    return (
        <div>
            {showModal && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                >
                    <div 
                        className="bg-white p-6 rounded-lg shadow-lg w-96 h-96 flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="flex justify-between items-center mb-4 shadow-md shadow-pink-600 rounded">
                            <h4 className="text-xl font-semibold pl-2">Message</h4>
                            <MdClose 
                                onClick={handleClose} 
                                className="cursor-pointer text-gray-600 hover:text-gray-800" 
                                size={24} 
                            />
                        </div>

                        <div className="flex-grow mb-4 overflow-y-auto space-y-2">
                            {messageData.length > 0 ? (
                                messageData.map((msg, index) => (
                                    <div key={index} className={`flex ${msg.sender === userId ? 'justify-end' : 'justify-start'} items-center`}>
                                        <div 
                                            className={`max-w-xs p-2 rounded-lg ${msg.sender === userId ? 'bg-pink-400 text-white' : 'bg-sky-400 text-white'}`}
                                        >
                                            <div>{msg.content}</div>
                                            <span className="text-xs text-gray-500">{msg.sentAt}</span>
                                        </div>
                                        {msg.sender === userId ? (
                                            <button
                                                onClick={() => handleDeleteBySenderFromBothside(msg._id)}
                                                className="ml-2 text-red-300 hover:text-red-500"
                                            >
                                                <FaTrashAlt size={16} />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleDeleteByRecipient(msg._id)}
                                                className="ml-2 text-red-300 hover:text-red-500"
                                            >
                                                <FaTrashAlt size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>No messages yet</p>
                            )}
                        </div>

                        <div className="flex items-center gap-2 mt-auto">
                            <input 
                                type="text" 
                                name="message" 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type message"
                                className="border-slate-400 border-solid bg-gray-200 w-full outline-none rounded-xl p-2"
                            />
                            <button 
                                onClick={handleSend}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                <IoSend />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Message;
