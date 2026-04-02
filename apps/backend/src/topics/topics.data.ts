export const TOPICS_DATA = [
  {
    id: 'softskills',
    name: 'Soft Skills',
    subtopics: [
      { id: 'elevator-pitch', name: 'Elevator Pitch' },
      { id: 'star-method', name: 'Past Experiences' },
      { id: 'cultural-fit', name: 'Cultural Fit & Values' },
      { id: 'future-goals', name: 'Career Goals & Aspirations' },
      { id: 'tricky-questions', name: 'Handling Tricky Questions' }, // Ex: "Why should we hire you?" ou "Weaknesses"
    ],
  },
  {
    id: 'frontend',
    name: 'Frontend',
    subtopics: [
      { id: 'react', name: 'React' },
      { id: 'html', name: 'HTML' },
      { id: 'javascript', name: 'JavaScript' },
      { id: 'tailwind', name: 'Tailwind CSS' },
      { id: 'css', name: 'CSS/Styling' },
      { id: 'typescript', name: 'TypeScript' },
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    subtopics: [
      { id: 'node', name: 'Node.js' },
      { id: 'python', name: 'Python' },
      { id: 'nest', name: 'Nest.js' },
    ],
  },
  {
    id: 'fullstack',
    name: 'FullStack',
    subtopics: [
      { id: 'next', name: 'Next.js' },
      { id: 'express', name: 'Express.js' },
    ],
  },
  {
    id: 'devops',
    name: 'DevOps',
    subtopics: [
      { id: 'docker', name: 'Docker' },
      { id: 'kubernetes', name: 'Kubernetes' },
      { id: 'ci-cd', name: 'CI/CD' },
      { id: 'aws', name: 'AWS' },
    ],
  },
  {
    id: 'database',
    name: 'Database',
    subtopics: [
      { id: 'postgresql', name: 'PostgreSQL' },
      { id: 'mongodb', name: 'MongoDB' },
      { id: 'redis', name: 'Redis' },
      { id: 'sql', name: 'SQL' },
    ],
  },
];

export interface Topic {
  id: string;
  name: string;
  subtopics: { id: string; name: string }[];
}
