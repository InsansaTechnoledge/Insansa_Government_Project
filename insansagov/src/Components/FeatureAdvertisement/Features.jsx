import React from 'react';
import {
    Calendar,
    Shield,
    Smartphone,
    Globe,
    Users,
    Star
} from 'lucide-react';

const FeaturePage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-purple-400 py-20">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-800" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Never Miss an Important Exam Date Again
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
                        Your go-to platform for accurate, up-to-date, and user-friendly government exam schedules and deadlines.
                    </p>
                </div>
            </div>

            {/* Main Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Features Designed for Your Success
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Simplify your exam preparation journey with these powerful tools.
                    </p>
                </div>

                <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {/* Feature 1 */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">Accurate Dates</h3>
                            <p className="text-gray-600">
                                Get reliable and updated information on all government exam schedules.
                            </p>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                            <Shield className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">Secure Information</h3>
                            <p className="text-gray-600">
                                Access verified and trustworthy data with complete peace of mind.
                            </p>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                            <Smartphone className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">Mobile Friendly</h3>
                            <p className="text-gray-600">
                                Check exam dates anytime, anywhere with our responsive design.
                            </p>
                        </div>
                    </div>

                    {/* Feature 4 */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                            <Globe className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">National Coverage</h3>
                            <p className="text-gray-600">
                                Stay updated with exam dates from all over the country.
                            </p>
                        </div>
                    </div>

                    {/* Feature 5 */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">Personalized Reminders</h3>
                            <p className="text-gray-600">
                                Set custom notifications to never miss a deadline.
                            </p>
                        </div>
                    </div>

                    {/* Feature 6 */}
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                            <Star className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">User-Friendly Interface</h3>
                            <p className="text-gray-600">
                                Navigate effortlessly through our intuitive and simple platform.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturePage;
