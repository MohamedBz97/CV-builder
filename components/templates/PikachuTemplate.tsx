import React from 'react';
import { ResumeSchema, SectionKey } from '../../types';

interface TemplateProps {
  data: ResumeSchema;
  sectionOrder: SectionKey[];
}

const PikachuTemplate: React.FC<TemplateProps> = ({ data, sectionOrder }) => {
  const { basics, work, education, skills, projects, languages, interests, volunteer, awards, publications, certificates, references } = data;

  const MainSection: React.FC<{title: string, children: React.ReactNode, show: boolean}> = ({title, children, show}) => {
    if (!show) return null;
    return (
         <section className="mb-5">
            <h2 className="text-sm font-bold text-secondary uppercase tracking-wider pb-1 mb-2 border-b-2 border-secondary">{title}</h2>
            {children}
        </section>
    )
  }
  
  const SidebarSection: React.FC<{title: string, children: React.ReactNode, show?: boolean}> = ({ title, children, show = true }) => {
    if (!show) return null;
    return <div className="mb-5">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">{title}</h3>
        {children}
    </div>
  };

  const sectionComponents: { [key in SectionKey]: React.ReactNode } = {
      work: (
        <MainSection title="Experience" show={work.length > 0}>
          {work.map(exp => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-sm text-gray-800">{exp.position}</h3>
                <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate || 'Present'}</p>
              </div>
              <p className="text-sm italic text-gray-600 mb-1">{exp.name} - {exp.location}</p>
              <ul className="text-xs list-disc list-inside text-gray-600 space-y-1">
                 {exp.highlights.map((line, i) => line && <li key={i}>{line}</li>)}
              </ul>
            </div>
          ))}
        </MainSection>
      ),
      projects: (
        <MainSection title="Projects" show={projects.length > 0}>
          {projects.map(proj => (
              <div key={proj.id} className="mb-4">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-sm">{proj.name}</h3>
                      <p className="text-xs text-gray-500">{proj.startDate} - {proj.endDate || 'Present'}</p>
                  </div>
                    {proj.url && <a href={`https://${proj.url}`} className="italic text-xs text-secondary mb-1 hover:underline">{proj.url}</a>}
                  <p className="text-xs text-gray-600 mt-1 mb-1">{proj.description}</p>
                  <ul className="text-xs list-disc list-inside text-gray-600 space-y-1">
                      {proj.highlights.map((line, i) => line && <li key={i}>{line}</li>)}
                  </ul>
              </div>
          ))}
        </MainSection>
      ),
      volunteer: (
        <MainSection title="Volunteer" show={volunteer.length > 0}>
          {volunteer.map(vol => (
            <div key={vol.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-sm text-gray-800">{vol.position}</h3>
                <p className="text-xs text-gray-500">{vol.startDate} - {vol.endDate || 'Present'}</p>
              </div>
              <p className="text-sm italic text-gray-600 mb-1">{vol.organization}</p>
              <ul className="text-xs list-disc list-inside text-gray-600 space-y-1">
                 {vol.highlights.map((line, i) => line && <li key={i}>{line}</li>)}
              </ul>
            </div>
          ))}
        </MainSection>
      ),
      awards: (
        <MainSection title="Awards" show={awards.length > 0}>
            {awards.map(award => (
                <div key={award.id} className="mb-2">
                    <h3 className="font-bold text-sm">{award.title} <span className="font-normal italic text-gray-600"> @ {award.awarder}</span></h3>
                    <p className="text-xs text-gray-500">{award.date}</p>
                </div>
            ))}
        </MainSection>
      ),
      publications: (
        <MainSection title="Publications" show={publications.length > 0}>
          {publications.map(pub => (
            <div key={pub.id} className="mb-2">
                <h3 className="font-bold text-sm">{pub.name}</h3>
                <p className="text-xs italic text-gray-600">{pub.publisher} ({pub.releaseDate})</p>
            </div>
          ))}
        </MainSection>
      ),
      certificates: (
        <MainSection title="Certificates" show={certificates.length > 0}>
            {certificates.map(cert => (
                <div key={cert.id} className="mb-2">
                    <h3 className="font-bold text-sm">{cert.name} <span className="font-normal italic text-gray-600"> - {cert.issuer}</span></h3>
                    <p className="text-xs text-gray-500">{cert.date}</p>
                </div>
            ))}
        </MainSection>
      ),
      references: (
        <MainSection title="References" show={references.length > 0}>
            {references.map(ref => (
                <div key={ref.id} className="mb-2">
                    <p><span className="font-semibold">{ref.name}:</span> {ref.reference}</p>
                </div>
            ))}
        </MainSection>
      ),
      // Sidebar sections
      education: (
        <SidebarSection title="Education" show={education.length > 0}>
           {education.map(edu => (
            <div key={edu.id} className="mb-2">
              <h4 className="font-bold text-sm text-gray-100">{edu.institution}</h4>
              <p className="text-xs text-gray-300">{edu.studyType}</p>
              <p className="text-xs text-gray-400">{edu.startDate} - {edu.endDate}</p>
            </div>
          ))}
        </SidebarSection>
      ),
      skills: (
        <SidebarSection title="Skills" show={skills.length > 0}>
          <ul className="space-y-1 text-xs">
            {skills.map(skill => (
              <li key={skill.id} className="text-gray-200">{skill.name}</li>
            ))}
          </ul>
        </SidebarSection>
      ),
      languages: (
        <SidebarSection title="Languages" show={languages.length > 0}>
           <ul className="space-y-1 text-xs text-gray-200">
            {languages.map(lang => (
              <li key={lang.id}>
                <p className="font-bold">{lang.language} <span className="font-normal text-gray-400">({lang.fluency})</span></p>
              </li>
            ))}
          </ul>
        </SidebarSection>
      ),
      interests: (
        <SidebarSection title="Interests" show={interests.length > 0}>
           <ul className="space-y-1 text-xs text-gray-200">
            {interests.map(interest => (
              <li key={interest.id}>
                <p className="font-bold">{interest.name}</p>
              </li>
            ))}
          </ul>
        </SidebarSection>
      ),
  }

  const mainSectionKeys: SectionKey[] = ['work', 'projects', 'volunteer', 'awards', 'publications', 'certificates', 'references'];
  const sidebarSectionKeys: SectionKey[] = ['education', 'skills', 'languages', 'interests'];

  return (
    <div className="flex font-sans text-xs h-full">
      {/* Sidebar */}
      <div className="w-1/3 bg-gray-800 text-white p-6 flex flex-col">
        <div className="text-left mb-6">
            <h1 className="text-2xl font-bold text-white leading-tight break-words">{basics.name}</h1>
            <p className="text-sm text-secondary mt-1">{basics.label}</p>
        </div>
        
        <SidebarSection title="Contact">
          <ul className="space-y-1 text-xs text-gray-300 break-words">
            <li><a href={`mailto:${basics.email}`} className="hover:text-secondary">{basics.email}</a></li>
            <li>{basics.phone}</li>
            <li>{basics.location.city}, {basics.location.region}</li>
            {basics.url && <li><a href={`https://${basics.url}`} target="_blank" rel="noopener noreferrer" className="hover:text-secondary">{basics.url}</a></li>}
            {basics.profiles.map(p => <li key={p.id}><a href={`https://${p.url}`} target="_blank" rel="noopener noreferrer" className="hover:text-secondary">{p.network}</a></li>)}
          </ul>
        </SidebarSection>

        {sectionOrder
          .filter(key => sidebarSectionKeys.includes(key))
          .map(key => <React.Fragment key={key}>{sectionComponents[key]}</React.Fragment>)
        }
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-6 text-gray-700">
        <MainSection title="Summary" show={!!basics.summary}>
          <p className="text-justify leading-relaxed">{basics.summary}</p>
        </MainSection>

        {sectionOrder
          .filter(key => mainSectionKeys.includes(key))
          .map(key => <React.Fragment key={key}>{sectionComponents[key]}</React.Fragment>)
        }
      </div>
    </div>
  );
};

export default PikachuTemplate;
