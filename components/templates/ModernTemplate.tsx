import React from 'react';
import { ResumeSchema, SectionKey } from '../../types';

interface TemplateProps {
  data: ResumeSchema;
  sectionOrder: SectionKey[];
}

const ModernTemplate: React.FC<TemplateProps> = ({ data, sectionOrder }) => {
  const { basics, work, volunteer, education, awards, certificates, publications, skills, languages, interests, references, projects } = data;

  const SectionTitle: React.FC<{children: React.ReactNode}> = ({ children }) => (
    <h2 className="text-lg font-bold text-primary uppercase tracking-wider mb-3">{children}</h2>
  );
  
  const SidebarSectionTitle: React.FC<{children: React.ReactNode, show?: boolean}> = ({ children, show = true }) => {
    if (!show) return null;
    return <h3 className="text-base font-bold text-white uppercase tracking-wider mb-3">{children}</h3>
  };
  
  const Section: React.FC<{title: string, children: React.ReactNode, show: boolean}> = ({title, children, show}) => {
    if (!show) return null;
    return (
         <section className="mb-6">
            <SectionTitle>{title}</SectionTitle>
            {children}
        </section>
    )
}

 const sectionComponents: { [key in SectionKey]: React.ReactNode } = {
    work: (
      <Section title="Experience" show={work.length > 0}>
          {work.map(exp => (
            <div key={exp.id} className="mb-4 relative pl-4">
               <div className="absolute left-0 top-1.5 h-[calc(100%-0.5rem)] w-0.5 bg-neutral-200"></div>
               <div className="absolute left-[-3px] top-1.5 h-2 w-2 rounded-full bg-primary"></div>
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold">{exp.position}</h3>
                <p className="text-xs font-mono text-neutral-500">{exp.startDate} - {exp.endDate || 'Present'}</p>
              </div>
              <div className="flex justify-between items-baseline text-sm italic text-primary mb-1">
                <p>{exp.name}</p>
                <p className="text-xs text-neutral-500">{exp.location}</p>
              </div>
              {exp.summary && <p className="text-xs text-neutral-600 mt-1 mb-1">{exp.summary}</p>}
              <ul className="text-xs list-disc list-inside text-neutral-600 space-y-1">
                 {exp.highlights.map((line, i) => line && <li key={i} className="pl-1">{line}</li>)}
              </ul>
            </div>
          ))}
        </Section>
    ),
    volunteer: (
      <Section title="Volunteer" show={volunteer.length > 0}>
          {volunteer.map(vol => (
            <div key={vol.id} className="mb-4 relative pl-4">
               <div className="absolute left-0 top-1.5 h-[calc(100%-0.5rem)] w-0.5 bg-neutral-200"></div>
               <div className="absolute left-[-3px] top-1.5 h-2 w-2 rounded-full bg-primary"></div>
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold">{vol.position}</h3>
                <p className="text-xs font-mono text-neutral-500">{vol.startDate} - {vol.endDate || 'Present'}</p>
              </div>
              <p className="text-sm italic text-primary mb-1">{vol.organization}</p>
              {vol.summary && <p className="text-xs text-neutral-600 mt-1 mb-1">{vol.summary}</p>}
              <ul className="text-xs list-disc list-inside text-neutral-600 space-y-1">
                 {vol.highlights.map((line, i) => line && <li key={i} className="pl-1">{line}</li>)}
              </ul>
            </div>
          ))}
        </Section>
    ),
    projects: (
       <Section title="Projects" show={projects.length > 0}>
            {projects.map(proj => (
                <div key={proj.id} className="mb-4">
                     <div className="flex justify-between items-baseline">
                        <h3 className="font-bold">{proj.name}</h3>
                        <p className="text-xs font-mono text-neutral-500">{proj.startDate} - {proj.endDate || 'Present'}</p>
                    </div>
                     <p className="italic text-sm text-primary mb-1">{proj.url}</p>
                     <p className="text-xs text-neutral-600 mt-1 mb-1">{proj.description}</p>
                    <ul className="text-xs list-disc list-inside text-neutral-600 space-y-1">
                        {proj.highlights.map((line, i) => line && <li key={i} className="pl-1">{line}</li>)}
                    </ul>
                </div>
            ))}
        </Section>
    ),
    education: (
       <Section title="Education" show={education.length > 0}>
          {education.map(edu => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold">{edu.studyType} in {edu.area}</h3>
                <p className="text-xs font-mono text-neutral-500">{edu.startDate} - {edu.endDate}</p>
              </div>
              <p className="italic text-sm">{edu.institution}</p>
              {edu.score && <p className="text-xs text-neutral-600">GPA: {edu.score}</p>}
            </div>
          ))}
        </Section>
    ),
    awards: (
         <Section title="Awards" show={awards.length > 0}>
            {awards.map(award => (
                <div key={award.id} className="mb-3">
                    <h3 className="font-bold">{award.title}</h3>
                    <p className="text-xs italic">{award.awarder} - {award.date}</p>
                </div>
            ))}
        </Section>
    ),
    certificates: (
        <Section title="Certificates" show={certificates.length > 0}>
            {certificates.map(cert => (
                <div key={cert.id} className="mb-3">
                    <h3 className="font-bold">{cert.name}</h3>
                    <p className="text-xs italic">{cert.issuer} - {cert.date}</p>
                </div>
            ))}
        </Section>
    ),
    publications: (
        <Section title="Publications" show={publications.length > 0}>
          {publications.map(pub => (
            <div key={pub.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold">{pub.name}</h3>
                <p className="text-xs font-mono text-neutral-500">{pub.releaseDate}</p>
              </div>
              <p className="italic text-sm">{pub.publisher}</p>
            </div>
          ))}
        </Section>
    ),
    // Sidebar items that are part of the main content flow are handled differently.
    skills: null, 
    languages: null,
    interests: null,
    references: null,
 };


  return (
    <div className="flex font-sans text-sm h-full">
      {/* Sidebar */}
      <div className="w-1/3 bg-neutral-800 text-white p-6 flex flex-col">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white leading-tight break-words">{basics.name}</h1>
            <p className="text-base text-secondary mt-2 tracking-widest">{basics.label}</p>
        </div>
        
        <div className="mb-6">
          <SidebarSectionTitle>Contact</SidebarSectionTitle>
          <ul className="space-y-2 text-xs text-neutral-200 break-words">
            <li><a href={`mailto:${basics.email}`} className="hover:text-secondary">{basics.email}</a></li>
            <li>{basics.phone}</li>
            <li>{basics.location.city}, {basics.location.region}</li>
            {basics.url && <li><a href={`https://${basics.url}`} target="_blank" rel="noopener noreferrer" className="hover:text-secondary">{basics.url}</a></li>}
            {basics.profiles.map(p => <li key={p.id}><a href={`https://${p.url}`} target="_blank" rel="noopener noreferrer" className="hover:text-secondary">{p.network}</a></li>)}
          </ul>
        </div>

        <div className="mb-6">
          <SidebarSectionTitle show={skills.length > 0}>Skills</SidebarSectionTitle>
          <ul className="space-y-2 text-xs">
            {skills.map(skill => (
              <li key={skill.id}>
                <p className="text-neutral-200 mb-1">{skill.name}</p>
                <div className="w-full bg-neutral-600 rounded-full h-1.5">
                  <div className="bg-secondary h-1.5 rounded-full" style={{ width: `${skill.level * 20}%` }}></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mb-6">
          <SidebarSectionTitle show={languages.length > 0}>Languages</SidebarSectionTitle>
           <ul className="space-y-2 text-xs text-neutral-200">
            {languages.map(lang => (
              <li key={lang.id}>
                <p className="font-bold">{lang.language}</p>
                <p className="text-neutral-300">{lang.fluency}</p>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mb-6">
          <SidebarSectionTitle show={interests.length > 0}>Interests</SidebarSectionTitle>
           <ul className="space-y-2 text-xs text-neutral-200">
            {interests.map(interest => (
              <li key={interest.id}>
                <p className="font-bold">{interest.name}</p>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Main Content */}
      <div className="w-2/3 p-6 text-neutral-700 overflow-y-auto">
        <Section title="Summary" show={!!basics.summary}>
          <p className="text-justify text-xs leading-relaxed">{basics.summary}</p>
        </Section>
        
        {sectionOrder.map(key => (
          <React.Fragment key={key}>
              {sectionComponents[key]}
          </React.Fragment>
        ))}
        
        {/* Render multi-column sections last if they exist */}
        <div className="grid grid-cols-2 gap-x-6">
            {sectionOrder.includes('awards') && sectionComponents['awards']}
            {sectionOrder.includes('certificates') && sectionComponents['certificates']}
        </div>

      </div>
    </div>
  );
};

export default ModernTemplate;