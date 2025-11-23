
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";
import { ResumeSchema } from "../types";

export const generateTextResume = (data: ResumeSchema): string => {
  const { basics, work, education, skills, projects, volunteer, awards, certificates, publications, languages, interests, references } = data;
  
  let text = `${basics.name.toUpperCase()}\n`;
  text += `${basics.label}\n`;
  text += `${basics.email} | ${basics.phone} | ${basics.location.city}, ${basics.location.region}\n`;
  if (basics.url) text += `${basics.url}\n`;
  basics.profiles.forEach(p => text += `${p.network}: ${p.url}\n`);
  text += `\n----------------------------------------\n\n`;

  if (basics.summary) {
    text += `SUMMARY\n${basics.summary}\n\n`;
  }

  if (work.length > 0) {
    text += `EXPERIENCE\n\n`;
    work.forEach(w => {
      text += `${w.position} | ${w.name}, ${w.location}\n`;
      text += `${w.startDate} - ${w.endDate || 'Present'}\n`;
      if (w.summary) text += `${w.summary}\n`;
      w.highlights.forEach(h => text += `• ${h}\n`);
      text += `\n`;
    });
  }

  if (education.length > 0) {
    text += `EDUCATION\n\n`;
    education.forEach(e => {
      text += `${e.institution} | ${e.studyType} in ${e.area}\n`;
      text += `${e.startDate} - ${e.endDate} | GPA: ${e.score || 'N/A'}\n`;
      if (e.courses.length > 0) {
          text += `Courses: ${e.courses.join(', ')}\n`;
      }
      text += `\n`;
    });
  }

  if (skills.length > 0) {
    text += `SKILLS\n\n`;
    skills.forEach(s => {
      text += `${s.name} (Level: ${s.level}/5)\n`;
      if (s.keywords.length > 0) text += `  ${s.keywords.join(', ')}\n`;
    });
    text += `\n`;
  }

  if (projects.length > 0) {
    text += `PROJECTS\n\n`;
    projects.forEach(p => {
        text += `${p.name} (${p.url})\n`;
        text += `${p.startDate} - ${p.endDate || 'Present'}\n`;
        text += `${p.description}\n`;
        p.highlights.forEach(h => text += `• ${h}\n`);
        text += `\n`;
    });
  }

  return text;
};

export const generateDocxResume = async (data: ResumeSchema): Promise<Blob> => {
    const { basics, work, education, skills, projects } = data;

    const sections = [];

    // Header
    sections.push(
        new Paragraph({
            text: basics.name,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
            text: basics.label,
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
            children: [
                new TextRun(`${basics.email} | ${basics.phone} | ${basics.location.city}, ${basics.location.region}`),
                new TextRun({
                    text: basics.url ? ` | ${basics.url}` : "",
                })
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
        })
    );
    
    // Summary
    if (basics.summary) {
        sections.push(
            new Paragraph({
                text: "Professional Summary",
                heading: HeadingLevel.HEADING_1,
                thematicBreak: true,
            }),
            new Paragraph({
                text: basics.summary,
                spacing: { after: 200 },
            })
        );
    }

    // Work Experience
    if (work.length > 0) {
        sections.push(
            new Paragraph({
                text: "Work Experience",
                heading: HeadingLevel.HEADING_1,
                thematicBreak: true,
            })
        );
        work.forEach(w => {
            sections.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: w.position, bold: true }),
                        new TextRun({ text: ` at ${w.name}`, italics: true }),
                        new TextRun({ text: `  (${w.startDate} - ${w.endDate || 'Present'})`, size: 20 }),
                    ]
                }),
                new Paragraph({ text: w.summary || "" })
            );
            w.highlights.forEach(h => {
                sections.push(new Paragraph({
                    text: h,
                    bullet: { level: 0 },
                }));
            });
            sections.push(new Paragraph({ text: "" })); // spacer
        });
    }

    // Education
    if (education.length > 0) {
        sections.push(
            new Paragraph({
                text: "Education",
                heading: HeadingLevel.HEADING_1,
                thematicBreak: true,
            })
        );
        education.forEach(e => {
            sections.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: e.institution, bold: true }),
                        new TextRun({ text: `, ${e.studyType} in ${e.area}` }),
                    ]
                }),
                 new Paragraph({
                    text: `${e.startDate} - ${e.endDate} ${e.score ? `| GPA: ${e.score}` : ''}`,
                    spacing: { after: 100 }
                })
            );
        });
    }

     // Skills
    if (skills.length > 0) {
        sections.push(
            new Paragraph({
                text: "Skills",
                heading: HeadingLevel.HEADING_1,
                thematicBreak: true,
            })
        );
        skills.forEach(s => {
             sections.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: `${s.name}: `, bold: true }),
                        new TextRun(s.keywords.join(", ")),
                    ]
                })
            );
        });
    }

    const doc = new Document({
        sections: [{
            properties: {},
            children: sections,
        }],
    });

    return await Packer.toBlob(doc);
};
