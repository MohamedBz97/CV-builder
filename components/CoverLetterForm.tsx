import React, { useState } from 'react';
import { CoverLetterSchema, ResumeSchema, CoverLetterTone } from '../types';
import { PlusCircleIcon, TrashIcon, SparklesIcon, LockClosedIcon, BoltIcon } from './icons';
import { generateCoverLetterSuggestion, extractJobDetailsFromDescription } from '../services/geminiService';
import { useAuth } from '../contexts/AuthContext';
import PremiumModal from './PremiumModal';

interface CoverLetterFormProps {
  coverLetterSchema: CoverLetterSchema;
  setCoverLetterSchema: React.Dispatch<React.SetStateAction<CoverLetterSchema>>;
  resumeSchema: ResumeSchema;
}

const CoverLetterForm: React.FC<CoverLetterFormProps> = ({ coverLetterSchema, setCoverLetterSchema, resumeSchema }) => {
  const { isPremium } = useAuth();
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [extracting, setExtracting] = useState(false);
  
  const inputClass = "w-full p-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary focus:border-primary";
  const labelClass = "block text-sm font-medium text-neutral-600 mb-1";
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCoverLetterSchema(prev => ({ ...prev, [name]: value }));
  };

  const handleBodyChange = (index: number, value: string) => {
    const newBody = [...coverLetterSchema.body];
    newBody[index] = value;
    setCoverLetterSchema(prev => ({ ...prev, body: newBody }));
  };

  const addParagraph = () => {
    setCoverLetterSchema(prev => ({ ...prev, body: [...prev.body, ''] }));
  };

  const removeParagraph = (index: number) => {
    if (coverLetterSchema.body.length <= 1) return; // Don't remove the last paragraph
    setCoverLetterSchema(prev => ({ ...prev, body: prev.body.filter((_, i) => i !== index) }));
  };

  const handleAutoFill = async () => {
      if (!coverLetterSchema.jobDescription?.trim()) {
          alert("Please paste a Job Description first.");
          return;
      }
      setExtracting(true);
      const details = await extractJobDetailsFromDescription(coverLetterSchema.jobDescription);
      
      setCoverLetterSchema(prev => ({
          ...prev,
          companyName: details.companyName,
          recipientTitle: details.recipientTitle,
          recipientName: details.recipientName,
          salutation: `Dear ${details.recipientName},`
      }));
      setExtracting(false);
  };
  
  const handleGenerateBody = async () => {
    if (!isPremium) {
        setIsPremiumModalOpen(true);
        return;
    }

    setAiLoading(true);
    const suggestion = await generateCoverLetterSuggestion(coverLetterSchema, resumeSchema);
    setCoverLetterSchema(prev => ({ ...prev, body: suggestion }));
    setAiLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-neutral-800 border-b pb-3 mb-6">Cover Letter Content</h3>
      </div>

      {/* Job Description & Auto-Fill Section */}
      <div className="p-4 border rounded-lg bg-blue-50/50 border-blue-100">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-bold text-lg text-blue-900">Job Details & AI Extraction</h4>
            <div className="flex items-center gap-2">
                 <label className="text-sm font-medium text-blue-800">Tone:</label>
                 <select 
                    name="tone" 
                    value={coverLetterSchema.tone} 
                    onChange={handleChange}
                    className="p-1.5 text-sm border-blue-200 rounded-md focus:ring-blue-500 bg-white"
                 >
                     <option value="Professional">Professional</option>
                     <option value="Confident">Confident</option>
                     <option value="Humble">Humble</option>
                     <option value="Creative">Creative</option>
                 </select>
            </div>
          </div>
          
          <label className={labelClass}>Paste Job Description (JD) here</label>
          <textarea
              name="jobDescription"
              value={coverLetterSchema.jobDescription || ''}
              onChange={handleChange}
              rows={4}
              className={`${inputClass} mb-3`}
              placeholder="Paste the full job description here..."
          />
          
          <button 
            onClick={handleAutoFill}
            disabled={extracting || !coverLetterSchema.jobDescription}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
              <BoltIcon className="w-4 h-4 text-yellow-300" />
              {extracting ? 'Extracting Info...' : 'Auto-Fill Details from JD'}
          </button>
      </div>

      <div className="p-4 border rounded-lg bg-neutral-50">
        <h4 className="font-bold mb-2 text-lg">Recipient Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2"><label className={labelClass}>Company Name</label><input type="text" name="companyName" value={coverLetterSchema.companyName} onChange={handleChange} className={inputClass} /></div>
          <div><label className={labelClass}>Recipient Name</label><input type="text" name="recipientName" value={coverLetterSchema.recipientName} onChange={handleChange} className={inputClass} placeholder="e.g. Hiring Manager" /></div>
          <div><label className={labelClass}>Recipient Title</label><input type="text" name="recipientTitle" value={coverLetterSchema.recipientTitle} onChange={handleChange} className={inputClass} placeholder="e.g. Senior Recruiter" /></div>
        </div>
      </div>
      
      <div className="p-4 border rounded-lg bg-neutral-50">
        <h4 className="font-bold mb-2 text-lg">Letter Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className={labelClass}>Date</label><input type="text" name="date" value={coverLetterSchema.date} onChange={handleChange} className={inputClass} /></div>
            <div><label className={labelClass}>Salutation</label><input type="text" name="salutation" value={coverLetterSchema.salutation} onChange={handleChange} className={inputClass} placeholder="e.g., Dear Ms. Smith," /></div>
        </div>
      </div>

      <div className="p-4 border rounded-lg bg-neutral-50">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-bold text-lg">Letter Body</h4>
          <button 
              onClick={handleGenerateBody} 
              disabled={aiLoading}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors ${isPremium ? 'bg-accent text-white hover:bg-orange-600 disabled:bg-orange-300' : 'bg-neutral-800 text-yellow-400 hover:bg-neutral-700'}`}
          >
              {isPremium ? <SparklesIcon className="w-4 h-4" /> : <LockClosedIcon className="w-4 h-4" />}
              {isPremium ? (aiLoading ? 'Generating...' : `Generate (${coverLetterSchema.tone})`) : 'Unlock AI Writer'}
          </button>
        </div>
        <div className="space-y-4">
          {coverLetterSchema.body.map((paragraph, index) => (
            <div key={index} className="relative">
              <label className={`${labelClass}`}>Paragraph {index + 1}</label>
              <textarea
                value={paragraph}
                onChange={(e) => handleBodyChange(index, e.target.value)}
                rows={5}
                className={inputClass}
              />
              {coverLetterSchema.body.length > 1 && (
                  <button onClick={() => removeParagraph(index)} className="absolute top-0 right-0 mt-1 mr-1 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100">
                    <TrashIcon className="w-5 h-5" />
                  </button>
              )}
            </div>
          ))}
        </div>
         <button onClick={addParagraph} className="mt-4 flex items-center gap-2 text-secondary font-semibold hover:text-blue-700">
            <PlusCircleIcon className="w-5 h-5"/> Add Paragraph
        </button>
      </div>

      <div className="p-4 border rounded-lg bg-neutral-50">
        <h4 className="font-bold mb-2 text-lg">Closing</h4>
        <div><label className={labelClass}>Sign-off</label><input type="text" name="signoff" value={coverLetterSchema.signoff} onChange={handleChange} className={inputClass} placeholder="e.g., Sincerely," /></div>
      </div>
      
      <PremiumModal isOpen={isPremiumModalOpen} onClose={() => setIsPremiumModalOpen(false)} />
    </div>
  );
};

export default CoverLetterForm;