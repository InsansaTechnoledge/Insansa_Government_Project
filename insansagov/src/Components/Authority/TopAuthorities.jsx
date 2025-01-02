import React from 'react'
import TopAuthoritiesCard from './TopAuthoritiesCard'
import ViewMoreButton from '../Buttons/ViewMoreButton'

const TopAuthorities = () => {

    return (
    <>
        <h1 className='flex text-center text-2xl justify-center mb-5 font-bold'>Top Government Authorities</h1>
        <div className='grid grid-cols-4 mb-5 gap-4'>
            <TopAuthoritiesCard/>
            <TopAuthoritiesCard/>
            <TopAuthoritiesCard/>
            <TopAuthoritiesCard/>
            <TopAuthoritiesCard/>
            <TopAuthoritiesCard/>
            <TopAuthoritiesCard/>
            <TopAuthoritiesCard/>
        </div>
        <div className='flex justify-center mb-20'>
            <ViewMoreButton content={"expand ▼"}/>
        </div>
    </>
  )
}

export default TopAuthorities