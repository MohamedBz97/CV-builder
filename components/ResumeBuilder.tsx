
import React, { useState, useRef, useCallback } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import useLocalStorage from '../hooks/useLocalStorage';
import { DEFAULT_RESUME_SCHEMA, DEFAULT_LAYOUT } from '../constants';
import { ResumeSchema, Template, ResumeLayout, SectionKey } from '../types';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import TemplateGallery from './TemplateGallery';
import SectionSidebar from './SectionSidebar';
import { ArrowDownTrayIcon, EyeIcon, MagnifyingGlassCircleIcon, CloudArrowUpIcon } from './icons';
import { useAuth } from '../contexts/AuthContext';
import AtsOptimizerModal from './AtsOptimizerModal';
import ImportResumeModal from './ImportResumeModal';

const ResumeBuilder: React.FC = () => {
  const { currentUser } = useAuth();
  const [resumeSchema, setResumeSchema] = useLocalStorage<ResumeSchema>('resumeData', DEFAULT_RESUME_SCHEMA, currentUser);
  const [layout, setLayout] = useLocalStorage<ResumeLayout>('resumeLayout', DEFAULT_LAYOUT, currentUser);
  const [selectedTemplate, setSelectedTemplate] = useLocalStorage<Template>('selectedTemplate', Template.ONYX, currentUser);
  const [activeSection, setActiveSection] = useState<SectionKey | 'basics'>('basics');
  
  const [isDownloading, setIsDownloading] = useState(false);
  const [isTemplateGalleryOpen, setIsTemplateGalleryOpen] = useState(false);
  const [isAtsModalOpen, setIsAtsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = useCallback(() => {
    const input = previewRef.current;
    if (input) {
      setIsDownloading(true);
      // Temporarily set the width to a fixed value for consistent PDF output
      const originalWidth = input.style.width;
      input.style.width = `816px`;

      html2canvas(input, {
        scale: 4, 
        useCORS: true, 
        logging: false,
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        // A4 dimensions in points: 595.28 x 841.89
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
        pdf.save(`${resumeSchema.basics.name.replace(' ', '_')}_Resume.pdf`);
        setIsDownloading(false);
        // Restore original width
        input.style.width = originalWidth;
      }).catch(err => {
        console.error("Error generating PDF:", err);
        setIsDownloading(false);
        input.style.width = originalWidth;
      });
    }
  }, [resumeSchema.basics.name]);
  
  const handleImport = (data: { name: string; email: string; summary: string }) => {
      setResumeSchema(prev => ({
          ...prev,
          basics: {
              ...prev.basics,
              name: data.name || prev.basics.name,
              email: data.email || prev.basics.email,
              summary: data.summary ? data.summary : prev.basics.summary
          }
      }));
      setActiveSection('basics');
  };

  const enabledSections = layout.sectionOrder.filter(key => layout.sections[key]?.enabled);

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-112px)]">
      {/* Editor Panel */}
      <div className="w-full md:w-1/2 flex bg-white border-r">
        <SectionSidebar 
          layout={layout}
          setLayout={setLayout}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
        <div className="flex-grow p-4 sm:p-6 lg:p-8 overflow-y-auto" style={{ scrollPaddingTop: '20px' }}>
          <ResumeForm 
            resumeSchema={resumeSchema} 
            setResumeSchema={setResumeSchema} 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            sectionOrder={enabledSections}
          />
        </div>
      </div>
      
      {/* Preview Panel */}
      <div className="w-full md:w-1/2 p-4 sm:p-6 lg:p-8 bg-neutral-100 flex flex-col">
        <div className="sticky top-0 bg-neutral-100 pt-4 pb-4 z-10 border-b border-neutral-200">
             <div className="flex justify-between items-center flex-wrap gap-2">
                <h2 className="text-2xl font-bold text-neutral-800 flex items-center gap-2">
                    <EyeIcon className="w-7 h-7" />
                    Live Preview
                </h2>
                <div className="flex items-center gap-2 sm:gap-2 flex-wrap justify-end">
                     <button
                        onClick={() => setIsImportModalOpen(true)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-neutral-300 text-neutral-700 text-sm font-semibold rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                        <CloudArrowUpIcon className="w-4 h-4" />
                        <span className="hidden sm:inline">Import</span>
                    </button>
                     <button
                        onClick={() => setIsAtsModalOpen(true)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                    >
                        <MagnifyingGlassCircleIcon className="w-4 h-4" />
                        <span className="hidden sm:inline">ATS Scan</span>
                    </button>
                     <button
                        onClick={handleDownloadPdf}
                        disabled={isDownloading}
                        className="flex items-center gap-2 px-3 py-1.5 bg-secondary text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >
                        <ArrowDownTrayIcon className="w-4 h-4" />
                        <span className="hidden sm:inline">{isDownloading ? 'Downloading...' : 'Download'}</span>
                    </button>
                    <button
                        onClick={() => setIsTemplateGalleryOpen(true)}
                        className="px-3 py-1.5 border border-neutral-300 rounded-lg shadow-sm text-sm font-semibold text-secondary hover:bg-neutral-50"
                    >
                        <span className="hidden sm:inline">Change Template</span>
                        <span className="sm:hidden">Template</span>
                    </button>
                </div>
            </div>
        </div>
        <div className="flex-grow pt-8 overflow-y-auto">
          <div ref={previewRef} className="w-full mx-auto" style={{ maxWidth: '816px' }}>
            <ResumePreview 
              resumeData={resumeSchema} 
              template={selectedTemplate} 
              sectionOrder={enabledSections}
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
        />
    )}
    {isAtsModalOpen && (
        <AtsOptimizerModal 
            resumeSchema={resumeSchema}
            onClose={() => setIsAtsModalOpen(false)}
        />
    )}
    {isImportModalOpen && (
        <ImportResumeModal
            onImport={handleImport}
            onClose={() => setIsImportModalOpen(false)}
        />
    )}
    </div>
  );
};

export default ResumeBuilder;
