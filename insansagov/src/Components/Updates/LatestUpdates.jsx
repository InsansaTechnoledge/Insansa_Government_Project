import React, { useEffect, useState } from 'react'
import LatestUpdateCard from './LatestUpdateCard'
import ViewMoreButton from '../Buttons/ViewMoreButton'
import axios from 'axios';
import API_BASE_URL from '../../Pages/config';

const LatestUpdates = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [latestUpdates,setLatestUpdates] = useState();
  const [filteredLatestUpdates, setFilteredLatestUpdates] = useState();

  const handleToggle = () => {
    setIsExpanded(!isExpanded);

    if(!isExpanded){
      setFilteredLatestUpdates(latestUpdates);
    }
    else{
      setFilteredLatestUpdates(latestUpdates.slice(0,2));
    }
  };

  useEffect(()=>{
    const fetchLatestUpdates = async () => {
      const response = await axios.get(`${API_BASE_URL}/api/event/latest`);
      if(response.status===200){
        console.log(response.data);
        
        const sortedUpdates = await response.data.sort((a, b) => {
          const dateA = new Date(a.notificationDate);
          const dateB = new Date(b.notificationDate);
      
          // Check if the dates are valid, in case some of the dates are 'Not specified'
          if (isNaN(dateA) || isNaN(dateB)) {
            return 0; // Leave invalid dates in their original order
          }
      
          return dateB - dateA; // Descending order
        });
      
        setLatestUpdates(sortedUpdates.slice(0,5)); // Set the sorted data
        setFilteredLatestUpdates(sortedUpdates.slice(0,2));
        console.log(sortedUpdates.slice(0,5));
      }
    }

    fetchLatestUpdates();
  },[])


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
            {
              filteredLatestUpdates && filteredLatestUpdates.map((update, key) => {
                return <LatestUpdateCard key={key} name={update.examDetails.name} date={update.notificationDate} organization={update.organizationName} apply_link={update.examDetails.apply_link}/>
              })
            }

          </div>
      }
    </>
  )
}

export default LatestUpdates