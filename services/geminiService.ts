import { GoogleGenAI, Type } from "@google/genai";
import { ResumeSchema, Work, Project, CoverLetterSchema, AtsAnalysisResult } from '../types';

const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable not set");
  }
  return new GoogleGenAI({ apiKey });
}

export const generateSummarySuggestion = async (resumeSchema: ResumeSchema): Promise<string> => {
  try {
    const ai = getAI();
    const prompt = `Based on the following resume details, write a compelling and professional summary of 2-3 sentences. 
    Focus on key skills and experience.
    Job Title: ${resumeSchema.basics.label}
    Experience: ${resumeSchema.work.map(exp => `${exp.position} at ${exp.name}`).join(', ')}
    Skills: ${resumeSchema.skills.map(skill => skill.name).join(', ')}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text?.trim() || '';
  } catch (error) {
    console.error("Error generating summary:", error);
    return "Error: Could not generate summary. Please check your API key and try again.";
  }
};

export const generateExperienceSuggestion = async (experience: Work): Promise<string[]> => {
   try {
    const ai = getAI();
    const prompt = `You are a professional resume writer. For a role as a "${experience.position}" at "${experience.name}", 
    write 3-4 concise, action-oriented bullet points describing key responsibilities and achievements. 
    Use the STAR (Situation, Task, Action, Result) method where possible. 
    Start each bullet point with "• ".
    
    Current summary for context (if any): ${experience.summary}
    Current highlights for context (if any): ${experience.highlights.join(' ')}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text?.trim().split('\n').map(line => line.replace(/^•\s*/, '')) || [];
  } catch (error) {
    console.error("Error generating experience details:", error);
    return ["Error: Could not generate suggestions. Please check your API key and try again."];
  }
};

export const generateProjectSuggestion = async (project: Project): Promise<string[]> => {
   try {
    const ai = getAI();
    const prompt = `You are a professional resume writer. For a project named "${project.name}", 
    write 2-3 concise, action-oriented bullet points describing the project's key features and your achievements.
    Focus on the technologies used and the outcomes.
    Start each bullet point with "• ".
    
    Project description for context: ${project.description}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text?.trim().split('\n').map(line => line.replace(/^•\s*/, '')) || [];
  } catch (error) {
    console.error("Error generating project details:", error);
    return ["Error: Could not generate suggestions. Please check your API key and try again."];
  }
};

export const enhanceBulletPoint = async (text: string): Promise<string[]> => {
  try {
    const ai = getAI();
    const prompt = `
      You are an expert resume writer.
      Rewrite the following draft resume bullet point to be professional, impactful, and result-oriented.
      Use active verbs and quantify results where possible (use placeholders like [X]% or $[Y] if numbers are unknown).
      Provide exactly 3 distinct variations ranging from conservative to bold.
      Return the response as a JSON array of strings.

      Draft: "${text}"
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING
          }
        }
      }
    });

    const jsonStr = response.text?.trim();
    if (!jsonStr) return [];
    const suggestions = JSON.parse(jsonStr);
    if (Array.isArray(suggestions) && suggestions.every(s => typeof s === 'string')) {
      return suggestions;
    }
    return [];
  } catch (error) {
    console.error("Error enhancing bullet point:", error);
    return ["Error generating suggestions. Please try again."];
  }
};

export const suggestSkillsForJob = async (jobTitle: string): Promise<string[]> => {
  try {
    const ai = getAI();
    const prompt = `
      List the top 12 most important professional skills (mix of technical and soft skills) for a "${jobTitle}".
      Return ONLY a JSON array of strings. Do not include any other text.
      Example: ["Agile Methodology", "Project Management", "Communication"]
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING
          }
        }
      }
    });

    const jsonStr = response.text?.trim();
    if (!jsonStr) return [];
    const skills = JSON.parse(jsonStr);
    if (Array.isArray(skills)) {
      return skills;
    }
    return [];
  } catch (error) {
    console.error("Error suggesting skills:", error);
    return ["Communication", "Teamwork", "Problem Solving"]; // Fallbacks
  }
};

export const generateTailoredResumeContent = async (jobTitle: string): Promise<{ summary: string, work: any[], projects: any[] }> => {
  try {
    const ai = getAI();
    const prompt = `
      Create tailored resume content for a "${jobTitle}" role.
      Generate the following:
      1. A professional summary (2-3 sentences).
      2. Two realistic work experience entries (latest one is "Current").
      3. One relevant project.

      Return a JSON object with this structure:
      {
        "summary": "string",
        "work": [
          { "position": "string", "name": "string", "location": "string", "startDate": "YYYY-MM", "endDate": "Present" | "YYYY-MM", "summary": "string", "highlights": ["string"] }
        ],
        "projects": [
          { "name": "string", "description": "string", "url": "string", "startDate": "YYYY-MM", "endDate": "YYYY-MM", "highlights": ["string"], "keywords": ["string"] }
        ]
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            work: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  position: { type: Type.STRING },
                  name: { type: Type.STRING },
                  location: { type: Type.STRING },
                  startDate: { type: Type.STRING },
                  endDate: { type: Type.STRING },
                  summary: { type: Type.STRING },
                  highlights: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
              }
            },
            projects: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  url: { type: Type.STRING },
                  startDate: { type: Type.STRING },
                  endDate: { type: Type.STRING },
                  highlights: { type: Type.ARRAY, items: { type: Type.STRING } },
                  keywords: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
              }
            }
          }
        }
      }
    });

    const jsonStr = response.text?.trim();
    if (!jsonStr) return { summary: '', work: [], projects: [] };
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error generating tailored content:", error);
    return { summary: '', work: [], projects: [] };
  }
};

export const extractJobDetailsFromDescription = async (jobDescription: string): Promise<{ companyName: string, recipientTitle: string, recipientName: string }> => {
    try {
        const ai = getAI();
        const prompt = `
            Analyze the following Job Description.
            Extract the "Company Name", the "Job Title" being hired for, and the "Hiring Manager Name".
            
            Rules:
            1. If the Hiring Manager's Name is not explicitly found, use "Hiring Manager" as the default.
            2. If the Company Name is not found, use "Company Name" as the default.
            3. If the Job Title is not found, use "Applicant" as the default.
            
            Return the result as a JSON object.

            Job Description:
            ---
            ${jobDescription}
            ---
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        companyName: { type: Type.STRING },
                        recipientTitle: { type: Type.STRING },
                        recipientName: { type: Type.STRING }
                    }
                }
            }
        });

        const jsonStr = response.text?.trim();
        if (!jsonStr) return { companyName: "Company Name", recipientTitle: "Position", recipientName: "Hiring Manager" };
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("Error extracting job details:", error);
        return {
            companyName: "Company Name",
            recipientTitle: "Position",
            recipientName: "Hiring Manager"
        };
    }
};

export const generateCoverLetterSuggestion = async (coverLetter: CoverLetterSchema, resume: ResumeSchema): Promise<string[]> => {
  try {
    const ai = getAI();
    const prompt = `
      You are a professional career coach and expert resume writer.
      Based on the provided resume and job application details, write a compelling and professional cover letter body.
      
      **Configuration:**
      - Tone: ${coverLetter.tone || 'Professional'} (Ensure the writing style reflects this tone: e.g., 'Confident' should be bold and assertive, 'Humble' should be respectful and team-oriented, 'Creative' should be original and engaging).
      
      **Job Details:**
      - Applying for: ${coverLetter.recipientTitle || 'the advertised position'}
      - At Company: ${coverLetter.companyName}
      ${coverLetter.jobDescription ? `- Job Description / Requirements: ${coverLetter.jobDescription.substring(0, 1000)}...` : ''}

      **Resume Details:**
      - Name: ${resume.basics.name}
      - Professional Summary: ${resume.basics.summary}
      - Key Skills: ${resume.skills.slice(0, 5).map(s => s.name).join(', ')}
      - Recent Experience: ${resume.work.slice(0, 2).map(w => `${w.position} at ${w.name}`).join('; ')}

      **Instructions:**
      1.  **Introduction:** Express strong interest in the role and company. Mention where the job was seen if possible (use a placeholder like "[Platform]"). Briefly introduce the applicant's relevant experience.
      2.  **Body Paragraph(s):** Connect the applicant's skills and experience from their resume directly to the requirements of the role (referencing the Job Description if provided). Highlight a key achievement.
      3.  **Conclusion:** Reiterate interest, express enthusiasm for the opportunity, and include a call to action (e.g., looking forward to an interview).
      
      Do not include the salutation (e.g., "Dear...") or the sign-off (e.g., "Sincerely,"). Only provide the body paragraphs as a JSON array.
      The output must be a JSON array of strings, where each string is a paragraph. Aim for 3-4 paragraphs.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING
          }
        }
      }
    });
    
    const jsonStr = response.text?.trim();
    if (!jsonStr) throw new Error("Empty response from AI");
    const paragraphs = JSON.parse(jsonStr);
    if (Array.isArray(paragraphs) && paragraphs.every(p => typeof p === 'string')) {
      return paragraphs;
    }
    throw new Error("Invalid response format from AI.");

  } catch (error) {
    console.error("Error generating cover letter body:", error);
    return ["Error: Could not generate cover letter. Please check your API key and try again."];
  }
};

export const analyzeJobDescription = async (jobDescription: string, resume: ResumeSchema): Promise<AtsAnalysisResult> => {
    try {
        const ai = getAI();
        const resumeText = `
            Summary: ${resume.basics.summary}
            Experience: ${resume.work.map(w => w.highlights.join(' ')).join(' ')}
            Skills: ${resume.skills.map(s => s.name).join(', ')}
            Projects: ${resume.projects.map(p => p.description + ' ' + p.highlights.join(' ')).join(' ')}
        `;

        const prompt = `
            As a professional career coach specializing in ATS optimization, analyze the following job description and resume content.
            1. Extract the most important keywords and skills (technical, soft skills, and others) from the job description.
            2. Compare them with the provided resume content.
            3. Identify which keywords are present in the resume and which are missing.
            4. Provide a brief analysis of how well the resume is tailored to the job description and suggest improvements.
            5. Calculate a match score (integer between 0 and 100) based on keyword overlap, skill relevance, and experience alignment.
            6. Return the result as a JSON object.

            **Job Description:**
            ---
            ${jobDescription}
            ---

            **Resume Content:**
            ---
            ${resumeText}
            ---
        `;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        missingKeywords: {
                            type: Type.OBJECT,
                            properties: {
                                technical: { type: Type.ARRAY, items: { type: Type.STRING } },
                                softSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                                other: { type: Type.ARRAY, items: { type: Type.STRING } },
                            },
                        },
                        presentKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                        analysis: { type: Type.STRING },
                        score: { type: Type.NUMBER }
                    }
                }
            }
        });

        const jsonStr = response.text?.trim();
        if (!jsonStr) throw new Error("Empty response");
        return JSON.parse(jsonStr) as AtsAnalysisResult;

    } catch(error) {
        console.error("Error analyzing job description:", error);
        return {
            missingKeywords: { technical: [], softSkills: [], other: ["Error: Could not analyze the job description."] },
            presentKeywords: [],
            analysis: "There was an error communicating with the AI service. Please check your API key and try again.",
            score: 0
        };
    }
}