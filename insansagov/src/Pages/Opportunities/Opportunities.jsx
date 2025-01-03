import React from "react";
import {
  Calendar,
  Users,
  BookOpen,
  Clock,
  Link,
  MapPin,
  Phone,
  Coins,
  Notebook,
  ArrowRight,
} from "lucide-react";

const ModernExamDetailsPage = () => {
  const data = {
    name: "Combined Defence Services Examination (I), 2025",
    date_of_notification: "11-12-2024",
    date_of_commencement: "13-04-2025",
    end_date: "31-12-2024",
    apply_link: "https://upsconline.gov.in",
    document_links: [
      "http://upsc.gov.in",
      "https://upsconline.gov.in/miscellaneous/QPRep",
      "http://www.joinindianarmy.nic.in",
      "http://www.joinindiannavy.gov.in",
    ],
    details: {
      vacancies: {
        total: 457,
        breakdown: {
          IMA: 100,
          INA: 32,
          Air_Force_Academy: 32,
          OTA_Men: 275,
          OTA_Women: 18,
        },
      },
      eligibility: {
        nationality: [
          "Indian citizen",
          "Subject of Nepal",
          "Person of Indian origin migrated from specified countries",
        ],
        age_limits: {
          IMA: "Born between 02-01-2002 and 01-01-2007",
          INA: "Born between 02-01-2002 and 01-01-2007",
          Air_Force_Academy: "Born between 02-01-2002 and 01-01-2006",
          OTA_Men: "Born between 02-01-2001 and 01-01-2007",
          OTA_Women: "Born between 02-01-2001 and 01-01-2007",
        },
        education: {
          IMA: "Degree of a recognized University or equivalent",
          INA: "Degree in Engineering from a recognized University/Institution",
          Air_Force_Academy: "Degree with Physics and Mathematics at 10+2 or Bachelor of Engineering",
          OTA: "Degree of a recognized University or equivalent",
        },
      },
      fee_details: {
        amount: "₹200",
        exempted_categories: ["Female", "SC/ST"],
      },
      important_dates: {
        modification_window: "01-01-2025 to 07-01-2025",
        results: "May 2025",
        SSB_interviews: "August–December 2025",
      },
      exam_centers: [
        "Agartala",
        "Ghaziabad",
        "Navi Mumbai",
        "Chennai",
        "Delhi",
        "Hyderabad",
        "Kolkata",
        "Mumbai",
        "Lucknow",
        "Bengaluru",
      ],
      contact_details: {
        facilitation_counter: "011-23381125, 011-23385271, 011-23098543",
        address: "UPSC Office, Gate C, New Delhi",
      },
      scheme_of_exam: {
        IMA_INA_AirForce: {
          subjects: {
            English: 100,
            General_Knowledge: 100,
            Elementary_Mathematics: 100,
          },
          total_marks: 300,
        },
        OTA: {
          subjects: {
            English: 100,
            General_Knowledge: 100,
          },
          total_marks: 200,
        },
      },
    },
  };


  return (
    <div className="min-h-screen bg-white text-gray-900 py-20 px-4">
      {/* Floating Orbs Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-200 opacity-50 blur-3xl"></div>
        <div className="absolute top-40 right-20 w-96 h-96 rounded-full bg-blue-200 opacity-50 blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 rounded-full bg-purple-300 opacity-50 blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto relative">
        {/* Hero Section */}
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
              <div className="transform -rotate-3 bg-purple-100 p-6 rounded-lg shadow-lg">
                <Clock className="w-8 h-8 mb-2 text-purple-500" />
                <p className="text-sm">Last Date</p>
                <p className="font-bold">{data.end_date}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Apply Button */}
        <div className="text-center mb-20">
          <a
            href={data.apply_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block group relative overflow-hidden rounded-2xl shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-90 transition-transform transform group-hover:scale-110"></div>
            <div className="relative px-12 py-6 flex items-center gap-4">
              <span className="text-2xl font-bold text-white group-hover:text-blue-600 transition-colors">
                Apply Now
              </span>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/40 group-hover:scale-125 transition-transform">
                <ArrowRight className="w-6 h-6 text-white group-hover:text-blue-600" />
              </div>
            </div>
          </a>
        </div>

        {/* Vacancies Section */}
        <div className="mb-20 bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-3xl shadow-md">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Users className="w-8 h-8 text-purple-500" />
            Vacancies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {Object.entries(data.details.vacancies.breakdown).map(([key, value]) => (
              <div key={key} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-white p-4 rounded-xl shadow-lg">
                  <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                    {value}
                  </p>
                  <p className="text-sm opacity-80">{key.replace(/_/g, " ")}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center text-2xl font-bold text-purple-500">
            Total Vacancies: {data.details.vacancies.total}
          </div>
        </div>

        {/* Eligibility Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Nationality */}
          <div className="bg-white shadow-lg p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-purple-500" />
              Nationality
            </h2>
            <ul className="space-y-4">
              {data.details.eligibility.nationality.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Age Limits */}
          <div className="bg-white shadow-lg p-8 rounded-2xl">
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
        </div>

        {/* Education & Fee Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Education */}
          <div className="lg:col-span-2 bg-white shadow-lg p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-purple-500" />
              Educational Qualifications
            </h2>
            <div className="space-y-4">
              {Object.entries(data.details.eligibility.education).map(([key, value]) => (
                <div key={key} className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-medium text-purple-500 mb-1">{key.replace(/_/g, " ")}</h3>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Fee Details */}
          <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Coins className="w-6 h-6 text-purple-500" />
              Fee Details
            </h2>
            <div className="text-center mb-6">
              <p className="text-5xl font-bold text-purple-500 mb-4">{data.details.fee_details.amount}</p>
              <p className="text-lg">Examination Fee</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <p className="text-sm mb-2">Exempted Categories:</p>
              <p className="font-medium">{data.details.fee_details.exempted_categories.join(", ")}</p>
            </div>
          </div>
        </div>

        {/* Important Dates and Exam Centers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Important Dates */}
          <div className="bg-white shadow-lg p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-purple-500" />
              Important Dates
            </h2>
            <div className="space-y-4">
              {Object.entries(data.details.important_dates).map(([key, value]) => (
                <div key={key} className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="text-sm text-purple-500 mb-1">{key.replace(/_/g, " ")}</h3>
                  <p className="font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Exam Centers */}
          <div className="bg-white shadow-lg p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <MapPin className="w-6 h-6 text-purple-500" />
              Exam Centers
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {data.details.exam_centers.map((center) => (
                <div key={center} className="p-4 bg-purple-50 rounded-lg text-center">
                  <p>{center}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scheme of Examination */}
        <div className="bg-white shadow-lg p-8 rounded-2xl mb-20">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-purple-500" />
            Scheme of Examination
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* IMA, INA, Air Force */}
            <div className="p-6 bg-purple-100 rounded-xl">
              <h3 className="text-xl font-bold mb-4">IMA, INA, Air Force Academy</h3>
              <div className="space-y-3">
                {Object.entries(data.details.scheme_of_exam.IMA_INA_AirForce.subjects).map(([subject, marks]) => (
                  <div key={subject} className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="capitalize text-purple-500">{subject.replace(/_/g, " ")}</span>
                    <span className="font-bold text-purple-500">{marks} marks</span>
                  </div>
                ))}
                <div className="mt-4 p-3 bg-purple-200 rounded-lg">
                  <div className="flex justify-between items-center font-bold">
                    <span>Total Marks</span>
                    <span>{data.details.scheme_of_exam.IMA_INA_AirForce.total_marks}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* OTA */}
            <div className="p-6 bg-blue-100 rounded-xl">
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
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-white shadow-lg p-8 rounded-2xl mb-20">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Phone className="w-6 h-6 text-purple-500" />
            Contact Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-500 mb-1">Facilitation Counter</p>
              <p className="font-medium">{data.details.contact_details.facilitation_counter}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-500 mb-1">Address</p>
              <p className="font-medium">{data.details.contact_details.address}</p>
            </div>
          </div>
        </div>

        {/* Important Links */}
        <footer className="text-center">
          <h2 className="text-2xl font-bold mb-6">Important Links</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {data.document_links.map((link, idx) => (
              <a
                key={idx}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition-all shadow"
              >
                Document {idx + 1}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );




};

export default ModernExamDetailsPage;