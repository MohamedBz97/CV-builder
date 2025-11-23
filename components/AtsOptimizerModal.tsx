import React, { useState } from 'react';
import { ResumeSchema, AtsAnalysisResult } from '../types';
import { analyzeJobDescription } from '../services/geminiService';
import { SparklesIcon, CheckBadgeIcon } from './icons';

interface AtsOptimizerModalProps {
  resumeSchema: ResumeSchema;
  onClose: () => void;
}

const AtsOptimizerModal: React.FC<AtsOptimizerModalProps> = ({ resumeSchema, onClose }) => {
    const [jobDescription, setJobDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<AtsAnalysisResult | null>(null);

    const handleAnalyze = async () => {
        if (!jobDescription.trim()) {
            alert('Please paste a job description.');
            return;
        }
        setIsLoading(true);
        setResults(null);
        const analysisResults = await analyzeJobDescription(jobDescription, resumeSchema);
        setResults(analysisResults);
        setIsLoading(false);
    };

    const KeywordBadge: React.FC<{ keyword: string }> = ({ keyword }) => (
        <span className="inline-block bg-red-100 text-red-700 border border-red-200 text-xs font-semibold mr-2 mb-2 px-2.5 py-1 rounded-full">{keyword}</span>
    );

    const PresentKeywordBadge: React.FC<{ keyword: string }> = ({ keyword }) => (
        <span className="inline-block bg-green-100 text-green-800 border border-green-200 text-xs font-semibold mr-2 mb-2 px-2.5 py-1 rounded-full flex-inline items-center gap-1">
            <CheckBadgeIcon className="w-3 h-3 inline" />
            {keyword}
        </span>
    );

    const ResultCard: React.FC<{title: string, children: React.ReactNode, className?: string}> = ({title, children, className}) => (
        <div className={`bg-neutral-50 p-5 rounded-xl border border-neutral-200 ${className}`}>
            <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wide mb-3">{title}</h3>
            {children}
        </div>
    );

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-600';
        if (score >= 50) return 'text-yellow-500';
        return 'text-red-500';
    };
    
    const getScoreBg = (score: number) => {
        if (score >= 80) return 'bg-green-50 border-green-200';
        if (score >= 50) return 'bg-yellow-50 border-yellow-200';
        return 'bg-red-50 border-red-200';
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-3xl max-h-[90vh] flex flex-col animate-scale-in overflow-hidden">
                <div className="flex justify-between items-center mb-6 flex-shrink-0">
                    <div>
                         <h2 className="text-2xl font-bold text-neutral-800 flex items-center gap-2">
                            <SparklesIcon className="w-6 h-6 text-accent" />
                            Job Description Matcher
                        </h2>
                        <p className="text-neutral-500 text-sm mt-1">Compare your resume against a job description to see your match score.</p>
                    </div>
                    <button onClick={onClose} className="text-3xl font-light text-neutral-400 hover:text-neutral-800 transition-colors">&times;</button>
                </div>
                
                <div className="overflow-y-auto pr-2 space-y-6 flex-grow">
                    {!results && (
                        <div>
                            <label htmlFor="job-description" className="block text-sm font-bold text-neutral-700 mb-2">
                                Paste Job Description (JD)
                            </label>
                            <textarea
                                id="job-description"
                                rows={10}
                                className="w-full p-4 border border-neutral-300 rounded-xl shadow-inner focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
                                placeholder="Paste the full job description here to analyze missing keywords..."
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                disabled={isLoading}
                            />
                            
                            <div className="text-center mt-6">
                                <button
                                    onClick={handleAnalyze}
                                    disabled={isLoading}
                                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-neutral-900 text-white font-bold text-lg rounded-xl hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                            Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            <SparklesIcon className="w-5 h-5" />
                                            Analyze Match
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {results && (
                        <div className="animate-fade-in space-y-6">
                            
                            {/* Score Section */}
                            <div className={`p-6 rounded-2xl border-2 flex flex-col items-center justify-center text-center ${getScoreBg(results.score)}`}>
                                <p className="text-sm font-bold uppercase tracking-widest opacity-70 mb-2">Match Score</p>
                                <div className={`text-6xl font-black ${getScoreColor(results.score)}`}>
                                    {results.score}%
                                </div>
                                <p className="mt-2 text-sm font-medium text-neutral-600 max-w-lg">
                                    {results.score >= 80 ? "Excellent match! Your profile aligns well with this role." : 
                                     results.score >= 50 ? "Good start, but you're missing some key requirements." : 
                                     "Low match. Consider tailoring your resume heavily for this role."}
                                </p>
                            </div>

                            <ResultCard title="AI Analysis">
                                <p className="text-sm text-neutral-700 leading-relaxed">{results.analysis}</p>
                            </ResultCard>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ResultCard title="Missing Keywords (Add These)" className="bg-red-50/50 border-red-100">
                                    {results.missingKeywords.technical.length === 0 && results.missingKeywords.softSkills.length === 0 && results.missingKeywords.other.length === 0 ? (
                                        <p className="text-sm text-neutral-500 italic">No missing keywords found. Perfect match!</p>
                                    ) : (
                                        <div className="space-y-4">
                                            {results.missingKeywords.technical.length > 0 && (
                                                <div>
                                                    <h4 className="font-semibold text-xs text-neutral-500 uppercase mb-2">Technical</h4>
                                                    <div className="flex flex-wrap">{results.missingKeywords.technical.map(kw => <KeywordBadge key={kw} keyword={kw} />)}</div>
                                                </div>
                                            )}
                                            {results.missingKeywords.softSkills.length > 0 && (
                                                <div>
                                                    <h4 className="font-semibold text-xs text-neutral-500 uppercase mb-2">Soft Skills</h4>
                                                    <div className="flex flex-wrap">{results.missingKeywords.softSkills.map(kw => <KeywordBadge key={kw} keyword={kw} />)}</div>
                                                </div>
                                            )}
                                            {results.missingKeywords.other.length > 0 && (
                                                <div>
                                                    <h4 className="font-semibold text-xs text-neutral-500 uppercase mb-2">Other</h4>
                                                    <div className="flex flex-wrap">{results.missingKeywords.other.map(kw => <KeywordBadge key={kw} keyword={kw} />)}</div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </ResultCard>

                                <ResultCard title="Keywords Found (Good Job)" className="bg-green-50/50 border-green-100">
                                    {results.presentKeywords.length > 0 ? (
                                        <div className="flex flex-wrap gap-1">{results.presentKeywords.map(kw => <PresentKeywordBadge key={kw} keyword={kw} />)}</div>
                                    ) : (
                                        <p className="text-sm text-neutral-500 italic">No matching keywords found from the job description.</p>
                                    )}
                                </ResultCard>
                            </div>
                            
                            <div className="text-center pt-4">
                                <button 
                                    onClick={() => setResults(null)} 
                                    className="text-neutral-500 hover:text-neutral-900 text-sm font-semibold underline"
                                >
                                    Analyze Another Job Description
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                 
                 {results && (
                     <div className="mt-4 text-right flex-shrink-0 border-t pt-4">
                        <button onClick={onClose} className="px-6 py-2 bg-neutral-900 text-white font-bold rounded-lg hover:bg-neutral-800 transition-colors">Done</button>
                    </div>
                 )}
            </div>
        </div>
    );
};

export default AtsOptimizerModal;