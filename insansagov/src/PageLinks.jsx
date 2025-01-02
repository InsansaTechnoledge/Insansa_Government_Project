import React from 'react'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
import Landing from './Pages/Landing/landing'


const PageLinks = () => {
  return (
    <div>
        <Router>
            <Routes>
                  <Route path="/" element= {<Landing/>} />
       
            </Routes>
        </Router>
    </div>
  )
}

export default PageLinks
