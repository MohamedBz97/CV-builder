
import React from 'react';
import { ResumeSchema, SectionKey } from '../../types';

interface TemplateProps {
  data: ResumeSchema;
  sectionOrder: SectionKey[];
}

const Section: React.FC<{title: string, children: React.ReactNode, show: boolean}> = ({title, children, show}) => {
    if (!show) return null;
    return (
         <section className="mb-5">
            <h2 className="text-sm font-bold border-b-2 border-gray-700 pb-1 mb-2 uppercase tracking-widest text-gray-800">{title}</h2>
            {children}
        </section>
    )
}

const OnyxTemplate: React.FC<TemplateProps> = ({ data, sectionOrder }) => {
  const { basics, work, education, skills, projects, languages, interests, volunteer, awards, publications, certificates, references } = data;

  const sectionComponents: { [key in SectionKey]: React.ReactNode } = {
    work: (
       <Section title="Experience" show={work.length > 0}>
        {work.map(exp => (
          <div key={exp.id} className="mb-3">
            <div className="flex justify-between items-baseline">
              <div>
                <h3 className="text-sm font-semibold text-gray-800">{exp.position}</h3>
                <p className="text-sm italic text-gray-600">{exp.name}</p>
              </div>
              <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate || 'Present'}</p>
            </div>
            <ul className="mt-1 list-disc list-inside text-gray-700 space-y-1">
              {exp.highlights.map((line, i) => line && <li key={i}>{line}</li>)}
            </ul>
          </div>
        ))}
      </Section>
    ),
    volunteer: (
      <Section title="Volunteer" show={volunteer.length > 0}>
        {volunteer.map(vol => (
          <div key={vol.id} className="mb-3">
            <div className="flex justify-between items-baseline">
              <div>
                <h3 className="text-sm font-semibold text-gray-800">{vol.position}</h3>
                <p className="text-sm italic text-gray-600">{vol.organization}</p>
              </div>
              <p className="text-xs text-gray-500">{vol.startDate} - {vol.endDate || 'Present'}</p>
            </div>
            <ul className="mt-1 list-disc list-inside text-gray-700 space-y-1">
              {vol.highlights.map((line, i) => line && <li key={i}>{line}</li>)}
            </ul>
          </div>
        ))}
      </Section>
    ),
    projects: (
       <Section title="Projects" show={projects.length > 0}>
        {projects.map(proj => (
          <div key={proj.id} className="mb-3">
            <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-semibold text-gray-800">{proj.name}</h3>
                <p className="text-xs text-gray-500">{proj.startDate} - {proj.endDate || 'Present'}</p>
            </div>
             {proj.url && <a href={`https://${proj.url}`} target="_blank" rel="noopener noreferrer" className="text-xs italic text-blue-600 hover:underline">{proj.url}</a>}
            <p className="text-xs text-gray-600 mt-1">{proj.description}</p>
            <ul className="mt-1 list-disc list-inside text-gray-700 space-y-1">
              {proj.highlights.map((line, i) => line && <li key={i}>{line}</li>)}
            </ul>
          </div>
        ))}
      </Section>
    ),
    education: (
       <Section title="Education" show={education.length > 0}>
        {education.map(edu => (
          <div key={edu.id} className="mb-2">
             <div className="flex justify-between items-baseline">
              <div>
                <h3 className="text-sm font-semibold text-gray-800">{edu.institution}</h3>
                <p className="text-sm text-gray-600">{edu.studyType} in {edu.area}</p>
              </div>
              <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
            </div>
          </div>
        ))}
      </Section>
    ),
    skills: (
      <Section title="Skills" show={skills.length > 0}>
        <div className="flex flex-wrap gap-2">
          {skills.map(skill => (
            <span key={skill.id} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-xs">{skill.name}</span>
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
    interests: (
       <Section title="Interests" show={interests.length > 0}>
            <div className="flex flex-wrap gap-2">
                 {interests.map(interest => (
                    <span key={interest.id} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">{interest.name}</span>
                ))}
            </div>
      </Section>
    ),
    awards: (
        <Section title="Awards" show={awards.length > 0}>
            {awards.map(award => (
                <div key={award.id} className="mb-2">
                    <p><span className="font-semibold">{award.title}</span> - <span className="italic">{award.awarder}</span>, {award.date}</p>
                </div>
            ))}
        </Section>
    ),
    certificates: (
        <Section title="Certificates" show={certificates.length > 0}>
             {certificates.map(cert => (
                <div key={cert.id} className="mb-2">
                    <p><span className="font-semibold">{cert.name}</span> - <span className="italic">{cert.issuer}</span>, {cert.date}</p>
                </div>
            ))}
        </Section>
    ),
    publications: (
        <Section title="Publications" show={publications.length > 0}>
             {publications.map(pub => (
                <div key={pub.id} className="mb-2">
                    <p><span className="font-semibold">{pub.name}</span> - <span className="italic">{pub.publisher}</span>, {pub.releaseDate}</p>
                </div>
            ))}
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
    <div className="p-8 text-xs font-sans text-gray-700 bg-white min-h-full">
      <header className="text-left mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{basics.name}</h1>
        <p className="text-base text-gray-600 font-medium mt-1">{basics.label}</p>
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-gray-500">
          <span>{basics.email}</span>
          <span>&bull;</span>
          <span>{basics.phone}</span>
          <span>&bull;</span>
          <span>{basics.location.city}, {basics.location.region}</span>
          {basics.url && (
            <>
              <span>&bull;</span>
              <a href={`https://${basics.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{basics.url}</a>
            </>
          )}
           {basics.profiles.map(profile => (
             <React.Fragment key={profile.id}>
                <span>&bull;</span>
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

export default OnyxTemplate;
