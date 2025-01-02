import React from 'react'
import Hero from '../../Components/Hero/Hero'
import LatestUpdates from '../../Components/Updates/LatestUpdates'
import TopAuthorities from '../../Components/Authority/TopAuthorities'

import curvLine from '../../assets/Landing/curvLine.svg'
import TopCategories from '../../Components/Categories/TopCategories'
import Contact from '../../Components/ContactUs/Contact'

const Landing = () => {
  return (
    <>
    <div>
      <Hero/>
    </div>
    <div  className="md:px-64">
      <LatestUpdates/>
      <TopAuthorities/>
      <TopCategories/>

    </div>
    <img
    className='w-full'
    src={curvLine}/>

      <Contact />
    </>
    
  )
}

export default Landing
