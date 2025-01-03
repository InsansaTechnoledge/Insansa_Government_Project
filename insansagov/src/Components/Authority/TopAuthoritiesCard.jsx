import React from 'react';
import logo from '../../assets/Landing/UPSC.webp';
import { useNavigate } from 'react-router-dom';

const TopAuthoritiesCard = () => {
  const navigate = useNavigate();

  return (
    <div 
    onClick={()=>navigate('/authority')}
    className="flex flex-col items-center justify-center bg-white rounded-lg p-6 max-w-sm mx-auto hover:scale-110 transition-all duration-300 hover:cursor-pointer">
      {/* Logo */}
      <img
        src={logo}
        alt="Authority Logo"
        className="w-32 h-28 object-contain"
      />

     
      <p className="mt-2 text-gray-900 font-medium text-sm">UPSC</p>
    </div>
  );
};

export default TopAuthoritiesCard;
