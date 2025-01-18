import React from 'react'
import Hero from '../../Components/Hero/Hero'
import LatestUpdates from '../../Components/Updates/LatestUpdates'
import TopAuthorities from '../../Components/Authority/TopAuthorities'

import curvLine from '../../assets/Landing/curvLine.svg'
import TopCategories from '../../Components/Categories/TopCategories'
import Contact from '../../Components/ContactUs/Contact'
import FeaturePage from '../../Components/FeatureAdvertisement/Features'
import FeatureBand from '../../Components/FeatureAdvertisement/FeatureBand'
import AdmitCardDashboard from '../../Components/AdmitCards/AdmitCard'
import ResultsDashboard from '../../Components/ResultComponent/Results'
import StateComponent from '../../Components/States/State'

const Landing = () => {

  const admitCards = [
    {
      id: 1,
      organization: "UPSC",
      examName: "Civil Services Preliminary Exam 2025",
      releaseDate: "2025-01-10",
      lastDate: "2025-02-15",
      category: "Civil Services",
      status: "active",
      link: "https://example.com/upsc",
    },
    {
      id: 2,
      organization: "SSC",
      examName: "Combined Graduate Level Exam 2025",
      releaseDate: "2025-01-05",
      lastDate: "2025-01-30",
      category: "Staff Selection",
      status: "active",
      link: "https://example.com/ssc",
    },
    {
      id: 3,
      organization: "IBPS",
      examName: "IBPS PO Exam 2025",
      releaseDate: "2025-01-15",
      lastDate: "2025-02-20",
      category: "Banking",
      status: "active",
      link: "https://example.com/ibps",
    },
    {
      id: 4,
      organization: "NDA",
      examName: "National Defense Academy Exam 2025",
      releaseDate: "2025-01-18",
      lastDate: "2025-02-25",
      category: "Defense",
      status: "active",
      link: "https://example.com/nda",
    },
    {
      id: 5,
      organization: "SSC",
      examName: "SSC CHSL Exam 2025",
      releaseDate: "2025-01-02",
      lastDate: "2025-01-28",
      category: "Staff Selection",
      status: "inactive",
      link: "https://example.com/ssc-chsl",
    },
  ];

  const dummyResults = [
    {
      id: 1,
      organization: "Union Public Service Commission",
      examName: "Civil Services Exam Result",
      publishDate: "2025-01-10",
      category: "civil services",
      status: "available",
      link: "https://www.upsc.gov.in/results",
    },
    {
      id: 2,
      organization: "Staff Selection Commission",
      examName: "CHSL Tier 1 Result",
      publishDate: "2025-01-05",
      category: "staff selection",
      status: "available",
      link: "https://ssc.nic.in/results",
    },
    {
      id: 3,
      organization: "State Bank of India",
      examName: "Probationary Officer Result",
      publishDate: "2025-01-12",
      category: "banking",
      status: "available",
      link: "https://sbi.co.in/results",
    },
    {
      id: 4,
      organization: "Indian Army",
      examName: "Soldier GD Result",
      publishDate: "2025-01-08",
      category: "defense",
      status: "available",
      link: "https://joinindianarmy.nic.in/results",
    },
    {
      id: 5,
      organization: "Institute of Banking Personnel Selection",
      examName: "Clerk Prelims Result",
      publishDate: "2025-01-15",
      category: "banking",
      status: "available",
      link: "https://ibps.in/results",
    },
  ];

  
  return (
    <>
    <div>
      <Hero/>
    </div>
    <div  className="px-5 md:px-64">
      <LatestUpdates/>
      {/* <OpportunityCarousel/> */}

      <StateComponent />
      
      <TopAuthorities/>
      <TopCategories/>
      

      <AdmitCardDashboard admitCards={admitCards} />
      <ResultsDashboard results={dummyResults} />

    </div>
    <img
    className='w-full mb-20'
    src={curvLine}/>
    <div id='about'>

      <FeatureBand />
      </div>
    <div className='px-5 md:px-64'>
      <FeaturePage/>
      <div id='contact'>
        <Contact />

      </div>
    </div>
    </>
    
  )
}

export default Landing
