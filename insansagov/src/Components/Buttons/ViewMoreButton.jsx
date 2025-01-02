import React from 'react'

const ViewMoreButton = ({content, onClick}) => {
  return (
    <button 
    onClick={onClick}
    className='bg-purple-800 px-5 py-2 rounded-md text-white hover:bg-purple-900'>{content}</button>
  )
}

export default ViewMoreButton