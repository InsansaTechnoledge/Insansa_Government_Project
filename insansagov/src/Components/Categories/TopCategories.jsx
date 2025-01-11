import React, { useState, useEffect } from 'react';
import TopCategoriesCard from './TopCategoriesCard';
import ViewMoreButton from '../Buttons/ViewMoreButton';
import axios from 'axios';
import API_BASE_URL from '../../Pages/config';

const TopCategories = (props) => {
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
        setFilteredCategories(isExpanded ? categories.slice(0, 4) : categories);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/category/getCategories`);
                if (response.status === 200) {
                    setCategories(response.data);
                    setFilteredCategories(response.data.slice(0, 4));
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <>
            {!props.titleHidden && (
                <h1 className="flex text-center text-2xl justify-center mb-5 font-bold">
                    Top Categories
                </h1>
            )}
            <div className="grid grid-cols-4 mb-5 gap-4">
                {filteredCategories.map((category, key) => (
                    <TopCategoriesCard key={key} name={category.name} logo={category.logo} id={category._id} />
                ))}
            </div>
            <div className="flex justify-center gap-4 mb-20">
                <ViewMoreButton
                    content={isExpanded ? 'Close All ▲' : 'View More ▼'}
                    onClick={handleToggle}
                />
            </div>
        </>
    );
};

export default TopCategories;

