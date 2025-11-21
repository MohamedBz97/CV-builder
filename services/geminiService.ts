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
    
    return response.text.trim();
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

    return response.text.trim().split('\n').map(line => line.replace(/^•\s*/, ''));
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

    return response.text.trim().split('\n').map(line => line.replace(/^•\s*/, ''));
  } catch (error) {
    console.error("Error generating project details:", error);
    return ["Error: Could not generate suggestions. Please check your API key and try again."];
  }
};

export const generateCoverLetterSuggestion = async (coverLetter: CoverLetterSchema, resume: ResumeSchema): Promise<string[]> => {
  try {
    const ai = getAI();
    const prompt = `
      You are a professional career coach and expert resume writer.
      Based on the provided resume and job application details, write a compelling and professional cover letter body.
      The tone should be enthusiastic and confident.
      The output must be a JSON array of strings, where each string is a paragraph for the cover letter body. Aim for 3-4 paragraphs.

      **Resume Details:**
      - Name: ${resume.basics.name}
      - Applying for: ${coverLetter.recipientTitle || 'the advertised position'}
      - At Company: ${coverLetter.companyName}
      - Professional Summary: ${resume.basics.summary}
      - Key Skills: ${resume.skills.slice(0, 5).map(s => s.name).join(', ')}
      - Recent Experience: ${resume.work.slice(0, 2).map(w => `${w.position} at ${w.name}`).join('; ')}

      **Instructions:**
      1.  **Introduction:** Express strong interest in the role and company. Mention where the job was seen if possible (use a placeholder like "[Platform]"). Briefly introduce the applicant's relevant experience.
      2.  **Body Paragraph(s):** Connect the applicant's skills and experience from their resume directly to the requirements of the role. Highlight a key achievement.
      3.  **Conclusion:** Reiterate interest, express enthusiasm for the opportunity, and include a call to action (e.g., looking forward to an interview).
      
      Do not include the salutation (e.g., "Dear...") or the sign-off (e.g., "Sincerely,"). Only provide the body paragraphs as a JSON array.
      Example Response: ["Paragraph one...", "Paragraph two...", "Paragraph three..."]
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
    
    const jsonStr = response.text.trim();
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
            5. Return the result as a JSON object.

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
                        analysis: { type: Type.STRING }
                    }
                }
            }
        });

        const jsonStr = response.text.trim();
        return JSON.parse(jsonStr) as AtsAnalysisResult;

    } catch(error) {
        console.error("Error analyzing job description:", error);
        return {
            missingKeywords: { technical: [], softSkills: [], other: ["Error: Could not analyze the job description."] },
            presentKeywords: [],
            analysis: "There was an error communicating with the AI service. Please check your API key and try again."
        };
    }
}