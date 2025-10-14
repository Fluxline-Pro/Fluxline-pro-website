// White Pages PDF mapping interface
// Note: Data is now consolidated in services/constants.ts
// Use getWhitePagesFromServices() to access white pages data
export interface WhitePageItem {
  id: string;
  title: string;
  description: string;
  pdfPath: string;
  category:
    | 'personal-training'
    | 'design'
    | 'education-training'
    | 'consulting'
    | 'development'
    | 'resonance-core';
  displayName: string;
}
