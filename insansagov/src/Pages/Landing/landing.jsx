import React from 'react'
import Hero from '../../Components/Hero/Hero'
import LatestUpdates from '../../Components/Updates/LatestUpdates'

const Landing = () => {
  return (
    <>
    <div>
      <Hero/>
    </div>
    <div  className="md:px-64">
      <LatestUpdates/>
    </div>
    </>
  )
}

export default Landing
