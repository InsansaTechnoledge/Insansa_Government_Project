import React from 'react'
import LatestUpdateCard from './LatestUpdateCard'
import ViewMoreButton from '../Buttons/ViewMoreButton'

const LatestUpdates = () => {

  return (
    <>
        <div className='flex justify-between mb-5'>
            <div className='font-bold text-2xl flex items-center'>Latest Updates</div>
            <ViewMoreButton content={"view more"}/>
        </div>
        <div className='space-y-5 mb-10'>
            <LatestUpdateCard/>
            <LatestUpdateCard/>
            <LatestUpdateCard/>
        </div>
    </>
  )
}

export default LatestUpdates