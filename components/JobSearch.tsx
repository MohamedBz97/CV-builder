
import React, { useState, useEffect } from 'react';
import { ArrowTopRightOnSquareIcon, BriefcaseIcon, MagnifyingGlassCircleIcon, DocumentCheckIcon, XMarkIcon } from './icons';

interface JobBoard {
  name: string;
  description: string;
  url: string;
}

interface LiveJob {
    id: number;
    url: string;
    title: string;
    company_name: string;
    company_logo: string;
    category: string;
    job_type: string;
    publication_date: string;
    candidate_required_location: string;
    salary: string;
}

const partnerBoards: JobBoard[] = [
  {
    name: 'Indeed',
    description: 'The #1 job site in the world with over 250 million unique visitors every month.',
    url: 'https://www.indeed.com',
  },
  {
    name: 'ZipRecruiter',
    description: 'The smartest way to hire and get hired. Rated #1 job search app.',
    url: 'https://www.ziprecruiter.com',
  },
  {
    name: 'LinkedIn Jobs',
    description: 'Leverage your professional network and get hired. Find jobs that fit your life.',
    url: 'https://www.linkedin.com/jobs',
  },
  {
    name: 'Glassdoor',
    description: 'Search millions of jobs and get the inside scoop on companies with employee reviews.',
    url: 'https://www.glassdoor.com',
  },
  {
    name: 'Monster',
    description: 'Find the job that is right for you. Use Monster\'s resources to create a killer resume.',
    url: 'https://www.monster.com',
  },
  {
    name: 'SimplyHired',
    description: 'One search, millions of jobs. Browse job listings from thousands of websites.',
    url: 'https://www.simplyhired.com',
  },
   {
    name: 'Reed.co.uk',
    description: 'The UK\'s #1 job site. Featuring vacancies from over 25,000 recruiters.',
    url: 'https://www.reed.co.uk',
  },
  {
    name: 'SEEK',
    description: 'Australia\'s number one employment marketplace. Find jobs in AU, NZ and Asia.',
    url: 'https://www.seek.com.au',
  },
  {
    name: 'Naukri',
    description: 'India\'s No.1 Job Portal. Explore 5 Lakh+ Jobs across Top Companies.',
    url: 'https://www.naukri.com',
  }
];

const JobSearch: React.FC = () => {
    const [liveJobs, setLiveJobs] = useState<LiveJob[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [limit, setLimit] = useState(20);

    const fiverrAffiliateLink = "https://go.fiverr.com/visit/?bta=408179&brand=fiverrmarketplace&landingPage=https%253A%252F%252Fwww.fiverr.com%252Fboomsa%252Fedit-your-complex-resume-cover-letter-or-linkedin%253Fcontext_referrer%253Dsubcategory_listing%2526source%253Dtoggle_filters%2526ref_ctx_id%253D5d39d6d02f784423a31c91e73a4c4945%2526pckg_id%253D1%2526pos%253D1%2526context_type%253Drating%2526funnel%253D5d39d6d02f784423a31c91e73a4c4945%2526ref%253Dpro%25253Aany%2526imp_id%253D2c537328-b2c0-4478-87e2-ee5b805623e3";

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                // Fetching from Remotive API (Public API for Remote Jobs)
                const response = await fetch(`https://remotive.com/api/remote-jobs?limit=${limit}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch jobs');
                }
                const data = await response.json();
                setLiveJobs(data.jobs || []);
            } catch (err) {
                console.error(err);
                setError('Could not load live jobs. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [limit]);

    const filteredJobs = liveJobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        job.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Helper to extract domain for Clearbit Logo API
    const getLogoUrl = (url: string) => {
        try {
            const domain = new URL(url).hostname;
            return `https://logo.clearbit.com/${domain}`;
        } catch (e) {
            return '';
        }
    };

  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-64px)] animate-fade-in-up bg-neutral-50">
        <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 text-neutral-900 rounded-2xl mb-6 shadow-lg rotate-3 border-2 border-neutral-900">
                 <MagnifyingGlassCircleIcon className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-black text-neutral-900 mb-4 tracking-tight">Find Your Next <span className="text-primary">Dream Job</span></h1>
            <p className="text-lg text-neutral-600 mb-8">
                Browse our curated list of partners or search our live feed of opportunities below.
            </p>

            <a 
                href={fiverrAffiliateLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-neutral-900 text-white font-bold rounded-xl hover:bg-neutral-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 group"
            >
                <DocumentCheckIcon className="w-6 h-6 text-yellow-400 group-hover:scale-110 transition-transform" />
                <span>Get a Professional Resume Review</span>
            </a>
        </div>

        {/* Static Partners Grid with Dynamic Logos */}
        <div className="mb-20">
            <h2 className="text-2xl font-bold text-neutral-800 mb-6 flex items-center gap-2">
                <BriefcaseIcon className="w-6 h-6 text-neutral-400" />
                Featured Job Boards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {partnerBoards.map((board) => (
                    <div key={board.name} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-100 flex flex-col overflow-hidden hover:-translate-y-1 group">
                         <div className="h-1.5 w-full bg-neutral-100 group-hover:bg-primary transition-colors"></div>
                        <div className="p-8 flex flex-col flex-grow">
                            <div className="flex items-center gap-4 mb-5">
                                <div className="w-14 h-14 rounded-xl bg-white border border-neutral-100 flex items-center justify-center shadow-md p-2 overflow-hidden">
                                    <img 
                                        src={getLogoUrl(board.url)} 
                                        alt={`${board.name} Logo`} 
                                        className="w-full h-full object-contain"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            e.currentTarget.parentElement?.classList.add('bg-neutral-100');
                                            e.currentTarget.parentElement!.innerText = board.name.charAt(0);
                                        }}
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-neutral-800">{board.name}</h3>
                            </div>
                            <p className="text-neutral-500 mb-8 leading-relaxed flex-grow text-sm">
                                {board.description}
                            </p>
                            <a 
                                href={board.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-lg transition-colors shadow-lg shadow-neutral-500/20"
                            >
                                Visit Site
                                <ArrowTopRightOnSquareIcon className="w-4 h-4 text-yellow-400" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Live Job Feed */}
        <div id="live-jobs" className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 sm:p-8 mb-20">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                     <h2 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        Live Remote Opportunities
                    </h2>
                    <p className="text-sm text-neutral-500 mt-1">Powered by Remotive API</p>
                </div>
                
                {/* Search Bar */}
                <div className="relative w-full md:w-80">
                    <input 
                        type="text" 
                        placeholder="Search role or company..."
                        className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <MagnifyingGlassCircleIcon className="w-5 h-5 text-neutral-400 absolute left-3 top-2.5" />
                    {searchTerm && (
                        <button onClick={() => setSearchTerm('')} className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-600">
                            <XMarkIcon className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="animate-pulse flex items-center p-4 border rounded-lg">
                            <div className="w-12 h-12 bg-neutral-200 rounded-lg mr-4"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-neutral-200 rounded w-1/3"></div>
                                <div className="h-3 bg-neutral-200 rounded w-1/4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : error ? (
                <div className="p-8 text-center bg-red-50 text-red-600 rounded-xl border border-red-100">
                    <p>{error}</p>
                    <button onClick={() => setLimit(limit + 1)} className="mt-2 text-sm underline hover:text-red-800">Retry</button>
                </div>
            ) : (
                <>
                <div className="grid gap-4">
                    {filteredJobs.length === 0 ? (
                        <div className="text-center py-12 text-neutral-500">
                            No jobs found matching "{searchTerm}".
                        </div>
                    ) : (
                        filteredJobs.map((job) => (
                            <div key={job.id} className="group border border-neutral-100 rounded-xl p-4 sm:p-6 hover:bg-neutral-50 hover:border-neutral-200 transition-all flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                                {/* Logo */}
                                <div className="w-16 h-16 rounded-lg bg-white border border-neutral-200 flex items-center justify-center p-2 shrink-0 shadow-sm">
                                    {job.company_logo ? (
                                        <img src={job.company_logo} alt={job.company_name} className="max-w-full max-h-full object-contain" />
                                    ) : (
                                        <BriefcaseIcon className="w-8 h-8 text-neutral-300" />
                                    )}
                                </div>
                                
                                {/* Info */}
                                <div className="flex-grow">
                                    <h3 className="text-lg font-bold text-neutral-900 group-hover:text-primary transition-colors">{job.title}</h3>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-600 mt-1">
                                        <span className="font-semibold text-neutral-800">{job.company_name}</span>
                                        <span className="hidden sm:inline text-neutral-300">|</span>
                                        <span>{job.candidate_required_location}</span>
                                        <span className="hidden sm:inline text-neutral-300">|</span>
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-100">
                                            {job.job_type ? job.job_type.replace('_', ' ') : 'Full Time'}
                                        </span>
                                    </div>
                                    <div className="mt-2 text-xs text-neutral-400">
                                        Posted: {new Date(job.publication_date).toLocaleDateString()}
                                    </div>
                                </div>

                                {/* Apply Button */}
                                <a 
                                    href={job.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="w-full sm:w-auto px-6 py-2.5 bg-white border border-neutral-300 text-neutral-700 font-bold rounded-lg hover:bg-neutral-900 hover:text-white transition-all text-center whitespace-nowrap shadow-sm"
                                >
                                    Apply Now
                                </a>
                            </div>
                        ))
                    )}
                </div>
                {filteredJobs.length > 0 && filteredJobs.length >= limit && (
                     <div className="mt-8 text-center">
                        <button 
                            onClick={() => setLimit(prev => prev + 20)} 
                            className="px-6 py-3 bg-neutral-100 text-neutral-600 font-bold rounded-lg hover:bg-neutral-200 transition-colors"
                        >
                            Load More Jobs
                        </button>
                    </div>
                )}
                </>
            )}
        </div>

        {/* Affiliate / Expert Review CTA Section */}
        <div className="mb-20 bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
             {/* Decorative Circles */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-left">
                    <h2 className="text-3xl font-black mb-4">Want a Human Expert to Review Your CV?</h2>
                    <p className="text-green-50 text-lg max-w-xl">
                        AI is great, but human insight is legendary. Hire a top-rated resume editor on Fiverr Pro to polish your application to perfection.
                    </p>
                </div>
                <a
                    href={fiverrAffiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap px-8 py-4 bg-white text-green-700 font-bold rounded-xl hover:bg-neutral-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
                >
                    <DocumentCheckIcon className="w-5 h-5" />
                    Get Professional Review
                </a>
            </div>
        </div>

        <div className="mt-16 bg-neutral-900 rounded-2xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-neutral-800 to-neutral-900 z-0"></div>
            <div className="relative z-10">
                <MagnifyingGlassCircleIcon className="w-16 h-16 mx-auto mb-6 text-yellow-400 opacity-80" />
                <h2 className="text-3xl font-bold mb-4">Not sure where to start?</h2>
                <p className="text-neutral-400 max-w-xl mx-auto mb-8">
                    Use our AI-powered Job Matcher inside the Resume Builder to tailor your CV to specific job descriptions before applying.
                </p>
                <div className="inline-block px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm text-sm text-neutral-300">
                    * Some links above may be affiliate links.
                </div>
            </div>
        </div>
    </div>
  );
};

export default JobSearch;
