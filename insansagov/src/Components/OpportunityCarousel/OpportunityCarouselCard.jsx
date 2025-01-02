import React from 'react'
import ViewMoreButton from '../Buttons/ViewMoreButton'

const OpportunityCarouselCard = () => {
  return (
    <div className='p-2 bg-purple-50  rounded-lg relative border-purple-600 border-2 hover:scale-105 hover:transition-all duration-300'>
        <div className='flex flex-col justify-between'>
            <div className='font-medium'>Exam/Result/Schedule Name</div>
            <div className='text-gray-600'>Authority name</div>
        </div>
        <div className='flex justify-between p-20'>
        <div className='text-sm font-semibold mr-10'>
            Latest Update - 1/1/2025
        </div>
        <button className='text-xs bg-purple-800 px-3 py-2 rounded-md text-white hover:bg-purple-900'>view details</button>
        </div>
    </div>
  )
}

export default OpportunityCarouselCard