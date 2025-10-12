interface IAboutContent {
  title: string;
  description: string;
  image: string;
}

interface IAboutPercentagePoint {
  name: string;
  percentage: number;
  description?: string;
}

interface IAboutBulletPoint {
  name: string;
  description: string;
  route?: string; // Optional route for navigation
  // White pages integration properties
  id?: string;
  title?: string;
  displayName?: string;
  pdfPath?: string;
  category?:
    | 'personal-training'
    | 'design'
    | 'education-training'
    | 'consulting'
    | 'development'
    | 'resonance-core';
}

export type { IAboutContent, IAboutPercentagePoint, IAboutBulletPoint };
