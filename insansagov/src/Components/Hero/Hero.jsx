import React, { useEffect } from 'react';
import { ArrowDown, ChevronRight } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Search from '../Search/Search';
import HeroBg from '../../assets/Landing/heroBg.svg';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.1, // Trigger animation when 10% of the element is visible
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        } else {
            controls.start('hidden');
        }
    }, [controls, inView]);

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    const searchHandler = (input) => {
        navigate(`/search?query=${encodeURIComponent(input)}`);
    }

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <img
                src={HeroBg}
                alt="Hero Background"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Content Container */}
            <div className="relative h-full flex flex-col items-center justify-center px-4">
                <div className="text-center space-y-6 max-w-4xl mx-auto" ref={ref}>
                    <motion.h1
                        className="text-4xl md:text-7xl font-bold text-white tracking-tight"
                        variants={variants}
                        initial="hidden"
                        animate={controls}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="block">My Website</span>
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl text-gray-200"
                        variants={variants}
                        initial="hidden"
                        animate={controls}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        Stay Ahead, Stay Informed
                    </motion.p>

                    <motion.div
                        className="mt-8"
                        variants={variants}
                        initial="hidden"
                        animate={controls}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className="relative max-w-2xl mx-auto">
                            <Search searchHandler={searchHandler}/>
                            <div className="absolute right-7 top-1/2 -translate-y-1/2">
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
                        variants={variants}
                        initial="hidden"
                        animate={controls}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <button className="px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105">
                            Trendings
                        </button>
                        <a href="https://insansa.com" target="_blank" rel="noopener noreferrer">
                            <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all transform hover:scale-105">
                                Insansa.com
                            </button>
                        </a>

                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
                    variants={variants}
                    initial="hidden"
                    animate={controls}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <ArrowDown className="w-6 h-6 text-white opacity-75" />
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
