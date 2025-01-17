import React, { useState } from "react";
import { Search, Calendar, Building2, Filter } from "lucide-react";
import ViewPageButton from "../Buttons/ViewPageButton";
import { useNavigate } from "react-router-dom";

const ResultsDashboard = ({ results = [] }) => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const navigate = useNavigate();

    const categories = ["All", "Civil Services", "Staff Selection", "Banking", "Defense"];

    const filteredResults = Array.isArray(results) ? results.filter((result) => {
        const matchesSearch =
            result.examName.toLowerCase().includes(search.toLowerCase()) ||
            result.organization.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "all" || result.category.toLowerCase() === filter;
        return matchesSearch && matchesFilter;
    }) : [];

    const viewAllResults = () => {
        navigate('/results');
    };

    return (
        <div className="bg-white p-6 rounded-lg ">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Latest Results</h2>

            {/* Search and Filter Section */}
            <div className="flex flex-col justify-end sm:flex-row gap-4 mb-6">
                <div className="relative">
                    <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <select
                        className="pl-10 h-10 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
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

            {/* Results Grid */}
            <div>
                {filteredResults.length > 0 ? (
                    <div className="flex flex-col">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredResults.slice(0, 3).map((result) => (
                                <div
                                    key={result.id}
                                    className="p-4 border border-purple-800 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col justify-between"
                                >
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                            <Building2 className="h-5 w-5" />
                                            {result.organization}
                                        </h3>
                                        <p className="font-medium mb-2">{result.examName}</p>
                                        <div className="text-sm text-gray-600">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Calendar className="h-4 w-4" />
                                                Published: {new Date(result.publishDate).toLocaleDateString()}
                                            </div>
                                            <span
                                                className={`inline-block mt-2 px-2 py-1 rounded-full text-xs ${result.status === "available"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                                    }`}
                                            >
                                                {result.status.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <a
                                            href={result.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block mt-4 px-4 py-2 bg-purple-800 text-white text-center rounded-md hover:bg-purple-900 transition-colors"
                                        >
                                            View Result
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {
                            filteredResults.length > 3
                                ?
                                <div className='flex justify-center mt-10'>
                                    <ViewPageButton onClick={viewAllResults} />
                                </div>
                                :
                                null
                        }
                    </div>
                ) : (
                    <p className="text-gray-500">No results found.</p>
                )}
            </div>
        </div>
    );
};

export default ResultsDashboard;
