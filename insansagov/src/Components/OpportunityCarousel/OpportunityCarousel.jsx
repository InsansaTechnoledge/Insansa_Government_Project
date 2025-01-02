import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import OpportunityCarouselCard from './OpportunityCarouselCard';

const OpportunityCarousel = () => {
  const items = [
    { title: 'Exam Schedule 2025', authority: 'Education Board', latestUpdate: '1/1/2025' },
    { title: 'Result Announcement', authority: 'University XYZ', latestUpdate: '12/25/2024' },
    { title: 'Application Deadline', authority: 'Scholarship Authority', latestUpdate: '12/15/2024' },
    { title: 'Course Enrollment', authority: 'Online Academy', latestUpdate: '11/30/2024' },
    { title: 'Internship Program', authority: 'Tech Corp', latestUpdate: '11/20/2024' },
    { title: 'Job Fair 2025', authority: 'Career Center', latestUpdate: '10/25/2024' }
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentItems = items.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>
          You might be looking for
        </h1>
        <div className='flex items-center space-x-2 text-sm'>
          <span className='text-gray-500'>
            Page {currentPage + 1} of {totalPages}
          </span>
        </div>
      </div>

      <div className='relative'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          {currentItems.map((item, index) => (
            <OpportunityCarouselCard key={index} {...item} />
          ))}
        </div>

        <div className='flex justify-center items-center space-x-4'>
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className='p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
          >
            <ChevronLeft className='w-6 h-6' />
          </button>

          <div className='flex space-x-2'>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-2 h-2 rounded-full transition-colors ${currentPage === index
                    ? 'bg-purple-600'
                    : 'bg-purple-200 hover:bg-purple-300'
                  }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className='p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
          >
            <ChevronRight className='w-6 h-6' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCarousel;