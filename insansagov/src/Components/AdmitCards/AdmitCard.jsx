import React, { useEffect, useState } from "react";
import { Calendar, Building2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../Pages/config";

const AdmitCardLanding = () => {
    const [filter, setFilter] = useState("All");
    const navigate = useNavigate();
    const [categories,setCategories] = useState();
    const [filteredCards, setFilterCards] = useState();
    const [admitCards,setAdmitCards] = useState();

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
                ]))
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

    const viewAllAdmitCards = () => {
        navigate("/admit-card");
    };

    return (
        <div className="bg-gradient-to-br from-purple-50 to-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-purple-900">Latest Admit Cards</h2>
                    <p className="text-purple-600 mt-1">Download your exam admit cards</p>
                </div>
                <div className="flex items-center gap-4">
                    <select
                        className="h-9 rounded-full px-4 pr-8 border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-sm"
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

            {filteredCards && filteredCards.length > 0 ? (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredCards.slice(0, 3).map((card) => (
                            <div
                                key={card._id}
                                className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 border border-purple-100"
                            >
                                <div className="flex flex-col h-full">
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium text-purple-900 flex items-center gap-2">
                                                <Building2 className="h-4 w-4" />
                                                {card.abbreviation}
                                            </h3>
                                            <span
                                                className={`px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800`}
                                            >
                                                ACTIVE
                                            </span>
                                        </div>
                                        <p className="text-sm font-semibold mt-2">{card.name}</p>
                                    </div>

                                    <div className="text-xs text-gray-600 space-y-1 mb-4">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-3 w-3" />
                                            Released: {new Date(card.date_of_notification).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-3 w-3" />
                                            Last Date: {new Date(card.end_date).toLocaleDateString()}
                                        </div>
                                    </div>

                                    <div className="mt-auto">
                                        <a
                                            href={card.apply_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full py-2 bg-purple-100 hover:bg-purple-200 text-purple-900 text-sm font-medium text-center rounded-lg transition-colors duration-200"
                                        >
                                            Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredCards.length > 3 && (
                        <button
                            onClick={viewAllAdmitCards}
                            className="w-full mt-6 flex items-center justify-center gap-2 text-purple-700 hover:text-purple-900 font-medium transition-colors duration-200"
                        >
                            View All Admit Cards
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    )}
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-gray-500">No admit cards available for this category.</p>
                </div>
            )}
        </div>
    );
};

export default AdmitCardLanding;
