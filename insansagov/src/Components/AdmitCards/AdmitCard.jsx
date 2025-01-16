import React, { useState } from "react";
import { Search, Calendar, Building2, Filter } from "lucide-react";

const AdmitCardDashboard = () => {
    const [admitCards, setAdmitCards] = useState([
        {
            id: 1,
            organization: "UPSC",
            examName: "Civil Services Preliminary Exam 2025",
            releaseDate: "2025-01-10",
            lastDate: "2025-02-15",
            category: "Civil Services",
            status: "active",
            link: "https://example.com/upsc",
        },
        {
            id: 2,
            organization: "SSC",
            examName: "Combined Graduate Level Exam 2025",
            releaseDate: "2025-01-05",
            lastDate: "2025-01-30",
            category: "Staff Selection",
            status: "active",
            link: "https://example.com/ssc",
        },
    ]);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const categories = ["All", "Civil Services", "Staff Selection", "Banking", "Defense"];

    const filteredCards = admitCards.filter((card) => {
        const matchesSearch =
            card.examName.toLowerCase().includes(search.toLowerCase()) ||
            card.organization.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === "all" || card.category === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-white p-4 ">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Government Admit Cards</h1>

                {/* Search and Filter Section */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by exam name or organization"
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
                            {categories.map((category) => (
                                <option key={category} value={category.toLowerCase()}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCards.map((card) => (
                        <div
                            key={card.id}
                            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
                        >
                            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                <Building2 className="h-5 w-5" />
                                {card.organization}
                            </h2>
                            <h3 className="font-medium mb-2">{card.examName}</h3>
                            <div className="text-sm text-gray-600">
                                <div className="flex items-center gap-2 mb-1">
                                    <Calendar className="h-4 w-4" />
                                    Released: {new Date(card.releaseDate).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-2 mb-1">
                                    <Calendar className="h-4 w-4" />
                                    Last Date: {new Date(card.lastDate).toLocaleDateString()}
                                </div>
                                <span
                                    className={`inline-block mt-2 px-2 py-1 rounded-full text-xs ${card.status === "active"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                        }`}
                                >
                                    {card.status.toUpperCase()}
                                </span>
                            </div>
                            <a
                                href={card.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block mt-4 px-4 py-2 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Download Admit Card
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdmitCardDashboard;
