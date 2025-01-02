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
    <div className="pt-20 px-6 max-w-6xl mx-auto space-y-12">
      {/* Header Section */}
      <header className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          {data.name}
        </h1>
        <div className="flex justify-center flex-wrap gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
            <Calendar className="w-5 h-5" />
            Notification Date: {data.date_of_notification}
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg">
            <Calendar className="w-5 h-5" />
            Exam Date: {data.date_of_commencement}
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-lg">
            <Clock className="w-5 h-5" />
            Last Date: {data.end_date}
          </div>
        </div>
      </header>

      {/* Apply Button */}
      <div className="text-center">
        <a
          href={data.apply_link}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700"
        >
          Apply Now
        </a>
      </div>

      {/* Vacancies Section */}
      <section className="p-6 bg-white shadow rounded-lg">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
          <Users className="w-6 h-6 text-blue-600" /> Vacancies
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Object.entries(data.details.vacancies.breakdown).map(([academy, seats]) => (
            <div
              key={academy}
              className="p-4 border rounded-lg bg-gray-50 text-center shadow-sm"
            >
              <h3 className="text-lg font-medium capitalize">
                {academy.replace(/_/g, " ")}
              </h3>
              <p className="text-3xl font-bold text-blue-600">{seats}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center text-gray-700">
          <p className="font-semibold">Total Vacancies: {data.details.vacancies.total}</p>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="p-6 bg-white shadow rounded-lg space-y-8">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-green-600" /> Eligibility Criteria
        </h2>

        {/* Nationality */}
        <div>
          <h3 className="text-lg font-medium">Nationality</h3>
          <ul className="list-disc pl-5 space-y-2">
            {data.details.eligibility.nationality.map((item, idx) => (
              <li key={idx} className="text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Age Limits */}
        <div>
          <h3 className="text-lg font-medium">Age Limits</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(data.details.eligibility.age_limits).map(
              ([academy, age]) => (
                <div
                  key={academy}
                  className="p-4 border rounded-lg bg-gray-50 shadow-sm"
                >
                  <p className="font-medium capitalize">
                    {academy.replace(/_/g, " ")}
                  </p>
                  <p className="text-sm text-gray-600">{age}</p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Educational Qualifications */}
        <div>
          <h3 className="text-lg font-medium">Educational Qualifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(data.details.eligibility.education).map(
              ([academy, qualification]) => (
                <div
                  key={academy}
                  className="p-4 border rounded-lg bg-gray-50 shadow-sm"
                >
                  <p className="font-medium capitalize">
                    {academy.replace(/_/g, " ")}
                  </p>
                  <p className="text-sm text-gray-600">{qualification}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Fee Details Section */}
      <section className="p-6 bg-white shadow rounded-lg">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Coins className="w-6 h-6 text-yellow-600" /> Fee Details
        </h2>
        <p className="text-lg font-medium mt-4">
          Examination Fee: <span className="text-blue-600">{data.details.fee_details.amount}</span>
        </p>
        <p className="mt-2 text-gray-700">
          Fee Exemption for: {data.details.fee_details.exempted_categories.join(", ")}
        </p>
      </section>

      {/* Important Dates Section */}
      <section className="p-6 bg-white shadow rounded-lg">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Calendar className="w-6 h-6 text-purple-600" /> Important Dates
        </h2>
        <ul className="list-disc pl-5 space-y-2 mt-4">
          <li>
            Modification Window: {data.details.important_dates.modification_window}
          </li>
          <li>Results: {data.details.important_dates.results}</li>
          <li>SSB Interviews: {data.details.important_dates.SSB_interviews}</li>
        </ul>
      </section>

      {/* Exam Centers Section */}
      <section className="p-6 bg-white shadow rounded-lg">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <MapPin className="w-6 h-6 text-red-600" /> Exam Centers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {data.details.exam_centers.map((center, idx) => (
            <div
              key={idx}
              className="p-3 border rounded-lg bg-gray-50 text-center shadow-sm"
            >
              <p className="text-gray-700">{center}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="p-6 bg-white shadow rounded-lg">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Phone className="w-6 h-6 text-green-600" /> Contact Details
        </h2>
        <p className="mt-4 text-gray-700">
          Facilitation Counter: {data.details.contact_details.facilitation_counter}
        </p>
        <p className="text-gray-700">Address: {data.details.contact_details.address}</p>
      </section>

      {/* Scheme of Exam Section */}
      <section className="p-6 bg-white shadow rounded-lg">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-orange-600" /> Scheme of Examination
        </h2>
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="text-lg font-medium">IMA, INA, Air Force Academy</h3>
            <ul className="list-disc pl-5 space-y-2">
              {Object.entries(data.details.scheme_of_exam.IMA_INA_AirForce.subjects).map(
                ([subject, marks], idx) => (
                  <li key={idx}>
                    {subject.replace(/_/g, " ")}: {marks} marks
                  </li>
                )
              )}
            </ul>
            <p className="mt-2 text-gray-700 font-medium">
              Total Marks: {data.details.scheme_of_exam.IMA_INA_AirForce.total_marks}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium">OTA</h3>
            <ul className="list-disc pl-5 space-y-2">
              {Object.entries(data.details.scheme_of_exam.OTA.subjects).map(
                ([subject, marks], idx) => (
                  <li key={idx}>
                    {subject.replace(/_/g, " ")}: {marks} marks
                  </li>
                )
              )}
            </ul>
            <p className="mt-2 text-gray-700 font-medium">
              Total Marks: {data.details.scheme_of_exam.OTA.total_marks}
            </p>
          </div>
        </div>
      </section>

      {/* Useful Links */}
      <footer className="text-center space-y-4">
        <h3 className="text-lg font-medium">Useful Links</h3>
        <div className="flex justify-center flex-wrap gap-4">
          {data.document_links.map((link, idx) => (
            <a
              key={idx}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Document {idx + 1}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default ModernExamDetailsPage;
