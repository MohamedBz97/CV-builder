
import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ResumeSchema, Work, Education, Skill, Profile, Project, Award, Certificate, Volunteer, Publication, Language, Interest, Reference, SectionKey } from '../types';
import { generateSummarySuggestion, generateExperienceSuggestion, generateProjectSuggestion } from '../services/geminiService';
import { UserCircleIcon, BriefcaseIcon, AcademicCapIcon, LightBulbIcon, PlusCircleIcon, TrashIcon, SparklesIcon, TrophyIcon, CodeBracketIcon, DocumentCheckIcon, HeartIcon, BookOpenIcon, LanguageIcon, FaceSmileIcon, UsersIcon } from './icons';
import BulletPointEnhancer from './BulletPointEnhancer';

interface ResumeFormProps {
  resumeSchema: ResumeSchema;
  setResumeSchema: React.Dispatch<React.SetStateAction<ResumeSchema>>;
  activeSection: SectionKey | 'basics';
  setActiveSection: (section: SectionKey | 'basics') => void;
  sectionOrder: SectionKey[];
}

const SectionWrapper: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode;}> = ({ title, icon, children }) => {
  return (
    <div className="animate-fade-in-up">
        <div className="mb-6">
          <h3 className="text-2xl font-bold flex items-center gap-3 text-neutral-800 border-b pb-3 mb-6">
            {icon} {title}
          </h3>
          {children}
        </div>
    </div>
  );
};


const ResumeForm: React.FC<ResumeFormProps> = ({ resumeSchema, setResumeSchema, activeSection, setActiveSection, sectionOrder }) => {
  const [aiLoading, setAiLoading] = useState<{[key: string]: boolean}>({});

  const handleChange = <K extends keyof ResumeSchema,>(
    section: K,
    value: ResumeSchema[K]
  ) => {
    setResumeSchema(prev => ({ ...prev, [section]: value }));
  };

  const handleBasicsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'city' || name === 'region') {
         setResumeSchema(prev => ({ ...prev, basics: { ...prev.basics, location: { ...prev.basics.location, [name]: value } } }));
    } else if (name === 'summary') {
        setResumeSchema(prev => ({ ...prev, basics: { ...prev.basics, summary: value } }));
    }
    else {
        setResumeSchema(prev => ({ ...prev, basics: { ...prev.basics, [name]: value } }));
    }
  };
  
  const handleGenerateSummary = useCallback(async () => {
    setAiLoading(prev => ({ ...prev, summary: true }));
    const suggestion = await generateSummarySuggestion(resumeSchema);
    setResumeSchema(prev => ({ ...prev, basics: { ...prev.basics, summary: suggestion } }));
    setAiLoading(prev => ({ ...prev, summary: false }));
  }, [resumeSchema, setResumeSchema]);

  const createUpdater = <T extends {id: string}>(section: keyof ResumeSchema, items: T[]) => {
    return (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newItems = items.map(item =>
            item.id === id ? { ...item, [name]: (name === 'highlights' || name === 'keywords' || name === 'courses') ? value.split('\n') : value } : item
        );
        handleChange(section as any, newItems);
    };
  };

  const createAdder = <T,>(section: keyof ResumeSchema, items: T[], newItem: T) => {
    return () => handleChange(section as any, [...items, newItem]);
  };

  const createRemover = <T extends {id: string}>(section: keyof ResumeSchema, items: T[]) => {
      return (id: string) => handleChange(section as any, items.filter(item => item.id !== id));
  };
  
  // Helper to add single highlight from AI enhancer
  const handleAddHighlight = (section: 'work' | 'volunteer' | 'projects', id: string, text: string) => {
      // @ts-ignore - dynamic access is safe here given the sections passed
      const items = resumeSchema[section];
      const newItems = items.map((item: any) => 
          item.id === id ? { ...item, highlights: [...item.highlights, text] } : item
      );
      handleChange(section, newItems);
  };
  
  // Work
  const handleWorkChange = createUpdater('work', resumeSchema.work);
  const addWork = createAdder('work', resumeSchema.work, { id: uuidv4(), name: '', position: '', location: '', startDate: '', endDate: '', summary: '', highlights: [] });
  const removeWork = createRemover('work', resumeSchema.work);
  const handleGenerateExperience = useCallback(async (exp: Work) => {
    setAiLoading(prev => ({ ...prev, [exp.id]: true }));
    const suggestion = await generateExperienceSuggestion(exp);
    const newWork = resumeSchema.work.map(e => e.id === exp.id ? { ...e, highlights: suggestion } : e);
    handleChange('work', newWork);
    setAiLoading(prev => ({ ...prev, [exp.id]: false }));
  }, [resumeSchema.work]);
  
  // Volunteer
  const handleVolunteerChange = createUpdater('volunteer', resumeSchema.volunteer);
  const addVolunteer = createAdder('volunteer', resumeSchema.volunteer, { id: uuidv4(), organization: '', position: '', startDate: '', endDate: '', summary: '', highlights: [] });
  const removeVolunteer = createRemover('volunteer', resumeSchema.volunteer);

  // Education
  const handleEducationChange = createUpdater('education', resumeSchema.education);
  const addEducation = createAdder('education', resumeSchema.education, { id: uuidv4(), studyType: '', institution: '', area: '', startDate: '', endDate: '', score: '', courses: [] });
  const removeEducation = createRemover('education', resumeSchema.education);

  // Skills
  const handleSkillChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newSkills = resumeSchema.skills.map(skill => skill.id === id ? { ...skill, [name]: name === 'level' ? parseInt(value) : name === 'keywords' ? value.split('\n') : value } : skill);
    handleChange('skills', newSkills);
  };
  const addSkill = createAdder('skills', resumeSchema.skills, { id: uuidv4(), name: '', level: 3, keywords: [] });
  const removeSkill = createRemover('skills', resumeSchema.skills);

  // Profiles
  const handleProfileChange = createUpdater('basics', resumeSchema.basics.profiles as any);
  const addProfile = () => setResumeSchema(p => ({...p, basics: {...p.basics, profiles: [...p.basics.profiles, {id: uuidv4(), network: '', username: '', url: ''}]}}))
  const removeProfile = (id: string) => setResumeSchema(p => ({...p, basics: {...p.basics, profiles: p.basics.profiles.filter(i => i.id !== id)}}))

  // Projects
  const handleProjectChange = createUpdater('projects', resumeSchema.projects);
  const addProject = createAdder('projects', resumeSchema.projects, {id: uuidv4(), name: '', description: '', url: '', startDate: '', endDate: '', highlights: [], keywords: []});
  const removeProject = createRemover('projects', resumeSchema.projects);
  const handleGenerateProject = useCallback(async (proj: Project) => {
    setAiLoading(prev => ({ ...prev, [proj.id]: true }));
    const suggestion = await generateProjectSuggestion(proj);
    const newProjects = resumeSchema.projects.map(p => p.id === proj.id ? { ...p, highlights: suggestion } : p);
    handleChange('projects', newProjects);
    setAiLoading(prev => ({ ...prev, [proj.id]: false }));
  }, [resumeSchema.projects]);

  // Awards
  const handleAwardChange = createUpdater('awards', resumeSchema.awards);
  const addAward = createAdder('awards', resumeSchema.awards, {id: uuidv4(), title: '', awarder: '', date: '', summary: ''});
  const removeAward = createRemover('awards', resumeSchema.awards);

  // Certifications
  const handleCertificateChange = createUpdater('certificates', resumeSchema.certificates);
  const addCertificate = createAdder('certificates', resumeSchema.certificates, {id: uuidv4(), name: '', issuer: '', date: '', url: ''});
  const removeCertificate = createRemover('certificates', resumeSchema.certificates);

  // Publications
  const handlePublicationChange = createUpdater('publications', resumeSchema.publications);
  const addPublication = createAdder('publications', resumeSchema.publications, {id: uuidv4(), name: '', publisher: '', releaseDate: '', url: '', summary: ''});
  const removePublication = createRemover('publications', resumeSchema.publications);

  // Languages
  const handleLanguageChange = createUpdater('languages', resumeSchema.languages);
  const addLanguage = createAdder('languages', resumeSchema.languages, {id: uuidv4(), language: '', fluency: ''});
  const removeLanguage = createRemover('languages', resumeSchema.languages);

  // Interests
  const handleInterestChange = createUpdater('interests', resumeSchema.interests);
  const addInterest = createAdder('interests', resumeSchema.interests, {id: uuidv4(), name: '', keywords: []});
  const removeInterest = createRemover('interests', resumeSchema.interests);

  // References
  const handleReferenceChange = createUpdater('references', resumeSchema.references);
  const addReference = createAdder('references', resumeSchema.references, {id: uuidv4(), name: '', reference: ''});
  const removeReference = createRemover('references', resumeSchema.references);

  const fullSectionOrder: (SectionKey | 'basics')[] = ['basics', ...sectionOrder];
  const currentIndex = fullSectionOrder.indexOf(activeSection);

  const handleNext = () => {
    if (currentIndex < fullSectionOrder.length - 1) {
      setActiveSection(fullSectionOrder[currentIndex + 1]);
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActiveSection(fullSectionOrder[currentIndex - 1]);
    }
  }

  const inputClass = "w-full p-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary focus:border-primary";
  const labelClass = "block text-sm font-medium text-neutral-600 mb-1";
  const SubItemWrapper: React.FC<{children: React.ReactNode, onRemove: () => void}> = ({children, onRemove}) => (
     <div className="p-4 border border-neutral-200 rounded-lg mb-4 bg-neutral-50 relative group animate-fade-in">
        {children}
        <button onClick={onRemove} className="absolute top-2 right-2 text-neutral-400 hover:text-red-600 p-1 rounded-full hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-opacity"><TrashIcon className="w-5 h-5"/></button>
    </div>
  )
  
  const renderActiveSection = () => {
      switch(activeSection) {
          case 'basics':
            return (
                <SectionWrapper title="Basic Information" icon={<UserCircleIcon className="w-6 h-6" />}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className={labelClass}>Full Name</label><input type="text" name="name" value={resumeSchema.basics.name} onChange={handleBasicsChange} className={inputClass} /></div>
                        <div><label className={labelClass}>Job Title</label><input type="text" name="label" value={resumeSchema.basics.label} onChange={handleBasicsChange} className={inputClass} /></div>
                        <div><label className={labelClass}>Email</label><input type="email" name="email" value={resumeSchema.basics.email} onChange={handleBasicsChange} className={inputClass} /></div>
                        <div><label className={labelClass}>Phone</label><input type="tel" name="phone" value={resumeSchema.basics.phone} onChange={handleBasicsChange} className={inputClass} /></div>
                        <div><label className={labelClass}>City</label><input type="text" name="city" value={resumeSchema.basics.location.city} onChange={handleBasicsChange} className={inputClass} /></div>
                        <div><label className={labelClass}>State/Region</label><input type="text" name="region" value={resumeSchema.basics.location.region} onChange={handleBasicsChange} className={inputClass} /></div>
                        <div className="md:col-span-2"><label className={labelClass}>Website/Portfolio</label><input type="text" name="url" value={resumeSchema.basics.url} onChange={handleBasicsChange} className={inputClass} /></div>
                    </div>
                    <div className="mt-4">
                        <label className={labelClass}>Social Profiles</label>
                        {resumeSchema.basics.profiles.map(profile => (
                            <div key={profile.id} className="grid grid-cols-[1fr,1fr,auto] items-center gap-2 mb-2">
                                <input type="text" name="network" placeholder="Network (e.g. LinkedIn)" value={profile.network} onChange={e => handleProfileChange(profile.id, e)} className={inputClass} />
                                <input type="text" name="url" placeholder="URL" value={profile.url} onChange={e => handleProfileChange(profile.id, e)} className={inputClass} />
                                <button onClick={() => removeProfile(profile.id)} className="text-red-500 hover:text-red-700"><TrashIcon className="w-5 h-5"/></button>
                            </div>
                        ))}
                        <button onClick={addProfile} className="flex items-center gap-2 text-sm text-secondary font-semibold hover:text-blue-700"><PlusCircleIcon className="w-4 h-4"/> Add Profile</button>
                    </div>
                    <div className="mt-4">
                        <label className={labelClass}>Professional Summary</label>
                        <textarea name="summary" value={resumeSchema.basics.summary} onChange={handleBasicsChange} rows={5} className={inputClass} />
                        <button onClick={handleGenerateSummary} disabled={aiLoading['summary']} className="mt-2 flex items-center gap-2 px-3 py-1.5 bg-accent text-white text-sm rounded-md hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed">
                        <SparklesIcon className="w-4 h-4" />
                        {aiLoading['summary'] ? 'Generating...' : 'Generate with AI'}
                        </button>
                    </div>
                </SectionWrapper>
            )
        case 'work':
            return (
                 <SectionWrapper title="Work Experience" icon={<BriefcaseIcon className="w-6 h-6" />}>
                    {resumeSchema.work.map((exp) => (
                    <SubItemWrapper key={exp.id} onRemove={() => removeWork(exp.id)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div><label className={labelClass}>Job Title</label><input type="text" name="position" value={exp.position} onChange={e => handleWorkChange(exp.id, e)} className={inputClass} /></div>
                        <div><label className={labelClass}>Company</label><input type="text" name="name" value={exp.name} onChange={e => handleWorkChange(exp.id, e)} className={inputClass} /></div>
                        <div><label className={labelClass}>Location</label><input type="text" name="location" value={exp.location} onChange={e => handleWorkChange(exp.id, e)} className={inputClass} /></div>
                        <div><label className={labelClass}>Company URL</label><input type="text" name="url" value={exp.url} onChange={e => handleWorkChange(exp.id, e)} className={inputClass} /></div>
                        <div><label className={labelClass}>Start Date</label><input type="month" name="startDate" value={exp.startDate} onChange={e => handleWorkChange(exp.id, e)} className={inputClass} /></div>
                        <div><label className={labelClass}>End Date</label><input type="text" name="endDate" value={exp.endDate} onChange={e => handleWorkChange(exp.id, e)} className={inputClass} placeholder="YYYY-MM or Present"/></div>
                        </div>
                        <label className={labelClass}>Summary</label>
                        <textarea name="summary" value={exp.summary} onChange={e => handleWorkChange(exp.id, e)} rows={2} className={`${inputClass} mb-2`} />
                        <label className={labelClass}>Highlights (one per line)</label>
                        <textarea name="highlights" value={exp.highlights.join('\n')} onChange={e => handleWorkChange(exp.id, e)} rows={5} className={inputClass} />
                        
                        <BulletPointEnhancer onAdd={(text) => handleAddHighlight('work', exp.id, text)} />

                        <div className="flex items-center justify-start mt-4 border-t pt-4 border-neutral-200/50">
                        <button onClick={() => handleGenerateExperience(exp)} disabled={aiLoading[exp.id]} className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 text-neutral-700 text-sm rounded-md hover:bg-neutral-200 disabled:opacity-50">
                            <SparklesIcon className="w-4 h-4" />
                            {aiLoading[exp.id] ? 'Generating...' : 'Auto-Generate All Highlights'}
                        </button>
                        </div>
                    </SubItemWrapper>
                    ))}
                    <button onClick={addWork} className="flex items-center gap-2 text-secondary font-semibold hover:text-blue-700"><PlusCircleIcon className="w-5 h-5"/> Add Experience</button>
                </SectionWrapper>
            )
        case 'education':
             return (
                 <SectionWrapper title="Education" icon={<AcademicCapIcon className="w-6 h-6" />}>
                    {resumeSchema.education.map((edu) => (
                    <SubItemWrapper key={edu.id} onRemove={() => removeEducation(edu.id)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div><label className={labelClass}>Degree</label><input type="text" name="studyType" value={edu.studyType} onChange={e => handleEducationChange(edu.id, e)} className={inputClass} /></div>
                        <div><label className={labelClass}>Field of Study</label><input type="text" name="area" value={edu.area} onChange={e => handleEducationChange(edu.id, e)} className={inputClass} /></div>
                        <div><label className={labelClass}>Institution</label><input type="text" name="institution" value={edu.institution} onChange={e => handleEducationChange(edu.id, e)} className={inputClass} /></div>
                        <div><label className={labelClass}>GPA</label><input type="text" name="score" value={edu.score} onChange={e => handleEducationChange(edu.id, e)} className={inputClass} /></div>
                        <div><label className={labelClass}>Start Date</label><input type="month" name="startDate" value={edu.startDate} onChange={e => handleEducationChange(edu.id, e)} className={inputClass} /></div>
                        <div><label className={labelClass}>End Date</label><input type="month" name="endDate" value={edu.endDate} onChange={e => handleEducationChange(edu.id, e)} className={inputClass} /></div>
                        </div>
                        <label className={labelClass}>Courses (one per line)</label>
                        <textarea name="courses" value={edu.courses.join('\n')} onChange={e => handleEducationChange(edu.id, e)} rows={3} className={inputClass} />
                    </SubItemWrapper>
                    ))}
                    <button onClick={addEducation} className="flex items-center gap-2 text-secondary font-semibold hover:text-blue-700"><PlusCircleIcon className="w-5 h-5"/> Add Education</button>
                </SectionWrapper>
             )
        case 'skills':
            return (
                 <SectionWrapper title="Skills" icon={<LightBulbIcon className="w-6 h-6" />}>
                    {resumeSchema.skills.map((skill) => (
                    <SubItemWrapper key={skill.id} onRemove={() => removeSkill(skill.id)}>
                        <div className="flex items-center gap-4 mb-2">
                            <input type="text" name="name" value={skill.name} onChange={e => handleSkillChange(skill.id, e)} className="flex-grow p-2 border-b" placeholder="Skill Name" />
                            <input type="range" name="level" min="1" max="5" value={skill.level} onChange={e => handleSkillChange(skill.id, e)} className="w-32 accent-primary" />
                        </div>
                        <label className={labelClass}>Keywords (one per line)</label>
                        <textarea name="keywords" value={skill.keywords.join('\n')} onChange={e => handleSkillChange(skill.id, e)} rows={2} className={inputClass} />
                    </SubItemWrapper>
                    ))}
                    <button onClick={addSkill} className="flex items-center gap-2 text-secondary font-semibold hover:text-blue-700">
                        <PlusCircleIcon className="w-5 h-5"/> Add Skill
                    </button>
                </SectionWrapper>
            )
        case 'projects':
            return (
                 <SectionWrapper title="Projects" icon={<CodeBracketIcon className="w-6 h-6" />}>
                    {resumeSchema.projects.map((proj) => (
                    <SubItemWrapper key={proj.id} onRemove={() => removeProject(proj.id)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div><label className={labelClass}>Project Name</label><input type="text" name="name" value={proj.name} onChange={e => handleProjectChange(proj.id, e)} className={inputClass} /></div>
                        <div><label className={labelClass}>Project URL</label><input type="text" name="url" value={proj.url} onChange={e => handleProjectChange(proj.id, e)} className={inputClass} /></div>
                        <div><label className={labelClass}>Start Date</label><input type="month" name="startDate" value={proj.startDate} onChange={e => handleProjectChange(proj.id, e)} className={inputClass} /></div>
                        <div><label className={labelClass}>End Date</label><input type="text" name="endDate" value={proj.endDate} onChange={e => handleProjectChange(proj.id, e)} className={inputClass} placeholder="YYYY-MM or Present"/></div>
                        </div>
                        <label className={labelClass}>Description</label>
                        <textarea name="description" value={proj.description} onChange={e => handleProjectChange(proj.id, e)} rows={2} className={`${inputClass} mb-2`} />
                        <label className={labelClass}>Highlights (one per line)</label>
                        <textarea name="highlights" value={proj.highlights.join('\n')} onChange={e => handleProjectChange(proj.id, e)} rows={4} className={`${inputClass} mb-2`} />
                        
                        <BulletPointEnhancer onAdd={(text) => handleAddHighlight('projects', proj.id, text)} />

                        <label className={labelClass}>Keywords (one per line)</label>
                        <textarea name="keywords" value={proj.keywords.join('\n')} onChange={e => handleProjectChange(proj.id, e)} rows={2} className={inputClass} />
                        <div className="flex items-center justify-start mt-4 border-t pt-4 border-neutral-200/50">
                        <button onClick={() => handleGenerateProject(proj)} disabled={aiLoading[proj.id]} className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 text-neutral-700 text-sm rounded-md hover:bg-neutral-200 disabled:opacity-50">
                            <SparklesIcon className="w-4 h-4" />
                            {aiLoading[proj.id] ? 'Generating...' : 'Auto-Generate All Highlights'}
                        </button>
                        </div>
                    </SubItemWrapper>
                    ))}
                    <button onClick={addProject} className="flex items-center gap-2 text-secondary font-semibold hover:text-blue-700"><PlusCircleIcon className="w-5 h-5"/> Add Project</button>
                </SectionWrapper>
            )
        case 'volunteer':
             return (
                 <SectionWrapper title="Volunteer" icon={<HeartIcon className="w-6 h-6" />}>
                    {resumeSchema.volunteer.map((vol) => (
                    <SubItemWrapper key={vol.id} onRemove={() => removeVolunteer(vol.id)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div><label className={labelClass}>Role</label><input type="text" name="position" value={vol.position} onChange={e => handleVolunteerChange(vol.id, e)} className={inputClass} /></div>
                        <div><label className={labelClass}>Organization</label><input type="text" name="organization" value={vol.organization} onChange={e => handleVolunteerChange(vol.id, e)} className={inputClass} /></div>
                        <div><label className={labelClass}>Start Date</label><input type="month" name="startDate" value={vol.startDate} onChange={e => handleVolunteerChange(vol.id, e)} className={inputClass} /></div>
                        <div><label className={labelClass}>End Date</label><input type="text" name="endDate" value={vol.endDate} onChange={e => handleVolunteerChange(vol.id, e)} className={inputClass} placeholder="YYYY-MM or Present"/></div>
                        </div>
                        <label className={labelClass}>Summary</label>
                        <textarea name="summary" value={vol.summary} onChange={e => handleVolunteerChange(vol.id, e)} rows={2} className={`${inputClass} mb-2`} />
                        <label className={labelClass}>Highlights (one per line)</label>
                        <textarea name="highlights" value={vol.highlights.join('\n')} onChange={e => handleVolunteerChange(vol.id, e)} rows={4} className={inputClass} />

                        <BulletPointEnhancer onAdd={(text) => handleAddHighlight('volunteer', vol.id, text)} />
                    </SubItemWrapper>
                    ))}
                    <button onClick={addVolunteer} className="flex items-center gap-2 text-secondary font-semibold hover:text-blue-700"><PlusCircleIcon className="w-5 h-5"/> Add Volunteer Role</button>
                </SectionWrapper>
             )
        case 'awards':
             return (
                 <SectionWrapper title="Awards" icon={<TrophyIcon className="w-6 h-6" />}>
                    {resumeSchema.awards.map((award) => (
                        <SubItemWrapper key={award.id} onRemove={() => removeAward(award.id)}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div><label className={labelClass}>Title</label><input type="text" name="title" value={award.title} onChange={e => handleAwardChange(award.id, e)} className={inputClass} /></div>
                                <div><label className={labelClass}>Awarder</label><input type="text" name="awarder" value={award.awarder} onChange={e => handleAwardChange(award.id, e)} className={inputClass} /></div>
                                <div><label className={labelClass}>Date</label><input type="date" name="date" value={award.date} onChange={e => handleAwardChange(award.id, e)} className={inputClass} /></div>
                            </div>
                            <label className={labelClass}>Summary</label>
                            <textarea name="summary" value={award.summary} onChange={e => handleAwardChange(award.id, e)} rows={2} className={inputClass} />
                        </SubItemWrapper>
                    ))}
                    <button onClick={addAward} className="flex items-center gap-2 text-secondary font-semibold hover:text-blue-700"><PlusCircleIcon className="w-5 h-5"/> Add Award</button>
                </SectionWrapper>
             )
        case 'certificates':
            return (
                <SectionWrapper title="Certificates" icon={<DocumentCheckIcon className="w-6 h-6" />}>
                    {resumeSchema.certificates.map((cert) => (
                        <SubItemWrapper key={cert.id} onRemove={() => removeCertificate(cert.id)}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><label className={labelClass}>Name</label><input type="text" name="name" value={cert.name} onChange={e => handleCertificateChange(cert.id, e)} className={inputClass} /></div>
                                <div><label className={labelClass}>Issuer</label><input type="text" name="issuer" value={cert.issuer} onChange={e => handleCertificateChange(cert.id, e)} className={inputClass} /></div>
                                <div><label className={labelClass}>Date</label><input type="date" name="date" value={cert.date} onChange={e => handleCertificateChange(cert.id, e)} className={inputClass} /></div>
                                <div><label className={labelClass}>URL</label><input type="text" name="url" value={cert.url} onChange={e => handleCertificateChange(cert.id, e)} className={inputClass} /></div>
                            </div>
                        </SubItemWrapper>
                    ))}
                    <button onClick={addCertificate} className="flex items-center gap-2 text-secondary font-semibold hover:text-blue-700"><PlusCircleIcon className="w-5 h-5"/> Add Certificate</button>
                </SectionWrapper>
            )
        case 'publications':
            return (
                 <SectionWrapper title="Publications" icon={<BookOpenIcon className="w-6 h-6" />}>
                    {resumeSchema.publications.map((pub) => (
                        <SubItemWrapper key={pub.id} onRemove={() => removePublication(pub.id)}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div><label className={labelClass}>Name</label><input type="text" name="name" value={pub.name} onChange={e => handlePublicationChange(pub.id, e)} className={inputClass} /></div>
                                <div><label className={labelClass}>Publisher</label><input type="text" name="publisher" value={pub.publisher} onChange={e => handlePublicationChange(pub.id, e)} className={inputClass} /></div>
                                <div><label className={labelClass}>Release Date</label><input type="date" name="releaseDate" value={pub.releaseDate} onChange={e => handlePublicationChange(pub.id, e)} className={inputClass} /></div>
                                <div><label className={labelClass}>URL</label><input type="text" name="url" value={pub.url} onChange={e => handlePublicationChange(pub.id, e)} className={inputClass} /></div>
                            </div>
                            <label className={labelClass}>Summary</label>
                            <textarea name="summary" value={pub.summary} onChange={e => handlePublicationChange(pub.id, e)} rows={3} className={inputClass} />
                        </SubItemWrapper>
                    ))}
                    <button onClick={addPublication} className="flex items-center gap-2 text-secondary font-semibold hover:text-blue-700"><PlusCircleIcon className="w-5 h-5"/> Add Publication</button>
                </SectionWrapper>
            )
        case 'languages':
            return (
                <SectionWrapper title="Languages" icon={<LanguageIcon className="w-6 h-6" />}>
                    {resumeSchema.languages.map((lang) => (
                    <div key={lang.id} className="grid grid-cols-[1fr,1fr,auto] items-center gap-2 mb-2">
                        <input type="text" name="language" placeholder="Language" value={lang.language} onChange={e => handleLanguageChange(lang.id, e)} className={inputClass} />
                        <input type="text" name="fluency" placeholder="Fluency" value={lang.fluency} onChange={e => handleLanguageChange(lang.id, e)} className={inputClass} />
                        <button onClick={() => removeLanguage(lang.id)} className="text-red-500 hover:text-red-700"><TrashIcon className="w-5 h-5"/></button>
                    </div>
                    ))}
                    <button onClick={addLanguage} className="flex items-center gap-2 text-secondary font-semibold hover:text-blue-700"><PlusCircleIcon className="w-5 h-5"/> Add Language</button>
                </SectionWrapper>
            )
        case 'interests':
            return (
                <SectionWrapper title="Interests" icon={<FaceSmileIcon className="w-6 h-6" />}>
                    {resumeSchema.interests.map((interest) => (
                        <SubItemWrapper key={interest.id} onRemove={() => removeInterest(interest.id)}>
                            <label className={labelClass}>Interest</label>
                            <input type="text" name="name" value={interest.name} onChange={e => handleInterestChange(interest.id, e)} className={`${inputClass} mb-2`} />
                            <label className={labelClass}>Keywords (one per line)</label>
                            <textarea name="keywords" value={interest.keywords.join('\n')} onChange={e => handleInterestChange(interest.id, e)} rows={2} className={inputClass} />
                        </SubItemWrapper>
                    ))}
                    <button onClick={addInterest} className="flex items-center gap-2 text-secondary font-semibold hover:text-blue-700"><PlusCircleIcon className="w-5 h-5"/> Add Interest</button>
                </SectionWrapper>
            )
        case 'references':
            return (
                <SectionWrapper title="References" icon={<UsersIcon className="w-6 h-6" />}>
                    {resumeSchema.references.map((ref) => (
                        <SubItemWrapper key={ref.id} onRemove={() => removeReference(ref.id)}>
                            <label className={labelClass}>Name</label>
                            <input type="text" name="name" value={ref.name} onChange={e => handleReferenceChange(ref.id, e)} className={`${inputClass} mb-2`} />
                            <label className={labelClass}>Reference</label>
                            <textarea name="reference" value={ref.reference} onChange={e => handleReferenceChange(ref.id, e)} rows={2} className={inputClass} />
                        </SubItemWrapper>
                    ))}
                    <button onClick={addReference} className="flex items-center gap-2 text-secondary font-semibold hover:text-blue-700"><PlusCircleIcon className="w-5 h-5"/> Add Reference</button>
                </SectionWrapper>
            )
        default:
            return <div>Select a section to edit</div>
      }
  }

  return (
    <div className="flex flex-col h-full">
        <div className="flex-grow" key={activeSection}>
            {renderActiveSection()}
        </div>
        <div className="flex justify-between items-center pt-4 border-t sticky bottom-0 bg-white pb-4">
            <button 
                onClick={handlePrev} 
                disabled={currentIndex === 0}
                className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Previous
            </button>
            <div className="text-sm text-neutral-500 font-medium">
                Step {currentIndex + 1} of {fullSectionOrder.length}
            </div>
            <button 
                onClick={handleNext} 
                disabled={currentIndex === fullSectionOrder.length - 1}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next
            </button>
        </div>
    </div>
  );
};

export default ResumeForm;
