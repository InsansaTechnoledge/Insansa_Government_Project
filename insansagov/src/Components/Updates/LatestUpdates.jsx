import React, { useEffect, useState, useCallback } from 'react';
import LatestUpdateCard from './LatestUpdateCard';
import ViewMoreButton from '../Buttons/ViewMoreButton';
import axios from 'axios';
import API_BASE_URL from '../../Pages/config';

const LatestUpdates = ({ titleHidden }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [latestUpdates, setLatestUpdates] = useState([]);
  const [filteredLatestUpdates, setFilteredLatestUpdates] = useState([]);

  // Toggle View More/View Less
  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
    setFilteredLatestUpdates((prevIsExpanded) =>
      !prevIsExpanded ? latestUpdates : latestUpdates.slice(0, 2)
    );
  }, [latestUpdates]);

  // Fetch latest updates from API
  useEffect(() => {
    const fetchLatestUpdates = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/event/latest`);
        if (response.status === 201) {
          const sortedUpdates = response.data.sort((a, b) => {
            const dateA = new Date(a.date_of_notification);
            const dateB = new Date(b.date_of_notification);
            return isNaN(dateA) || isNaN(dateB) ? 0 : dateB - dateA; // Sort by date descending
          });

          setLatestUpdates(sortedUpdates.slice(0, 5));
          setFilteredLatestUpdates(sortedUpdates.slice(0, 2));
        }
      } catch (error) {
        console.error('Error fetching latest updates:', error);
      }
    };

    fetchLatestUpdates();
  }, []);

  return (
    <>
      <div className="flex justify-between mb-5">
        <div className="font-bold text-2xl flex items-center">Latest Updates</div>
        <ViewMoreButton
          content={isExpanded ? 'View Less ▲' : 'View More ▼'}
          onClick={handleToggle}
        />
      </div>

      {!titleHidden && (
        <div className="space-y-5 mb-10">
          {filteredLatestUpdates.map((update) => (
            <LatestUpdateCard
              key={update.id}
              name={update.name}
              date={update.date_of_notification}
              organization={update.organizationName}
              apply_link={update.apply_link}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default LatestUpdates;
