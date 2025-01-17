import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import { MessageCircle, Send, X, MinusCircle, User, Bot } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../../Pages/config';
import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom'


const ChatBot = () => {

    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
    const navigate = useNavigate();
    const containerRef = useRef(null)

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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

    // Scroll to the bottom whenever items change
    useEffect(() => {
        containerRef.current?.scrollTo({
            top: containerRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    const getHardcodedResponse = (input) => {
        const responses = {
            // General greetings
            "hi": "Hello there! How can I assist you today?",
            "Hi": "Hello there! How can I assist you today?",
            "HI": "Hello there! How can I assist you today?",
            "hello": "Hello there! How can I assist you today?",
            "Hello": "Hello there! How can I assist you today?",
            "HELLO": "Hello there! How can I assist you today?",
            "hey": "Hello there! How can I assist you today?",
            "Hey": "Hello there! How can I assist you today?",
            "HEY": "Hello there! How can I assist you today?",
            "hiya": "Hello there! How can I assist you today?",
            "Hiya": "Hello there! How can I assist you today?",
            "HIYA": "Hello there! How can I assist you today?",

            // How are you variations
            "how are you?": "I'm just a bot, but I'm functioning perfectly! How can I help?",
            "How are you?": "I'm just a bot, but I'm functioning perfectly! How can I help?",
            "HOW ARE YOU?": "I'm just a bot, but I'm functioning perfectly! How can I help?",
            "how r u?": "I'm just a bot, but I'm functioning perfectly! How can I help?",
            "How R U?": "I'm just a bot, but I'm functioning perfectly! How can I help?",
            "how you doing?": "I'm just a bot, but I'm functioning perfectly! How can I help?",
            "How you doing?": "I'm just a bot, but I'm functioning perfectly! How can I help?",
            "HOW YOU DOING?": "I'm just a bot, but I'm functioning perfectly! How can I help?",

            // Asking for the bot's name
            "what is your name?": "I am ChatAssistant, your friendly chatbot!",
            "What is your name?": "I am ChatAssistant, your friendly chatbot!",
            "WHAT IS YOUR NAME?": "I am ChatAssistant, your friendly chatbot!",
            "whats your name?": "I am ChatAssistant, your friendly chatbot!",
            "Whats your name?": "I am ChatAssistant, your friendly chatbot!",
            "WHATS YOUR NAME?": "I am ChatAssistant, your friendly chatbot!",
            "who are you?": "I am ChatAssistant, your friendly chatbot!",
            "Who are you?": "I am ChatAssistant, your friendly chatbot!",
            "WHO ARE YOU?": "I am ChatAssistant, your friendly chatbot!",

            // Joke request
            "tell me a joke": "Why don't programmers like nature? It has too many bugs!",
            "Tell me a joke": "Why don't programmers like nature? It has too many bugs!",
            "TELL ME A JOKE": "Why don't programmers like nature? It has too many bugs!",
            "tell me something funny": "Why don't programmers like nature? It has too many bugs!",
            "Tell me something funny": "Why don't programmers like nature? It has too many bugs!",
            "TELL ME SOMETHING FUNNY": "Why don't programmers like nature? It has too many bugs!",
            "make me laugh": "Why don't programmers like nature? It has too many bugs!",
            "Make me laugh": "Why don't programmers like nature? It has too many bugs!",
            "MAKE ME LAUGH": "Why don't programmers like nature? It has too many bugs!",

            // Farewell
            "bye": "Goodbye! Have a great day!",
            "Bye": "Goodbye! Have a great day!",
            "BYE": "Goodbye! Have a great day!",
            "goodbye": "Goodbye! Have a great day!",
            "Goodbye": "Goodbye! Have a great day!",
            "GOODBYE": "Goodbye! Have a great day!",
            "see you": "Goodbye! Have a great day!",
            "See you": "Goodbye! Have a great day!",
            "SEE YOU": "Goodbye! Have a great day!",
            "catch you later": "Goodbye! Have a great day!",
            "Catch you later": "Goodbye! Have a great day!",
            "CATCH YOU LATER": "Goodbye! Have a great day!",
            "take care": "Goodbye! Have a great day!",
            "Take care": "Goodbye! Have a great day!",
            "TAKE CARE": "Goodbye! Have a great day!",
        };



        const defaultResponse = null; // Return `null` if no hardcoded response exists
        return responses[input.trim().toLowerCase()] || defaultResponse;
    };


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

        // const hardcodedResponse = getHardcodedResponse(newUserMessage.text);

        // if (hardcodedResponse) {
        //     const newBotMessage = {
        //         id: messages.length + 2,
        //         text: hardcodedResponse,
        //         isBot: true,
        //     };
        //     setMessages((prevMessages) => [...prevMessages, newBotMessage]);
        // } 
        // else 
        {
            try {
                const response = await axios.post(
                    `https://insansachatbot.onrender.com/api/chatbot1`,
                    { msg: newUserMessage.text },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }



                );
                // const botResponse = await axios.get(`https://exam-chatbot-exam-chatbots-projects.vercel.app/`,formData,{
                //     headers:{
                //         'Content-Type':'application/json'
                //     }
                // });

                const botResponse = response.data;
                var responseText = ''
                var responseSet = []
                var responseType = ''
                console.log(botResponse);
                if (botResponse.exam_details) {

                    responseSet = [botResponse.exam_details.apply_link, botResponse.exam_details.start_date, botResponse.exam_details.end_date, botResponse.exam_details.url]
                    responseType = 'all'

                    responseText = `
            - <b>Apply Link:</b> <a href="${botResponse.exam_details.apply_link}" target="_blank">${botResponse.exam_details.apply_link}</a><br>
            - <b>Start Date:</b> ${botResponse.exam_details.start_date}<br>
            - <b>End Date:</b> ${botResponse.exam_details.end_date}<br>
            - <b>URL:</b> <a href="${botResponse.exam_details.url}" target="_blank">${botResponse.exam_details.url}</a><br>
            
            `;
                }
                else if (botResponse.start_date) {
                    responseType = 'start-date'
                    responseSet = [botResponse.start_date];

                    responseText = `
            - <b>Start Date:</b> ${botResponse.start_date}<br>
            `;
                }
                else if (botResponse.end_date) {
                    responseType = 'end-date'
                    responseSet = [botResponse.end_date];

                    responseText = `
            - <b>End Date:</b> ${botResponse.end_date}<br>
            `;
                }
                else if (botResponse.link_details) {
                    responseType = 'link'
                    responseSet = [botResponse.link_details.apply_link, botResponse.link_details.url];

                    responseText = `
            - <b>Apply Link:</b> <a href="${botResponse.link_details.apply_link}" target="_blank">${botResponse.link_details.apply_link}</a><br>
            - <b>Link:</b> <a href="${botResponse.link_details.url}" target="_blank">${botResponse.link_details.url}</a><br>
            `;
                }
                else {
                    responseText = `${botResponse.response}`
                }

                const newBotMessage = {
                    id: messages.length + 2,
                    text: responseText,
                    type: responseType,
                    set: responseSet,
                    isBot: true,
                };
                console.log(parse(responseText));
                setMessages((prevMessages) => [...prevMessages, newBotMessage]);
            }
            catch (err) {
                console.log(err);
            }

            if (!isOpen) {
                setUnreadCount((prevCount) => prevCount + 1);
                setIsBouncing(true);
                setTimeout(() => setIsBouncing(false), 1000);
            }
        };
    }

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

    const addMessage = (type, message) => {
        const newBotMessage = {
            id: messages.length + 2,
            type: type,
            set: [message],
            isBot: true,
        }

        setMessages((prev) => [...prev, newBotMessage])
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
                        onClick={() => setIsOpen(!isOpen)}
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
                    <div 
                    ref={containerRef}
                    className="backdrop-blur-md bg-opacity-10 flex-1 p-4 overflow-y-auto bg-gray-900 h-[calc(100%-140px)] space-y-4"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>

                        {messages.length <= 1 && (
                            <div className="max-w-2xl mx-auto my-4">
                                {/* Header Section - Reduced padding and font sizes */}
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-xl p-4 text-white">
                                    <div className="flex items-center justify-center mb-2">
                                        <MessageCircle className="w-8 h-8" />
                                    </div>
                                    <h1 className="text-xl font-bold text-center mb-1">
                                        Welcome to ChatAssistant
                                    </h1>
                                    <p className="text-sm text-center text-blue-100">
                                        Your intelligent conversation partner
                                    </p>
                                </div>

                                {/* Notes Section - Reduced padding and spacing */}
                                <div className="bg-white rounded-b-xl shadow-lg p-4 border border-gray-200">
                                    {/* Note 1 */}
                                    <div className="mb-3">
                                        <div className="flex items-center mb-1">
                                            <div className="bg-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                1
                                            </div>
                                            <h2 className="ml-2 font-bold text-gray-800 text-sm">
                                                Important Note
                                            </h2>
                                        </div>
                                        <p className="text-gray-600 ml-8 text-sm">
                                            This is your first important note. I'm here to help you with any questions or tasks you might have.
                                        </p>
                                    </div>

                                    {/* Note 2 */}
                                    <div>
                                        <div className="flex items-center mb-1">
                                            <div className="bg-purple-600 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                                2
                                            </div>
                                            <h2 className="ml-2 font-bold text-gray-800 text-sm">
                                                Getting Started
                                            </h2>
                                        </div>
                                        <p className="text-gray-600 ml-8 text-sm">
                                            This is your second important note. Feel free to ask anything - I'm designed to be helpful and informative.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

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
                                    className={`max-w-[70%] p-4 rounded-2xl shadow-lg transition-all duration-300 ${message.isBot
                                        ? "bg-white shadow-sm"
                                        : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                                        }`}
                                >
                                    {message.type === "all" && (
                                        <div className="space-y-2 space-x-2">
                                            <p className="text-sm font-medium">Details for</p>
                                            <button
                                                className="px-3 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-md hover:bg-purple-800"
                                                onClick={() => {
                                                    const url = message.set[0];
                                                    if (url.startsWith("http://") || url.startsWith("https://")) {
                                                        window.open(url, "_blank");
                                                    } else {
                                                        console.error("Invalid URL:", url);
                                                    }
                                                }}
                                            >
                                                Apply Link
                                            </button>
                                            <button onClick={() => (addMessage("start-date", message.set[1]))} className="px-3 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-md hover:bg-purple-800">
                                                Start Date
                                            </button>
                                            <button onClick={() => (addMessage("end-date", message.set[2]))} className="px-3 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-md hover:bg-purple-800">
                                                End Date
                                            </button>
                                            <button
                                                className="px-3 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-md hover:bg-purple-800"
                                                onClick={() => {
                                                    const url = message.set[3];
                                                    if (url.startsWith("http://") || url.startsWith("https://")) {
                                                        window.location.href = url;
                                                    } else {
                                                        console.error("Invalid URL:", url);
                                                    }
                                                }}
                                            >
                                                More Info
                                            </button>
                                        </div>
                                    )}
                                    {message.type === "start-date" && (
                                        <div className="space-y-4">
                                            <p className="text-sm font-medium">Start date for</p>
                                            <button className="px-5 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-md hover:bg-purple-800">
                                                {message.set[0]}
                                            </button>
                                        </div>
                                    )}
                                    {message.type === "end-date" && (
                                        <div className="space-y-4">
                                            <p className="text-sm font-medium">End date for</p>
                                            <button className="px-5 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-md hover:bg-purple-800">
                                                {message.set[0]}
                                            </button>
                                        </div>
                                    )}
                                    {message.type === "link" && (
                                        <div className="space-y-4">
                                            <p className="text-sm font-medium">Links for</p>
                                            <button
                                                className="px-5 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-md hover:bg-purple-800"
                                                onClick={() => {
                                                    const url = message.set[0];
                                                    if (url.startsWith("http://") || url.startsWith("https://")) {
                                                        window.open(url, "_blank");
                                                    } else {
                                                        console.error("Invalid URL:", url);
                                                    }
                                                }}
                                            >
                                                Apply Link
                                            </button>
                                            <button
                                                className="px-5 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-md hover:bg-purple-800"
                                                onClick={() => {
                                                    const url = message.set[1];
                                                    if (url.startsWith("http://") || url.startsWith("https://")) {
                                                        window.location.href = url;
                                                    } else {
                                                        console.error("Invalid URL:", url);
                                                    }
                                                }}
                                            >
                                                More Info
                                            </button>
                                        </div>
                                    )}
                                    {!["all", "start-date", "end-date", "link"].includes(message.type) && (
                                        <div className="text-sm flex flex-wrap">
                                            {message.text}
                                        </div>
                                    )}
                                </div>




                                {!message.isBot && (
                                    <div className=" w-8 h-8 rounded-full bg-gray-200 border border-gray-400 flex items-center justify-center
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

        <Draggable disabled={!isDesktop} handle=".drag-handle" bounds="body">
            {chatWindow}
        </Draggable>
    );
};

export default ChatBot;