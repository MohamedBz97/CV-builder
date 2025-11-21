
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  SparklesIcon, 
  DocumentTextIcon, 
  BriefcaseIcon, 
  CheckCircleIcon, 
  ShieldCheckIcon, 
  BoltIcon,
  ArrowDownTrayIcon
} from './icons';

const LandingPage: React.FC = () => {
  const features = [
    {
        icon: <BoltIcon className="w-6 h-6 text-yellow-500" />,
        title: "Instant Access",
        desc: "No sign-up required. Start building immediately.",
        color: "bg-yellow-50 border-yellow-100"
    },
    {
        icon: <SparklesIcon className="w-6 h-6 text-accent" />,
        title: "AI Powered",
        desc: "Smart suggestions for summaries & experience.",
        color: "bg-orange-50 border-orange-100"
    },
    {
        icon: <ShieldCheckIcon className="w-6 h-6 text-green-500" />,
        title: "100% Private",
        desc: "Data stored locally. We see nothing.",
        color: "bg-green-50 border-green-100"
    },
    {
        icon: <CheckCircleIcon className="w-6 h-6 text-primary" />,
        title: "ATS Friendly",
        desc: "Optimized layouts to pass screening bots.",
        color: "bg-blue-50 border-blue-100"
    },
    {
        icon: <DocumentTextIcon className="w-6 h-6 text-purple-500" />,
        title: "Cover Letters",
        desc: "Generate matching letters in seconds.",
        color: "bg-purple-50 border-purple-100"
    },
    {
        icon: <BriefcaseIcon className="w-6 h-6 text-secondary" />,
        title: "Job Tracker",
        desc: "Organize your entire job search journey.",
        color: "bg-sky-50 border-sky-100"
    }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-white selection:bg-blue-100 selection:text-primary font-sans">
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-[20%] -left-[10%] w-[30%] h-[30%] bg-purple-100/50 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-white border border-blue-100 shadow-sm text-primary text-sm font-semibold mb-8 animate-fade-in hover:scale-105 transition-transform cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            No Sign-up Required • Free & Open Source
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-neutral-900 tracking-tight mb-6 animate-fade-in-up leading-tight">
            Build your resume <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-secondary">faster than ever.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            The straight-to-the-point resume builder. No login barriers, no hidden fees. 
            Just powerful AI tools to get you hired.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Link 
              to="/resume" 
              className="group relative px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                 <DocumentTextIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                 Build Resume Now
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link 
              to="/cover-letter" 
              className="group px-8 py-4 bg-white text-neutral-700 border border-neutral-200 rounded-xl font-bold text-lg hover:bg-neutral-50 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              <BriefcaseIcon className="w-5 h-5 text-neutral-400 group-hover:text-secondary transition-colors" />
              Write Cover Letter
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid - Optimized */}
      <section className="py-16 bg-neutral-50/50 border-t border-neutral-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className={`group p-6 rounded-2xl bg-white border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${feature.color.replace('bg-', 'hover:border-')}`}
              >
                <div className={`mb-4 w-12 h-12 rounded-xl flex items-center justify-center ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Teaser / Bottom CTA */}
      <section className="py-20 bg-white overflow-hidden">
         <div className="container mx-auto px-4">
            <div className="bg-neutral-900 rounded-3xl p-10 md:p-16 relative overflow-hidden text-center shadow-2xl">
                {/* Abstract background effect */}
                <div className="absolute top-0 left-0 w-full h-full opacity-20">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Don't waste time signing up.</h2>
                    <p className="text-neutral-300 mb-8 max-w-xl mx-auto text-lg">
                        Your career won't wait. Our tools are ready when you are. 
                        Export to PDF instantly and apply with confidence.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/resume" className="px-6 py-3 bg-white text-neutral-900 rounded-lg font-bold hover:bg-neutral-100 transition-colors flex items-center gap-2">
                            Create Resume
                        </Link>
                         <Link to="/job-tracker" className="px-6 py-3 bg-neutral-800 text-white border border-neutral-700 rounded-lg font-bold hover:bg-neutral-700 transition-colors flex items-center gap-2">
                            Track Applications
                        </Link>
                    </div>
                </div>
            </div>
         </div>
      </section>

    </div>
  );
};

export default LandingPage;
