import React from "react";
import { PlusCircleIcon } from "lucide-react";

const AdditionalDetailsSection = ({ data, existingSections }) => {
  // Recursive function to handle nested JSON objects
  const renderContent = (data) => {
    if (typeof data === "string") {
      return (
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg shadow-sm">
          <p className="text-gray-700">{data}</p>
        </div>
      );
    }

    if (typeof data === "object" && data !== null) {
        {console.log(existingSections)}
        return (
            <div className="space-y-4">
          {Object.entries(data).map(([key, value]) => {
              if (!existingSections.includes(key)) {
              return (
                <div
                  key={key}
                  className="p-3 bg-white border border-purple-300 rounded-lg shadow-md"
                >
                  <h3 className="font-medium text-purple-600 mb-2 capitalize">
                    {key.replace(/_/g, " ")}
                  </h3>
                  {/* Recursively render nested data */}
                  <div className="space-y-2 pl-3 border-l-2 border-purple-300">
                    {renderContent(value)}
                  </div>
                </div>
              );
            }
          })}
        </div>
      );
    }

    // Fallback for unexpected data types
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg shadow-sm">
        <p className="text-red-700">Invalid Data</p>
      </div>
    );
  };

  return (
    <div className="flex-grow lg:col-span-2 bg-white shadow-lg p-8 rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <PlusCircleIcon className="w-6 h-6 text-purple-500" />
        Additional Details
      </h2>
      <div className="space-y-6">{renderContent(data)}</div>
    </div>
  );
};

export default AdditionalDetailsSection;
