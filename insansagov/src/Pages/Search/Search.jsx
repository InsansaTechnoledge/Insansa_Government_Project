import React, { useEffect, useState } from 'react'
import Search from '../../Components/Search/Search'
import TopAuthorities from '../../Components/Authority/TopAuthorities'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import API_BASE_URL from '../config'
import RelatedAuthorities from '../../Components/Authority/RelatedAuthorities'
import RelatedCategories from '../../Components/Categories/RelatedCategories'
import RelatedStates from '../../Components/States/RelatedStates'

const SearchPage = () => {
  const location = useLocation();
  const [query, setQuery] = useState();
  const queryParams = new URLSearchParams(location.search);
  const [searchData, setSearchData] = useState();
  const navigate = useNavigate();
  const [moreAuthorities, setMoreAuthorities] = useState();
  const [moreCategories, setMoreCategories] = useState();
  const [moreOrganizations,setMoreOrganizations] = useState();

  useEffect(()=>{
    const fetchSearch = async () => {
      const queryData = queryParams.get("query");
      setQuery(queryData);
      const response = await axios.get(`${API_BASE_URL}/api/search/result/${queryData}`);

      if(response.status===200){
        console.log(response.data);
        setSearchData(response.data);
      }
    }

    fetchSearch();
  },[location])

  const searchHandler = (input) => {
    navigate(`/search?query=${encodeURIComponent(input)}`);
}

const getMoreAuthorities = async () => {
  console.log("RR");
  const response = await axios.get(`${API_BASE_URL}/api/state/more/`);
  if(response.status===201){
    setMoreAuthorities(response.data);
    console.log(response.data);  
  }}

const getMoreOrganizations = async (categoryId) => {
  const response = await axios.get(`${API_BASE_URL}/api/organizatoin/more/${categoryId}`);
  if(response.status===201){
    setMoreOrganizations(response.data);
  }
}

const getMoreCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/category/more/`);
  if(response.status===201){
    setMoreCategories(response.data);
  }
}

  return (
    <div className='pt-28'>
      <div className='flex justify-center mb-10'>
        <Search input={query} searchHandler={searchHandler}/>
      </div>

      <div className='text-2xl md:text-3xl font-bold text-gray-900 mb-5'>Your search result for "{query}"</div>
      {
        searchData && searchData.authorities && searchData.authorities.length>0
        ?
        <>
          <h1 className='text-lg mb-3'>States</h1>
          <RelatedStates states={searchData.authorities}/>
        </>
        :
        null
      }
      {
        searchData && searchData.organizations && searchData.organizations.length>0
        ?
        (
          <>
            <h1 className='text-lg mb-3'>Organizations</h1>
            <RelatedAuthorities organizations={searchData.organizations}/>
          </>
        )
        :
        null
      }
      {
        searchData && searchData.categories && searchData.categories.length>0
        ?
        <>
          <h1 className='text-lg mb-3'>Categories</h1>
          <RelatedCategories categories={searchData.categories}/>
        </>
        :

        null
      }
      
      {/* <OpportunityCarousel>
        <OpportunityCarouselCard/>
        <OpportunityCarouselCard/>
        <OpportunityCarouselCard/>
      </OpportunityCarousel> */}

      {
        searchData && searchData.authorities && searchData.authorities.length>0
        ?
        <>
        <h1 className='text-2xl md:text-3xl font-bold text-gray-900 mb-5'>
            More Authorities
        </h1>
        {/* {getMoreAuthorities()} */}

        
        </>
        :
        searchData && searchData.organizations && searchData.organizations.length>0
        ?
        <>
        <h1 className='text-2xl md:text-3xl font-bold text-gray-900 mb-5'>
            More Organizations
        </h1>
        {/* {getMoreOrganizations(searchData.organizations[0].category)} */}
        
        </>
        :
        searchData && searchData.categories && searchData.categories.length>0
        ?
        <>
        <h1 className='text-2xl md:text-3xl font-bold text-gray-900 mb-5'>
            More Categories
        </h1>
        {/* {getMoreCategories()} */}

        </>
        :
        null
      }
      <TopAuthorities titleHidden={true}/>
    </div>
  )
}

export default SearchPage
