import React, { useState } from 'react'
import logo from '../../assets/Landing/UPSC.webp'
import LatestUpdates from '../../Components/Updates/LatestUpdates'
import OpportunityCarouselCard from '../../Components/OpportunityCarousel/OpportunityCarouselCard'
import ViewMoreButton from '../../Components/Buttons/ViewMoreButton';
import TopAuthorities from '../../Components/Authority/TopAuthorities';


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

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const visibleCards = isExpanded ? cards : cards.slice(0, 6);


    return (

        <div className='pt-28'>
            <div className='flex flex-col justify-center mb-28'>
                <img src={logo} className='w-28 self-center' />
                <h1 className='text-3xl self-center font-bold mb-5'>Union Public Service Commission</h1>
                <div className='self-center text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex saepe, delectus architecto sapiente quo cumque ipsa quidem aspernatur voluptatum rem dicta placeat culpa voluptate. Praesentium voluptatem repellendus autem quis odit!</div>
            </div>
            <LatestUpdates />
            <div className='font-bold text-2xl flex items-center mb-5'>Events under UPSC</div>
            <div className='grid grid-cols-3 gap-7 mb-10'>
                {visibleCards.map((item, index) => (
                    <OpportunityCarouselCard index={index} {...item} />
                ))}
            </div>
            <div className='flex justify-center mb-20'>
                <ViewMoreButton content={isExpanded ? "view less ▲" : "View More ▼"}
                    onClick={handleToggle} />
            </div>
            <h1 className='text-2xl md:text-3xl font-bold text-gray-900 mb-5'>
                Related Authorities
            </h1>
            <TopAuthorities titleHidden={true} />
        </div>

    )
}

export default Authority
