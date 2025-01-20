import axios from 'axios';
import { useScroll } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import API_BASE_URL from '../../Pages/config';
import { data } from 'react-router-dom';
import { debounce } from 'lodash';

const Search = (props) => {

  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);


  useEffect(() => {
    if (props.input) {
      setInput(props.input);
      setShowDropdown(false);
    }
  }, [props])

  const inputChangeHandler = (val) => {
    setInput(val);
    fetchSuggestions(val);
  }

  // Handle suggestion selection
  const selectSuggestion = (suggestion) => {
    props.searchHandler(suggestion); // Call the search handler with the selected suggestion
    setInput(suggestion);
    setShowDropdown(false);
  };

  const fetchSuggestions = debounce(async (query) => {
    if (!query) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/api/search/result`, { params: { q: query } });
      setSuggestions(response.data.suggestions);
      setShowDropdown(true);
      console.log(response.data.suggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  }, 600); // 1000ms debounce delay

  return (
    < div className="w-full max-w-md" >
      <form class="max-w-md mx-auto">
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            onChange={(e) => inputChangeHandler(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                props.searchHandler(e.target.value);
                e.preventDefault();
              }
            }}
            autocomplete="off"
            value={input}
            id="default-search"
            class="block w-96 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-white focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search Authority, Exams..."
            onFocus={() => input && setShowDropdown(true)} // Show dropdown if input exists
            onBlur={() => setTimeout(() => setShowDropdown(false), 1000)} // Delay to allow click selection
          />

          {/* Suggestions Dropdown */}
          {showDropdown && (suggestions.organizations || suggestions.categories || suggestions.authorities)
            ? (
              <div className='flex max-w-96 space-x-1'>
                {
                  suggestions.organizations.length > 0
                    ?
                    (
                      <div className='bg-white'>
                        <div className='font-bold'>Organizations</div>
                        <ul className="z-40 bg-white border border-t-gray-300 rounded-lg shadow-md h-fit">
                          {suggestions.organizations.map((item, index) => (
                            <li
                              key={index}
                              onClick={() => selectSuggestion(item.abbreviation)} // Select suggestion on click
                              className="cursor-pointer px-4 py-2 hover:bg-blue-100"
                            >
                              {item.abbreviation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                    :
                    null
                }
                {
                  suggestions.authorities.length > 0
                    ?
                    (
                      <div className='bg-white'>
                        <div className='font-bold'>Authorities</div>
                        <ul className="z-40  bg-white border border-gray-300 rounded-lg shadow-md h-fit">
                          {suggestions.authorities && suggestions.authorities.map((item, index) => (
                            <li
                              key={index}
                              onClick={() => {
                                selectSuggestion(item.name)
                              }} // Select suggestion on click
                              className="cursor-pointer px-4 py-2 hover:bg-blue-100"
                            >
                              {item.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                    :
                    null
                }
                {
                  suggestions.categories.length > 0
                    ?
                    (
                      <div className=' bg-white'>
                        <div className='font-bold'>Categories</div>
                        <ul className="z-40 bg-white border border-gray-300 rounded-lg shadow-md h-fit">
                          {suggestions.categories && suggestions.categories.map((item, index) => (
                            <li
                              key={index}
                              onClick={() => selectSuggestion(item.category)} // Select suggestion on click
                              className="cursor-pointer px-4 py-2 hover:bg-blue-100"
                            >
                              {item.category}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                    :
                    null
                }
              </div>
            )
            :
            null}
        </div>
      </form>
    </div>
  )
}

export default Search
