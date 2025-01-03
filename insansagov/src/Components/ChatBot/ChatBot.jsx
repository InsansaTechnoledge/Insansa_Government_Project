import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { MessageCircle, Send, X } from 'lucide-react';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! How can I help you today?", isBot: true },
    ]);
    const [inputText, setInputText] = useState("");
    const [unreadCount, setUnreadCount] = useState(1);

    const handleSend = async (e) => {
        e.preventDefault();
        if (inputText.trim() === "") return;

        const newUserMessage = {
            id: messages.length + 1,
            text: inputText,
            isBot: false,
        };

        setMessages((prevMessages) => [...prevMessages, newUserMessage]);
        setInputText("");

        const botResponse = await fetchBotResponse(inputText);

        const newBotMessage = {
            id: messages.length + 2,
            text: botResponse,
            isBot: true,
        };

        setMessages((prevMessages) => [...prevMessages, newBotMessage]);

        // Increment the unread count if the chat is closed
        if (!isOpen) {
            setUnreadCount((prevCount) => prevCount + 1);
        }
    };

    const fetchBotResponse = async (input) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return `I'm here to help with "${input}". Let me know more details!`;
    };

    const handleOpenChat = () => {
        setIsOpen(true);
        setUnreadCount(0); // Reset unread count when the chat is opened
    };

    if (!isOpen) {
        return (
            <button
                onClick={handleOpenChat}
                className="fixed bottom-6 right-6 w-14 h-14 bg-purple-500 rounded-full shadow-lg hover:bg-purple-600 transition-all duration-300 flex items-center justify-center text-white animate-bounce"
                aria-label="Open chat"
            >
                <MessageCircle size={24} />
                {unreadCount > 0 && (
                    <div className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full shadow-md">
                        {unreadCount}
                    </div>
                )}
            </button>
        );
    }

    return (
        <Draggable handle=".drag-handle" bounds="body">
            <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white bg-opacity-90 rounded-lg shadow-xl transition-all duration-300 backdrop-blur-md">
                <div className="drag-handle p-4 border-b bg-purple-500 text-white rounded-t-lg flex justify-between items-center cursor-move">
                    <div>
                        <h2 className="text-lg font-semibold">My Website's ChatBot</h2>
                        <p className="text-sm opacity-90">Always here to help</p>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-purple-600 rounded-full transition-colors"
                        aria-label="Close chat"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 p-4 overflow-y-auto bg-gray-50 h-[calc(100%-140px)]">
                    <div className="space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-lg ${message.isBot
                                        ? "bg-white text-gray-800 border shadow-sm"
                                        : "bg-purple-500 text-white"
                                        } animate-in slide-in-from-${message.isBot ? "left" : "right"}`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSend} className="p-4 border-t bg-white rounded-b-lg">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                            type="submit"
                            className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </form>
            </div>
        </Draggable>
    );
};

export default ChatBot;
