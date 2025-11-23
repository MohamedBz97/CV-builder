
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  SparklesIcon, 
  ShieldCheckIcon, 
  DocumentTextIcon,
  GiftIcon,
  CheckBadgeIcon
} from './icons';

// --- Template Mockup Components ---

const ModernMockup = () => (
    <div className="w-full h-full bg-white flex flex-col font-sans">
        {/* Header */}
        <div className="bg-neutral-900 p-8 text-white flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-neutral-900 font-bold text-xl border-4 border-white shadow-lg shrink-0">
                JD
            </div>
            <div>
                <div className="h-6 w-32 bg-white/20 rounded mb-2"></div>
                <div className="h-3 w-24 bg-yellow-400/90 rounded"></div>
            </div>
        </div>
        {/* Body */}
        <div className="flex flex-1 p-6 gap-6">
            <div className="w-1/3 space-y-6 border-r border-neutral-100 pr-4 hidden sm:block">
                <div className="space-y-2">
                    <div className="h-3 w-16 bg-neutral-300 rounded"></div>
                    <div className="h-1.5 w-full bg-neutral-100 rounded"></div>
                    <div className="h-1.5 w-5/6 bg-neutral-100 rounded"></div>
                </div>
                <div className="space-y-2">
                    <div className="h-3 w-20 bg-neutral-300 rounded"></div>
                    <div className="h-1.5 w-full bg-neutral-100 rounded"></div>
                    <div className="h-1.5 w-full bg-neutral-100 rounded"></div>
                </div>
            </div>
            <div className="w-full sm:w-2/3 space-y-6">
                 <div className="space-y-3">
                     <div className="h-4 w-32 bg-neutral-800 rounded"></div>
                     <div className="space-y-2">
                         <div className="h-2 w-full bg-neutral-100 rounded"></div>
                         <div className="h-2 w-full bg-neutral-100 rounded"></div>
                         <div className="h-2 w-3/4 bg-neutral-100 rounded"></div>
                     </div>
                 </div>
                 <div className="space-y-3">
                     <div className="h-4 w-24 bg-neutral-800 rounded"></div>
                     <div className="space-y-2">
                         <div className="h-2 w-full bg-neutral-100 rounded"></div>
                         <div className="h-2 w-5/6 bg-neutral-100 rounded"></div>
                     </div>
                 </div>
            </div>
        </div>
    </div>
);

const ProfessionalMockup = () => (
    <div className="w-full h-full bg-white flex flex-col p-8 items-center text-center font-serif">
        <div className="mb-8 w-full border-b-2 border-neutral-900 pb-6 flex flex-col items-center">
            <div className="h-8 w-48 bg-neutral-900 rounded mb-3"></div>
            <div className="h-3 w-32 bg-neutral-500 rounded mb-4"></div>
            <div className="flex gap-4">
                 <div className="h-1.5 w-16 bg-neutral-200 rounded"></div>
                 <div className="h-1.5 w-16 bg-neutral-200 rounded"></div>
                 <div className="h-1.5 w-16 bg-neutral-200 rounded"></div>
            </div>
        </div>
        <div className="w-full text-left space-y-8">
            <div className="space-y-3">
                 <div className="flex justify-between items-end border-b border-neutral-200 pb-2 mb-2">
                    <div className="h-4 w-24 bg-neutral-800 rounded"></div>
                    <div className="h-2 w-12 bg-neutral-300 rounded"></div>
                 </div>
                 <div className="h-2 w-full bg-neutral-100 rounded"></div>
                 <div className="h-2 w-full bg-neutral-100 rounded"></div>
                 <div className="h-2 w-5/6 bg-neutral-100 rounded"></div>
            </div>
             <div className="space-y-3">
                 <div className="flex justify-between items-end border-b border-neutral-200 pb-2 mb-2">
                    <div className="h-4 w-20 bg-neutral-800 rounded"></div>
                    <div className="h-2 w-12 bg-neutral-300 rounded"></div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                     <div className="h-2 w-full bg-neutral-100 rounded"></div>
                     <div className="h-2 w-full bg-neutral-100 rounded"></div>
                 </div>
            </div>
        </div>
    </div>
);

const CreativeMockup = () => (
    <div className="w-full h-full bg-neutral-50 flex flex-row font-sans">
        <div className="w-1/3 bg-neutral-900 p-6 flex flex-col items-center pt-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-neutral-800 to-neutral-900"></div>
            <div className="relative z-10 w-20 h-20 rounded-xl bg-yellow-400 mb-8 rotate-3 shadow-lg flex items-center justify-center text-3xl font-black text-neutral-900">JD</div>
            <div className="relative z-10 w-full space-y-4">
                <div className="h-1.5 w-full bg-neutral-700/50 rounded"></div>
                <div className="h-1.5 w-3/4 bg-neutral-700/50 rounded"></div>
                <div className="h-1.5 w-5/6 bg-neutral-700/50 rounded"></div>
            </div>
            <div className="relative z-10 w-full mt-auto space-y-4">
                 <div className="h-1.5 w-full bg-neutral-700/50 rounded"></div>
                 <div className="h-1.5 w-1/2 bg-neutral-700/50 rounded"></div>
            </div>
        </div>
        <div className="w-2/3 p-8 flex flex-col bg-white">
             <div className="mb-10">
                 <div className="h-10 w-40 bg-neutral-900 rounded mb-2"></div>
                 <div className="h-4 w-24 bg-yellow-400 rounded"></div>
             </div>
             <div className="space-y-6">
                 <div>
                     <div className="h-3 w-20 bg-neutral-300 rounded mb-3"></div>
                     <div className="h-2 w-full bg-neutral-100 rounded mb-1.5"></div>
                     <div className="h-2 w-full bg-neutral-100 rounded mb-1.5"></div>
                     <div className="h-2 w-4/5 bg-neutral-100 rounded mb-1.5"></div>
                 </div>
                 <div>
                     <div className="h-3 w-24 bg-neutral-300 rounded mb-3"></div>
                     <div className="h-2 w-full bg-neutral-100 rounded mb-1.5"></div>
                     <div className="h-2 w-5/6 bg-neutral-100 rounded mb-1.5"></div>
                 </div>
             </div>
        </div>
    </div>
);

const templates = [
    { id: 'modern', label: 'Modern', component: ModernMockup, color: 'bg-yellow-400' },
    { id: 'professional', label: 'Corporate', component: ProfessionalMockup, color: 'bg-blue-400' },
    { id: 'creative', label: 'Creative', component: CreativeMockup, color: 'bg-purple-400' },
];

const LandingPage: React.FC = () => {
  const [activeTemplateIndex, setActiveTemplateIndex] = useState(0);
  const [resumeCount, setResumeCount] = useState(1240);

  useEffect(() => {
    // Slider interval
    const sliderInterval = setInterval(() => {
        setActiveTemplateIndex((prev) => (prev + 1) % templates.length);
    }, 3500);

    // Live counter increment
    const counterInterval = setInterval(() => {
        setResumeCount(prev => prev + Math.floor(Math.random() * 2) + 1);
    }, 4000);

    return () => {
        clearInterval(sliderInterval);
        clearInterval(counterInterval);
    };
  }, []);

  const ActiveComponent = templates[activeTemplateIndex].component;

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-neutral-50 font-sans selection:bg-yellow-400 selection:text-neutral-900">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-28 lg:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            
            {/* Left Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 text-yellow-400 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm border border-neutral-800">
                <SparklesIcon className="w-3 h-3" />
                The #1 Free Resume Builder
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-neutral-900 tracking-tight leading-[1.1] mb-6">
                Craft a legendary <br/>
                CV in <span className="relative inline-block">
                  <span className="relative z-10 text-neutral-900">minutes.</span>
                  <span className="absolute bottom-2 left-0 w-full h-4 bg-yellow-400 -z-0 -rotate-1"></span>
                </span>
              </h1>
              
              <p className="text-xl text-neutral-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Professional templates, ATS-optimized, and totally free. 
                Stand out from the crowd with a resume that speaks for itself.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-10">
                <Link 
                  to="/resume" 
                  className="px-8 py-4 bg-neutral-900 text-yellow-400 rounded-xl font-bold text-lg hover:bg-black transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-3 border border-transparent hover:border-yellow-400/50"
                >
                  Start Building Now
                  <SparklesIcon className="w-5 h-5" />
                </Link>
                <Link 
                   to="/cover-letter"
                   className="px-8 py-4 bg-white text-neutral-900 border-2 border-neutral-200 rounded-xl font-bold text-lg hover:border-neutral-900 transition-all flex items-center gap-2"
                >
                   Write Cover Letter
                </Link>
              </div>

               {/* Live Counter */}
               <div className="flex items-center gap-3 justify-center lg:justify-start mb-6 animate-fade-in" style={{animationDelay: '0.4s'}}>
                  <div className="flex -space-x-3">
                     <div className="w-9 h-9 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" alt="User" className="w-full h-full object-cover" /></div>
                     <div className="w-9 h-9 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm"><img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64" alt="User" className="w-full h-full object-cover" /></div>
                     <div className="w-9 h-9 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64" alt="User" className="w-full h-full object-cover" /></div>
                  </div>
                  <div className="text-sm text-neutral-600 flex items-center gap-2">
                      <span><span className="font-bold text-neutral-900 tabular-nums">{resumeCount.toLocaleString()}</span> resumes crafted this week</span>
                      <span className="relative flex h-2.5 w-2.5 ml-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                      </span>
                  </div>
              </div>
               
               <p className="mt-2 text-sm text-neutral-500 font-medium">
                  <span className="text-green-600">✓</span> No sign-up required &nbsp;
                  <span className="text-green-600">✓</span> Free PDF Download
               </p>
            </div>

            {/* Right Visuals - Interactive Resume Slider */}
            <div className="w-full lg:w-1/2 relative mt-12 lg:mt-0 perspective-1000 animate-fade-in" style={{ animationDelay: '0.2s' }}>
               {/* Background Glow */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-yellow-200 via-orange-100 to-transparent rounded-full blur-3xl opacity-50 pointer-events-none"></div>

               {/* Main Resume Card Mockup Container */}
               <div className="relative mx-auto w-full max-w-[480px] aspect-[4/5] sm:h-[600px] bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden transform rotate-[-2deg] hover:rotate-0 transition-all duration-700 ease-out group">
                  
                  {/* Template Slider */}
                  {templates.map((template, index) => (
                      <div 
                        key={template.id}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === activeTemplateIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                      >
                          <template.component />
                      </div>
                  ))}

                   {/* Badges/Indicators Overlay */}
                   <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent z-20 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 sm:opacity-100">
                        {/* Style Label */}
                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-white/50 flex items-center gap-2">
                             <div className={`w-2 h-2 rounded-full ${templates[activeTemplateIndex].color} animate-pulse`}></div>
                             <span className="text-xs font-bold text-neutral-900 uppercase tracking-wide">
                                 {templates[activeTemplateIndex].label} Style
                             </span>
                        </div>
                        
                        {/* Verified Badge */}
                        <div className="bg-white/90 backdrop-blur-sm border border-green-200 text-green-700 px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 font-bold text-xs">
                            <CheckBadgeIcon className="w-4 h-4" />
                            ATS Ready
                        </div>
                   </div>

                   {/* Carousel Dots */}
                   <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                       {templates.map((_, idx) => (
                           <button 
                                key={idx} 
                                onClick={() => setActiveTemplateIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeTemplateIndex ? 'bg-neutral-900 h-6' : 'bg-neutral-300 hover:bg-neutral-500'}`}
                           />
                       ))}
                   </div>

               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Row */}
      <section className="py-20 bg-white border-t border-neutral-100 relative overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 text-center">
              
              {/* Feature 1 */}
              <div className="group p-8 rounded-2xl bg-neutral-50 hover:bg-neutral-900 transition-colors duration-300 border border-neutral-100 hover:border-neutral-800 hover:-translate-y-2 shadow-sm">
                 <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white group-hover:bg-neutral-800 text-neutral-900 group-hover:text-yellow-400 transition-all duration-300 flex items-center justify-center shadow-md border border-neutral-100 group-hover:border-neutral-700">
                    <GiftIcon className="w-8 h-8" />
                 </div>
                 <h3 className="text-xl font-bold text-neutral-900 group-hover:text-white mb-3">100% Free</h3>
                 <p className="text-neutral-500 group-hover:text-neutral-400 leading-relaxed">
                    Build, download, and get hired without spending a dime. No hidden fees.
                 </p>
              </div>

              {/* Feature 2 */}
              <div className="group p-8 rounded-2xl bg-neutral-50 hover:bg-neutral-900 transition-colors duration-300 border border-neutral-100 hover:border-neutral-800 hover:-translate-y-2 shadow-sm">
                 <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white group-hover:bg-neutral-800 text-neutral-900 group-hover:text-yellow-400 transition-all duration-300 flex items-center justify-center shadow-md border border-neutral-100 group-hover:border-neutral-700">
                    <ShieldCheckIcon className="w-8 h-8" />
                 </div>
                 <h3 className="text-xl font-bold text-neutral-900 group-hover:text-white mb-3">Local Privacy</h3>
                 <p className="text-neutral-500 group-hover:text-neutral-400 leading-relaxed">
                    Your data lives on your device. We don't track you or store your info.
                 </p>
              </div>

              {/* Feature 3 */}
              <div className="group p-8 rounded-2xl bg-neutral-50 hover:bg-neutral-900 transition-colors duration-300 border border-neutral-100 hover:border-neutral-800 hover:-translate-y-2 shadow-sm">
                 <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white group-hover:bg-neutral-800 text-neutral-900 group-hover:text-yellow-400 transition-all duration-300 flex items-center justify-center shadow-md border border-neutral-100 group-hover:border-neutral-700">
                    <DocumentTextIcon className="w-8 h-8" />
                 </div>
                 <h3 className="text-xl font-bold text-neutral-900 group-hover:text-white mb-3">Job-Winning Templates</h3>
                 <p className="text-neutral-500 group-hover:text-neutral-400 leading-relaxed">
                    Clean, modern designs approved by recruiters to get you noticed fast.
                 </p>
              </div>

           </div>
        </div>
      </section>
      
      {/* Bottom CTA */}
      <section className="py-24 bg-neutral-900 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
          <div className="container mx-auto px-4 relative z-10">
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">Ready to create your legacy?</h2>
              <p className="text-neutral-400 max-w-2xl mx-auto mb-10 text-lg">Join the platform that puts your career first.</p>
              <Link 
                  to="/resume" 
                  className="inline-flex items-center gap-3 px-10 py-5 bg-yellow-400 text-neutral-900 rounded-full font-bold text-xl hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-glow"
              >
                  Build My CV
                  <SparklesIcon className="w-6 h-6" />
              </Link>
          </div>
      </section>

    </div>
  );
};

export default LandingPage;
