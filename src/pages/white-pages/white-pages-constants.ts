// White Pages PDF mapping
export interface WhitePageItem {
  id: string;
  title: string;
  description: string;
  pdfPath: string;
  category:
    | 'personal-training'
    | 'graphic-design'
    | 'education-training'
    | 'consulting'
    | 'development'
    | 'resonance-core';
  displayName: string;
}

export const WHITE_PAGES: WhitePageItem[] = [
  {
    id: 'personal-training',
    title: 'Personal Training & Wellness',
    displayName: 'Personal Training',
    description:
      'Fitness and life training through a systems lens. Tailored programs for founders and creatives to align body, mind, and mission.',
    pdfPath: require('../../assets/white-pages/Fluxline-Personal-Training.pdf'),
    category: 'personal-training',
  },
  {
    id: 'graphic-design',
    title: 'Brand Identity & Experience Design',
    displayName: 'Graphic Design',
    description:
      'End-to-end brand architecture and emotionally intelligent UI/UX design that reflects your evolution and resonates.',
    pdfPath: require('../../assets/white-pages/Fluxline-Graphic-Design.pdf'),
    category: 'graphic-design',
  },
  {
    id: 'education-training',
    title: 'Coaching, Education & Leadership',
    displayName: 'Education & Mentoring',
    description:
      'Transformational coaching, founder mentorship, and emotionally intelligent team leadership for those who build with purpose.',
    pdfPath: require('../../assets/white-pages/Fluxline-Education-Mentoring.pdf'),
    category: 'education-training',
  },
  {
    id: 'consulting',
    title: 'IT & Systems Consulting',
    displayName: 'Business IT Consulting',
    description:
      'Modular IT strategies, infrastructure planning, and tech stack alignment for startups, creators, and visionary brands.',
    pdfPath: require('../../assets/white-pages/Fluxline-Business-IT-Consulting.pdf'),
    category: 'consulting',
  },
  {
    id: 'development',
    title: 'Web & Application Development',
    displayName: 'App & Web Development',
    description:
      'Crafting full-stack digital products using modern technologies—with an emphasis on modularity, usability, and long-term maintainability.',
    pdfPath: require('../../assets/white-pages/Fluxline-App-and-Web-Development.pdf'),
    category: 'development',
  },
  {
    id: 'resonance-core',
    title: 'Life Coaching & The Resonance Core',
    displayName: 'Life Coaching & Resonance Core',
    description:
      'Guiding individuals through transformative life coaching and personal development using the Resonance Core methodology.',
    pdfPath: require('../../assets/white-pages/Fluxline-Life-Coaching-Resonance-Core.pdf'),
    category: 'resonance-core',
  },
];

export default WHITE_PAGES;
