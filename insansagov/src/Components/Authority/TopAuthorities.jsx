import React, { useEffect, useState } from 'react';
import TopAuthoritiesCard from './TopAuthoritiesCard';
import ViewMoreButton from '../Buttons/ViewMoreButton';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'; 
import axios from 'axios';
import API_BASE_URL from '../../Pages/config';


const TopAuthorities = (props) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(()=>{
        const fetchLogos = async () => {
            const response = await axios.get(`${API_BASE_URL}/api/organisation/logo`);
            
            if(response.status===200){
                console.log(response.data);
            }
        }

        fetchLogos();
    },[])

    const cards = [
        <TopAuthoritiesCard key={1} />,
        <TopAuthoritiesCard key={2} />,
        <TopAuthoritiesCard key={3} />,
        <TopAuthoritiesCard key={4} />,
        <TopAuthoritiesCard key={5} />,
        <TopAuthoritiesCard key={6} />,
        <TopAuthoritiesCard key={7} />,
        <TopAuthoritiesCard key={8} />
    ];

    const visibleCards = isExpanded ? cards : cards.slice(0, 4);

    return (
        <>
            {
                props.titleHidden
                    ? null
                    : <h1 className='flex text-center text-2xl justify-center mb-5 font-bold'>Top Government Authorities</h1>
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
    );
};

export default TopAuthorities;
