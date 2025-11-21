
import React, { useState } from 'react';
import { CoverLetterSchema, ResumeSchema } from '../types';
import { PlusCircleIcon, TrashIcon, SparklesIcon } from './icons';
import { generateCoverLetterSuggestion } from '../services/geminiService';

interface CoverLetterFormProps {
  coverLetterSchema: CoverLetterSchema;
  setCoverLetterSchema: React.Dispatch<React.SetStateAction<CoverLetterSchema>>;
  resumeSchema: ResumeSchema;
}

const CoverLetterForm: React.FC<CoverLetterFormProps> = ({ coverLetterSchema, setCoverLetterSchema, resumeSchema }) => {
  const [aiLoading, setAiLoading] = useState(false);
  const inputClass = "w-full p-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary focus:border-primary";
  const labelClass = "block text-sm font-medium text-neutral-600 mb-1";
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
  
  const handleGenerateBody = async () => {
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
      <div className="p-4 border rounded-lg bg-neutral-50">
        <h4 className="font-bold mb-2 text-lg">Recipient Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className={labelClass}>Recipient Name</label><input type="text" name="recipientName" value={coverLetterSchema.recipientName} onChange={handleChange} className={inputClass} /></div>
          <div><label className={labelClass}>Recipient Title</label><input type="text" name="recipientTitle" value={coverLetterSchema.recipientTitle} onChange={handleChange} className={inputClass} /></div>
          <div className="md:col-span-2"><label className={labelClass}>Company Name</label><input type="text" name="companyName" value={coverLetterSchema.companyName} onChange={handleChange} className={inputClass} /></div>
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
              className="flex items-center gap-2 px-3 py-1.5 bg-accent text-white text-sm rounded-md hover:bg-orange-600 disabled:bg-orange-300"
          >
              <SparklesIcon className="w-4 h-4" />
              {aiLoading ? 'Generating...' : 'Generate with AI'}
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
    </div>
  );
};

export default CoverLetterForm;
