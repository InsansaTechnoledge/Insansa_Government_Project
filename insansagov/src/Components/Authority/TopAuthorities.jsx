import React, { useEffect, useState } from 'react';
import TopAuthoritiesCard from './TopAuthoritiesCard';
import ViewMoreButton from '../Buttons/ViewMoreButton';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import axios from 'axios';
import API_BASE_URL from '../../Pages/config';

const TopAuthorities = (props) => {
    const [organizations, setOrganizations] = useState([]);
    const [displayCount, setDisplayCount] = useState(8); // Initial count of displayed items

    // Fetch data from API
    useEffect(() => {
        const fetchLogos = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/organization/logo`);
                if (response.status === 200) {
                    setOrganizations(response.data);
                    console.log(response.data);
                }
            } catch (error) {
                console.error("Error fetching organizations:", error);
            }
        };
        fetchLogos();
    }, []);

    // Handle "View More"
    const handleViewMore = () => {
        setDisplayCount((prevCount) => Math.min(prevCount + 4, organizations.length));
    };

    // Handle "Close All"
    const handleCloseAll = () => {
        setDisplayCount(8);
    };

    return (
        <>
            {
                props.titleHidden
                    ? null
                    : <h1 className='flex text-center text-2xl justify-center mb-5 font-bold'>Central Government Authorities</h1>
            }
            <div className='grid grid-cols-4 mb-5 gap-4'>
                {
                    organizations.slice(0, displayCount).map((org, key) => (
                        <TopAuthoritiesCard key={key} name={org.abbreviation} logo={org.logo} id={org._id} />
                    ))
                }
            </div>
            <div className='flex justify-center gap-4 mb-20'>
                {/* Show "View More" button only if there are more items to load */}
                {displayCount < organizations.length && (
                    <ViewMoreButton
                        content="View More ▼"
                        onClick={handleViewMore}
                    />
                )}

                {/* Always show "Close All" button if more than 8 items are displayed */}
                {displayCount > 8 && (
                    <ViewMoreButton
                        content="Close All ▲"
                        onClick={handleCloseAll}
                    />
                )}
            </div>
        </>
    );
};

export default TopAuthorities;
