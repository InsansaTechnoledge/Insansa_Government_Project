import React from 'react'

const SchemeOfExamSection2 = ({data}) => {
  return (
    <div className="flex-grow p-6 bg-blue-100 rounded-xl">
      <h3 className="text-xl font-bold mb-4">OTA</h3>
      <div className="space-y-3">
        {Object.entries(data.details.scheme_of_exam.OTA.subjects).map(([subject, marks]) => (
          <div key={subject} className="flex justify-between items-center p-3 bg-white rounded-lg">
            <span className="capitalize text-blue-500">{subject.replace(/_/g, " ")}</span>
            <span className="font-bold text-blue-500">{marks} marks</span>
          </div>
        ))}
        <div className="mt-4 p-3 bg-blue-200 rounded-lg">
          <div className="flex justify-between items-center font-bold">
            <span>Total Marks</span>
            <span>{data.details.scheme_of_exam.OTA.total_marks}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SchemeOfExamSection2