import React , {useState,useEffect} from 'react';
import TopCategoriesCard from './TopCategoriesCard';
import ViewMoreButton from '../Buttons/ViewMoreButton';
import axios from 'axios';
import API_BASE_URL from '../../Pages/config';

const TopCategories = (props) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [categories, setCategories] = useState();
    const [filteredCategories, setFilteredCategories] = useState();


    const handleToggle = () => {
        setIsExpanded(!isExpanded);
        if(!isExpanded){
            setFilteredCategories(categories);
        }
        else{
            setFilteredCategories(categories.slice(0,4));
        }
    };

    useEffect(()=>{
        const fetchLogos=async ()=>{
            const response=await axios.get(`${API_BASE_URL}/api/category/getCategories`);

            if(response.status===200){
                setCategories(response.data);
                setFilteredCategories(response.data.slice(0,4));        
                console.log("hii",response.data);
            }
        }
        fetchLogos();
    },[]);


    // const cards = [
    //     <TopCategoriesCard key={1} />,
    //     <TopCategoriesCard key={2} />,
    //     <TopCategoriesCard key={3} />,
    //     <TopCategoriesCard key={4} />,
    //     <TopCategoriesCard key={5} />,
    // ]

    // const visibleCards = isExpanded ? cards : cards.slice(0, 4);

  return (
      <>
          {
              props.titleHidden
                  ? null
                  : <h1 className='flex text-center text-2xl justify-center mb-5 font-bold'>Top Categories</h1>
          }
          <div className='grid grid-cols-4 mb-5 gap-4'>
              {/* {visibleCards} */}
              {
                  filteredCategories && filteredCategories.map((category,key) => {
                      return <TopCategoriesCard key={key} name={category.name} logo={category.logo} id={category._id}/>
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
)
}

export default TopCategories