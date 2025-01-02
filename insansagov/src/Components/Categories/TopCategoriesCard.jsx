import React from 'react'
import bank from '../../assets/Landing/bank.png'

const TopCategoriesCard = () => {
  return (
    <div className=' border flex content-center flex-col item-center justify-center'>
        <img
        className='w-28 flex content-center justify-center'
        src={bank}/>
        <p className='flex justify-center mt-2 text-gray-900 text-sm font-medium'>Bank</p>
    </div>
  )
}

export default TopCategoriesCard