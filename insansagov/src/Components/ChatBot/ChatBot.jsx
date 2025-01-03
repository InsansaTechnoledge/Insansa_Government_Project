import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { MessageCircle, Send, X, MinusCircle, User, Bot } from 'lucide-react';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! How can I help you today?", isBot: true },
    ]);
    const [inputText, setInputText] = useState("");
    const [unreadCount, setUnreadCount] = useState(1);
    const [isBouncing, setIsBouncing] = useState(true);

    
    React.useEffect(() => {
        let bounceInterval;
        if (unreadCount > 0 && !isOpen) {
            bounceInterval = setInterval(() => {
                setIsBouncing(true);
                setTimeout(() => setIsBouncing(false), 1000);
            }, 5000);
        }
        return () => clearInterval(bounceInterval);
    }, [unreadCount, isOpen]);

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

        if (!isOpen) {
            setUnreadCount((prevCount) => prevCount + 1);
            setIsBouncing(true);
            setTimeout(() => setIsBouncing(false), 1000);
        }
    };

    const fetchBotResponse = async (input) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return `I'm here to help with "${input}". Let me know more details!`;
    };

    const handleOpenChat = () => {
        setIsOpen(true);
        setIsMinimized(false);
        setUnreadCount(0);
        setIsBouncing(false);
    };

    if (!isOpen) {
        return (
            <button
                onClick={handleOpenChat}
                className={`fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 
          rounded-full shadow-lg hover:shadow-xl transition-all duration-300 
          flex items-center justify-center text-white group
          ${isBouncing ? 'animate-bounce' : 'hover:scale-110 transform transition-transform duration-300'}`}
                aria-label="Open chat"
                onMouseEnter={() => setIsBouncing(true)}
                onMouseLeave={() => setIsBouncing(false)}
            >
                <MessageCircle className={`w-8 h-8 transition-transform duration-300 
          ${isBouncing ? 'scale-110' : 'group-hover:scale-110'}`} />
                {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 h-6 w-6 bg-red-500 text-white text-xs 
            font-bold flex items-center justify-center rounded-full shadow-lg border-2 
            border-white animate-pulse">
                        {unreadCount}
                    </div>
                )}
            </button>
        );
    }

    const chatWindow = (
        <div className={`z-50 fixed bottom-6 right-6 w-96 ${isMinimized ? 'h-14' : 'h-[600px]'} 
     rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden
      ${isOpen ? 'animate-in slide-in-from-right' : ''}`}>
            <div className="drag-handle p-3 bg-gradient-to-r from-indigo-500 to-purple-600 
        text-white rounded-t-2xl flex justify-between items-center cursor-move
        hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-700 transition-all duration-300">
                {/* <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400 hover:bg-red-500 transition-colors" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors" />
                    <div className="w-2 h-2 rounded-full bg-green-400 hover:bg-green-500 transition-colors" />
                </div> */}
                <div className="flex-1 text-center">
                    <h2 className="text-sm font-medium">My Website's Chatbot</h2>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsMinimized(!isMinimized)}
                        className="p-1 hover:bg-white/20 rounded-full transition-all duration-300 
              transform hover:scale-110 active:scale-95"
                        aria-label="Minimize chat"
                    >
                        <MinusCircle size={16} />
                    </button>
                    <button
                        onClick={() => {
                            setIsOpen(false)
                            setMessages([{ id: 1, text: "Hello! How can I help you today?", isBot: true }]);
                        }}
                        className="p-1 hover:bg-white/20 rounded-full transition-all duration-300 
              transform hover:scale-110 active:scale-95"
                        aria-label="Close chat"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>

            {!isMinimized && (
                <>
                    <div className="backdrop-blur-md bg-opacity-10 flex-1 p-4 overflow-y-auto bg-gray-900 h-[calc(100%-140px)] space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex items-start gap-2 ${message.isBot ? "justify-start" : "justify-end"}
                  animate-in slide-in-from-${message.isBot ? 'left' : 'right'}`}
                            >
                                {message.isBot && (
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 
                    flex items-center justify-center text-white transform hover:scale-110 transition-transform">
                                        <Bot size={16} />
                                    </div>
                                )}
                                <div
                                    className={`max-w-[70%] p-3 rounded-2xl ${message.isBot
                                            ? "bg-white shadow-sm hover:shadow-md"
                                            : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                                        } transition-all duration-300 hover:-translate-y-1`}
                                >
                                    <p className="text-sm">{message.text}</p>
                                </div>
                                {!message.isBot && (
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center
                    transform hover:scale-110 transition-transform">
                                        <User size={16} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSend} className="h-full p-4 border-t-gray-400 bg-white border-t">
                        <div className="flex gap-2 items-center">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 p-3 bg-gray-100 rounded-xl text-sm focus:outline-none 
                  focus:ring-2 focus:ring-indigo-500 transition-all duration-300
                  hover:bg-gray-50"
                            />
                            <button
                                type="submit"
                                className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white 
                  rounded-xl hover:shadow-lg focus:outline-none focus:ring-2 
                  focus:ring-indigo-500 transition-all duration-300
                  transform hover:scale-105 active:scale-95"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );

    return (
        <Draggable handle=".drag-handle" bounds="body">
                {chatWindow}
        </Draggable>
    );
};

export default ChatBot;