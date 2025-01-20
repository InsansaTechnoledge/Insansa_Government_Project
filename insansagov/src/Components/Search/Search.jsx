import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import { Search as SearchIcon } from 'lucide-react';
import API_BASE_URL from '../../Pages/config';

const Search = (props) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (props.input) {
      setInput(props.input);
      setShowDropdown(false);
    }
  }, [props]);

  useEffect(() => {
    if (suggestions.organizations || suggestions.authorities || suggestions.categories) {
      const total =
        (suggestions.organizations?.length || 0) +
        (suggestions.authorities?.length || 0) +
        (suggestions.categories?.length || 0);
      setTotalCount(total);
    }
  }, [suggestions]);

  const inputChangeHandler = (val) => {
    setInput(val);
    fetchSuggestions(val);
  };

  const selectSuggestion = (suggestion) => {
    props.searchHandler(suggestion);
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
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  }, 600);

  const SuggestionList = ({ title, items, itemKey }) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="mb-2 last:mb-0">
        <div className="flex items-center justify-between text-sm font-semibold text-gray-500 px-3 py-2 bg-gray-50 sticky top-0">
          <span>{title}</span>
          <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs">
            {items.length}
          </span>
        </div>
        <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => selectSuggestion(item[itemKey])}
              className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer text-gray-700 text-sm transition-colors duration-150"
            >
              {item[itemKey]}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => inputChangeHandler(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              props.searchHandler(e.target.value);
              e.preventDefault();
            }
          }}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-gray-700"
          placeholder="Search Authority, Exams..."
          autoComplete="off"
          onFocus={() => input && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        />

        {showDropdown && (
          <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
            {totalCount > 0 && (
              <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 text-xs text-gray-500">
                Found {totalCount} total matches
              </div>
            )}

            <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
              {suggestions.organizations?.length > 0 && (
                <SuggestionList
                  title="Organizations"
                  items={suggestions.organizations}
                  itemKey="abbreviation"
                />
              )}

              {suggestions.authorities?.length > 0 && (
                <SuggestionList
                  title="Authorities"
                  items={suggestions.authorities}
                  itemKey="name"
                />
              )}

              {suggestions.categories?.length > 0 && (
                <SuggestionList
                  title="Categories"
                  items={suggestions.categories}
                  itemKey="category"
                />
              )}

              {!totalCount && (
                <div className="px-4 py-3 text-sm text-gray-500">
                  No suggestions found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;