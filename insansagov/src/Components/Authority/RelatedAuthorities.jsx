import React, { useEffect, useState } from 'react';
import TopAuthoritiesCard from './TopAuthoritiesCard';
import ViewMoreButton from '../Buttons/ViewMoreButton';


const RelatedAuthorities = (props) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [organizations, setOrganizations] = useState();
    const [filteredOrganisations, setFilteredOrganisations] = useState();

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
        if(!isExpanded){
            setFilteredOrganisations(organizations);
        }
        else{
            setFilteredOrganisations(organizations.slice(0,8));
        }
    };


    return (
        <>
            <div className='grid grid-cols-4 mb-5 gap-4'>
                {/* {visibleCards} */}
                {
                    filteredOrganisations && filteredOrganisations.map((org,key) => {
                        return <TopAuthoritiesCard key={key} name={org.name} logo={org.logo} id={org._id}/>
                    })
                }
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

export default RelatedAuthorities;
