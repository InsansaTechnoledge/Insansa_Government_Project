import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config.js';

const UnsubscribePage = () => {
    const [isUnsubscribed, setIsUnsubscribed] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const apiCalledRef = useRef(false); // Ref to track if the API is already called
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token && !apiCalledRef.current) {
            apiCalledRef.current = true; // Mark API as called
            unsubscribeUser(token);
        } else if (!token) {
            setErrorMessage('Invalid token.');
        }
    }, [location]);

    const unsubscribeUser = async (token) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/subscriber/unsubscribe`, { token });

            if (response.status === 200) {
                setIsUnsubscribed(true);
            } else {
                setErrorMessage(response.data.message || 'An error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Error unsubscribing:', error);

            if (error.response) {
                setErrorMessage(error.response.data.message || 'An error occurred. Please try again.');
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
        }
    };

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
            <h1 className="text-6xl font-bold text-purple-500 mb-4">Unsubscribe</h1>
            
            {isUnsubscribed ? (
                <>
                    <h2 className="text-2xl font-semibold mb-4">You have successfully unsubscribed!</h2>
                    <p className="text-lg mb-6">You will no longer receive updates.</p>
                </>
            ) : (
                <>
                    {errorMessage ? (
                        <>
                            <h2 className="text-2xl font-semibold mb-4 text-red-500">Error</h2>
                            <p className="text-lg mb-6 text-red-500">{errorMessage}</p>
                        </>
                    ) : (
                        <p className="text-lg mb-6">Processing your unsubscribe request...</p>
                    )}
                </>
            )}

            <div className="flex space-x-4">
                <button
                    onClick={handleGoHome}
                    className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all"
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default UnsubscribePage;
