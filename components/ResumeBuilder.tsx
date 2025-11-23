
import React, { useState, useRef, useCallback, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { DEFAULT_RESUME_SCHEMA, DEFAULT_LAYOUT } from '../constants';
import { ResumeSchema, Template, ResumeLayout, SectionKey } from '../types';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import TemplateGallery from './TemplateGallery';
import SectionSidebar from './SectionSidebar';
import { ArrowDownTrayIcon, EyeIcon, MagnifyingGlassCircleIcon, CloudArrowUpIcon, ArrowDownOnSquareIcon, ArrowUpOnSquareIcon, ChevronDownIcon, ArrowTopRightOnSquareIcon, SparklesIcon } from './icons';
import { useAuth } from '../contexts/AuthContext';
import AtsOptimizerModal from './AtsOptimizerModal';
import ImportResumeModal from './ImportResumeModal';
import ResumeWizard from './ResumeWizard';
import { generatePdf } from '../utils/pdfUtils';
import { generateDocxResume, generateTextResume } from '../utils/exportUtils';

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
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  
  // Wizard state: Check if it's a "fresh" start (default name/title) to show wizard
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
     // If the resume has the default "Your Job Title" or is empty, suggest the wizard
     if (resumeSchema.basics.label === 'Your Job Title' || !resumeSchema.basics.label) {
         // Add a small delay for better UX
         const timer = setTimeout(() => setIsWizardOpen(true), 500);
         return () => clearTimeout(timer);
     }
  }, []);

  // Scroll to top of editor when active section changes
  useEffect(() => {
    if (editorScrollRef.current) {
      editorScrollRef.current.scrollTop = 0;
    }
  }, [activeSection]);

  // Validate active section: if currently selected section becomes disabled, switch to basics
  useEffect(() => {
      if (activeSection !== 'basics' && !layout.sections[activeSection]?.enabled) {
          setActiveSection('basics');
      }
  }, [layout.sections, activeSection]);

  const handleDownloadPdf = useCallback(async () => {
    const input = previewRef.current;
    if (input) {
      setIsDownloading(true);
      setIsExportMenuOpen(false);
      try {
        await generatePdf(input, `${resumeSchema.basics.name.replace(/\s+/g, '_')}_Resume.pdf`);
      } catch (error) {
        console.error("Download failed", error);
        alert("Failed to generate PDF. Please try again.");
      } finally {
        setIsDownloading(false);
      }
    }
  }, [resumeSchema.basics.name]);

  const handleDownloadDocx = async () => {
    setIsDownloading(true);
    setIsExportMenuOpen(false);
    try {
        const blob = await generateDocxResume(resumeSchema);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${resumeSchema.basics.name.replace(/\s+/g, '_')}_Resume.docx`;
        a.click();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("DOCX Generation Failed", error);
        alert("Failed to generate Word document.");
    } finally {
        setIsDownloading(false);
    }
  };

  const handleDownloadTxt = () => {
      setIsExportMenuOpen(false);
      const text = generateTextResume(resumeSchema);
      const blob = new Blob([text], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resumeSchema.basics.name.replace(/\s+/g, '_')}_Resume.txt`;
      a.click();
      window.URL.revokeObjectURL(url);
  };
  
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
  
  const handleWizardComplete = (data: Partial<ResumeSchema>) => {
      setResumeSchema(prev => ({
          ...prev,
          basics: {
              ...prev.basics,
              label: data.basics?.label || prev.basics.label,
              summary: data.basics?.summary || prev.basics.summary,
          },
          skills: data.skills || prev.skills,
          work: data.work && data.work.length > 0 ? data.work : prev.work,
          projects: data.projects && data.projects.length > 0 ? data.projects : prev.projects
      }));
      setIsWizardOpen(false);
  };
  
  const handleBackup = () => {
    const data: any = {};
    const keys = [
        'user_default_resumeData',
        'user_default_resumeLayout',
        'user_default_selectedTemplate',
        'user_default_coverLetterData',
        'user_default_coverLetterTemplate',
        'user_default_isPremium'
    ];
    keys.forEach(key => {
        const value = localStorage.getItem(key);
        if (value) data[key] = JSON.parse(value);
    });
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CV_Legend_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRestoreClick = () => {
    fileInputRef.current?.click();
  };

  const handleRestoreFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const result = event.target?.result as string;
            if (!result) return;
            
            const data = JSON.parse(result);
            let restoredCount = 0;
            
            Object.keys(data).forEach(key => {
                if (key.startsWith('user_default_')) {
                    localStorage.setItem(key, JSON.stringify(data[key]));
                    restoredCount++;
                }
            });

            if (restoredCount > 0) {
                alert('Backup restored successfully! The page will now reload.');
                window.location.reload();
            } else {
                alert('No valid CV Legend data found in this file.');
            }
        } catch (err) {
            console.error(err);
            alert('Invalid file format. Please upload a valid CV Legend backup JSON file.');
        }
    };
    reader.readAsText(file);
    // Reset input
    e.target.value = '';
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
        <div ref={editorScrollRef} className="flex-grow p-4 sm:p-6 lg:p-8 overflow-y-auto" style={{ scrollPaddingTop: '20px' }}>
            {/* Quick Access to Wizard */}
            {!isWizardOpen && (
                <div className="mb-4 flex justify-end">
                     <button 
                        onClick={() => setIsWizardOpen(true)}
                        className="text-xs flex items-center gap-1 text-primary hover:text-blue-700 font-medium bg-blue-50 px-2 py-1 rounded-md"
                     >
                         <SparklesIcon className="w-3 h-3" />
                         Start Wizard
                     </button>
                </div>
            )}
            
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
                     {/* Hidden File Input for Restore */}
                     <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleRestoreFile}
                        className="hidden"
                        accept=".json"
                     />
                     
                     <button
                        onClick={handleRestoreClick}
                        title="Restore from Backup"
                        className="p-2 bg-white border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                        <ArrowUpOnSquareIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleBackup}
                        title="Save Backup"
                        className="p-2 bg-white border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                        <ArrowDownOnSquareIcon className="w-5 h-5" />
                    </button>

                     <button
                        onClick={() => setIsImportModalOpen(true)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-neutral-300 text-neutral-700 text-sm font-semibold rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                        <CloudArrowUpIcon className="w-4 h-4" />
                        <span className="hidden xl:inline">Import Text</span>
                    </button>
                     <button
                        onClick={() => setIsAtsModalOpen(true)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                    >
                        <MagnifyingGlassCircleIcon className="w-4 h-4" />
                        <span className="hidden xl:inline">Job Matcher</span>
                    </button>
                    
                    {/* Export Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
                            disabled={isDownloading}
                            className="flex items-center gap-2 px-3 py-1.5 bg-secondary text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                        >
                            <ArrowDownTrayIcon className="w-4 h-4" />
                            <span className="hidden xl:inline">Export</span>
                            <ChevronDownIcon className="w-3 h-3 ml-1" />
                        </button>
                        
                        {isExportMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-neutral-100 z-50 overflow-hidden animate-fade-in">
                                 <button onClick={handleDownloadPdf} className="w-full text-left px-4 py-3 hover:bg-neutral-50 text-sm font-medium text-neutral-700 border-b border-neutral-100 flex items-center justify-between">
                                    <span>PDF (Standard)</span>
                                    <span className="text-xs text-neutral-400">.pdf</span>
                                 </button>
                                 <button onClick={handleDownloadDocx} className="w-full text-left px-4 py-3 hover:bg-neutral-50 text-sm font-medium text-neutral-700 border-b border-neutral-100 flex items-center justify-between">
                                    <span>Word Document</span>
                                    <span className="text-xs text-neutral-400">.docx</span>
                                 </button>
                                 <button onClick={handleDownloadTxt} className="w-full text-left px-4 py-3 hover:bg-neutral-50 text-sm font-medium text-neutral-700 flex items-center justify-between">
                                    <span>Plain Text</span>
                                    <span className="text-xs text-neutral-400">.txt</span>
                                 </button>
                            </div>
                        )}
                    </div>
                     
                    {/* Professional Review Button (Affiliate) */}
                    <a
                        href="https://www.topresume.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
                    >
                        <span className="hidden xl:inline">Expert Review</span>
                        <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                    </a>

                    <button
                        onClick={() => setIsTemplateGalleryOpen(true)}
                        className="px-3 py-1.5 border border-neutral-300 rounded-lg shadow-sm text-sm font-semibold text-secondary hover:bg-neutral-50"
                    >
                        <span className="hidden xl:inline">Change Template</span>
                        <span className="xl:hidden">Template</span>
                    </button>
                </div>
            </div>
        </div>
        <div className="flex-grow pt-8 overflow-y-auto">
          <div ref={previewRef} className="w-full mx-auto">
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
    {isWizardOpen && (
        <ResumeWizard
            onComplete={handleWizardComplete}
            onClose={() => setIsWizardOpen(false)}
        />
    )}
    </div>
  );
};

export default ResumeBuilder;
