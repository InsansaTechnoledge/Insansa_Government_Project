import React from "react";
import {
    Calendar,
    Building2,
    Bell,
    Filter,
    Search,
    RefreshCcw,
    ChevronRight,
} from "lucide-react";
import BackButton from "../../Components/BackButton/BackButton";

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

    const organizations = [...new Set(trendingItems.map((item) => item.organization))];

    const filteredItems = (items) => {
        return items.filter(
            (item) =>
                (selectedOrg === "all" || item.organization === selectedOrg) &&
                (item.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.examName.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    };

    const toggleNotification = (id) => {
        setNotifications((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const UpdateCard = ({ item, colorScheme }) => (
        <div className="bg-white shadow-md rounded-lg overflow-hidden transition-all hover:shadow-lg">
            <div className={`h-2 ${colorScheme.headerBg}`} />
            <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <div
                                className={`p-2.5 rounded-xl ${colorScheme.iconBg} ring-1 ring-inset ${colorScheme.iconRing}`}
                            >
                                <Building2 className={`h-5 w-5 ${colorScheme.icon}`} />
                            </div>
                            <div>
                                <h4
                                    className={`text-lg font-semibold ${colorScheme.title} line-clamp-1`}
                                >
                                    {item.organization}
                                </h4>
                                <span
                                    className={`text-xs font-medium ${colorScheme.typeBadge} px-2.5 py-0.5 rounded-full`}
                                >
                                    {item.type}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <p className="text-gray-900 font-medium text-lg line-clamp-2">
                        {item.examName}
                    </p>

                    <div
                        className={`inline-flex items-center gap-2 text-sm ${colorScheme.dateText} bg-gray-50 px-3 py-1.5 rounded-lg`}
                    >
                        <Calendar className="h-4 w-4" />
                        <span>
                            {item.type === "result" &&
                                `Published: ${new Date(item.publishDate).toLocaleDateString()}`}
                            {item.type === "admitCard" &&
                                `Released: ${new Date(item.releaseDate).toLocaleDateString()}`}
                            {item.type === "examDate" &&
                                `Exam Date: ${new Date(item.examDate).toLocaleDateString()}`}
                        </span>
                    </div>
                </div>

                <div className="flex gap-3 pt-2">
                    <button
                        className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-all duration-200 
                ${colorScheme.button} hover:shadow-lg active:scale-98 flex items-center justify-center gap-2`}
                        onClick={() => window.open(item.link, "_blank")}
                    >
                        <span>
                            {item.type === "result" && "View Result"}
                            {item.type === "admitCard" && "Download Admit Card"}
                            {item.type === "examDate" && "View Details"}
                        </span>
                        <ChevronRight className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => toggleNotification(item.id)}
                        className={`p-2.5 rounded-lg transition-all duration-200 
                ${notifications[item.id]
                                ? `${colorScheme.notificationActive} ring-1 ring-inset ${colorScheme.iconRing}`
                                : "bg-gray-50 hover:bg-gray-100"}`}
                    >
                        <Bell
                            className={`h-5 w-5 ${notifications[item.id] ? colorScheme.icon : "text-gray-500"}`}
                        />
                    </button>
                </div>
            </div>
        </div>
    );

    const tabs = [
        { id: "all", label: "All Updates", icon: Filter },
        { id: "results", label: "Results", icon: Building2 },
        { id: "admitCards", label: "Admit Cards", icon: Calendar },
        { id: "examDates", label: "Exam Dates", icon: Bell },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50">
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32 space-y-6">
                {/* Header Section */}
                <BackButton />
                <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="bg-purple-100 p-2 rounded-lg">
                                    <Building2 className="h-6 w-6 text-purple-600" />
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
                                    Trending Updates
                                </h1>
                            </div>
                            <p className="text-gray-600 text-sm sm:text-base">
                                Stay updated with the latest announcements from top organizations
                            </p>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-all duration-200 font-medium">
                            <RefreshCcw className="h-4 w-4" />
                            Refresh Updates
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by organization or exam name..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white placeholder-gray-400"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <select
                            className="w-full sm:w-[220px] px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white cursor-pointer"
                            value={selectedOrg}
                            onChange={(e) => setSelectedOrg(e.target.value)}
                        >
                            <option value="all">All Organizations</option>
                            {organizations.map((org) => (
                                <option key={org} value={org}>
                                    {org}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
                    <div className="flex flex-wrap gap-2 mb-8 border-b">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-3 font-medium transition-all duration-200 relative
                  ${activeTab === tab.id
                                        ? "text-purple-800 border-b-2 border-purple-600"
                                        : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                <tab.icon className="h-4 w-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activeTab === "all" &&
                            filteredItems(trendingItems).map((item) => (
                                <UpdateCard
                                    key={item.id}
                                    item={item}
                                    colorScheme={{
                                        headerBg: "bg-gradient-to-r from-purple-500 to-purple-600",
                                        icon: "text-purple-600",
                                        iconBg: "bg-purple-50",
                                        iconRing: "ring-purple-100",
                                        title: "text-purple-900",
                                        typeBadge: "bg-purple-50 text-purple-700",
                                        dateText: "text-purple-700",
                                        button: "bg-purple-600 hover:bg-purple-700",
                                        notificationActive: "bg-purple-50",
                                    }}
                                />
                            ))}

                        {activeTab === "results" &&
                            filteredItems(categorizedItems.results).map((item) => (
                                <UpdateCard
                                    key={item.id}
                                    item={item}
                                    colorScheme={{
                                        headerBg: "bg-gradient-to-r from-green-500 to-green-600",
                                        icon: "text-green-600",
                                        iconBg: "bg-green-50",
                                        iconRing: "ring-green-100",
                                        title: "text-green-900",
                                        typeBadge: "bg-green-50 text-green-700",
                                        dateText: "text-green-700",
                                        button: "bg-green-600 hover:bg-green-700",
                                        notificationActive: "bg-green-50",
                                    }}
                                />
                            ))}

                        {activeTab === "admitCards" &&
                            filteredItems(categorizedItems.admitCards).map((item) => (
                                <UpdateCard
                                    key={item.id}
                                    item={item}
                                    colorScheme={{
                                        headerBg: "bg-gradient-to-r from-blue-500 to-blue-600",
                                        icon: "text-blue-600",
                                        iconBg: "bg-blue-50",
                                        iconRing: "ring-blue-100",
                                        title: "text-blue-900",
                                        typeBadge: "bg-blue-50 text-blue-700",
                                        dateText: "text-blue-700",
                                        button: "bg-blue-600 hover:bg-blue-700",
                                        notificationActive: "bg-blue-50",
                                    }}
                                />
                            ))}

                        {activeTab === "examDates" &&
                            filteredItems(categorizedItems.examDates).map((item) => (
                                <UpdateCard
                                    key={item.id}
                                    item={item}
                                    colorScheme={{
                                        headerBg: "bg-gradient-to-r from-yellow-500 to-yellow-600",
                                        icon: "text-yellow-600",
                                        iconBg: "bg-yellow-50",
                                        iconRing: "ring-yellow-100",
                                        title: "text-yellow-900",
                                        typeBadge: "bg-yellow-50 text-yellow-700",
                                        dateText: "text-yellow-700",
                                        button: "bg-yellow-600 hover:bg-yellow-700",
                                        notificationActive: "bg-yellow-50",
                                    }}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrendingPage;
