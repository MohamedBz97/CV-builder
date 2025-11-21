import React from 'react';
import { ResumeSchema, SectionKey } from '../../types';

interface TemplateProps {
  data: ResumeSchema;
  sectionOrder: SectionKey[];
}

const Section: React.FC<{title: string, children: React.ReactNode, show: boolean}> = ({title, children, show}) => {
    if (!show) return null;
    return (
         <section className="mb-6">
            <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-1 mb-2 uppercase tracking-wider">{title}</h2>
            {children}
        </section>
    )
}

const ClassicTemplate: React.FC<TemplateProps> = ({ data, sectionOrder }) => {
  const { basics, work, volunteer, education, awards, certificates, publications, skills, languages, interests, references, projects } = data;

  const sectionComponents: { [key in SectionKey]: React.ReactNode } = {
    work: (
      <Section title="Experience" show={work.length > 0}>
        {work.map(exp => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-semibold">{exp.position}</h3>
              <p className="text-xs font-mono">{exp.startDate} - {exp.endDate || 'Present'}</p>
            </div>
            <div className="flex justify-between items-baseline text-md italic">
              <p>{exp.name}</p>
              <p className="text-xs">{exp.location}</p>
            </div>
            {exp.summary && <p className="text-sm text-gray-600 mt-1">{exp.summary}</p>}
            <ul className="mt-1 list-disc list-inside text-sm text-gray-700">
              {exp.highlights.map((line, i) => line && <li key={i} className="pl-2 leading-snug">{line}</li>)}
            </ul>
          </div>
        ))}
      </Section>
    ),
    volunteer: (
      <Section title="Volunteer" show={volunteer.length > 0}>
        {volunteer.map(vol => (
          <div key={vol.id} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-semibold">{vol.position}</h3>
              <p className="text-xs font-mono">{vol.startDate} - {vol.endDate || 'Present'}</p>
            </div>
            <p className="text-md italic">{vol.organization}</p>
            {vol.summary && <p className="text-sm text-gray-600 mt-1">{vol.summary}</p>}
            <ul className="mt-1 list-disc list-inside text-sm text-gray-700">
              {vol.highlights.map((line, i) => line && <li key={i} className="pl-2 leading-snug">{line}</li>)}
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
              <h3 className="text-lg font-semibold">{proj.name}</h3>
               <p className="text-xs font-mono">{proj.startDate} - {proj.endDate || 'Present'}</p>
            </div>
             {proj.url && <a href={`https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="text-sm italic text-blue-600 hover:underline">{proj.url}</a>}
            <p className="text-sm text-gray-600 mt-1">{proj.description}</p>
            <ul className="mt-1 list-disc list-inside text-sm text-gray-700">
              {proj.highlights.map((line, i) => line && <li key={i} className="pl-2 leading-snug">{line}</li>)}
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
              <h3 className="text-lg font-semibold">{edu.studyType} in {edu.area}</h3>
              <p className="text-xs font-mono">{edu.startDate} - {edu.endDate}</p>
            </div>
            <p className="italic">{edu.institution}</p>
            {edu.score && <p className="text-xs text-gray-600">GPA: {edu.score}</p>}
          </div>
        ))}
      </Section>
    ),
    skills: (
      <Section title="Skills" show={skills.length > 0}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2">
          {skills.map(skill => (
            <div key={skill.id}>
              <p className="font-semibold">{skill.name}</p>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${skill.level * 20}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    ),
    languages: (
      <Section title="Languages" show={languages.length > 0}>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
            {languages.map(lang => (
                <p key={lang.id}><span className="font-semibold">{lang.language}:</span> {lang.fluency}</p>
            ))}
        </div>
      </Section>
    ),
    awards: (
      <Section title="Awards" show={awards.length > 0}>
          {awards.map(award => (
              <div key={award.id} className="mb-3">
                  <h3 className="font-semibold">{award.title} - <span className="italic font-normal">{award.awarder}</span></h3>
                  <p className="text-xs text-gray-600">{award.date}</p>
                  <p className="text-xs">{award.summary}</p>
              </div>
          ))}
      </Section>
    ),
    certificates: (
      <Section title="Certificates" show={certificates.length > 0}>
          {certificates.map(cert => (
              <div key={cert.id} className="mb-3">
                  <h3 className="font-semibold">{cert.name}</h3>
                  <p className="text-xs italic">{cert.issuer} - {cert.date}</p>
              </div>
          ))}
      </Section>
    ),
    publications: (
       <Section title="Publications" show={publications.length > 0}>
            {publications.map(pub => (
                <div key={pub.id} className="mb-3">
                    <h3 className="font-semibold">{pub.name} - <span className="italic font-normal">{pub.publisher}</span></h3>
                    <p className="text-xs">{pub.summary}</p>
                </div>
            ))}
        </Section>
    ),
    interests: (
       <Section title="Interests" show={interests.length > 0}>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
                {interests.map(interest => (
                    <div key={interest.id}>
                        <span className="font-semibold">{interest.name}</span>
                        {interest.keywords.length > 0 && <span className="text-xs text-gray-600"> ({interest.keywords.join(', ')})</span>}
                    </div>
                ))}
            </div>
        </Section>
    ),
    references: (
        <Section title="References" show={references.length > 0}>
            {references.map(ref => (
                <div key={ref.id} className="mb-2">
                    <p><span className="font-semibold">{ref.name}:</span> {ref.reference}</p>
                </div>
            ))}
        </Section>
    )
  }


  return (
    <div className="p-8 text-sm font-serif text-gray-800">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-wider">{basics.name}</h1>
        <p className="text-lg text-blue-800 font-semibold mt-1">{basics.label}</p>
        <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-1 mt-2 text-xs">
          <span>{basics.email}</span>
          <span className="hidden sm:inline">|</span>
          <span>{basics.phone}</span>
          <span className="hidden sm:inline">|</span>
          <span>{basics.location.city}, {basics.location.region}</span>
          {basics.url && (
            <>
              <span className="hidden sm:inline">|</span>
              <a href={`https://${basics.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{basics.url}</a>
            </>
          )}
           {basics.profiles.map(profile => (
             <React.Fragment key={profile.id}>
                <span className="hidden sm:inline">|</span>
                <a href={`https://${profile.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{profile.network}</a>
             </React.Fragment>
           ))}
        </div>
      </header>

      <Section title="Summary" show={!!basics.summary}>
        <p className="text-justify">{basics.summary}</p>
      </Section>
      
      {sectionOrder.map(key => (
          <React.Fragment key={key}>
            {sectionComponents[key]}
          </React.Fragment>
      ))}

    </div>
  );
};

export default ClassicTemplate;