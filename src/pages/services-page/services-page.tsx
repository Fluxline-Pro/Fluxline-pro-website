import React from 'react';
import { UnifiedContentPage } from '../unified-content-page/unified-content-page';

interface ServicesPageProps {
  contentType?:
    | 'about'
    | 'services'
    | 'architecture'
    | 'personal-training'
    | 'education-training'
    | 'consulting'
    | 'resonance-core'
    | 'development'
    | 'design';
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  contentType = 'services',
}) => {
  return <UnifiedContentPage contentType={contentType} />;
};

export default ServicesPage;
