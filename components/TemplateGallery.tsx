import React from 'react';
import { Template } from '../types';
import { DEFAULT_RESUME_SCHEMA, DEFAULT_SECTION_ORDER, DEFAULT_COVER_LETTER_SCHEMA } from '../constants';
import ResumePreview from './ResumePreview';
import CoverLetterPreview from './CoverLetterPreview';

interface TemplateGalleryProps {
  currentTemplate: Template;
  onSelectTemplate: (template: Template) => void;
  onClose: () => void;
  type?: 'resume' | 'cover-letter';
}

const TemplateGallery: React.FC<TemplateGalleryProps> = ({ currentTemplate, onSelectTemplate, onClose, type = 'resume' }) => {
  const templates = Object.values(Template);

  const handleSelect = (template: Template) => {
    onSelectTemplate(template);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-neutral-800">Choose a {type === 'resume' ? 'Resume' : 'Cover Letter'} Template</h2>
            <button onClick={onClose} className="text-2xl font-bold text-neutral-500 hover:text-neutral-800">&times;</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((template) => (
            <div key={template}>
              <div 
                className={`border-4 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${currentTemplate === template ? 'border-primary' : 'border-transparent hover:border-secondary'}`}
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
              </div>
              <p className="text-center mt-2 font-semibold text-neutral-700">{template}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateGallery;