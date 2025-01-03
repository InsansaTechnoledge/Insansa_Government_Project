import React from 'react'
import Hero from '../../Components/Hero/Hero'
import LatestUpdates from '../../Components/Updates/LatestUpdates'
import TopAuthorities from '../../Components/Authority/TopAuthorities'

import curvLine from '../../assets/Landing/curvLine.svg'
import TopCategories from '../../Components/Categories/TopCategories'
import Contact from '../../Components/ContactUs/Contact'
import FeaturePage from '../../Components/FeatureAdvertisement/Features'
import FeatureBand from '../../Components/FeatureAdvertisement/FeatureBand'
import OpportunityCarousel from '../../Components/OpportunityCarousel/OpportunityCarousel'

const Landing = () => {
  return (
    <>
    <div>
      <Hero/>
    </div>
    <div  className="px-5 md:px-64">
      <LatestUpdates/>
      <OpportunityCarousel/>
      <TopAuthorities/>
      <TopCategories/>

    </div>
    <img
    className='w-full mb-20'
    src={curvLine}/>
    <div id='about'>

      <FeatureBand />
      </div>
    <div className='px-5 md:px-64'>
      <FeaturePage/>
      <div id='contact'>
        <Contact />

      </div>
    </div>
    </>
    
  )
}

export default Landing
