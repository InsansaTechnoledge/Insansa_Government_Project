import React from 'react'
import Hero from '../../Components/Hero/Hero'
import LatestUpdates from '../../Components/Updates/LatestUpdates'
import TopAuthorities from '../../Components/Authority/TopAuthorities'

import curvLine from '../../assets/Landing/curvLine.svg'
import TopCategories from '../../Components/Categories/TopCategories'
import Contact from '../../Components/ContactUs/Contact'
import FeaturePage from '../../Components/FeatureAdvertisement/Features'

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
    className='w-full mb-20'
    src={curvLine}/>

    <div className='md:px-64'>
      <FeaturePage/>
      <Contact />
    </div>
    </>
    
  )
}

export default Landing
