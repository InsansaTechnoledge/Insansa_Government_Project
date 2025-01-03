import React, { useState } from 'react'
import LatestUpdateCard from './LatestUpdateCard'
import ViewMoreButton from '../Buttons/ViewMoreButton'

const LatestUpdates = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const cards = [
    <LatestUpdateCard  key={1} />,
    <LatestUpdateCard key={1} />,
    <LatestUpdateCard key={1} />,
    <LatestUpdateCard key={1} />,
  ]

  const visibleCards = isExpanded ? cards : cards.slice(0, 2);

  return (
    <>
        <div className='flex justify-between mb-5'>
            <div className='font-bold text-2xl flex items-center'>Latest Updates</div>
        <ViewMoreButton
          content={isExpanded ? "view less ▲" : "View More ▼"}
          onClick={handleToggle}
        />
        </div>

      {
        props.titleHidden
          ? null
        :
          <div className='space-y-5 mb-10'>
            {visibleCards}
          </div>
      }
    </>
  )
}

export default LatestUpdates