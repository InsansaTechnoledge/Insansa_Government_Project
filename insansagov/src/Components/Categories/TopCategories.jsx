import React from 'react'
import TopCategoriesCard from './TopCategoriesCard'
import ViewMoreButton from '../Buttons/ViewMoreButton'

const TopCategories = () => {
  return (
    <>
        <h1 className='flex text-center text-2xl justify-center mb-10 font-bold'>Top Categories</h1>
        <div className='grid grid-cols-4 gap-x-4 gap-y-8 mb-20'>
            <TopCategoriesCard/>
            <TopCategoriesCard/>
            <TopCategoriesCard/>
            <TopCategoriesCard/>
            <TopCategoriesCard/>
        </div>
        <div className='flex justify-center mb-20'>
            <ViewMoreButton content={"expand ▼"}/>

        </div>
    </>
)
}

export default TopCategories