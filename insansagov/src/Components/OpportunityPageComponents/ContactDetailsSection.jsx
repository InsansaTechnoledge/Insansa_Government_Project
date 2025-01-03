import React from 'react'
import { Phone } from 'lucide-react'

const ContactDetailsSection = ({data}) => {
    return (
        <div className="flex-grow bg-white shadow-lg p-8 rounded-2xl mb-20">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Phone className="w-6 h-6 text-purple-500" />
              Contact Details
            </h2>
            <div className="flex space-x-5">
              <div className="flex-grow p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-500 mb-1">Facilitation Counter</p>
                <p className="font-medium">{data.details.contact_details.facilitation_counter}</p>
              </div>
              <div className="flex-grow p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-500 mb-1">Address</p>
                <p className="font-medium">{data.details.contact_details.address}</p>
              </div>
            </div>
          </div>
      )
}

export default ContactDetailsSection