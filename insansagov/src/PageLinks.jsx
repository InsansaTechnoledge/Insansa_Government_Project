import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Landing from './Pages/Landing/landing'
import Navbar from './Components/Navbar/Navbar'
import Opportunities from './Pages/Opportunities/Opportunities'
import Footer from './Components/Footer/Footer'
import SearchPage from './Pages/Search/Search'
import Authority from './Pages/Authority/Authority'
import ChatBot from './Components/ChatBot/ChatBot'
import ScrollToTop from './Components/ScrollTop/ScrollTopTo'
import ErrorPage from './Pages/Error/ErrorPage'
import Category from './Pages/Category/Category'
import AdmitCardDashboard from './Components/AdmitCards/AdmitCard'
import AdmitCard from './Pages/AdmitCard.jsx/AdmitCard'

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

    if (location.pathname === '/') {
        return null;
    }

    return (
        <div className='px-5 md:px-64'>
            <Routes>
                <Route path='/opportunity' element={<Opportunities />} />
                <Route path='/search' element={<SearchPage />} />
                <Route path='/organization' element={<Authority />} />
                <Route path='/category' element={<Category/>} />
                <Route path='/admit-card' element={<AdmitCard admitCards={admitCards}/>} />

                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </div>
    );
};



const PageLinks = () => {
    return (
        <Router>
            <ScrollToTop />
            <Navbar />
            <Routes>
                <Route path='/' element={<Landing />} />
            </Routes>
            <SecondRoutes />
            <ChatBot />
            <Footer />
        </Router>
    );
};

export default PageLinks;
