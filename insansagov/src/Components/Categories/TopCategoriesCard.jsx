import React from 'react'
import bank from '../../assets/Landing/bank.png'
import { useNavigate } from 'react-router-dom'

const TopCategoriesCard = () => {
  const navigate = useNavigate();
  return (
    <div 
    onClick={()=>navigate('/category')}
    className='flex flex-col justify-center hover:cursor-pointer hover:scale-110 transition-all duration-300'>
        <div className='flex justify-center'>
            <img
            className='w-24'
            src={bank}/>

        </div>
        <p className='flex justify-center mt-4 text-gray-900 text-sm font-medium'>Bank</p>
    </div>
  )
}

export default TopCategoriesCard