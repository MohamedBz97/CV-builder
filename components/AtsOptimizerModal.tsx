import React, { useState } from 'react';
import { ResumeSchema, AtsAnalysisResult } from '../types';
import { analyzeJobDescription } from '../services/geminiService';
import { SparklesIcon } from './icons';

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
        <span className="inline-block bg-blue-100 text-secondary text-xs font-medium mr-2 mb-2 px-2.5 py-1 rounded-full">{keyword}</span>
    );

    const PresentKeywordBadge: React.FC<{ keyword: string }> = ({ keyword }) => (
        <span className="inline-block bg-green-100 text-green-800 text-xs font-medium mr-2 mb-2 px-2.5 py-1 rounded-full">{keyword}</span>
    );

    const ResultCard: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
        <div className="bg-neutral-50 p-4 rounded-lg border">
            <h3 className="text-lg font-semibold text-neutral-700 mb-3">{title}</h3>
            {children}
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl max-h-[90vh] flex flex-col animate-scale-in">
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                    <h2 className="text-2xl font-bold text-neutral-800">ATS Keyword Optimizer</h2>
                    <button onClick={onClose} className="text-2xl font-bold text-neutral-500 hover:text-neutral-800">&times;</button>
                </div>
                <div className="overflow-y-auto pr-4 space-y-4">
                    <div>
                        <label htmlFor="job-description" className="block text-sm font-medium text-neutral-600 mb-1">
                            Paste Job Description
                        </label>
                        <textarea
                            id="job-description"
                            rows={8}
                            className="w-full p-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                            placeholder="Paste the full job description here..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    
                    <div className="text-center">
                         <button
                            onClick={handleAnalyze}
                            disabled={isLoading}
                            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-orange-600 disabled:bg-orange-300 transition-colors"
                        >
                            <SparklesIcon className="w-5 h-5" />
                            {isLoading ? 'Analyzing...' : 'Analyze & Suggest Keywords'}
                        </button>
                    </div>

                    {isLoading && (
                        <div className="text-center p-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                            <p className="mt-4 text-neutral-600">Analyzing, please wait...</p>
                        </div>
                    )}

                    {results && (
                        <div className="mt-6 animate-fade-in space-y-4">
                            <ResultCard title="AI Analysis">
                                <p className="text-sm text-neutral-600">{results.analysis}</p>
                            </ResultCard>
                            
                            <ResultCard title="Suggested Keywords to Add">
                                {results.missingKeywords.technical.length > 0 && (
                                    <div className="mb-3">
                                        <h4 className="font-semibold text-sm mb-2 text-neutral-600">Technical Skills:</h4>
                                        <div>{results.missingKeywords.technical.map(kw => <KeywordBadge key={kw} keyword={kw} />)}</div>
                                    </div>
                                )}
                                 {results.missingKeywords.softSkills.length > 0 && (
                                    <div className="mb-3">
                                        <h4 className="font-semibold text-sm mb-2 text-neutral-600">Soft Skills:</h4>
                                        <div>{results.missingKeywords.softSkills.map(kw => <KeywordBadge key={kw} keyword={kw} />)}</div>
                                    </div>
                                )}
                                {results.missingKeywords.other.length > 0 && (
                                    <div>
                                        <h4 className="font-semibold text-sm mb-2 text-neutral-600">Other Keywords:</h4>
                                        <div>{results.missingKeywords.other.map(kw => <KeywordBadge key={kw} keyword={kw} />)}</div>
                                    </div>
                                )}
                                {results.missingKeywords.technical.length === 0 && results.missingKeywords.softSkills.length === 0 && results.missingKeywords.other.length === 0 && (
                                    <p className="text-sm text-neutral-500">No missing keywords found. Great job!</p>
                                )}
                            </ResultCard>

                             <ResultCard title="Keywords Already in Your Resume">
                                {results.presentKeywords.length > 0 ? (
                                    <div>{results.presentKeywords.map(kw => <PresentKeywordBadge key={kw} keyword={kw} />)}</div>
                                ) : (
                                    <p className="text-sm text-neutral-500">No matching keywords from the job description were found in your resume.</p>
                                )}
                            </ResultCard>
                        </div>
                    )}

                </div>
                 <div className="mt-6 text-right flex-shrink-0 border-t pt-4">
                    <button onClick={onClose} className="px-5 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300">Close</button>
                </div>
            </div>
        </div>
    );
};

export default AtsOptimizerModal;