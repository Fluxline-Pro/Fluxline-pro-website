import { IAboutPercentagePoint, IAboutBulletPoint } from './services.types';

const FLUXLINE_TAGLINE =
  "We're not done yet— \nbut we're already extraordinary.";
const FLUXLINE_SECONDARY_TAGLINE = 'Modular by design. Resonant by nature.';

const ABOUT_PROFESSIONAL_SUMMARY = [
  `<strong>Fluxline</strong> architects transformative systems, brand experiences, and human-centered technology—blending <em>emotional intelligence</em>, <em>financial clarity</em>, and <em>somatic discipline</em>. We specialize in <em>modular web development</em>, <em>scalable design ecosystems</em>, and <em>strategic innovation</em> that evolves with you.<br /><br />

<strong>Whether you're an individual seeking personal growth or a business ready to scale with purpose,</strong>
our <em>coaching</em>, <em>wellness programs</em>, and <em>infrastructure design</em> help you align your <strong>drive</strong> with your <em>innate identity</em>. We believe transformation isn’t just about metrics—it’s about honoring <em>emotional rhythm</em>, <em>creative truth</em>, and <em>legacy resonance</em>.<br /><br />

<strong>Fluxline</strong> builds <em>systems that breathe</em>, <em>brands that feel</em>, and <em>legacies that last</em>.<br />
Let’s make your vision real—through <strong>ritual</strong>, <strong>resonance</strong>, and <strong>iteration</strong>.`,
];

const FLUXLINE_MISSION_VISION = [
  'We seek to architect multidimensional systems that fuse <em>emotional intelligence</em>, <em>financial clarity</em>, and <em>somatic discipline</em>—empowering individuals and brands to live with <strong>modular precision</strong> and <strong>legacy-driven resonance</strong>.',
  'Fluxline envisions a world where individuals and businesses become <em>self-authored stewards</em> of their inner and outer architecture—where identity is revealed through <strong>ritual</strong>, <strong>resonance</strong>, and <strong>iteration</strong>.<br /><br />We believe dashboards should track not just dollars and reps, but <em>moments of truth</em>, <em>creativity</em>, and <em>emotional shift</em>. We see businesses as living organisms shaped by values, not just value. We see monthly plans as mirrors, and relationships as sacred protocols of presence.<br /><br />Through these lenses of <em>identity</em>, <em>resonance</em>, and <em>spirality</em>, Fluxline guides people and brands to design lives and legacies that echo beyond the present moment—while anchoring the now with <strong>clarity</strong>, <strong>drive</strong>, and <strong>emotional sovereignty</strong>.',
];

const FLUXLINE_ETHOS = [
  'Fluxline is a system of intentional architecture—financial, physical, emotional, and relational—designed to cultivate legacy through modular stewardship. It is not just a brand; it is a behavioral mirror, a container for aligned action, and a ritual of becoming. Every protocol, dashboard, and ledger serves as a bridge between inner awareness and outer expression.',
  "Our core pillars include: Modularity—systems flex and scale to meet life's evolving cadence; Stewardship—every resource is held with reverence and responsibility; Integration—emotional resonance is embedded in every metric and model; Integrity—structures align with ethos, not ego; and Legacy—every system is designed to echo beyond the present moment.",
];

const SERVICES_SUMMARY =
  'Fluxline offers strategic, emotionally intelligent, and design-forward solutions for founders, creatives, and organizations seeking transformation. Every service is a curriculum gate—crafted to align your identity, systems, and mission with intentionality and resonance.';

const EDUCATION_TRAINING_SUMMARY =
  'Transformational coaching, founder mentorship, and emotionally intelligent team leadership for those who build with purpose.';

const PERSONAL_TRAINING_SUMMARY =
  "<strong>Training is not just physical—it's emotional, symbolic, and sovereign.</strong> At Fluxline, we specialize in modular coaching systems that adapt to your goals, limitations, and breakthroughs. Whether you're returning to movement, navigating chronic pain, or refining your edge, we design your path with precision and care.<br /><br />Before choosing a program, we invite you to take the <strong>Fluxline Archetype Quiz</strong> in the header above—a brief emotional mapping tool that helps identify your training style, motivational patterns, and ideal coaching rhythm. <br /><br />Your results help guide us in selecting the right program tier, coaching cadence, and onboarding rituals. Every offering is tailored to your body, schedule, and emotional readiness.<br /><br />We work with all bodies, all backgrounds, and all thresholds. This is not just fitness—<strong><em>it's felt transformation</em></strong>.";

const RESONANCE_CORE_SUMMARY =
  'Guiding individuals through transformative life coaching and personal development using the Resonance Core methodology.';

const CONSULTING_SUMMARY =
  'Strategic business alignment, systems architecture, and technology integration to help small to medium businesses and entrepreneurs build their most effective and authentic selves.';

const DEVELOPMENT_SUMMARY =
  'Crafting full-stack digital products using modern technologies—with an emphasis on modularity, usability, and long-term maintainability.';

const DESIGN_SUMMARY =
  'End-to-end brand architecture and emotionally intelligent UI/UX design that reflects your evolution and resonates.';

const ABOUT_BULLET_POINTS: IAboutBulletPoint[] = [
  {
    name: 'Creative & Modular Thinker',
    description:
      'We architect transformative brands, systems, and digital experiences that scale with your vision—fusing creative storytelling with technical precision to build frameworks that evolve, not restrict.',
  },
  {
    name: 'Results with Resonance',
    description:
      'Every project delivers measurable outcomes and emotional impact. We create solutions that drive business growth while building authentic connections between you and your audience.',
  },
  {
    name: 'Human-Centered Approach',
    description:
      'We prioritize empathy, collaboration, belonging, and intentional communication—designing every interaction around how people actually think, feel, and make decisions.',
  },
  {
    name: 'Technologically Curious',
    description:
      'We integrate emerging trends in design, AI, and backend architecture to fuel innovation and unlock new possibilities.',
  },
  {
    name: 'Intentional Learner',
    description:
      'Our process is iterative and expansive—driven by a commitment to growth, clarity, and adaptive evolution.',
  },
  {
    name: 'Detail-crafted',
    description:
      'Every element is designed with clarity and care, from backend logic to frontend flow to the emotional cadence of copy.',
  },
  {
    name: 'Problem alchemist',
    description:
      'We synthesize complexity into elegance—translating tangled systems into streamlined, actionable solutions.',
  },
  {
    name: 'Proactive strategist',
    description:
      'We don’t wait for clarity--we design it. We move early, test intelligently, and pivot with intention.',
  },
];

// never 100% because there's always more to learn
const ABOUT_PERCENTAGE_POINTS: IAboutPercentagePoint[] = [
  // Technical Skills
  {
    name: 'design thinking',
    percentage: 99,
  },
  {
    name: 'figma prototyping',
    percentage: 99,
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
    name: 'Agile methodology & Scrum',
    percentage: 98,
  },
  {
    name: 'project management',
    percentage: 98,
  },
  {
    name: 'technology consulting',
    percentage: 98,
  },
  {
    name: 'cloud & hybrid solutions',
    percentage: 97,
  },
  {
    name: 'team leadership',
    percentage: 96,
  },
  {
    name: 'systems architecture',
    percentage: 95,
  },
  {
    name: 'backend development',
    percentage: 94,
  },
  {
    name: 'AI integration',
    percentage: 94,
  },
  {
    name: 'QA & automation',
    percentage: 92,
  },
  {
    name: 'motion design',
    percentage: 89,
  },
  // Guiding Principles
  {
    name: 'intelligence',
    percentage: 99,
  },
  {
    name: 'drive',
    percentage: 99,
  },
  {
    name: 'empathy',
    percentage: 99,
  },
  { name: 'integrity', percentage: 99 },
  {
    name: 'inclusivity',
    percentage: 99,
  },
  {
    name: 'creativity',
    percentage: 98,
  },
  {
    name: 'influence',
    percentage: 98,
  },
  {
    name: 'love',
    percentage: 98,
  },
  {
    name: 'stillness',
    percentage: 98,
  },
  {
    name: 'courage',
    percentage: 97,
  },
  { name: 'authenticity', percentage: 97 },
  {
    name: 'curiosity',
    percentage: 96,
  },
];

// Services-specific data with white pages integration
const SERVICES_BULLET_POINTS: IAboutBulletPoint[] = [
  {
    name: 'Personal Training & Wellness',
    description:
      'Modular coaching for founders and creatives. Align body, breath, and mission through movement, mindset, and emotional integration.',
    route: '/services/personal-training',
    // White pages integration
    id: 'personal-training',
    title: 'Personal Training & Wellness',
    displayName: 'Personal Training',
    pdfPath: require('../../assets/white-pages/Fluxline-Personal-Training.pdf'),
    category: 'personal-training' as const,
  },
  {
    name: 'Brand Identity & Experience Design',
    description:
      'End-to-end brand architecture and emotionally intelligent design that reflects your evolution and resonates with your audience.',
    route: '/services/design',
    // White pages integration
    id: 'graphic-design',
    title: 'Brand Identity & Experience Design',
    displayName: 'Graphic Design',
    pdfPath: require('../../assets/white-pages/Fluxline-Graphic-Design.pdf'),
    category: 'design' as const,
  },
  {
    name: 'Web & Application Development',
    description:
      'Full-stack digital products built with modular clarity, intuitive UX, sophisticated infrastructure and long-term maintainability.',
    route: '/services/development',
    // White pages integration
    id: 'development',
    title: 'Web & Application Development',
    displayName: 'App & Web Development',
    pdfPath: require('../../assets/white-pages/Fluxline-App-and-Web-Development.pdf'),
    category: 'development' as const,
  },
  {
    name: 'business strategy & systems alignment',
    description:
      'Strategic alignment, mission development, and tech integration for purpose-driven growth and operational sovereignty.',
    route: '/services/consulting',
    // White pages integration
    id: 'consulting',
    title: 'Business Strategy & Systems Alignment',
    displayName: 'Business Strategy Consulting',
    pdfPath: require('../../assets/white-pages/Fluxline-Business-IT-Consulting.pdf'),
    category: 'consulting' as const,
  },
  {
    name: 'Coaching, Education & Leadership',
    description:
      'Transformational coaching and emotionally intelligent leadership for founders and teams building with purpose.',
    route: '/services/education-training',
    // White pages integration
    id: 'education-training',
    title: 'Coaching, Education & Leadership',
    displayName: 'Education & Mentoring',
    pdfPath: require('../../assets/white-pages/Fluxline-Education-Mentoring.pdf'),
    category: 'education-training' as const,
  },
  {
    name: 'Life Coaching & The Resonance Core',
    description:
      'Personal development through the Resonance Core Framework™—guiding individuals through emotional sovereignty and mythic integration.',
    route: '/services/resonance-core',
    // White pages integration
    id: 'resonance-core',
    title: 'Life Coaching & The Resonance Core',
    displayName: 'Life Coaching & Resonance Core',
    pdfPath: require('../../assets/white-pages/Fluxline-Life-Coaching-Resonance-Core.pdf'),
    category: 'resonance-core' as const,
  },
];

// Helper function to convert services to white pages format
export const getWhitePagesFromServices = () => {
  return SERVICES_BULLET_POINTS.filter(
    (service) => service.id && service.pdfPath
  ).map((service) => ({
    id: service.id!,
    title: service.title!,
    displayName: service.displayName!,
    description: service.description,
    pdfPath: service.pdfPath!,
    category: service.category!,
  }));
};

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
    name: 'Custom Fitness Plans',
    description:
      'Training blueprints tailored to your goals, archetype, and physical thresholds',
  },
  {
    name: '1-on-1 Coaching',
    description:
      'In-person, online, or hybrid sessions with hands-on cueing and emotional integration',
  },
  {
    name: 'Strength & Mobility Training',
    description:
      'Programs designed to build power, resilience, and sovereign embodiment',
  },
  {
    name: 'Nutrition Guidance',
    description:
      'Meal plans, metabolic mapping, and fasting protocols for full-spectrum vitality',
  },
  {
    name: 'Mindset Support',
    description:
      'Breakthrough coaching to align movement with motivation, rhythm, and resilience',
  },
  {
    name: 'Whole-Person Wellness',
    description:
      'Training that integrates physical, emotional, and energetic alignment',
  },
  {
    name: 'Flexible Training Formats',
    description:
      'Online and hybrid options to match your lifestyle, location, and readiness tier',
  },
];

const RESONANCE_CORE_BULLET_POINTS: IAboutBulletPoint[] = [
  {
    name: '1:1 Coaching Sessions',
    description:
      'Personalized guidance through emotional emergence, clarity rituals, and breakthrough mapping',
  },
  {
    name: 'Curriculum-Based Modules',
    description:
      'Structured phases of transformation, each with symbolic tools and emotional pacing',
  },
  {
    name: 'Breakthrough Documentation',
    description: 'Turning insights into templates, rituals, and legacy assets',
  },
  {
    name: 'Shadow & Resonance Work',
    description:
      'Reframing limiting beliefs, integrating emotional contrast, and activating core values',
  },
  {
    name: 'Sovereignty Practices',
    description:
      'Daily rituals for individual clarity, boundaries, and personal alignment',
  },
  {
    name: 'Digital Library & Emotional Scoring',
    description:
      'Personalized framework to understand your DRIVEs, resonances, and role in life, society, and community',
  },
];

const CONSULTING_BULLET_POINTS: IAboutBulletPoint[] = [
  {
    name: 'Business Identity & Purpose Development',
    description:
      'Defining your core mission, vision, and values to create authentic business alignment',
  },
  {
    name: 'Strategic Business Planning',
    description:
      'Developing comprehensive business strategies that align with your purpose and goals',
  },
  {
    name: 'Systems Architecture & Integration',
    description:
      'Designing scalable technology solutions that support your business objectives',
  },
  {
    name: 'Operational Efficiency Optimization',
    description:
      'Streamlining processes and workflows to maximize productivity and growth',
  },
  {
    name: 'Technology Stack Assessment',
    description:
      'Evaluating and optimizing your current technology to align with business goals',
  },
  {
    name: 'Team Development & Leadership',
    description:
      'Building effective teams and leadership structures through proven methodologies',
  },
  {
    name: 'Digital Transformation Strategy',
    description:
      'Guiding businesses through purposeful digital evolution and innovation',
  },
  {
    name: 'Business Growth & Scaling',
    description:
      'Creating sustainable growth strategies for small to medium businesses and entrepreneurs',
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

// Styling constants moved from services.tsx
const SERVICES_STYLES = {
  sectionContainer: (
    orientation?: string,
    layoutPreference?: string,
    view?: string,
    includesArrow?: boolean
  ) => {
    // Define main page titles that should get special left-handed spacing
    const mainTitles = [
      'Business Strategy & Systems Alignment',
      'Brand Identity & Experience Design',
      'Life Coaching & The Resonance Core',
      'Personal Training & Wellness',
      'Coaching, Education & Leadership',
      'Web & Application Development',
    ];

    return {
      margin:
        includesArrow && orientation !== 'mobile-landscape'
          ? '0 auto'
          : orientation === 'mobile-landscape'
            ? layoutPreference === 'left-handed' &&
              view &&
              mainTitles.includes(view)
              ? '0 0 0 14rem'
              : '0 auto 0 1rem'
            : '0 auto',
      marginBottom: orientation === 'mobile-landscape' ? '0rem' : '1.5rem',
      maxWidth:
        orientation === 'mobile-landscape' && view && mainTitles.includes(view)
          ? '400px'
          : '900px',
    };
  },
  sectionBox: (theme: any) => ({
    background:
      theme.themeMode === 'high-contrast'
        ? theme.semanticColors.warningBackground
        : theme.palette.neutralLight,
    padding: '2rem',
    borderRadius: '4px',
    marginBottom: '4rem',
  }),
  textContent: {
    textAlign: 'left' as const,
    maxWidth: '800px',
    margin: '0 auto',
  },
  gridContainer: (isMobile: boolean, columns?: number | string) => ({
    display: 'grid',
    gap: '1.5rem',
    gridTemplateColumns:
      typeof columns === 'string'
        ? columns
        : isMobile
          ? '1fr 1fr'
          : `repeat(auto-fit, minmax(${columns ? 900 / columns : 130}px, 1fr))`,
    alignItems: 'start',
    justifyItems: 'stretch',
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
  }),
  h2Title: (theme: any, orientation?: string) => ({
    color: theme.palette.themePrimary,
    margin: orientation === 'mobile-landscape' ? '0.5rem 0' : '1rem 0 0.5rem 0',
    fontSize:
      orientation === 'mobile-landscape'
        ? theme.typography.fontSizes.clamp6 // Reduced from clamp7 to clamp6 for mobile-landscape
        : theme.typography.fontSizes.clamp7,
    maxWidth: orientation === 'mobile-landscape' ? '400px' : 'none',
    fontFamily: theme.typography.fonts.h2.fontFamily,
    fontWeight: theme.typography.fonts.h2.fontWeight,
    fontVariationSettings: theme.typography.fonts.h2.fontVariationSettings,
    textTransform: theme.typography.fonts.h2.textTransform,
    letterSpacing: theme.typography.fonts.h2.letterSpacing,
    lineHeight: theme.typography.fonts.h2.lineHeight,
  }),
  hrStyles: (theme: any) => ({
    margin: '2rem 0',
    border: 'none',
    height: '1px',
    backgroundColor: theme.palette.themePrimary,
    opacity: 0.3,
  }),
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
  },
  tableHeader: (
    theme: any,
    options?: {
      background?: string;
      borderRadius?: string;
      textAlign?: string;
      position?: string;
      left?: number;
    }
  ) => ({
    background: options?.background || theme.palette.themeSecondary,
    color: theme.palette.white,
    padding: '1rem',
    fontSize: '1.1rem',
    fontFamily: theme.typography.fonts.h3.fontFamily,
    textAlign: (options?.textAlign as any) || 'left',
    fontWeight: 'bold',
    borderRadius: options?.borderRadius || '0',
    position: options?.position as any,
    left: options?.left,
    verticalAlign: 'middle',
  }),
  tableRow: (theme: any, index: number) => ({
    background:
      theme.themeMode === 'dark' || theme.themeMode === 'high-contrast'
        ? index % 2 === 0
          ? theme.palette.neutralQuaternaryAlt
          : theme.palette.neutralDark
        : index % 2 === 0
          ? 'rgba(0, 0, 0, 0.01)'
          : 'rgba(0, 0, 0, 0.03)',
  }),
  tableCell: (
    theme: any,
    options?: {
      textAlign?: string;
      fontWeight?: string;
      color?: string;
      position?: string;
      left?: number;
      background?: string;
      fontSize?: string;
    }
  ) => {
    const styles: any = {
      fontFamily: theme.typography.fonts.body.fontFamily,
      padding: '1rem',
      borderBottom: `1px solid ${
        theme.themeMode === 'dark'
          ? theme.palette.neutralTertiary
          : theme.palette.neutralTertiaryAlt
      }`,
      textAlign: (options?.textAlign as any) || 'left',
      fontWeight: options?.fontWeight || 'normal',
      maxWidth: '300px',
      color:
        options?.color ||
        (theme.themeMode === 'dark'
          ? theme.palette.white
          : theme.themeMode === 'high-contrast'
            ? theme.semanticColors.bodyText
            : theme.palette.neutralPrimary),
      fontSize: options?.fontSize || '1rem',
      verticalAlign: 'middle',
    };

    // Only add position and left if specified
    if (options?.position) {
      styles.position = options.position;
    }
    if (options?.left !== undefined) {
      styles.left = options.left;
    }
    // Only add background if explicitly specified
    if (options?.background !== undefined) {
      styles.background = options.background;
    }

    return styles;
  },
};

// Program tiers data moved from services.tsx
const PROGRAM_TIERS = [
  {
    tier: 'Single Session',
    idealFor:
      'Clients needing simplified instruction, unsure about performing exercises, not wanting to commit to a monthly cadence',
    rate: '$110/session',
  },
  {
    tier: 'Online PT Only',
    idealFor: 'Remote clients, creatives seeking flexible support',
    rate: 'Starting at $225/month',
    note: '(Varies by term length)',
  },
  {
    tier: 'Hybrid PT',
    idealFor: 'Local clients seeking in-person sessions + remote structure',
    rate: 'Starting at $350/month',
    note: '(Varies by term length)',
  },
  {
    tier: 'Online Hypertrophy',
    idealFor:
      'Remote clients focused on physique, nutrition, and metabolic coaching',
    rate: 'Starting at $275/month',
    note: '(Varies by term length)',
  },
  {
    tier: 'Hybrid Hypertrophy',
    idealFor:
      'Full-spectrum transformation: movement, nutrition, emotional integration',
    rate: 'Starting at $450/month',
    note: '(Varies by term length)',
  },
];

// Features comparison data moved from services.tsx
const PROGRAM_FEATURES = [
  {
    feature: 'Custom Training Plan',
    onlinePT: '✅',
    hybridPT: '✅',
    onlineHypertrophy: '✅',
    hybridHypertrophy: '✅',
  },
  {
    feature: 'Biweekly Check-Ins',
    onlinePT: '✅',
    hybridPT: '✅',
    onlineHypertrophy: '✅',
    hybridHypertrophy: '✅',
  },
  {
    feature: 'Discord Access',
    onlinePT: '✅',
    hybridPT: '✅',
    onlineHypertrophy: '✅',
    hybridHypertrophy: '✅',
  },
  {
    feature: 'Milestone Reviews',
    onlinePT: '✅',
    hybridPT: '✅',
    onlineHypertrophy: '✅',
    hybridHypertrophy: '✅',
  },
  {
    feature: 'Emotional Integration Coaching',
    onlinePT: '✅',
    hybridPT: '✅',
    onlineHypertrophy: '✅',
    hybridHypertrophy: '✅',
  },
  {
    feature: 'PTDistinction Portal Access',
    onlinePT: '✅',
    hybridPT: '✅',
    onlineHypertrophy: '✅',
    hybridHypertrophy: '✅',
  },
  {
    feature: 'First 2 Sessions Free',
    onlinePT: '✅',
    hybridPT: '✅',
    onlineHypertrophy: '✅',
    hybridHypertrophy: '✅',
  },
  {
    feature: 'Cancel Anytime (First 2 Sessions)',
    onlinePT: '✅',
    hybridPT: '✅',
    onlineHypertrophy: '✅',
    hybridHypertrophy: '✅',
  },
  {
    feature: 'In-Person Training Sessions',
    onlinePT: '❌',
    hybridPT: '✅',
    onlineHypertrophy: '❌',
    hybridHypertrophy: '✅',
  },
  {
    feature: 'Hands-On Form Correction',
    onlinePT: '❌',
    hybridPT: '✅',
    onlineHypertrophy: '❌',
    hybridHypertrophy: '✅',
  },
  {
    feature: 'On-Site Meditation & Breathwork',
    onlinePT: '❌',
    hybridPT: '✅',
    onlineHypertrophy: '❌',
    hybridHypertrophy: '✅',
  },
  {
    feature: 'Real-Time Cueing & Adjustments',
    onlinePT: '❌',
    hybridPT: '✅',
    onlineHypertrophy: '❌',
    hybridHypertrophy: '✅',
  },
  {
    feature: 'Local Access (Salt Lake & Davis Counties)',
    onlinePT: '❌',
    hybridPT: '✅',
    onlineHypertrophy: '❌',
    hybridHypertrophy: '✅',
  },
  {
    feature: 'Nutrition Coaching',
    onlinePT: '🟡- Basic, advanced coaching available as add-on',
    hybridPT: '🟡- Basic, advanced coaching available as add-on',
    onlineHypertrophy: '✅',
    hybridHypertrophy: '✅',
  },
  {
    feature: 'Recipes & Meal Plans',
    onlinePT: '🟡- Basic through Discord Server',
    hybridPT: '🟡- Basic through Discord Server',
    onlineHypertrophy: '✅',
    hybridHypertrophy: '✅',
  },
  {
    feature: 'Cycle Tracking / Fasting Protocols',
    onlinePT: '❌',
    hybridPT: '❌',
    onlineHypertrophy: '✅',
    hybridHypertrophy: '✅',
  },
  {
    feature: 'Metabolic Phase Mapping',
    onlinePT: '❌',
    hybridPT: '❌',
    onlineHypertrophy: '✅',
    hybridHypertrophy: '✅',
  },
  {
    feature: 'Muscle-building Specific Programming',
    onlinePT: '❌',
    hybridPT: '❌',
    onlineHypertrophy: '✅',
    hybridHypertrophy: '✅',
  },
  {
    feature: 'Progressive Overload Tracking',
    onlinePT: '❌',
    hybridPT: '❌',
    onlineHypertrophy: '✅',
    hybridHypertrophy: '✅',
  },
  {
    feature: 'Physique Optimization Strategy',
    onlinePT: '❌',
    hybridPT: '🟡- Basic movement fixes for body sculpting offered',
    onlineHypertrophy: '✅',
    hybridHypertrophy: '✅',
  },
  {
    feature: 'Supplemental Recovery Rituals',
    onlinePT: '❌',
    hybridPT: '❌',
    onlineHypertrophy: '✅',
    hybridHypertrophy: '✅',
  },
  {
    feature: 'Hormonal Phase Integration',
    onlinePT: '❌',
    hybridPT: '❌',
    onlineHypertrophy: '✅',
    hybridHypertrophy: '✅',
  },
];

// Helper functions for hero content
const getHeroContent = (currentView: string) => {
  switch (currentView) {
    case 'personal-training':
      return {
        title: 'Personal Training & Wellness',
        subtitle:
          'Modular training for founders and creatives. Align your body, mind, and mission through intentional movement and emotional integration.',
        cta: 'Book a consultation',
      };
    case 'consulting':
      return {
        title: 'Business Strategy & Systems Alignment',
        subtitle:
          'Strategic frameworks for sustainable growth. Transform complexity into clarity through systematic business design.',
        cta: 'Start a project',
      };
    case 'education-training':
      return {
        title: 'Coaching, Education & Leadership',
        subtitle:
          'Leadership development through experiential learning. Build authentic influence and transformational coaching skills.',
        cta: 'Explore programs',
      };
    case 'resonance-core':
      return {
        title: 'Life Coaching & The Resonance Core',
        subtitle:
          'Deep personal transformation through archetypal integration. Align your inner world with your outer mission.',
        cta: 'Begin your journey',
      };
    case 'development':
      return {
        title: 'Web & Application Development',
        subtitle:
          'Digital solutions that embody your vision. Clean, purposeful technology that serves your mission.',
        cta: 'Discuss your project',
      };
    case 'design':
      return {
        title: 'Brand Identity & Experience Design',
        subtitle:
          'Visual identity that resonates with purpose. Create meaningful connections through intentional design.',
        cta: 'Create together',
      };
    default:
      return {
        title: 'Our Services',
        subtitle:
          'Comprehensive solutions for conscious leaders and innovative organizations.',
        cta: 'Explore services',
      };
  }
};

// Helper function for service names
const getServiceName = (currentView: string) => {
  switch (currentView) {
    case 'personal-training':
      return 'Personal Training & Wellness';
    case 'education-training':
      return 'Coaching, Education & Leadership';
    case 'consulting':
      return 'Business Strategy & Systems Alignment';
    case 'resonance-core':
      return 'Life Coaching & The Resonance Core';
    case 'development':
      return 'Web & Application Development';
    case 'design':
      return 'Brand Identity & Experience Design';
    default:
      return 'service';
  }
};

const SERVICES_EXPORTS = {
  ABOUT_BULLET_POINTS,
  ABOUT_PERCENTAGE_POINTS,
  ABOUT_PROFESSIONAL_SUMMARY,
  RESONANCE_CORE_BULLET_POINTS,
  RESONANCE_CORE_SUMMARY,
  CONSULTING_BULLET_POINTS,
  CONSULTING_SUMMARY,
  DESIGN_BULLET_POINTS,
  DESIGN_SUMMARY,
  DEVELOPMENT_BULLET_POINTS,
  DEVELOPMENT_SUMMARY,
  EDUCATION_TRAINING_BULLET_POINTS,
  EDUCATION_TRAINING_SUMMARY,
  FLUXLINE_ETHOS,
  FLUXLINE_MISSION_VISION,
  FLUXLINE_TAGLINE,
  FLUXLINE_SECONDARY_TAGLINE,
  PERSONAL_TRAINING_BULLET_POINTS,
  PERSONAL_TRAINING_SUMMARY,
  SERVICES_BULLET_POINTS,
  SERVICES_SUMMARY,
  // White pages helper
  getWhitePagesFromServices,
  // New consolidated constants
  SERVICES_STYLES,
  PROGRAM_TIERS,
  PROGRAM_FEATURES,
  getHeroContent,
  getServiceName,
};

export default SERVICES_EXPORTS;
