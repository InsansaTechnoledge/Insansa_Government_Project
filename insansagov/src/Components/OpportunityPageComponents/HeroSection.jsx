import React from 'react'
import { Calendar, Clock } from 'lucide-react'

const HeroSection = ({data}) => {
  return (
    <div className="text-center mb-32">
        <h2 className="text-purple-600 text-lg mb-4">Union Public Service Commission</h2>
        <div className="inline-block relative">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-12">
            {data.name}
          </h1>

          {/* Floating Date Cards */}
          <div className="flex justify-center gap-8 flex-wrap">
            <div className="transform -rotate-3 bg-purple-100 p-6 rounded-lg shadow-lg">
              <Calendar className="w-8 h-8 mb-2 text-purple-500" />
              <p className="text-sm">Notification Date</p>
              <p className="font-bold">{data.date_of_notification}</p>
            </div>
            <div className="transform rotate-3 bg-blue-100 p-6 rounded-lg shadow-lg">
              <Calendar className="w-8 h-8 mb-2 text-blue-500" />
              <p className="text-sm">Exam Date</p>
              <p className="font-bold">{data.date_of_commencement}</p>
            </div>
            <div className="transform -rotate-3 bg-red-100 p-6 rounded-lg shadow-lg">
              <Clock className="w-8 h-8 mb-2 text-red-500" />
              <p className="text-sm">Last Date</p>
              <p className="font-bold">{data.end_date}</p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default HeroSection