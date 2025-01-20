import React, { useState ,useEffect} from "react";
import { MapPin, Search, ArrowRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import axios from "axios";
import API_BASE_URL from "../../Pages/config";

const StateComponent = () => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [activeRegion, setActiveRegion] = useState('North');

    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [totalCount, setTotalCount] = useState(0);

    const navigate = useNavigate();
    const [stateCount, setStateCount] = useState();

    useEffect(() => {
        if (suggestions) {
            const total = suggestions.length;

            setTotalCount(total);
        }
    }, [suggestions]);

    const inputChangeHandler = (val) => {
        setInput(val);
        fetchSuggestions(val);
    }

    // Handle suggestion selection
    const selectSuggestion = (suggestion) => {
        navigate(`/state/?name=${suggestion}`);
        setInput(suggestion);
        setShowDropdown(false);
    };

    const fetchSuggestions = debounce(async (query) => {
        if (!query) {
            setSuggestions([]);
            setShowDropdown(false);
            return;
        }

        try {
            const response = await axios.get(`${API_BASE_URL}/api/search/state`, { params: { q: query } });
            setSuggestions(response.data.suggestions);
            console.log(response.data.suggestions);
            setShowDropdown(true);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    }, 300); // 1000ms debounce delay

    // Organized states by region
    const statesByRegion = {
        'North': [
            "Haryana",
            "Himachal Pradesh",
            "Punjab",
            "Uttar Pradesh",
            "Uttarakhand"
        ],
        'South': [
            "Andhra Pradesh",
            "Karnataka",
            "Kerala",
            "Tamil Nadu"
        ],
        'Central': [
            "Madhya Pradesh",
            "Maharashtra"
        ],
        'East': [
            "Bihar",
            "Odisha"
        ],
        'West': [
            "Gujarat",
            "Rajasthan"
        ]
    };

    const SuggestionList = ({ title, items, itemKey }) => {
        if (!items || items.length === 0) return null;

        return (
            <div className="mb-2">
                <div className="flex items-center justify-between text-sm font-semibold text-gray-500 px-3 py-2 bg-gray-50 sticky top-0">
                    <span>{title}</span>
                    <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                        {items.length}
                    </span>
                </div>
                <div className="custom-scrollbar">
                    {items && items.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => selectSuggestion(item[itemKey])}
                            className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer text-gray-700 text-sm transition-colors duration-150"
                        >
                            {item[itemKey]}
                        </div>
                    ))}
                </div>
            </div>
        );
    };
    useEffect(() => {
        const fetchStateCount = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/state/count`);
                setStateCount(response.data);
            } catch (error) {
                console.error('Error fetching state count:', error);
            }
        };

        fetchStateCount();
    },[]);

    return (
        <>
            <style>
                {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px; /* Width of the scrollbar */
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #888; /* Scrollbar thumb color */
            border-radius: 4px; /* Rounded corners */
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #555; /* Thumb color on hover */
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent; /* Scrollbar track background */
          }
        `}
            </style>


            <div className="mt-8 mb-8">


                {/* Hero Header Section */}

                <div className="bg-gradient-to-r from-purple-800 to-indigo-800 rounded-t-2xl p-4 sm:p-8 text-white">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                                    State Government authorities
                                </h1>
                                <p className="text-purple-200 text-xs sm:text-sm">
                                    Explore opportunities across India's public sector
                                </p>
                            </div>

                            {/* Mobile Search Toggle */}
                            <div className="md:hidden flex justify-end">
                                <button
                                    onClick={() => setIsSearchVisible(!isSearchVisible)}
                                    className="p-2 hover:bg-white/10 rounded-full"
                                >
                                    {isSearchVisible ? (
                                        <X className="h-5 w-5 text-white" />
                                    ) : (
                                        <Search className="h-5 w-5 text-white" />
                                    )}
                                </button>
                            </div>

                            {/* Desktop Search */}
                            <div className="hidden md:flex flex-col">
                                <div className="flex items-center bg-white/10 rounded-full p-2 backdrop-blur-sm">
                                    <Search className="h-4 w-4 text-purple-200 ml-2" />
                                    <input
                                        type="text"
                                        onChange={(e) => {
                                            inputChangeHandler(e.target.value);
                                        }}
                                        placeholder="Search your state..."
                                        className="bg-transparent border-none focus:outline-none text-white placeholder-purple-200 text-sm ml-2 w-48"
                                        autocomplete="off"
                                        value={input}
                                    />
                                </div>
                                {/* Suggestions Dropdown */}
                                <div className="relative">
                                {showDropdown && suggestions && (
                                    <div className="custom-scrollbar max-h-72 w-full overflow-auto absolute mt-1 bg-white border border-gray-200 rounded shadow-lg z-50">


                                        <div className="">
                                            {suggestions.length > 0
                                                ?
                                                (
                                                    <SuggestionList
                                                        title="States"
                                                        items={suggestions}
                                                        itemKey="name"
                                                    />
                                                )
                                                :
                                                null}

                                            {totalCount === 0
                                                ?
                                                (
                                                    <div className="px-4 py-3 text-sm text-gray-500">
                                                        No suggestions found
                                                    </div>
                                                )
                                                :
                                                null}
                                        </div>
                                    </div>
                                )}
                                </div>
                            </div>
                        </div>

                        {/* Mobile Search Bar */}
                        {isSearchVisible && (
                            <div className="mt-4 md:hidden">
                                <div className="flex items-center bg-white/10 rounded-full p-2 backdrop-blur-sm">
                                    <Search className="h-4 w-4 text-purple-200 ml-2" />
                                    <input
                                        type="text"
                                        placeholder="Search your state..."
                                        className="bg-transparent border-none focus:outline-none text-white placeholder-purple-200 text-sm ml-2 w-full"
                                        autoFocus
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="bg-purple-900 text-white py-3 px-4 sm:px-8 overflow-x-auto">
                    <div className="flex justify-center space-x-6 sm:space-x-12 text-xs sm:text-sm whitespace-nowrap">
                        <div className="text-center">
                            <div className="font-bold">
                                {stateCount?.states}
                            </div>
                            <div className="text-purple-200 text-xs">States</div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold">
                                {stateCount?.exams}
                            </div>
                            <div className="text-purple-200 text-xs">Active Exams</div>
                        </div>
                        <div className="text-center">
                            <div className="font-bold">1M+</div>
                            <div className="text-purple-200 text-xs">Candidates</div>
                        </div>
                    </div>
                </div>

                {/* States Content */}
                <div className="bg-gradient-to-b from-purple-50 to-white rounded-b-2xl p-4 sm:p-8">

                    <div className="mb-6 overflow-x-auto">
                        <div className="flex space-x-2 whitespace-nowrap p-1">
                            {Object.keys(statesByRegion).map((region) => (
                                <button
                                    key={region}
                                    onClick={() => setActiveRegion(region)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeRegion === region
                                        ? 'bg-purple-800 text-white'
                                        : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                                        }`}
                                >
                                    {region}
                                </button>
                            ))}
                        </div>
                    </div>


                    {/* States Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                        {activeRegion
                            ? statesByRegion[activeRegion].map((state, index) => (
                                <StateCard key={index} state={state} />
                            ))
                            : Object.values(statesByRegion).flat().map((state, index) => (
                                <StateCard key={index} state={state} />
                            ))}
                    </div>

                    {/* Bottom Stats */}
                    <div className="mt-6 sm:mt-8 text-center">
                        <p className="text-xs sm:text-sm text-purple-600">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>
        </>

    );
};

const StateCard = ({ state }) => {

    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`state?name=${encodeURI(state)}`)}
            className="group bg-white p-3 sm:p-4 rounded-xl border border-purple-100 hover:border-purple-400 
             shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer relative
             overflow-hidden active:bg-purple-50 touch-manipulation"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-purple-500" />
                    <p className="text-xs sm:text-sm font-medium text-gray-700">{state}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-purple-400 transform translate-x-2 opacity-0 
                           group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </div>

            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 
                   to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </div>
    )
};

export default StateComponent;