// import React, { useEffect } from 'react';
// import { ArrowDown, ChevronRight } from 'lucide-react';
// import { motion, useAnimation } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import Search from '../Search/Search';
// import HeroBg from '../../assets/Landing/heroBg.svg';
// import DigitalClock from '../Clock/Clock';
// import { useNavigate, Link } from 'react-router-dom';


// const Hero = () => {
//     const controls = useAnimation();
//     const [ref, inView] = useInView({
//         threshold: 0.1, // Trigger animation when 10% of the element is visible
//     });
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (inView) {
//             controls.start('visible');
//         } else {
//             controls.start('hidden');
//         }
//     }, [controls, inView]);

//     const variants = {
//         hidden: { opacity: 0, y: 50 },
//         visible: { opacity: 1, y: 0 },
//     };

//     const searchHandler = (input) => {
//         navigate(`/search?query=${encodeURIComponent(input)}`);
//     }

//     return (
//         <div className="relative w-full h-screen overflow-hidden">
//             <img
//                 src={HeroBg}
//                 alt="Hero Background"
//                 className="absolute inset-0 w-full h-full object-cover"
//             />

//                 {/* <div className='absolute top-14 right-0 z-10'>
//                     <DigitalClock />

//                 </div> */}
//             {/* Content Container */}
//             <div className="relative h-full flex flex-col items-center justify-center px-4">
//                 <div className="text-center space-y-6 max-w-full mx-auto" ref={ref}>
//                     <motion.h1
//                         className="text-4xl md:text-7xl font-bold text-white tracking-tight"
//                         variants={variants}
//                         initial="hidden"
//                         animate={controls}
//                         transition={{ duration: 0.8 }}
//                     >
//                         <span className="block">TrendWave</span>
//                     </motion.h1>

//                     <motion.p
//                         className="text-xl md:text-2xl text-gray-200"
//                         variants={variants}
//                         initial="hidden"
//                         animate={controls}
//                         transition={{ duration: 1, delay: 0.2 }}
//                     >
//                         Stay Ahead, Stay Informed
//                     </motion.p>

//                     <motion.div
//                         className="mt-8"
//                         variants={variants}
//                         initial="hidden"
//                         animate={controls}
//                         transition={{ duration: 0.8, delay: 0.4 }}
//                     >
//                         <div className="relative max-w-2xl mx-auto">
//                             <Search searchHandler={searchHandler}/>
//                             <div className="absolute right-7 top-1 translate-y-3">
//                                 <ChevronRight className="w-5 h-5 text-gray-400" />
//                             </div>
//                         </div>
//                     </motion.div>

//                     <motion.div
//                         className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
//                         variants={variants}
//                         initial="hidden"
//                         animate={controls}
//                         transition={{ duration: 0.8, delay: 0.6 }}
//                     >
//                         <Link to="/trending">
//                             <button className="px-8 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105">
//                                 Trendings
//                             </button>
//                         </Link>
//                         <a href="https://insansa.com" target="_blank" rel="noopener noreferrer" className="relative group">
//                             <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold 
//                          transition-all duration-300 transform hover:scale-105
//                          hover:border-purple-200 hover:text-gray-100
//                          hover:shadow-[0_0_20px_rgba(167,139,250,0.4)]">
//                                 Insansa.com
//                             </button>
//                             <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 
//                        text-sm text-white bg-gray-900/90 rounded-md 
//                        opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100
//                        transition-all duration-300 backdrop-blur-sm
//                        shadow-[0_0_10px_rgba(167,139,250,0.3)]
//                        before:content-[''] before:absolute before:top-full before:left-1/2 
//                        before:-translate-x-1/2 before:border-4 before:border-transparent 
//                        before:border-t-purple-900/90">
//                                 Visit our website
//                             </span>
//                         </a>

//                     </motion.div>
//                 </div>

//                 {/* Scroll Indicator */}
//                 <motion.div
//                     className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
//                     variants={variants}
//                     initial="hidden"
//                     animate={controls}
//                     transition={{ duration: 0.8, delay: 0.8 }}
//                 >
//                     <ArrowDown className="w-6 h-6 text-white opacity-75" />
//                 </motion.div>
//             </div>
//         </div>
//     );
// };

// export default Hero;



import React, { useEffect, Suspense, memo } from 'react';
import { ArrowDown, ChevronRight } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate, Link } from 'react-router-dom';

// Lazy-loaded assets and components
const Search = memo(React.lazy(() => import('../Search/Search')));
// const HeroBg = React.lazy(() => import('../../assets/Landing/heroBG.svg'));
import HeroBg from '../../assets/Landing/heroBg.svg';

const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
};

const Hero = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.1 });
    const navigate = useNavigate();

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        } else {
            controls.start('hidden');
        }
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
                <div className="text-center space-y-6 max-w-full mx-auto" ref={ref}>
                    <motion.h1
                        className="text-4xl md:text-7xl font-bold text-white tracking-tight"
                        variants={variants}
                        initial="hidden"
                        animate={controls}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="block">TrendWave</span>
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl text-gray-200"
                        variants={variants}
                        initial="hidden"
                        animate={controls}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Stay Ahead, Stay Informed
                    </motion.p>

                    <motion.div
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
                    </motion.div>

                    <motion.div
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
                            <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold 
                                transition-all duration-300 transform hover:scale-105
                                hover:border-purple-200 hover:text-gray-100
                                hover:shadow-[0_0_20px_rgba(167,139,250,0.4)]"
                            >
                                Insansa.com
                            </button>
                        </a>
                    </motion.div>
                </div>

                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
                    variants={variants}
                    initial="hidden"
                    animate={controls}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <ArrowDown className="w-6 h-6 text-white opacity-75" />
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
