import React, { useEffect, Suspense, memo } from 'react';
import { ArrowDown, ChevronRight } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate, Link } from 'react-router-dom';

// Lazy-loaded assets and components
const Search = memo(React.lazy(() => import('../Search/Search')));
import HeroBg from '../../assets/Landing/heroBG2.webp';

const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
};

const Hero = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.1 });
    const navigate = useNavigate();

    useEffect(() => {
        controls.start(inView ? 'visible' : 'hidden');
    }, [controls, inView]);

    const searchHandler = (input) => {
        navigate(`/search?query=${encodeURIComponent(input)}`);
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <Suspense fallback={<div className="loading">Loading Background...</div>}>
                <img
                    src={HeroBg}
                    alt="Hero Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </Suspense>

            <div className="relative h-full flex flex-col items-center justify-center px-4">
                <div className="text-center space-y-6 max-w-full mx-auto">
                    <div
                        ref={ref}
                        className="text-4xl md:text-7xl font-bold text-white tracking-tight"
                        variants={variants}
                        initial="hidden"
                        animate={controls}
                        transition={{ duration: 0.4 }}
                    >
                        <span className="block">TrendWave</span>
                    </div>

                    <div
                        className="text-xl md:text-2xl text-gray-200"
                        variants={variants}
                        initial="hidden"
                        animate={controls}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Stay Ahead, Stay Informed
                    </div>

                    <div
                        className="mt-8 relative"
                        variants={variants}
                        initial="hidden"
                        animate={controls}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Suspense fallback={<div>Loading Search...</div>}>
                            <Search searchHandler={searchHandler} />
                        </Suspense>
                        <div className="absolute right-3 top-1 translate-y-2">
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>

                    <div
                        className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
                        variants={variants}
                        initial="hidden"
                        animate={controls}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <Link to="/trending">
                            <button
                                aria-label="View trending topics"
                                className="px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105"
                            >
                                Trendings
                            </button>
                        </Link>
                        <a
                            href="https://insansa.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit Insansa.com"
                            className="relative group"
                        >
                            <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:border-purple-200 hover:text-gray-100 hover:shadow-[0_0_20px_rgba(167,139,250,0.4)]">
                                Insansa.com
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
