// Legal page item type definition
export type LegalPageType = 
  | 'terms-of-use'
  | 'privacy-policy'
  | 'stewardship-contract'
  | 'glossary'
  | 'articles-of-conversion';

export interface LegalPageItem {
  id: LegalPageType;
  title: string;
  description: string;
  path: string;
  isPdf?: boolean;
}

export const LEGAL_PAGES: LegalPageItem[] = [
  {
    id: 'terms-of-use',
    title: 'Terms of Use',
    description: 'Review the terms and conditions governing your use of the Fluxline.pro website and services.',
    path: '/legal/terms-of-use.md',
    isPdf: false,
  },
  {
    id: 'privacy-policy',
    title: 'Privacy Policy',
    description: 'Learn how we collect, use, and protect your personal information.',
    path: '/legal/privacy-policy.md',
    isPdf: false,
  },
  {
    id: 'stewardship-contract',
    title: 'Stewardship Contract',
    description: 'Explore the foundational principles and commitments that guide our client relationships.',
    path: '/legal/stewardship-contract.md',
    isPdf: false,
  },
  {
    id: 'glossary',
    title: 'Glossary of Terms',
    description: 'Understand key concepts, methodologies, and terminology used throughout Fluxline.',
    path: '/legal/glossary.md',
    isPdf: false,
  },
  {
    id: 'articles-of-conversion',
    title: 'Articles of Conversion',
    description: 'View or download the official Articles of Conversion document (PDF).',
    path: '/legal/articles-of-conversion.pdf',
    isPdf: true,
  },
];
