import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Lazy load the components
const Landing = lazy(() => import('./Pages/Landing/landing'));
const Navbar = lazy(() => import('./Components/Navbar/Navbar'));
const Opportunities = lazy(() => import('./Pages/Opportunities/Opportunities'));
const Footer = lazy(() => import('./Components/Footer/Footer'));
const SearchPage = lazy(() => import('./Pages/Search/Search'));
const Authority = lazy(() => import('./Pages/Authority/Authority'));
const ChatBot = lazy(() => import('./Components/ChatBot/ChatBot'));
const ScrollToTop = lazy(() => import('./Components/ScrollTop/ScrollTopTo'));
const ErrorPage = lazy(() => import('./Pages/Error/ErrorPage'));
const Category = lazy(() => import('./Pages/Category/Category'));
const AdmitCard = lazy(() => import('./Pages/AdmitCard/AdmitCard'));
const Results = lazy(() => import('./Pages/ResultPage/ResultPage'));
const TrendingPage = lazy(() => import('./Pages/Trending/Trending'));
const StatePage = lazy(() => import('./Pages/State/StatePage'));
const PrivacyPolicy = lazy(() => import('./Pages/PrivacyPolicy/Privacy'));
const PortalCoverPage = lazy(() => import('./Pages/FutureStartPage/PortalCoverPage'));
const Unsubscribe = lazy(()=>import('./Pages/Unsubscribe/Unsubscribe')); 

const SecondRoutes = () => {
    const location = useLocation();

    const admitCards = [
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
        {
            id: 3,
            organization: "IBPS",
            examName: "IBPS PO Exam 2025",
            releaseDate: "2025-01-15",
            lastDate: "2025-02-20",
            category: "Banking",
            status: "active",
            link: "https://example.com/ibps",
        },
        {
            id: 4,
            organization: "NDA",
            examName: "National Defense Academy Exam 2025",
            releaseDate: "2025-01-18",
            lastDate: "2025-02-25",
            category: "Defense",
            status: "active",
            link: "https://example.com/nda",
        },
        {
            id: 5,
            organization: "SSC",
            examName: "SSC CHSL Exam 2025",
            releaseDate: "2025-01-02",
            lastDate: "2025-01-28",
            category: "Staff Selection",
            status: "inactive",
            link: "https://example.com/ssc-chsl",
        },
    ];

    const dummyResults = [
        {
            id: 1,
            organization: "Union Public Service Commission",
            examName: "Civil Services Exam Result",
            publishDate: "2025-01-10",
            category: "civil services",
            status: "available",
            link: "https://www.upsc.gov.in/results",
        },
        {
            id: 2,
            organization: "Staff Selection Commission",
            examName: "CHSL Tier 1 Result",
            publishDate: "2025-01-05",
            category: "staff selection",
            status: "available",
            link: "https://ssc.nic.in/results",
        },
        {
            id: 3,
            organization: "State Bank of India",
            examName: "Probationary Officer Result",
            publishDate: "2025-01-12",
            category: "banking",
            status: "available",
            link: "https://sbi.co.in/results",
        },
        {
            id: 4,
            organization: "Indian Army",
            examName: "Soldier GD Result",
            publishDate: "2025-01-08",
            category: "defense",
            status: "available",
            link: "https://joinindianarmy.nic.in/results",
        },
        {
            id: 5,
            organization: "Institute of Banking Personnel Selection",
            examName: "Clerk Prelims Result",
            publishDate: "2025-01-15",
            category: "banking",
            status: "available",
            link: "https://ibps.in/results",
        },
    ];

    const trendingItems = [
        {
            id: 1,
            organization: "Union Public Service Commission",
            examName: "Civil Services Exam Result",
            type: "result",
            publishDate: "2025-01-10",
            link: "https://www.upsc.gov.in/results",
        },
        {
            id: 2,
            organization: "Staff Selection Commission",
            examName: "CHSL Admit Card",
            type: "admitCard",
            releaseDate: "2025-01-05",
            link: "https://ssc.nic.in/admit-card",
        },
        {
            id: 3,
            organization: "State Bank of India",
            examName: "Clerk Exam Date",
            type: "examDate",
            examDate: "2025-01-15",
            link: "https://sbi.co.in/exam-dates",
        },
    ];

    if (location.pathname === '/') {
        return null;
    }

    return (
        <div className='px-5 md:px-64'>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path='/opportunity' element={<Opportunities />} />
                    <Route path='/search' element={<SearchPage />} />
                    <Route path='/organization' element={<Authority />} />
                    <Route path='/category' element={<Category />} />
                    <Route path='/admit-card' element={<AdmitCard admitCards={admitCards} />} />
                    <Route path='/results' element={<Results results={dummyResults} />} />
                    <Route path='/trending' element={<TrendingPage trendingItems={trendingItems} />} />
                    <Route path='/state' element={<StatePage />} />
                    <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                    <Route path='*' element={<ErrorPage />} />
                    <Route path='/unsubscribe' element={<Unsubscribe />} />
                </Routes>
            </Suspense>
        </div>
    );
};

const PageLinks = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path='/cover' element={<PortalCoverPage />} />
                </Routes>
                <ScrollToTop />
                <Navbar />
                <Routes>
                    <Route path='/' element={<Landing />} />
                </Routes>
                <SecondRoutes />
                <ChatBot />
                <Footer />
            </Suspense>

        </Router>
    );
};

export default PageLinks;
