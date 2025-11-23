
import React, { useState } from 'react';
import { Template } from '../types';
import { DEFAULT_RESUME_SCHEMA, DEFAULT_SECTION_ORDER, DEFAULT_COVER_LETTER_SCHEMA } from '../constants';
import ResumePreview from './ResumePreview';
import CoverLetterPreview from './CoverLetterPreview';
import { LockClosedIcon, StarIcon } from './icons';
import { useAuth } from '../contexts/AuthContext';
import PremiumModal from './PremiumModal';

interface TemplateGalleryProps {
  currentTemplate: Template;
  onSelectTemplate: (template: Template) => void;
  onClose: () => void;
  type?: 'resume' | 'cover-letter';
}

const PREMIUM_TEMPLATES = [Template.ONYX, Template.PIKACHU];

const TemplateGallery: React.FC<TemplateGalleryProps> = ({ currentTemplate, onSelectTemplate, onClose, type = 'resume' }) => {
  const { isPremium } = useAuth();
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const templates = Object.values(Template);

  const handleSelect = (template: Template) => {
    if (PREMIUM_TEMPLATES.includes(template) && !isPremium) {
        setIsPremiumModalOpen(true);
        return;
    }
    onSelectTemplate(template);
  };

  return (
    <>
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-neutral-800">Choose a {type === 'resume' ? 'Resume' : 'Cover Letter'} Template</h2>
            <button onClick={onClose} className="text-2xl font-bold text-neutral-500 hover:text-neutral-800">&times;</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((template) => {
             const isLocked = PREMIUM_TEMPLATES.includes(template) && !isPremium;
             return (
                <div key={template} className="relative group">
                  <div 
                    className={`border-4 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 relative overflow-hidden ${currentTemplate === template ? 'border-primary' : 'border-transparent hover:border-secondary'} ${isLocked ? 'grayscale opacity-75' : ''}`}
                    onClick={() => handleSelect(template)}
                  >
                    <div className="h-[340px] overflow-hidden bg-white shadow-lg pointer-events-none rounded">
                        <div className="transform scale-[0.32] origin-top-left">
                            <div className="w-[816px] h-[1056px]">
                                {type === 'resume' ? (
                                    <ResumePreview resumeData={DEFAULT_RESUME_SCHEMA} template={template} sectionOrder={DEFAULT_SECTION_ORDER} />
                                ) : (
                                    <CoverLetterPreview coverLetterData={DEFAULT_COVER_LETTER_SCHEMA} basics={DEFAULT_RESUME_SCHEMA.basics} template={template} />
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* Lock Overlay */}
                    {isLocked && (
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                             <div className="p-3 bg-neutral-900 rounded-full mb-2">
                                <LockClosedIcon className="w-8 h-8 text-yellow-400" />
                             </div>
                             <span className="font-bold text-lg">Premium</span>
                        </div>
                    )}
                    
                    {/* Premium Badge (Always visible if locked, or if premium) */}
                    {PREMIUM_TEMPLATES.includes(template) && (
                         <div className="absolute top-2 right-2 bg-yellow-400 text-neutral-900 text-xs font-bold px-2 py-1 rounded-md shadow-sm flex items-center gap-1">
                             <StarIcon className="w-3 h-3" /> PRO
                         </div>
                    )}
                  </div>
                  <p className="text-center mt-2 font-semibold text-neutral-700">{template}</p>
                </div>
            )
          })}
        </div>
      </div>
    </div>
    <PremiumModal isOpen={isPremiumModalOpen} onClose={() => setIsPremiumModalOpen(false)} />
    </>
  );
};

export default TemplateGallery;
