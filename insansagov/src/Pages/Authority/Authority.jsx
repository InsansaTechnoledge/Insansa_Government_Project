import React, { useState, useEffect } from 'react'
import logo from '../../assets/Landing/UPSC.webp'
import LatestUpdates from '../../Components/Updates/LatestUpdates'
import OpportunityCarouselCard from '../../Components/OpportunityCarousel/OpportunityCarouselCard'
import ViewMoreButton from '../../Components/Buttons/ViewMoreButton';
import TopAuthorities from '../../Components/Authority/TopAuthorities';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config';
import AuthorityLatestUpdates from '../../Components/Authority/AuthorityLatesUpdate';

const cards = [
    { title: 'Exam Schedule 2025', authority: 'Education Board', latestUpdate: '1/1/2025' },
    { title: 'Result Announcement', authority: 'University XYZ', latestUpdate: '12/25/2024' },
    { title: 'Application Deadline', authority: 'Scholarship Authority', latestUpdate: '12/15/2024' },
    { title: 'Course Enrollment', authority: 'Online Academy', latestUpdate: '11/30/2024' },
    { title: 'Internship Program', authority: 'Tech Corp', latestUpdate: '11/20/2024' },
    { title: 'Job Fair 2025', authority: 'Career Center', latestUpdate: '10/25/2024' },
    { title: 'Exam Schedule 2025', authority: 'Education Board', latestUpdate: '1/1/2025' },
    { title: 'Result Announcement', authority: 'University XYZ', latestUpdate: '12/25/2024' },
    { title: 'Application Deadline', authority: 'Scholarship Authority', latestUpdate: '12/15/2024' },
    { title: 'Course Enrollment', authority: 'Online Academy', latestUpdate: '11/30/2024' },
    { title: 'Internship Program', authority: 'Tech Corp', latestUpdate: '11/20/2024' },
    { title: 'Job Fair 2025', authority: 'Career Center', latestUpdate: '10/25/2024' }
];


const Authority = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [organization, setOrganization] = useState();
    const [latestUpdates, setLatestUpdates] = useState();
    const location = useLocation();
    const [events,setEvents] = useState();
    const [filteredEvents, setFilteredEvents] = useState();

    // Parse the query parameters
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get("name"); // Access the 'name' parameter
    
    useEffect(() => {
        
        const fetchOrganization = async () => {
          const response = await axios.get(`${API_BASE_URL}/api/organization/${name}`);
          
          if(response.status===201){
            console.log(response.data);
            setOrganization(response.data);
            

            const sortedUpdates = response.data.inforamation.sort((a, b) => {
                const dateA = new Date(a.notificationDate);
                const dateB = new Date(b.notificationDate);
            
                // Check if the dates are valid, in case some of the dates are 'Not specified'
                if (isNaN(dateA) || isNaN(dateB)) {
                  return 0; // Leave invalid dates in their original order
                }
            
                return dateB - dateA; // Descending order
              });

              setLatestUpdates(sortedUpdates);
              setEvents(sortedUpdates);
              setFilteredEvents(sortedUpdates.slice(0,6));
              
            

        }
        }
    
        fetchOrganization();
      }, [location])

        

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
        if(!isExpanded){
            setFilteredEvents(events);
        }
        else{
            setFilteredEvents(events.slice(0,6));
        }
    };

    const visibleCards = isExpanded ? cards : cards.slice(0, 6);

    if(!organization){
        return <div className='pt-20'>Loading...</div>
    }

    return (
        <div className='pt-28'>
            <div className='flex flex-col justify-center mb-28'>
                <img src={`data:image/png;base64,${organization.logo}`} className='w-28 self-center mb-5' />
                <h1 className='text-3xl self-center font-bold mb-5'>{organization.fullName}</h1>
                <div className='self-center text-center'>{organization.description}</div>
            </div>
            <AuthorityLatestUpdates latestUpdates={latestUpdates} name={organization.name}/>
            <div className='font-bold text-2xl flex items-center mb-5'>Events under {organization.name}</div>
            <div className='grid grid-cols-3 gap-7 mb-10'>
                {filteredEvents && filteredEvents.map((item, index) => (
                    <OpportunityCarouselCard index={index} item={item} authority={organization.name} />
                ))}
            </div>
            {
                organization.inforamation.length > 6
                ?
                <div className='flex justify-center mb-20'>
                    <ViewMoreButton content={isExpanded ? "view less ▲" : "View More ▼"}
                        onClick={handleToggle} />
                </div>
                :
                null    
        }
            <h1 className='text-2xl md:text-3xl font-bold text-gray-900 mb-5'>
                Related Authorities
            </h1>
            <TopAuthorities titleHidden={true} />
        </div>

    )
}

export default Authority
