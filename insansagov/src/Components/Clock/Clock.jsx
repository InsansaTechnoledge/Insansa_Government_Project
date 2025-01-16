import React, { useState, useEffect } from 'react';

const DigitalClock = () => {
    const [time, setTime] = useState(new Date());
    const [mode, setMode] = useState('24h'); // '24h' or '12h'

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatNumber = (num) => {
        return num.toString().padStart(2, '0');
    };

    const hours = mode === '24h' ?
        formatNumber(time.getHours()) :
        formatNumber(time.getHours() % 12 || 12);
    const minutes = formatNumber(time.getMinutes());
    const seconds = formatNumber(time.getSeconds());
    const ampm = time.getHours() >= 12 ? 'PM' : 'AM';

    const NumberBlock = ({ number, label }) => (
        <div className="flex flex-col items-center">
            <div className="bg-gray-800 rounded-lg p-4 mb-1 w-16 h-20 flex items-center justify-center">
                <span className="font-mono text-3xl font-bold text-green-400 tracking-wider">
                    {number}
                </span>
            </div>
            <span className="text-xs text-gray-400 uppercase">{label}</span>
        </div>
    );

    const Separator = () => (
        <div className="flex flex-col items-center justify-center mx-2">
            <div className="h-20 flex flex-col justify-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mb-2"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
            <span className="text-xs text-transparent">.</span>
        </div>
    );

    return (
        <div className="flex flex-col items-center bg-gray-900 p-8 rounded-2xl shadow-2xl">
            <div className="flex items-start mb-6">
                <div className="flex items-center">
                    <NumberBlock number={hours} label="hours" />
                    <Separator />
                    <NumberBlock number={minutes} label="minutes" />
                    <Separator />
                    <NumberBlock number={seconds} label="seconds" />
                    {mode === '12h' && (
                        <div className="ml-4 flex flex-col items-center">
                            <div className="bg-gray-800 rounded-lg p-4 mb-1 h-20 flex items-center justify-center">
                                <span className="font-mono text-xl font-bold text-green-400">
                                    {ampm}
                                </span>
                            </div>
                            <span className="text-xs text-gray-400 uppercase">mode</span>
                        </div>
                    )}
                </div>
            </div>

            <button
                onClick={() => setMode(prev => prev === '24h' ? '12h' : '24h')}
                className="px-4 py-2 bg-gray-800 rounded-lg text-green-400 text-sm hover:bg-gray-700 transition-colors duration-200"
            >
                Switch to {mode === '24h' ? '12h' : '24h'} mode
            </button>

            <div className="mt-4 text-xs text-gray-500">
                {time.toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
            </div>
        </div>
    );
};

export default DigitalClock;