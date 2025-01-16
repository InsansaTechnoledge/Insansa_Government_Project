import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const ViewPageButton = (props) => {

  return (
    <div>
        <button
              onClick={props.onClick}
              className="flex items-center gap-2 px-4 py-2 bg-purple-800 text-white rounded-md hover:bg-purple-900 transition duration-300"
            >
              View More
            </button>
    </div>
  )
}

export default ViewPageButton