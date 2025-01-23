import React, { useEffect, useState } from "react";
import { Search, Calendar, Building2, Filter } from "lucide-react";
import axios from "axios";
import API_BASE_URL from "../config";

const AdmitCard = () => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [categories, setCategories] = useState();
    const [admitCards,setAdmitCards] = useState();
    const [filteredCards, setFilterCards] = useState();

    // const categories = ["All", "Civil Services", "Staff Selection", "Banking", "Defense"];

    useEffect(()=>{
        const fetchAdmitCards = async () => {
            const response = await axios.get(`${API_BASE_URL}/api/admitCard/`);
            if(response.status===201){
                setAdmitCards(response.data);
            }
        }

        const fetchCategories = async () => {
            const response = await axios.get(`${API_BASE_URL}/api/category/getcategories`);
            if(response.status===200){
                setCategories(response.data.map(cat => cat.category));
                setCategories(prev => ([
                    "All",
                    ...prev
                ]));
            }
        }
        fetchAdmitCards();
        fetchCategories();

    },[]);

    useEffect(()=>{
                if(categories && admitCards){
                    setFilterCards(Array.isArray(admitCards)
                    ? admitCards.filter((card) => {
                        const matchesFilter = filter === "All" || card.category === filter;
                        return matchesFilter;
                    })
                    : []);
                
                }
            },[categories, admitCards, filter]);


    return (
        <div className="bg-white pt-28 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Latest Admit Cards</h2>

            {/* Search and Filter Section */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search exams or organizations"
                        className="pl-10 w-full h-10 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="relative">
                    <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <select
                        className="pl-10 h-10 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        {categories && categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Cards Grid */}
            <div>
                {filteredCards && filteredCards.length > 0 ? (
                    <div className="flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCards.map((card) => (
                        <div
                            key={card._id}
                            className="p-4 border border-purple-800 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col justify-between"
                        >
                            <div>
                            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                <Building2 className="h-5 w-5" />
                                {card.abbreviation}
                            </h3>
                            <p className="font-medium mb-2">{card.name}</p>
                            <div className="text-sm text-gray-600">
                                <div className="flex items-center gap-2 mb-1">
                                    <Calendar className="h-4 w-4" />
                                    Released: {new Date(card.date_of_notification).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Calendar className="h-4 w-4" />
                                    Last Date: {new Date(card.end_date).toLocaleDateString()}
                                </div>
                                <span
                                    className={`inline-block mt-2 px-2 py-1 rounded-full text-xsbg-green-100 text-green-800`}
                                >
                                    ACTIVE
                                </span>
                            </div>
                                    </div>
                            <div>
                            <a
                                href={card.apply_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block mt-4 px-4 py-2 bg-purple-800 text-white text-center rounded-md hover:bg-purple-900 transition-colors"
                            >
                                Download Admit Card
                            </a>
                            </div>
                        </div>
                        
                    ))}
                    </div>
                    
                    </div>
                        
                    
                ) : (
                    <p className="text-gray-500">No admit cards found.</p>
                )}
            </div>
        </div>
    );
};

export default AdmitCard;
