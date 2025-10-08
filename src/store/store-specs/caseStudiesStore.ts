/**
 * CaseStudies Store
 * Zustand store for managing case study data with mock data
 */

import { create } from 'zustand';

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  description: string;
  imageUrl?: string;
  services: string[];
  technologies: string[];
  results: string;
  challengeDescription: string;
  solutionDescription: string;
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  isFeatured: boolean;
  date: Date;
  category: string;
}

interface CaseStudiesState {
  caseStudies: Record<string, CaseStudy>;
  caseStudiesList: string[];
  featuredCaseStudies: string[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  getCaseStudy: (slug: string) => CaseStudy | null;
  getAllCaseStudies: () => CaseStudy[];
  getFeaturedCaseStudies: () => CaseStudy[];
  setCaseStudies: (caseStudies: CaseStudy[]) => void;
}

// Mock data for case studies
const mockCaseStudies: CaseStudy[] = [
  {
    id: '1',
    slug: 'wellness-coaching-transformation',
    title: 'Personal Wellness Coaching Transformation',
    client: 'Tech Executive Wellness Program',
    description: 'Comprehensive wellness coaching program helping a tech executive achieve work-life balance and optimal health through personalized training and lifestyle modifications.',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    services: ['Life Coaching', 'Personal Training', 'Wellness Consulting'],
    technologies: ['Habit Tracking Systems', 'Biometric Monitoring', 'Custom Workout Plans'],
    results: '40% improvement in energy levels, 25 lbs weight loss, and significant reduction in stress markers over 6 months.',
    challengeDescription: 'Client struggled with burnout, poor sleep quality, and declining physical health due to demanding executive role.',
    solutionDescription: 'Developed integrated approach combining personalized fitness regimen, nutrition coaching, stress management techniques, and accountability systems.',
    testimonial: {
      quote: 'The holistic approach transformed not just my fitness, but my entire approach to life and work. I feel more energized and focused than I have in years.',
      author: 'Sarah Johnson',
      position: 'VP of Engineering',
    },
    isFeatured: true,
    date: new Date('2024-01-15'),
    category: 'Personal Training',
  },
  {
    id: '2',
    slug: 'startup-brand-strategy',
    title: 'Startup Brand Strategy & Identity',
    client: 'GreenTech Innovations',
    description: 'Complete brand strategy development for sustainable technology startup, from visual identity to market positioning.',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
    services: ['Brand Strategy', 'Business Consulting', 'Design'],
    technologies: ['Design Systems', 'Brand Guidelines', 'Market Research Tools'],
    results: 'Successfully launched brand identity that resonated with target market, resulting in 300% increase in brand awareness and successful Series A funding.',
    challengeDescription: 'Startup needed to establish strong brand presence in competitive green technology market while differentiating from established players.',
    solutionDescription: 'Created comprehensive brand strategy including visual identity, messaging framework, and go-to-market strategy aligned with company values and target audience.',
    testimonial: {
      quote: 'The brand strategy provided clarity and direction that was instrumental in our funding success. Our investors loved the cohesive vision.',
      author: 'Michael Chen',
      position: 'CEO, GreenTech Innovations',
    },
    isFeatured: true,
    date: new Date('2024-02-20'),
    category: 'Business',
  },
  {
    id: '3',
    slug: 'enterprise-design-system',
    title: 'Enterprise Design System Implementation',
    client: 'Fortune 500 Financial Services',
    description: 'Built scalable design system for enterprise financial services platform, improving consistency and development efficiency across 20+ product teams.',
    imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
    services: ['Design', 'Development', 'Consulting'],
    technologies: ['React', 'TypeScript', 'Storybook', 'Figma', 'Design Tokens'],
    results: '60% reduction in design-to-development time, improved consistency across 50+ applications, and increased developer satisfaction scores.',
    challengeDescription: 'Organization faced inconsistent user experiences across products, slow development cycles, and difficulty maintaining brand standards at scale.',
    solutionDescription: 'Architected and implemented modular design system with comprehensive component library, documentation, and tooling for seamless adoption.',
    testimonial: {
      quote: 'This design system has been transformative for our organization. It has enabled us to move faster while maintaining the high quality our customers expect.',
      author: 'Jennifer Martinez',
      position: 'Head of Product Design',
    },
    isFeatured: true,
    date: new Date('2023-11-10'),
    category: 'Development',
  },
  {
    id: '4',
    slug: 'education-platform-development',
    title: 'Interactive Education Platform Development',
    client: 'Online Learning Academy',
    description: 'Developed comprehensive e-learning platform with interactive features, progress tracking, and adaptive learning capabilities.',
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
    services: ['Development', 'Education & Training', 'Consulting'],
    technologies: ['React', 'Node.js', 'MongoDB', 'WebRTC', 'Progressive Web Apps'],
    results: 'Platform serves 50,000+ students with 95% satisfaction rate, 40% improvement in course completion rates, and scalable infrastructure supporting 10x growth.',
    challengeDescription: 'Client needed modern, engaging platform to replace outdated learning management system while improving student engagement and outcomes.',
    solutionDescription: 'Built full-stack platform with modern UX, real-time collaboration features, personalized learning paths, and comprehensive analytics dashboard.',
    testimonial: {
      quote: 'The platform exceeded our expectations. Student engagement has skyrocketed, and our instructors love the intuitive interface.',
      author: 'Dr. Robert Williams',
      position: 'Dean of Online Education',
    },
    isFeatured: false,
    date: new Date('2023-09-05'),
    category: 'Development',
  },
  {
    id: '5',
    slug: 'leadership-coaching-program',
    title: 'Executive Leadership Coaching Program',
    client: 'Mid-Size Tech Company',
    description: 'Designed and delivered leadership development program for emerging leaders, focusing on emotional intelligence, strategic thinking, and team building.',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    services: ['Education & Training', 'Consulting', 'Life Coaching'],
    technologies: ['360 Feedback Tools', 'Leadership Assessments', 'Virtual Coaching Platforms'],
    results: '85% of participants promoted within 12 months, improved team performance metrics across the board, and establishment of lasting leadership culture.',
    challengeDescription: 'Organization faced leadership gap with high-potential employees lacking skills and confidence to move into leadership roles effectively.',
    solutionDescription: 'Created structured 6-month coaching program combining individual coaching, group workshops, peer learning, and practical leadership projects.',
    testimonial: {
      quote: 'This program was a game-changer for our leadership pipeline. The participants gained confidence and skills that are directly impacting our business.',
      author: 'Amanda Lee',
      position: 'VP of People Operations',
    },
    isFeatured: false,
    date: new Date('2023-12-01'),
    category: 'Education & Training',
  },
  {
    id: '6',
    slug: 'fitness-app-design-development',
    title: 'Fitness Tracking App Design & Development',
    client: 'FitLife Mobile Solutions',
    description: 'End-to-end design and development of mobile fitness application with AI-powered workout recommendations and social features.',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
    services: ['Design', 'Development', 'Personal Training'],
    technologies: ['React Native', 'TensorFlow', 'Firebase', 'HealthKit', 'Google Fit'],
    results: 'App achieved 4.8 star rating, 100,000+ downloads in first 3 months, and featured by Apple in "Health & Fitness" category.',
    challengeDescription: 'Client needed to differentiate in crowded fitness app market with unique value proposition and superior user experience.',
    solutionDescription: 'Combined fitness expertise with technical innovation to create AI-powered personalized workout plans and engaging social features.',
    testimonial: {
      quote: 'The combination of technical excellence and real fitness knowledge made all the difference. Users love the personalized approach.',
      author: 'David Park',
      position: 'Founder, FitLife',
    },
    isFeatured: false,
    date: new Date('2024-03-12'),
    category: 'Design',
  },
  {
    id: '7',
    slug: 'organizational-transformation',
    title: 'Organizational Transformation Consulting',
    client: 'Traditional Retail Corporation',
    description: 'Led comprehensive digital transformation initiative for traditional retail company, including process optimization, technology adoption, and culture change.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    services: ['Consulting', 'Business', 'Education & Training'],
    technologies: ['Change Management Frameworks', 'Agile Methodologies', 'Digital Tools Suite'],
    results: '45% improvement in operational efficiency, successful migration to cloud-based systems, and cultural shift toward innovation and agility.',
    challengeDescription: 'Legacy organization struggled with outdated processes, resistance to change, and inability to compete with digital-first competitors.',
    solutionDescription: 'Implemented phased transformation approach focusing on quick wins, stakeholder engagement, skill development, and sustainable change management.',
    testimonial: {
      quote: 'The transformation has positioned us for the future. We are now agile, customer-focused, and equipped to thrive in the digital age.',
      author: 'Patricia Brown',
      position: 'Chief Transformation Officer',
    },
    isFeatured: false,
    date: new Date('2023-08-20'),
    category: 'Consulting',
  },
];

export const useCaseStudiesStore = create<CaseStudiesState>((set, get) => {
  // Initialize store with mock data
  const initialCaseStudies: Record<string, CaseStudy> = {};
  const initialCaseStudiesList: string[] = [];
  const initialFeaturedCaseStudies: string[] = [];

  mockCaseStudies.forEach((study) => {
    initialCaseStudies[study.slug] = study;
    initialCaseStudiesList.push(study.slug);
    if (study.isFeatured) {
      initialFeaturedCaseStudies.push(study.slug);
    }
  });

  return {
    caseStudies: initialCaseStudies,
    caseStudiesList: initialCaseStudiesList,
    featuredCaseStudies: initialFeaturedCaseStudies,
    isLoading: false,
    error: null,

    getCaseStudy: (slug: string) => {
      return get().caseStudies[slug] || null;
    },

    getAllCaseStudies: () => {
      const state = get();
      return state.caseStudiesList
        .map((slug) => state.caseStudies[slug])
        .filter(Boolean);
    },

    getFeaturedCaseStudies: () => {
      const state = get();
      return state.featuredCaseStudies
        .map((slug) => state.caseStudies[slug])
        .filter(Boolean);
    },

    setCaseStudies: (caseStudies: CaseStudy[]) => {
      const newCaseStudies: Record<string, CaseStudy> = {};
      const newCaseStudiesList: string[] = [];
      const newFeaturedCaseStudies: string[] = [];

      caseStudies.forEach((study) => {
        newCaseStudies[study.slug] = study;
        newCaseStudiesList.push(study.slug);
        if (study.isFeatured) {
          newFeaturedCaseStudies.push(study.slug);
        }
      });

      set({
        caseStudies: newCaseStudies,
        caseStudiesList: newCaseStudiesList,
        featuredCaseStudies: newFeaturedCaseStudies,
      });
    },
  };
});
