import { v4 as uuidv4 } from 'uuid';
import { ResumeSchema, Job, JobApplicationStatus, ResumeLayout, SectionKey, CoverLetterSchema } from './types';

export const DEFAULT_RESUME_SCHEMA: ResumeSchema = {
  basics: {
    name: 'Your Name',
    label: 'Your Job Title',
    email: 'your.email@example.com',
    phone: '123-456-7890',
    url: 'your-portfolio.com',
    summary: 'A brief professional summary about yourself. Highlight your key skills, experience, and career goals. Use our AI assistant to generate a compelling summary!',
    location: {
      city: 'City',
      region: 'State',
    },
    profiles: [
        { id: uuidv4(), network: 'LinkedIn', username: 'yourname', url: 'linkedin.com/in/yourname' },
        { id: uuidv4(), network: 'GitHub', username: 'yourname', url: 'github.com/yourname' }
    ]
  },
  work: [
    {
      id: uuidv4(),
      name: 'Tech Solutions Inc.',
      position: 'Senior Software Engineer',
      url: 'https://techsolutions.com',
      location: 'San Francisco, CA',
      startDate: '2020-01',
      endDate: 'Present',
      summary: 'Developed and maintained critical features for a high-traffic web application.',
      highlights: [
        'Led the development of a new microservices architecture, improving scalability and reliability.',
        'Mentored junior developers and conducted code reviews to ensure code quality.',
        'Improved application performance by 30% through code optimization and caching strategies.'
      ]
    },
  ],
  volunteer: [],
  education: [
    {
      id: uuidv4(),
      institution: 'State University',
      url: 'https://stateuni.edu',
      area: 'Computer Science',
      studyType: 'Bachelor of Science',
      startDate: '2016-08',
      endDate: '2020-05',
      score: '3.8/4.0',
      courses: [
        'Data Structures and Algorithms',
        'Web Development',
        'Database Systems'
      ]
    },
  ],
  awards: [],
  certificates: [],
  publications: [],
  skills: [
    { id: uuidv4(), name: 'React', level: 5, keywords: ['Web Development', 'Frontend'] },
    { id: uuidv4(), name: 'TypeScript', level: 5, keywords: ['Web Development', 'Frontend'] },
    { id: uuidv4(), name: 'Node.js', level: 4, keywords: ['Web Development', 'Backend'] },
    { id: uuidv4(), name: 'Tailwind CSS', level: 4, keywords: ['Web Development', 'CSS'] },
  ],
  languages: [
      { id: uuidv4(), language: 'English', fluency: 'Native Speaker' },
  ],
  interests: [],
  references: [],
  projects: [
    {
        id: uuidv4(),
        name: 'Personal Portfolio Website',
        description: 'A responsive website to showcase my projects and skills.',
        startDate: '2022-06',
        endDate: '2022-08',
        url: 'your-portfolio.com',
        highlights: [
            'Built with React and Tailwind CSS for a modern and fast user experience.',
            'Integrated with a headless CMS for easy content management.',
        ],
        keywords: ['React', 'Tailwind CSS', 'CMS']
    }
  ],
};

export const DEFAULT_SECTION_ORDER: SectionKey[] = [
    'work', 'projects', 'education', 'skills', 'volunteer', 'awards', 'certificates', 'publications', 'languages', 'interests', 'references'
];

export const DEFAULT_SECTIONS: { [key in SectionKey]: { id: SectionKey; name: string; enabled: boolean } } = {
    work: { id: 'work', name: 'Work Experience', enabled: true },
    education: { id: 'education', name: 'Education', enabled: true },
    skills: { id: 'skills', name: 'Skills', enabled: true },
    projects: { id: 'projects', name: 'Projects', enabled: true },
    volunteer: { id: 'volunteer', name: 'Volunteer', enabled: false },
    awards: { id: 'awards', name: 'Awards', enabled: false },
    certificates: { id: 'certificates', name: 'Certificates', enabled: false },
    publications: { id: 'publications', name: 'Publications', enabled: false },
    languages: { id: 'languages', name: 'Languages', enabled: true },
    interests: { id: 'interests', name: 'Interests', enabled: false },
    references: { id: 'references', name: 'References', enabled: false },
};

export const DEFAULT_LAYOUT: ResumeLayout = {
    sections: DEFAULT_SECTIONS,
    sectionOrder: DEFAULT_SECTION_ORDER,
};


export const DEFAULT_COVER_LETTER_SCHEMA: CoverLetterSchema = {
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    recipientName: 'Hiring Manager',
    recipientTitle: 'Hiring Manager Title',
    companyName: 'Company Name',
    salutation: 'Dear Hiring Manager,',
    body: [
        "I am writing to express my keen interest in the [Job Title] position at [Company Name], which I saw advertised on [Platform]. With my experience in [Your Industry/Field] and skills in [2-3 key skills], I am confident I would be a valuable asset to your team.",
        "In my previous role at [Previous Company], I was responsible for [key responsibility]. One of my proudest achievements was [specific achievement with quantifiable result]. This experience has equipped me with a strong foundation in skills that are essential for this role.",
        "I have been following [Company Name]'s work and am impressed by [something specific about the company]. I am eager to contribute my expertise to a team that is making a difference.",
        "Thank you for considering my application. I am enthusiastic about the opportunity to discuss how my background and skills can benefit [Company Name]. I look forward to hearing from you."
    ],
    signoff: 'Sincerely,',
};

export const DEFAULT_JOBS: Job[] = [
    {
        id: uuidv4(),
        company: 'Innovate Corp',
        role: 'Frontend Developer',
        status: JobApplicationStatus.INTERVIEW,
        dateApplied: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        notes: 'First interview went well. Second interview scheduled for next week.',
        link: 'https://example.com/job1'
    },
    {
        id: uuidv4(),
        company: 'Data Systems',
        role: 'Full Stack Engineer',
        status: JobApplicationStatus.APPLIED,
        dateApplied: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        notes: 'Applied through their career portal.',
        link: 'https://example.com/job2'
    },
     {
        id: uuidv4(),
        company: 'Creative Minds',
        role: 'UI/UX Designer',
        status: JobApplicationStatus.WISHLIST,
        dateApplied: '',
        notes: 'Interesting role, need to tailor my portfolio before applying.',
        link: 'https://example.com/job3'
    }
]

export const JOB_STATUS_COLORS: { [key in JobApplicationStatus]: string } = {
  [JobApplicationStatus.WISHLIST]: 'bg-gray-200 text-gray-800',
  [JobApplicationStatus.APPLIED]: 'bg-blue-200 text-blue-800',
  [JobApplicationStatus.INTERVIEW]: 'bg-yellow-200 text-yellow-800',
  [JobApplicationStatus.OFFER]: 'bg-green-200 text-green-800',
  [JobApplicationStatus.REJECTED]: 'bg-red-200 text-red-800',
};