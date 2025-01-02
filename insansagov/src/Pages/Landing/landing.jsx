import React from 'react'
import Hero from '../../Components/Hero/Hero'
import LatestUpdates from '../../Components/Updates/LatestUpdates'
import TopAuthorities from '../../Components/Authority/TopAuthorities'

import curvLine from '../../assets/Landing/curvLine.svg'

const Landing = () => {
  return (
    <>
    <div>
      <Hero/>
    </div>
    <div  className="md:px-64">
      <LatestUpdates/>
      <TopAuthorities/>
    </div>
    <img
    className='w-full'
    src={curvLine}/>
    </>
  )
}

export default Landing
