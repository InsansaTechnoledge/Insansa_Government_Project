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

const SecondRoutes = () => {
    const location = useLocation();

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
                <Route path='/admit-card' element={<AdmitCardDashboard />} />

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
