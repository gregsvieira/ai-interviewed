export const TOPICS_DATA = [
  {
    id: 'frontend',
    name: 'Frontend',
    subtopics: [
      { id: 'react', name: 'React' },
      { id: 'vue', name: 'Vue' },
      { id: 'angular', name: 'Angular' },
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
      { id: 'java', name: 'Java' },
      { id: 'go', name: 'Go' },
      { id: 'rust', name: 'Rust' },
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
