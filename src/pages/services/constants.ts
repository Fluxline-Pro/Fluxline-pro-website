import { IAboutPercentagePoint, IAboutBulletPoint } from './services.types';

const ABOUT_PROFESSIONAL_SUMMARY = [
  'Architect of transformative systems, brand experiences, and human-centric technology who specializes in modular web development, IT infrastructure, and scalable design ecosystems with a focus on emotional clarity, strategic innovation, and long-term impact.',
  'As the founder of Fluxline, I bring together advanced architecture, creative storytelling, and intentional coaching to help clients build not just solutions but philosophies, brands, and living identities that evolve with them. Let\'s make your vision a reality!'
];

const SERVICES_SUMMARY =
  'I offer strategic, design-forward, and emotionally intelligent solutions that help individuals and businesses build their brand and identity. Every service I offer is rooted in progressive, intentional design and build to push you and your business forward. Click on a service below to learn more!';

const EDUCATION_TRAINING_SUMMARY =
  'Transformational coaching, founder mentorship, and emotionally intelligent team leadership for those who build with purpose.';

const PERSONAL_TRAINING_SUMMARY =
  'Fitness and life training through a systems lens. Tailored programs for founders and creatives to align body, mind, and mission.';

const BUSINESS_SUMMARY =
  'Designing layered business ecosystems—from LLC structuring to asset protection—with a focus on longevity, tax efficiency, and legacy.';

const CONSULTING_SUMMARY =
  'Modular IT strategies, infrastructure planning, and tech stack alignment for startups, creators, and visionary brands.';

const DEVELOPMENT_SUMMARY =
  'Crafting full-stack digital products using modern technologies—with an emphasis on modularity, usability, and long-term maintainability.';

const DESIGN_SUMMARY =
  'End-to-end brand architecture and emotionally intelligent UI/UX design that reflects your evolution and resonates.';

const ABOUT_BULLET_POINTS: IAboutBulletPoint[] = [
  {
    name: 'Personable and Approachable',
    description:
      'I prioritize human connection and empathy—building systems around how people feel, think, and grow.',
  },
  {
    name: 'Technologically Curious',
    description:
      'I integrate emerging trends in design, AI, and backend architecture to fuel innovation and unlock new possibilities.',
  },
  {
    name: 'Intentional Learner',
    description:
      'My process is iterative and expansive—driven by a commitment to growth, clarity, and adaptive evolution.',
  },
  {
    name: 'Creative & Modular Thinker',
    description:
      'I architect brands and systems that flex, scale, and resonate—balancing creativity with precision.',
  },
  {
    name: 'Detail-crafted',
    description:
      'Every element is designed with clarity and care, from backend logic to frontend flow to the emotional cadence of copy.',
  },
  {
    name: 'Problem alchemist',
    description:
      'I synthesize complexity into elegance—translating tangled systems into streamlined, actionable solutions.',
  },
  {
    name: 'Proactive strategist',
    description:
      'I don’t wait for clarity--I design it. I move early, test intelligently, and pivot with intention.',
  },
  {
    name: 'Results + resonance',
    description:
      'I deliver outcomes clients can measure—and frameworks they can feel. Impact isn’t just numeric, it’s experiential.',
  },
];

const ABOUT_PERCENTAGE_POINTS: IAboutPercentagePoint[] = [
  {
    name: 'design thinking',
    percentage: 100,
  },
  {
    name: 'figma prototyping',
    percentage: 100,
  },
  {
    name: 'relational brand design',
    percentage: 99,
  },
  {
    name: 'creative direction',
    percentage: 99,
  },
  {
    name: 'oral/written communication',
    percentage: 99,
  },
  {
    name: 'personal & business coaching',
    percentage: 98,
  },
  {
    name: 'experience strategy',
    percentage: 98,
  },
  {
    name: 'frontend development',
    percentage: 98,
  },
  {
    name: 'cloud & hybrid solutions',
    percentage: 97,
  },
  {
    name: 'cross-functional team leadership',
    percentage: 96,
  },
  {
    name: 'systems architecture',
    percentage: 95,
  },
  {
    name: 'IT strategy & consulting',
    percentage: 95,
  },
  {
    name: 'project management',
    percentage: 95,
  },
  {
    name: 'backend development',
    percentage: 94,
  },
  {
    name: 'business structuring',
    percentage: 94,
  },
  {
    name: 'qa & automation',
    percentage: 92,
  },
  {
    name: 'ai integration',
    percentage: 91,
  },
  {
    name: 'motion design',
    percentage: 89,
  },
];

// Services-specific data
const SERVICES_BULLET_POINTS: IAboutBulletPoint[] = [
  {
    name: 'information technology & systems consulting',
    description:
      'Modular IT strategies, infrastructure planning, and tech stack alignment for startups, creators, and visionary brands.',
    route: '/services/consulting',
  },
  {
    name: 'Web & Application Development',
    description:
      'Crafting full-stack digital products using modern technologies—with an emphasis on modularity, usability, and long-term maintainability.',
    route: '/services/development',
  },
  {
    name: 'Brand Identity & Experience Design',
    description:
      'End-to-end brand architecture and emotionally intelligent UI/UX design that reflects your evolution and resonates.',
    route: '/services/design',
  },
  {
    name: 'Coaching, Education & Leadership',
    description:
      'Transformational coaching, founder mentorship, and emotionally intelligent team leadership for those who build with purpose.',
    route: '/services/education-training',
  },
  {
    name: 'Intentional Wellness & Personal Training',
    description:
      'Fitness and life training through a systems lens. Tailored programs for founders and creatives to align body, mind, and mission.',
    route: '/services/personal-training',
  },
  {
    name: 'Strategic Business & Legal Architecture',
    description:
      'Designing layered business ecosystems—from LLC structuring to asset protection—with a focus on longevity, tax efficiency, and legacy.',
    route: '/services/business',
  },
];

const EDUCATION_TRAINING_BULLET_POINTS: IAboutBulletPoint[] = [
  {
    name: '1-on-1 Coaching',
    description:
      'Personalized coaching sessions to help you achieve your goals',
  },
  {
    name: 'Livestream Workshops',
    description:
      'Interactive workshops covering a range of topics from design to development',
  },
  {
    name: 'Live Demos & Workshops',
    description:
      'Hands-on sessions to learn new skills and technologies in real-time',
  },
  {
    name: 'Company-wide Training',
    description:
      'Tailored training programs for teams to enhance skills and productivity',
  },
  {
    name: 'Modular Frameworks',
    description:
      'Flexible training modules that adapt to your learning pace and style',
  },
  {
    name: 'ITIL Best Practices',
    description:
      'Hands-on training in ITIL framework for IT service management',
  },
  {
    name: 'Web Performance Optimization',
    description: 'Techniques to enhance website speed, usability, and SEO',
  },
  {
    name: 'Accessibility Best Practices',
    description: 'Creating inclusive digital experiences for all users',
  },
];

const PERSONAL_TRAINING_BULLET_POINTS: IAboutBulletPoint[] = [
  {
    name: 'Personalized Fitness Plans',
    description:
      'Custom workout and nutrition plans tailored to your individual goals',
  },
  {
    name: '1-on-1 Coaching',
    description:
      'Dedicated coaching sessions in-person, online and hybrid for personalized guidance and support',
  },
  {
    name: 'Physical Training Regimens',
    description:
      'Structured training programs focusing on strength, endurance, and flexibility',
  },
  {
    name: 'Nutrition Advice',
    description: 'Guidance on healthy eating habits and meal planning',
  },
  {
    name: 'Mindset Coaching and Support',
    description:
      'Mental strategies to enhance focus, motivation, and resilience',
  },
  {
    name: 'Holistic Wellness Approach',
    description:
      'Integrating physical fitness with mental and emotional well-being',
  },
  {
    name: 'Online Training Programs',
    description:
      'Flexible training options that fit your schedule and lifestyle',
  },
];

const BUSINESS_BULLET_POINTS: IAboutBulletPoint[] = [
  {
    name: 'Business Structuring',
    description:
      'LLC structuring, asset protection, and tax efficiency for long-term success',
  },
  {
    name: 'Legal Architecture',
    description:
      'Designing legal frameworks that support business growth and compliance',
  },
  {
    name: 'Strategic Planning',
    description:
      'Long-term business strategies that align with your vision and goals',
  },
  {
    name: 'Financial Systems Design',
    description:
      'Creating financial structures that optimize cash flow and investment',
  },
  {
    name: 'Brand Evolution Strategy',
    description:
      'Guiding brands through growth phases with a focus on adaptability and resonance',
  },
  {
    name: 'Brand Modularity',
    description:
      'Designing brands that can flex and scale with your business and individual identity needs',
  },
];

const CONSULTING_BULLET_POINTS: IAboutBulletPoint[] = [
  {
    name: 'IT Infrastructure Planning',
    description:
      'Building scalable and secure IT environments for startups and enterprises',
  },
  {
    name: 'Hybrid Compute Workflows',
    description:
      'Integrating cloud and on-premises systems for optimal performance',
  },
  {
    name: 'Cloud Optimization',
    description:
      'Improving cloud performance and cost efficiency as your business grows',
  },
  {
    name: 'Systems Integration',
    description: 'Connecting disparate systems for seamless data flow',
  },
  {
    name: 'Scalable Ops Design',
    description:
      'Building operations and infrastructure that grow with your business',
  },
  {
    name: 'Code Review & Optimization',
    description:
      'Ensuring code quality and performance for high reliability and scalability',
  },
  {
    name: 'Team Process Improvement',
    description:
      'Enhancing team workflows and collaboration through Agile & Scrum methodologies',
  },
  {
    name: 'Digital Transformation & Optimization',
    description:
      'Guiding businesses through digital change for improved efficiency and innovation',
  },
];

const DEVELOPMENT_BULLET_POINTS: IAboutBulletPoint[] = [
  {
    name: 'Frontend Development',
    description:
      'React, TypeScript, Tailwind, SCSS, and modern JavaScript frameworks',
  },
  {
    name: 'Backend Systems',
    description: 'Node.js, MERN stack, APIs, and database integration',
  },
  {
    name: 'CI/CD Pipelines',
    description:
      'Building and integrating continuous software delivery for automated testing and deployment',
  },
  {
    name: 'Cloud Infrastructure and Architecture',
    description:
      'Designing scalable, secure cloud environments for applications and services',
  },
  {
    name: 'Docker and Containerization',
    description:
      'Implementing Docker and microservices for consistent development and deployment environments',
  },
  {
    name: 'Mobile Applications',
    description: 'React Native and progressive web applications',
  },
  {
    name: 'Performance Optimization',
    description: 'Improving application speed, usability, and SEO',
  },
  {
    name: 'Accessibility Best Practices',
    description:
      'Ensuring digital products are inclusive and user-friendly for all',
  },
];

const DESIGN_BULLET_POINTS: IAboutBulletPoint[] = [
  {
    name: 'Design Thinking & Strategy',
    description:
      'Applying design thinking principles to solve complex problems and drive innovation',
  },
  {
    name: 'User Interface Design',
    description:
      'Creating intuitive and engaging interfaces that enhance and elevate the user experience',
  },
  {
    name: 'Identity Systems',
    description:
      'Crafting cohesive brand identities that resonate with target audiences',
  },
  {
    name: 'Customer Journey & Empathy Mapping',
    description:
      'Mapping user journeys to understand needs, pain points, and opportunities for improvement',
  },
  {
    name: 'Responsive & Adaptive Design',
    description:
      'Ensuring designs are flexible and accessible across devices and platforms',
  },
  {
    name: 'User-Centric Design',
    description:
      'Designing with empathy, focusing on user needs and emotional responses',
  },
  {
    name: 'Wireframing & Prototyping',
    description:
      'Developing interactive prototypes to visualize and test design concepts',
  },
  {
    name: 'Design Systems & Style Guides',
    description:
      'Building modular design systems for consistency and scalability across products',
  },
];

const SERVICES_EXPORTS = {
  ABOUT_BULLET_POINTS,
  ABOUT_PERCENTAGE_POINTS,
  ABOUT_PROFESSIONAL_SUMMARY,
  BUSINESS_BULLET_POINTS,
  BUSINESS_SUMMARY,
  CONSULTING_BULLET_POINTS,
  CONSULTING_SUMMARY,
  DESIGN_BULLET_POINTS,
  DESIGN_SUMMARY,
  DEVELOPMENT_BULLET_POINTS,
  DEVELOPMENT_SUMMARY,
  EDUCATION_TRAINING_BULLET_POINTS,
  EDUCATION_TRAINING_SUMMARY,
  PERSONAL_TRAINING_BULLET_POINTS,
  PERSONAL_TRAINING_SUMMARY,
  SERVICES_BULLET_POINTS,
  SERVICES_SUMMARY,
};

export default SERVICES_EXPORTS;
