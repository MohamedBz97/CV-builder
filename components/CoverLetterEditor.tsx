import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import useLocalStorage from '../hooks/useLocalStorage';
import { DEFAULT_COVER_LETTER_SCHEMA, DEFAULT_RESUME_SCHEMA } from '../constants';
import { CoverLetterSchema, ResumeSchema, Template } from '../types';
import CoverLetterForm from './CoverLetterForm';
import CoverLetterPreview from './CoverLetterPreview';
import TemplateGallery from './TemplateGallery';
import { ArrowDownTrayIcon, EyeIcon } from './icons';
import { useAuth } from '../contexts/AuthContext';

const CoverLetterEditor: React.FC = () => {
  const { currentUser } = useAuth();
  const [coverLetterSchema, setCoverLetterSchema] = useLocalStorage<CoverLetterSchema>('coverLetterData', DEFAULT_COVER_LETTER_SCHEMA, currentUser);
  const [resumeSchema] = useLocalStorage<ResumeSchema>('resumeData', DEFAULT_RESUME_SCHEMA, currentUser);
  const [selectedTemplate, setSelectedTemplate] = useLocalStorage<Template>('coverLetterTemplate', Template.ONYX, currentUser);
  
  const [isDownloading, setIsDownloading] = useState(false);
  const [isTemplateGalleryOpen, setIsTemplateGalleryOpen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = () => {
    const input = previewRef.current;
    if (input) {
      setIsDownloading(true);
      const originalWidth = input.style.width;
      input.style.width = `816px`;

      html2canvas(input, {
        scale: 4, 
        useCORS: true, 
        logging: false,
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'pt',
          format: 'a4',
        });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        const canvasAspectRatio = canvas.width / canvas.height;
        const pdfAspectRatio = pdfWidth / pdfHeight;

        let finalCanvasWidth, finalCanvasHeight;

        if (canvasAspectRatio > pdfAspectRatio) {
            finalCanvasWidth = pdfWidth;
            finalCanvasHeight = pdfWidth / canvasAspectRatio;
        } else {
            finalCanvasHeight = pdfHeight;
            finalCanvasWidth = pdfHeight * canvasAspectRatio;
        }

        pdf.addImage(imgData, 'PNG', 0, 0, finalCanvasWidth, finalCanvasHeight);
        pdf.save(`${resumeSchema.basics.name.replace(' ', '_')}_Cover_Letter.pdf`);
        
        input.style.width = originalWidth;
        setIsDownloading(false);
      }).catch(err => {
        console.error("Error generating PDF:", err);
        input.style.width = originalWidth;
        setIsDownloading(false);
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-112px)]">
      {/* Editor Panel */}
      <div className="w-full md:w-1/2 p-4 sm:p-6 lg:p-8 bg-white overflow-y-auto">
        <CoverLetterForm
          coverLetterSchema={coverLetterSchema}
          setCoverLetterSchema={setCoverLetterSchema}
          resumeSchema={resumeSchema}
        />
      </div>
      
      {/* Preview Panel */}
      <div className="w-full md:w-1/2 p-4 sm:p-6 lg:p-8 bg-neutral-100 flex flex-col">
        <div className="sticky top-0 bg-neutral-100 pt-4 pb-4 z-10 border-b border-neutral-200">
             <div className="flex justify-between items-center flex-wrap gap-2">
                <h2 className="text-2xl font-bold text-neutral-800 flex items-center gap-2">
                    <EyeIcon className="w-7 h-7" />
                    Live Preview
                </h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsTemplateGalleryOpen(true)}
                        className="px-3 py-1.5 border border-neutral-300 rounded-lg shadow-sm text-sm font-semibold text-secondary hover:bg-neutral-50"
                    >
                        <span className="hidden sm:inline">Change Template</span>
                        <span className="sm:hidden">Template</span>
                    </button>
                    <button
                        onClick={handleDownloadPdf}
                        disabled={isDownloading}
                        className="flex items-center gap-2 px-3 py-1.5 bg-secondary text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                    >
                        <ArrowDownTrayIcon className="w-4 h-4" />
                        {isDownloading ? '...' : 'Download PDF'}
                    </button>
                </div>
            </div>
        </div>
        <div className="flex-grow pt-8 overflow-y-auto">
          <div ref={previewRef} className="w-full mx-auto" style={{ maxWidth: '816px' }}>
            <CoverLetterPreview
              coverLetterData={coverLetterSchema}
              basics={resumeSchema.basics}
              template={selectedTemplate}
            />
          </div>
        </div>
      </div>

      {isTemplateGalleryOpen && (
        <TemplateGallery
            currentTemplate={selectedTemplate}
            onSelectTemplate={(template) => {
                setSelectedTemplate(template);
                setIsTemplateGalleryOpen(false);
            }}
            onClose={() => setIsTemplateGalleryOpen(false)}
            type="cover-letter"
        />
    )}
    </div>
  );
};

export default CoverLetterEditor;