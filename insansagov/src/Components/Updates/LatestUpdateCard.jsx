import React from 'react';
import { Calendar, ChevronRight, Tag } from 'lucide-react';

const LatestUpdateCard = () => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg">
      
      <div className="absolute inset-x-0 top-0 h-1 bg-purple-600" />

      {/* Card Content */}
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-purple-600 transition-colors">
              Latest Update 1 with link
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="mr-2 h-4 w-4" />
                <span>January 1, 2025</span>
              </div>
              <div className="flex items-center text-sm text-purple-600">
                <Tag className="mr-2 h-4 w-4" />
                <span>Category</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm line-clamp-2">
              Brief preview of the update content goes here. This helps users understand what the update is about before clicking through.
            </p>
          </div>
          <div className="transform transition-transform group-hover:translate-x-1">
            <ChevronRight className="h-5 w-5 text-purple-600" />
          </div>
        </div>

        {/* Tags */}

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
            New
          </span>
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
            Important
          </span>
        </div>
      </div>

      <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-600 rounded-xl transition-colors" />
    </div>
  );
};

export default LatestUpdateCard;