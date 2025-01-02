import React from 'react'
import LatestUpdateCard from './LatestUpdateCard'

const LatestUpdates = () => {

  return (
    <>
        <div className='flex justify-between mb-5'>
            <div className='font-bold text-xl flex items-center'>Latest Updates</div>
            <button className='bg-purple-800 px-5 py-2 rounded-md text-white hover:bg-purple-900'>view more</button>
        </div>
        <div className='space-y-5'>
            <LatestUpdateCard/>
            <LatestUpdateCard/>
            <LatestUpdateCard/>
        </div>
    </>
  )
}

export default LatestUpdates