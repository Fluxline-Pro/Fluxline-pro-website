// Service utility functions to reduce code duplication

/**
 * Maps currentView to the corresponding service identifier
 */
export const getServiceFromView = (currentView?: string): string => {
  const serviceMap: Record<string, string> = {
    'personal-training': 'personal-training',
    development: 'development',
    'resonance-core': 'resonance-core',
    'education-training': 'education-training',
    consulting: 'consulting',
    design: 'design',
  };

  return serviceMap[currentView || ''] || 'design';
};

/**
 * Services that have program tiers functionality
 */
export const SERVICES_WITH_TIERS = [
  'personal-training',
  'design',
  'development',
  'resonance-core',
  'education-training',
  'consulting',
] as const;

/**
 * Services that support HTML rendering in summaries
 */
export const SERVICES_WITH_HTML_RENDERING = [
  'personal-training',
  'design',
  'development',
  'resonance-core',
  'education-training',
  'consulting',
] as const;

/**
 * Check if a service has program tiers
 */
export const serviceHasTiers = (currentView?: string): boolean => {
  return currentView ? SERVICES_WITH_TIERS.includes(currentView as any) : false;
};

/**
 * Check if a service supports HTML rendering
 */
export const serviceSupportsHtmlRendering = (currentView?: string): boolean => {
  return currentView
    ? SERVICES_WITH_HTML_RENDERING.includes(currentView as any)
    : false;
};

/**
 * Get CSS class name for service summary
 */
export const getServiceSummaryClassName = (currentView?: string): string => {
  const classMap: Record<string, string> = {
    'personal-training': 'personal-training-summary',
    design: 'design-summary',
    development: 'development-summary',
    'resonance-core': 'resonance-core-summary',
    'education-training': 'education-training-summary',
    consulting: 'consulting-summary',
  };

  return classMap[currentView || ''] || 'default-summary';
};

/**
 * Get descriptive text for program tiers section
 */
export const getProgramTiersDescription = (currentView?: string): string => {
  const descriptions: Record<string, string> = {
    'personal-training':
      'Choose your path based on your archetype assessment and personal goals.',
    'resonance-core':
      'Choose your phase based on your emotional readiness and sovereignty integration goals.',
    'education-training':
      'Choose your learning path based on your team size and organizational development needs.',
    consulting:
      'Choose your strategic phase based on your business maturity and transformation goals.',
  };

  return (
    descriptions[currentView || ''] ||
    "Choose the tier that aligns with your brand's current phase, archetype, and unfolding vision."
  );
};
