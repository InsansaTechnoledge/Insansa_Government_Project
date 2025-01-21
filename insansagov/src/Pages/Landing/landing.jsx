import React, { Suspense } from 'react';
import { useInView } from 'react-intersection-observer';
import { Loader2 } from 'lucide-react';
import curvLine from '../../assets/Landing/curvLine.svg';

// Error Boundary for graceful error handling
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h2>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-purple-600 hover:text-purple-800"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Skeleton for loading placeholders
const SkeletonPulse = () => (
  <div className="animate-pulse bg-gray-200 rounded-lg h-full w-full" />
);

const ComponentLoader = ({ height = "h-64" }) => (
  <div className={`w-full ${height} flex items-center justify-center bg-gray-50 rounded-lg`}>
    <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
  </div>
);

// Lazy loading components with specific loading states
const Hero = React.lazy(() => import('../../Components/Hero/Hero'));
const LatestUpdates = React.lazy(() => import('../../Components/Updates/LatestUpdates'));
const TopAuthorities = React.lazy(() => import('../../Components/Authority/TopAuthorities'));
const TopCategories = React.lazy(() => import('../../Components/Categories/TopCategories'));
const Contact = React.lazy(() => import('../../Components/ContactUs/Contact'));
const FeaturePage = React.lazy(() => import('../../Components/FeatureAdvertisement/Features'));
const FeatureBand = React.lazy(() => import('../../Components/FeatureAdvertisement/FeatureBand'));
const AdmitCardDashboard = React.lazy(() => import('../../Components/AdmitCards/AdmitCard'));
const ResultsDashboard = React.lazy(() => import('../../Components/ResultComponent/Results'));
const StateComponent = React.lazy(() => import('../../Components/States/State'));

// LazyRender component for deferred loading
const LazyRender = ({ children, height = "h-64", priority = false }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: priority ? '200px' : '50px', // Preload margin based on priority
  });

  return (
    <div ref={ref}>
      {inView ? (
        <ErrorBoundary>
          <Suspense fallback={<ComponentLoader height={height} />}>
            {children}
          </Suspense>
        </ErrorBoundary>
      ) : (
        <div className={height}>
          <SkeletonPulse />
        </div>
      )}
    </div>
  );
};

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
  ];

  return (
    <div className="min-h-screen">
      {/* Hero section - High Priority */}
      <LazyRender height="h-screen" priority={true}>
        <Hero />
      </LazyRender>

      <div className="px-4 md:px-16 lg:px-64 space-y-16">
        {/* Updates and State Components */}
        <LazyRender height="h-96">
          <LatestUpdates />
        </LazyRender>

        <LazyRender height="h-80">
          <StateComponent />
        </LazyRender>

        {/* Authorities and Categories */}
        <div className="grid md:grid-cols-1 gap-8">
          <LazyRender height="h-72">
            <TopAuthorities />
          </LazyRender>

          <LazyRender height="h-72">
            <TopCategories />
          </LazyRender>
        </div>

        {/* Dashboards */}
        <LazyRender height="h-96">
          <AdmitCardDashboard admitCards={admitCards} />
        </LazyRender>

        <LazyRender height="h-96">
          <ResultsDashboard results={dummyResults} />
        </LazyRender>
      </div>

      {/* Decorative Line */}
      <img
        className="w-full mb-20 mt-20"
        src={curvLine}
        alt=""
        loading="lazy"
      />

      {/* Feature Band */}
      <div id="about">
        <LazyRender height="h-48">
          <FeatureBand />
        </LazyRender>
      </div>

      {/* Features and Contact */}
      <div className="px-4 md:px-16 lg:px-64 space-y-16">
        <LazyRender height="h-96">
          <FeaturePage />
        </LazyRender>

        <div id="contact">
          <LazyRender height="h-80">
            <Contact />
          </LazyRender>
        </div>
      </div>
    </div>
  );
};

export default Landing;
