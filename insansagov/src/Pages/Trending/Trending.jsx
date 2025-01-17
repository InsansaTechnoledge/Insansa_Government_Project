import React from "react";
import { Calendar, Building2, Bell, Filter, Search, RefreshCcw } from "lucide-react";

const TrendingPage = ({ trendingItems = [] }) => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [selectedOrg, setSelectedOrg] = React.useState("all");
    const [activeTab, setActiveTab] = React.useState("all");
    const [notifications, setNotifications] = React.useState({});

    const categorizedItems = {
        results: trendingItems.filter((item) => item.type === "result"),
        admitCards: trendingItems.filter((item) => item.type === "admitCard"),
        examDates: trendingItems.filter((item) => item.type === "examDate"),
    };

    const organizations = [...new Set(trendingItems.map(item => item.organization))];

    const filteredItems = (items) => {
        return items.filter(item =>
            (selectedOrg === "all" || item.organization === selectedOrg) &&
            (item.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.examName.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    };

    const toggleNotification = (id) => {
        setNotifications(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const UpdateCard = ({ item, colorScheme }) => (
        <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border ${colorScheme.border}`}>
            <div className="p-4">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <Building2 className={`h-5 w-5 ${colorScheme.icon}`} />
                            <h4 className={`text-lg font-medium ${colorScheme.title}`}>
                                {item.organization}
                            </h4>
                        </div>
                        <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 mb-2">
                            {item.type}
                        </span>
                        <p className="text-gray-700 font-medium">{item.examName}</p>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                            <Calendar className={`h-4 w-4 ${colorScheme.icon}`} />
                            {item.type === "result" && `Published: ${new Date(item.publishDate).toLocaleDateString()}`}
                            {item.type === "admitCard" && `Released: ${new Date(item.releaseDate).toLocaleDateString()}`}
                            {item.type === "examDate" && `Exam Date: ${new Date(item.examDate).toLocaleDateString()}`}
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex gap-2">
                    <button
                        className={`flex-1 px-4 py-2 rounded-md text-white font-medium transition-colors ${colorScheme.button}`}
                        onClick={() => window.open(item.link, '_blank')}
                    >
                        {item.type === "result" && "View Result"}
                        {item.type === "admitCard" && "Download Admit Card"}
                        {item.type === "examDate" && "View Exam Details"}
                    </button>
                    <button
                        onClick={() => toggleNotification(item.id)}
                        className={`p-2 rounded-md border transition-colors ${notifications[item.id] ? colorScheme.notificationActive : "border-gray-200 hover:bg-gray-50"
                            }`}
                    >
                        <Bell className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );

    const tabs = [
        { id: "all", label: "All Updates" },
        { id: "results", label: "Results" },
        { id: "admitCards", label: "Admit Cards" },
        { id: "examDates", label: "Exam Dates" }
    ];

    return (
        <div className="bg-white min-h-screen p-6">
            <div className="max-w-7xl mx-auto space-y-6  mt-28">
                {/* Header Section */}
                <div className="bg-white rounded-lg shadow-md">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-3xl font-bold text-purple-800">
                                🌟 Trending Updates
                            </h1>
                            <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors">
                                <RefreshCcw className="h-4 w-4" /> Refresh
                            </button>
                        </div>
                        <p className="text-gray-600">
                            Stay updated with the latest announcements from top government organizations
                        </p>
                    </div>
                    <div className="px-6 pb-6">
                        <div className="flex gap-4 flex-col sm:flex-row">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search by organization or exam..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <select
                                className="w-full sm:w-[200px] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={selectedOrg}
                                onChange={(e) => setSelectedOrg(e.target.value)}
                            >
                                <option value="all">All Organizations</option>
                                {organizations.map(org => (
                                    <option key={org} value={org}>{org}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex space-x-2 mb-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 rounded-md font-medium transition-colors ${activeTab === tab.id
                                        ? "bg-purple-100 text-purple-800"
                                        : "text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {activeTab === "all" && filteredItems(trendingItems).map(item => (
                            <UpdateCard
                                key={item.id}
                                item={item}
                                colorScheme={{
                                    border: "border-purple-200",
                                    icon: "text-purple-600",
                                    title: "text-purple-800",
                                    button: "bg-purple-600 hover:bg-purple-700",
                                    notificationActive: "bg-purple-100 border-purple-200 text-purple-600"
                                }}
                            />
                        ))}

                        {activeTab === "results" && filteredItems(categorizedItems.results).map(item => (
                            <UpdateCard
                                key={item.id}
                                item={item}
                                colorScheme={{
                                    border: "border-green-200",
                                    icon: "text-green-600",
                                    title: "text-green-800",
                                    button: "bg-green-600 hover:bg-green-700",
                                    notificationActive: "bg-green-100 border-green-200 text-green-600"
                                }}
                            />
                        ))}

                        {activeTab === "admitCards" && filteredItems(categorizedItems.admitCards).map(item => (
                            <UpdateCard
                                key={item.id}
                                item={item}
                                colorScheme={{
                                    border: "border-blue-200",
                                    icon: "text-blue-600",
                                    title: "text-blue-800",
                                    button: "bg-blue-600 hover:bg-blue-700",
                                    notificationActive: "bg-blue-100 border-blue-200 text-blue-600"
                                }}
                            />
                        ))}

                        {activeTab === "examDates" && filteredItems(categorizedItems.examDates).map(item => (
                            <UpdateCard
                                key={item.id}
                                item={item}
                                colorScheme={{
                                    border: "border-yellow-200",
                                    icon: "text-yellow-600",
                                    title: "text-yellow-800",
                                    button: "bg-yellow-600 hover:bg-yellow-700",
                                    notificationActive: "bg-yellow-100 border-yellow-200 text-yellow-600"
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <p className="text-sm text-gray-500 text-center">
                        Note: This page highlights updates from major government organizations. Keep checking back for
                        the latest results, admit cards, and exam schedules. For detailed updates, visit the respective
                        official websites linked above.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TrendingPage;