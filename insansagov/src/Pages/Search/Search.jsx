import React from 'react'
import Search from '../../Components/Search/Search'
import OpportunityCarousel from '../../Components/OpportunityCarousel/OpportunityCarousel'
import OpportunityCarouselCard from '../../Components/OpportunityCarousel/OpportunityCarouselCard'
import TopAuthorities from '../../Components/Authority/TopAuthorities'
import { useLocation } from 'react-router-dom'

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  return (
    <div className='pt-28'>
      <div className='flex justify-center mb-10'>
        <Search input={query}/>
      </div>
      <OpportunityCarousel>
        <OpportunityCarouselCard/>
        <OpportunityCarouselCard/>
        <OpportunityCarouselCard/>
      </OpportunityCarousel>

      <h1 className='text-2xl md:text-3xl font-bold text-gray-900 mb-5'>
          Related Authorities
      </h1>
      <TopAuthorities titleHidden={true}/>
    </div>
  )
}

export default SearchPage
