import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {

  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(location.pathname === '/' ? false : true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsScrolled(location.pathname === '/' ? false : true);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/') {
        setIsScrolled(window.scrollY > 20);
      }
    };

    if (location.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
    } else {
      setIsScrolled(true);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex-shrink-0 flex items-center">
            <div className="h-10 w-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">W</span>
            </div>
            <span className={`ml-3 text-xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
              My Website
            </span>
          </div>

          {/* Desktop Navigation */}

          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className={`flex items-center space-x-1 ${isScrolled ? 'text-gray-900' : 'text-white'
                }
                {
                ${isScrolled ? 'hover:text-purple-800' : 'hover:text-gray-300'}
              }
              transition-colors`}>
                <span>Categories</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full -left-4 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50">Banking</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50">Defence </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50">Civil</a>
                </div>
              </div>
            </div>
            <a href="#" className={`${isScrolled ? 'text-gray-900' : 'text-white'
              } 
              {
                ${isScrolled ? 'hover:text-purple-800' : 'hover:text-gray-300'}
              }
              transition-colors`}>About</a>
            <a href="#" className={`${isScrolled ? 'text-gray-900' : 'text-white'
              } 
              {
                ${isScrolled ? 'hover:text-purple-800' : 'hover:text-gray-300'}
              }
              transition-colors`}>Contact</a>

            {/* Search Bar */}
            {location.pathname !== '/' && (
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  className={`px-3 py-2 text-sm rounded-md ${isScrolled ? 'bg-gray-100 text-gray-900' : 'bg-white text-black'} focus:outline-none focus:ring-2 focus:ring-purple-600`}
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>
            )}

            <button
              className={`${isScrolled ? 'bg-purple-800' : 'bg-white'
                }
                {
                  ${isScrolled ? 'text-white' : 'text-black'
                } px-4 py-2 rounded-lg 
                {
                  ${isScrolled ? 'hover:bg-purple-900' : 'hover:bg-gray-300'
                } 
              transition-colors`}
            >
              signIn
            </button>

          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${isScrolled ? 'text-gray-900' : 'text-white'
                }`}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-white`}>
        <div className="px-4 pt-2 pb-3 space-y-1">
          <a href="#" className="block px-3 py-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors">
            About
          </a>
          <a href="#" className="block px-3 py-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors">
            Contact
          </a>
          <button className="w-full mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            signIn
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
