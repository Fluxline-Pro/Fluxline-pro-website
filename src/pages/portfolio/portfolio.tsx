import React from 'react';
import { UnifiedContentPage } from '../unified-content-page/unified-content-page';

interface PortfolioProps {
  contentType?: 'portfolio' | 'my-content';
}

export const Portfolio: React.FC<PortfolioProps> = ({
  contentType = 'portfolio',
}) => {
  return <UnifiedContentPage contentType={contentType as any} />;
};

export default Portfolio;
