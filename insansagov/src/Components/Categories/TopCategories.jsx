import React, { useState } from 'react';
import TopCategoriesCard from './TopCategoriesCard';
import ViewMoreButton from '../Buttons/ViewMoreButton';

const TopCategories = (props) => {
    const [displayCount, setDisplayCount] = useState(4); // Initial number of visible cards

    // Dummy data for the cards
    const cards = [
        <TopCategoriesCard key={1} />,
        <TopCategoriesCard key={2} />,
        <TopCategoriesCard key={3} />,
        <TopCategoriesCard key={4} />,
        <TopCategoriesCard key={5} />,
        <TopCategoriesCard key={6} />,
        <TopCategoriesCard key={7} />,
        <TopCategoriesCard key={8} />,
    ];

    // Handle "View More"
    const handleViewMore = () => {
        setDisplayCount((prevCount) => Math.min(prevCount + 4, cards.length));
    };

    // Handle "Close All"
    const handleCloseAll = () => {
        setDisplayCount(4); // Reset to initial 4 cards
    };

    return (
        <>
            {
                props.titleHidden
                    ? null
                    : <h1 className='flex text-center text-2xl justify-center mb-5 font-bold'>Top Categories</h1>
            }
            <div className='grid grid-cols-4 mb-5 gap-4'>
                {cards.slice(0, displayCount)}
            </div>
            <div className='flex justify-center gap-4 mb-20'>
                {/* Show "View More" button only if there are more cards to display */}
                {displayCount < cards.length && (
                    <ViewMoreButton
                        content="View More ▼"
                        onClick={handleViewMore}
                    />
                )}

                {/* Always show "Close All" button if more than 4 cards are displayed */}
                {displayCount > 4 && (
                    <ViewMoreButton
                        content="Close All ▲"
                        onClick={handleCloseAll}
                    />
                )}
            </div>
        </>
    );
};

export default TopCategories;
