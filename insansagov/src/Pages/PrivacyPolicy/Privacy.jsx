import React, { useState } from 'react';

const PrivacyPolicy = () => {
    const [expandedSection, setExpandedSection] = useState(null);

    const sections = [
        {
            id: 'introduction',
            title: '1. Introduction',
            content: `Welcome to [Website Name] ("we," "our," or "us"), a platform that aggregates information about government examinations, results, and admit cards from various official government websites. This Privacy Policy explains how we collect, use, and protect information when you use our website.`
        },
        {
            id: 'sources',
            title: '2. Information Sources',
            subsections: [
                {
                    title: '2.1 Data Collection Sources',
                    content: [
                        'We aggregate publicly available information from official government websites',
                        'Content includes examination notifications, results, admit cards, and related updates',
                        'Government logos and official marks are displayed as they appear on their respective official websites',
                        'All information is collected through automated data aggregation from public sources'
                    ]
                },
                {
                    title: '2.2 Third-Party Content',
                    content: [
                        'Government logos and marks remain property of their respective departments',
                        'Links to original government websites are provided where applicable',
                        'Updates are time-stamped with reference to their source websites'
                    ]
                }
            ]
        },
        {
            id: 'collection',
            title: '3. Information We Collect From Users',
            subsections: [
                {
                    title: '3.1 Automatically Collected Information',
                    content: [
                        'Device information (IP address, browser type, operating system)',
                        'Usage statistics (pages visited, search queries, time spent)',
                        'Cookies for session management and preferences',
                        'Location data (state/region for relevant exam notifications)'
                    ]
                },
                {
                    title: '3.2 User-Provided Information (Optional)',
                    content: [
                        'Email address (if subscribed to notifications)',
                        'Preferred exam categories',
                        'State/region preferences',
                        'Notification preferences'
                    ]
                }
            ]
        }
    ];

    const TableOfContents = () => (
        <div className="bg-gray-50 p-4 rounded-lg mb-8 ">
            <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
            <nav>
                <ul className="space-y-2">
                    {sections.map(section => (
                        <li key={section.id}>
                            <a
                                href={`#${section.id}`}
                                className="text-blue-600 hover:text-blue-800 hover:underline"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                {section.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );

    const Section = ({ section }) => (
        <div id={section.id} className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">{section.title}</h2>
            {section.content && (
                <p className="text-gray-700 mb-4 leading-relaxed">{section.content}</p>
            )}
            {section.subsections && (
                <div className="space-y-6">
                    {section.subsections.map((subsection, index) => (
                        <div key={index} className="pl-4 border-l-2 border-gray-200">
                            <h3 className="text-lg font-semibold mb-3 text-gray-700">{subsection.title}</h3>
                            <ul className="space-y-2">
                                {Array.isArray(subsection.content) ? (
                                    subsection.content.map((item, i) => (
                                        <li key={i} className="text-gray-600 leading-relaxed flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-gray-600 leading-relaxed">{subsection.content}</p>
                                )}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 ">
            <header className="mb-8 text-center mt-32">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
                <p className="text-gray-600">Last updated: January 21, 2025</p>
            </header>

            <TableOfContents />

            <div className="bg-white rounded-lg shadow-sm p-6">
                {sections.map(section => (
                    <Section key={section.id} section={section} />
                ))}
            </div>

            <footer className="mt-8 text-center text-gray-600 text-sm">
                <p>For questions about this Privacy Policy, please contact us at:</p>
                <p className="mt-2">Email: privacy@[yourcompany].com</p>
            </footer>
        </div>
    );
};

export default PrivacyPolicy;