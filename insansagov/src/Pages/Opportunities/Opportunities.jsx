import React from "react";
import {
  BookOpen,
} from "lucide-react";
import FloatingOrbsBackground from "../../Components/OpportunityPageComponents/FloatingOrbsBackground";
import HeroSection from "../../Components/OpportunityPageComponents/HeroSection";
import QuickApplyButton from "../../Components/OpportunityPageComponents/QuickApplyButton";
import VacanciesSection from "../../Components/OpportunityPageComponents/VacanciesSection";
import NationalitySection from "../../Components/OpportunityPageComponents/NationalitySection";
import AgeLimitSection from "../../Components/OpportunityPageComponents/AgeLimitSection";
import EducationSection from "../../Components/OpportunityPageComponents/EducationSection";
import FeeDetailsSection from "../../Components/OpportunityPageComponents/FeeDetailsSection";
import ImportantDatesSection from "../../Components/OpportunityPageComponents/ImportantDatesSection";
import ExamCentresSection from "../../Components/OpportunityPageComponents/ExamCentresSection";
import SchemeOfExamSection1 from "../../Components/OpportunityPageComponents/SchemeOfExamSection1";
import SchemeOfExamSection2 from "../../Components/OpportunityPageComponents/SchemeOfExamSection2";
import ContactDetailsSection from "../../Components/OpportunityPageComponents/ContactDetailsSection";
import ImportantLinksSection from "../../Components/OpportunityPageComponents/ImportantLinksSection";

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
      <FloatingOrbsBackground />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto relative">
        {/* Hero Section */}
        <HeroSection data={data}/>

        {/* Quick Apply Button */}
        <QuickApplyButton data={data}/>

        <div className="flex w-full flex-wrap space-x-5 space-y-5">

        {/* Vacancies Section */}
        <VacanciesSection data={data}/>

        {/* Eligibility Grid */}
          
          {/* Nationality */}
            <NationalitySection data={data}/>
        
          {/* Age Limits */}
          <AgeLimitSection data={data}/>
        
        {/* Education & Fee Details */}
          {/* Education */}
          <EducationSection data={data}/>

          {/* Fee Details */}
          <FeeDetailsSection data={data}/>

        {/* Important Dates and Exam Centers */}
          {/* Important Dates */}
          <ImportantDatesSection data={data}/>

          {/* Exam Centers */}
          <ExamCentresSection data={data}/>

        {/* Scheme of Examination */}
        <div className="flex flex-col flex-grow bg-white shadow-lg p-8 rounded-2xl mb-20">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-purple-500" />
            Scheme of Examination
          </h2>
          <div className="flex flex-col gap-y-5 md:space-x-5  md:flex-row md:space-y-0">
            {/* IMA, INA, Air Force */}
            <SchemeOfExamSection1 data={data}/>


            {/* OTA */}
            <SchemeOfExamSection2 data={data}/>
          </div>
        </div>

        {/* Contact Details */}
        <ContactDetailsSection data={data}/>

        {/* Important Links */}
        <ImportantLinksSection data={data}/>
        </div>
      </div>
    </div>
  );




};

export default ModernExamDetailsPage;