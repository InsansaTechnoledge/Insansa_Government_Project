import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './Pages/Landing/landing'
import Navbar from './Components/Navbar/Navbar'
import Opportunities from './Pages/Opportunities/Opportunities'
import Footer from './Components/Footer/Footer'
import SearchPage from './Pages/Search/Search'
import ChatBot from './Components/ChatBot/ChatBot'

const PageLinks = () => {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Landing/>}/>
        </Routes>

        <div className='px-5 md:px-64'>
        <Routes>
          <Route path='/opportunity' element={<Opportunities/>} />
          <Route path='/search' element={<SearchPage/>} />
          </Routes>

        </div>
        <ChatBot/>
        <Footer/>

      </Router>
    </>
  )
}

export default PageLinks
