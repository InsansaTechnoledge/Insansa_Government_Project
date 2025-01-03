import React , {useState} from 'react'
import TopCategoriesCard from './TopCategoriesCard'
import ViewMoreButton from '../Buttons/ViewMoreButton'

const TopCategories = (props) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const cards = [
        <TopCategoriesCard key={1} />,
        <TopCategoriesCard key={2} />,
        <TopCategoriesCard key={3} />,
        <TopCategoriesCard key={4} />,
        <TopCategoriesCard key={5} />,
    ]

    const visibleCards = isExpanded ? cards : cards.slice(0, 4);

  return (
      <>
          {
              props.titleHidden
                  ? null
                  : <h1 className='flex text-center text-2xl justify-center mb-5 font-bold'>Top Categories</h1>
          }
          <div className='grid grid-cols-4 mb-5 gap-4'>
              {visibleCards}
          </div>
          <div className='flex justify-center mb-20'>
              <ViewMoreButton
                  content={isExpanded ? "view less ▲" : "View More ▼"}
                  onClick={handleToggle}
              />
          </div>
      </>
)
}

export default TopCategories