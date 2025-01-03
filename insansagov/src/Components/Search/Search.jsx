import { useScroll } from 'framer-motion'
import React, { useEffect, useState } from 'react'


const Search = (props) => {

  const [input, setInput] = useState("");
  useEffect(()=>{
    if(props.input){
      setInput(props.input);
    }
  },[])

  const inputChangeHandler = (val) => {
    setInput(val);  
  } 

  return (
        < div className = "w-full max-w-md" >
          <form class="max-w-md mx-auto">
              <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
              <div class="relative">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                  </div>
                  <input 
                  onChange={(e)=>inputChangeHandler(e.target.value)}
                  onKeyDown={(e)=>{
                    if(e.key==="Enter"){
                      props.searchHandler(e.target.value);
                      e.preventDefault();
                    }
                  }}
                  type="search"
                  value={input}
                  id="default-search" 
                  class="block w-96 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-white focus:ring-blue-500 focus:border-blue-500 " placeholder="Search Authority, Exams..." required />
              </div>
          </form>
        </div>
  )
}

export default Search
