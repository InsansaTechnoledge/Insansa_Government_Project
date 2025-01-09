import React, { useEffect, useState } from 'react';
import TopAuthoritiesCard from './TopAuthoritiesCard';
import ViewMoreButton from '../Buttons/ViewMoreButton';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'; 
import axios from 'axios';
import API_BASE_URL from '../../Pages/config';


const TopAuthorities = (props) => {
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

    useEffect(()=>{
        const fetchLogos = async () => {
            const response = await axios.get(`${API_BASE_URL}/api/organisation/logo`);
            
            if(response.status===200){
                setOrganizations(response.data[0].organizations);
                setFilteredOrganisations(response.data[0].organizations.slice(0,8));
            }
        }

        fetchLogos();
    },[])


    return (
        <>
            {
                props.titleHidden
                    ? null
                    : <h1 className='flex text-center text-2xl justify-center mb-5 font-bold'>Top Government Authorities</h1>
            }
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

export default TopAuthorities;
