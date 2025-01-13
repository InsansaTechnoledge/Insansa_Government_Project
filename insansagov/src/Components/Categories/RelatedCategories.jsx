import React, { useState, useEffect } from 'react';
import TopCategoriesCard from './TopCategoriesCard';
import ViewMoreButton from '../Buttons/ViewMoreButton';
import axios from 'axios';
import API_BASE_URL from '../../Pages/config';

const RelatedCategories = (props) => {
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);

    // const handleToggle = () => {
    //     setIsExpanded(!isExpanded);
    //     setFilteredCategories(isExpanded ? categories.slice(0, 4) : categories);
    // };

    useEffect(() => {
        if(props.categories){
            setCategories(props.categories);

            // setFilteredCategories(isExpanded ? categories.slice(0,4) : props.categories);
        }
    }, [props]);

    return (
        <>
            <div className="grid grid-cols-4 mb-5 gap-4">
                {categories.map((category, key) => (
                    <TopCategoriesCard key={key} name={category.name} logo={category.logo} id={category._id} />
                ))}
            </div>
            {/* <div className="flex justify-center gap-4 mb-20">
                <ViewMoreButton
                    content={isExpanded ? 'Close All ▲' : 'View More ▼'}
                    onClick={handleToggle}
                />
            </div> */}
        </>
    );
};

export default RelatedCategories;

