import React, { useState } from "react";
import { Search, Calendar, Building2, Filter, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdmitCardLanding = ({ admitCards = [] }) => {
    const [filter, setFilter] = useState("all");
    const navigate = useNavigate();

    const categories = ["All", "Civil Services", "Staff Selection", "Banking", "Defense"];

    const filteredCards = Array.isArray(admitCards)
        ? admitCards.filter((card) => {
            const matchesFilter = filter === "all" || card.category.toLowerCase() === filter;
            return matchesFilter;
        })
        : [];

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
                        {categories.map((category) => (
                            <option key={category} value={category.toLowerCase()}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {filteredCards.length > 0 ? (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredCards.slice(0, 3).map((card) => (
                            <div
                                key={card.id}
                                className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 border border-purple-100"
                            >
                                <div className="flex flex-col h-full">
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium text-purple-900 flex items-center gap-2">
                                                <Building2 className="h-4 w-4" />
                                                {card.organization}
                                            </h3>
                                            <span
                                                className={`px-2 py-0.5 rounded-full text-xs ${card.status === "active"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                    }`}
                                            >
                                                {card.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <p className="text-sm font-semibold mt-2">{card.examName}</p>
                                    </div>

                                    <div className="text-xs text-gray-600 space-y-1 mb-4">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-3 w-3" />
                                            Released: {new Date(card.releaseDate).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-3 w-3" />
                                            Last Date: {new Date(card.lastDate).toLocaleDateString()}
                                        </div>
                                    </div>

                                    <div className="mt-auto">
                                        <a
                                            href={card.link}
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
