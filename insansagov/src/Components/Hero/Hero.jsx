import React from 'react';
import { ArrowDown, ChevronRight } from 'lucide-react';
import Search from '../Search/Search';
import HeroBg from '../../assets/Landing/heroBg.svg';


const Hero = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
        
            <img
                src={HeroBg}
                alt="Hero Background"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Content Container */}
            <div className="relative h-full flex flex-col items-center justify-center px-4">
                
                <div className="text-center space-y-6 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight">
                        <span className="block">My Website</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-200">
                        Stay Ahead, Stay Informed
                    </p>

                    <div className="mt-8">
                        <div className="relative max-w-2xl mx-auto">
                            <Search />
                            <div className="absolute right-7 top-1/2 -translate-y-1/2">
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                        <button className="px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105">
                            Trendings
                        </button>
                        <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all transform hover:scale-105">
                            About US
                        </button>
                    </div>

                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <ArrowDown className="w-6 h-6 text-white opacity-75" />
                </div>
            </div>
        </div>
    );
};

export default Hero;