import React from 'react'
import { Clock } from 'lucide-react'

const AgeLimitSection = ({data, existingSections}) => {

  if(!data.details.eligibility || !data.details.eligibility.age_limits){
    return null;
  }
  else{
    existingSections.push("eligibility")
  }

    return (
        <div className="flex-grow bg-white shadow-lg p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Clock className="w-6 h-6 text-purple-500" />
            Age Limits
          </h2>
          <div className="space-y-4">
            {Object.entries(data.details.eligibility.age_limits).map(([key, value]) => (
              <div key={key} className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-medium text-purple-500 mb-1">{key.replace(/_/g, " ")}</h3>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </div>
      )
}

export default AgeLimitSection