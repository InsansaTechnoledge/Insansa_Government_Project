import React from 'react'
import OpportunityCarouselCard from './OpportunityCarouselCard'

const OpportunityCarousel = () => {
  return (
    <div>
        <h1 className='text-2xl justify-center mb-5 font-bold'>You might be looking for</h1>
            <div className='flex space-x-5 mb-20 overflow-x-auto'>
                <OpportunityCarouselCard/>
                <OpportunityCarouselCard/>
                <OpportunityCarouselCard/>
                <OpportunityCarouselCard/>
                <OpportunityCarouselCard/>
                <OpportunityCarouselCard/>
            </div>
    </div>
  )
}

export default OpportunityCarousel