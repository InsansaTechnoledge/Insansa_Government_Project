import React from "react";
import { PlusCircleIcon } from "lucide-react";

const AdditionalDetailsSection = ({ data, existingSections }) => {
  // Recursive function to handle nested JSON objects
  const renderContent = (data) => {
    if (typeof data === "string") {
      return (
        <div className="p-4 bg-purple-50 rounded-lg">
          <p>{data}</p>
        </div>
      );
    }

    if (typeof data === "object" && data !== null) {
        console.log(existingSections);
        return (
        <div className="space-y-4">
          {Object.entries(data).map(([key, value]) => {
            
            if(!existingSections.includes(key)){
                return (<div key={key} className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-medium text-purple-500 mb-1">
                {key.replace(/_/g, " ")}
              </h3>
              {/* Recursively render nested data */}
              <div>{renderContent(value)}</div>
            </div>
                )
            }
    })}
        </div>
      );
    }

    // Fallback for unexpected data types
    return <p className="text-gray-500">Invalid Data</p>;
  };

  return (
    <div className="flex-grow lg:col-span-2 bg-white shadow-lg p-8 rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        {/* Replace this icon with the one you are using */}
        <PlusCircleIcon className="w-6 h-6 text-purple-500" />
        Additional Details
      </h2>
      {renderContent(data)}
    </div>
  );
};

export default AdditionalDetailsSection;
