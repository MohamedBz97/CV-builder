import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { suggestSkillsForJob, generateTailoredResumeContent } from '../services/geminiService';
import { ResumeSchema, Skill } from '../types';
import { SparklesIcon, BriefcaseIcon, LightBulbIcon } from './icons';

interface ResumeWizardProps {
  onComplete: (data: Partial<ResumeSchema>) => void;
  onClose: () => void;
}

const ResumeWizard: React.FC<ResumeWizardProps> = ({ onComplete, onClose }) => {
  const [step, setStep] = useState(1);
  const [jobTitle, setJobTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleNextStep = async () => {
    if (step === 1 && jobTitle.trim()) {
      setIsLoading(true);
      const skills = await suggestSkillsForJob(jobTitle);
      setSuggestedSkills(skills);
      setIsLoading(false);
      setStep(2);
    }
  };

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(prev => prev.filter(s => s !== skill));
    } else {
      setSelectedSkills(prev => [...prev, skill]);
    }
  };

  const handleFinish = async () => {
    setIsLoading(true);
    
    // 1. Transform selected strings into Skill objects
    const newSkills: Skill[] = selectedSkills.map(name => ({
      id: uuidv4(),
      name,
      level: 4, // Default level
      keywords: []
    }));

    // 2. Generate Content based on job title
    const tailoredContent = await generateTailoredResumeContent(jobTitle);

    // 3. Process IDs for Work and Projects
    const workWithIds = tailoredContent.work ? tailoredContent.work.map((w: any) => ({ ...w, id: uuidv4() })) : [];
    const projectsWithIds = tailoredContent.projects ? tailoredContent.projects.map((p: any) => ({ ...p, id: uuidv4() })) : [];

    onComplete({
      basics: {
        label: jobTitle,
        summary: tailoredContent.summary,
      } as any,
      skills: newSkills,
      work: workWithIds,
      projects: projectsWithIds
    });
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-neutral-900/90 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-in relative">
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 font-bold text-xl"
        >
            &times;
        </button>

        {/* Progress Bar */}
        <div className="h-2 bg-neutral-100 w-full">
            <div 
                className="h-full bg-primary transition-all duration-500 ease-out" 
                style={{ width: step === 1 ? '50%' : '100%' }}
            ></div>
        </div>

        <div className="p-8">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-primary rounded-full mb-4">
                    {step === 1 ? <BriefcaseIcon className="w-6 h-6" /> : <LightBulbIcon className="w-6 h-6" />}
                </div>
                <h2 className="text-2xl font-bold text-neutral-800">
                    {step === 1 ? "What's your target job?" : "Select your top skills"}
                </h2>
                <p className="text-neutral-500 mt-2 text-sm">
                    {step === 1 ? "We'll tailor the experience to your role." : `Here are some recommended skills for a ${jobTitle}.`}
                </p>
            </div>

            {step === 1 ? (
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-neutral-700 mb-2">Job Title</label>
                        <input 
                            type="text" 
                            className="w-full p-4 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-lg"
                            placeholder="e.g. Project Manager, Software Engineer..."
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleNextStep()}
                            autoFocus
                        />
                    </div>
                    <button 
                        onClick={handleNextStep}
                        disabled={!jobTitle.trim() || isLoading}
                        className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                Finding Skills...
                            </>
                        ) : (
                            <>
                                Next Step
                            </>
                        )}
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
                        {suggestedSkills.map((skill) => (
                            <button
                                key={skill}
                                onClick={() => toggleSkill(skill)}
                                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                                    selectedSkills.includes(skill)
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105'
                                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-blue-300 hover:bg-blue-50'
                                }`}
                            >
                                {skill}
                            </button>
                        ))}
                    </div>
                    <div className="pt-4 border-t border-neutral-100 flex justify-between items-center">
                         <span className="text-sm text-neutral-500">{selectedSkills.length} selected</span>
                         <button 
                            onClick={handleFinish}
                            disabled={isLoading}
                            className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 disabled:opacity-70"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Generating Profile...
                                </>
                            ) : 'Start Building'}
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ResumeWizard;