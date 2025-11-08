import React from 'react';
import {
  serviceSupportsHtmlRendering,
  getServiceSummaryClassName,
} from '../utils/serviceUtils';

interface ServiceSummaryRendererProps {
  currentView?: string;
  summary: string | string[];
  fallbackRenderer: (summary: string | string[]) => React.ReactNode;
  className?: string;
}

/**
 * Component to handle service summary rendering with HTML support
 */
export const ServiceSummaryRenderer: React.FC<ServiceSummaryRendererProps> = ({
  currentView,
  summary,
  fallbackRenderer,
  className,
}) => {
  const shouldRenderHtml = serviceSupportsHtmlRendering(currentView);
  const summaryClassName = className || getServiceSummaryClassName(currentView);

  if (shouldRenderHtml && typeof summary === 'string') {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: summary }}
        className={summaryClassName}
      />
    );
  }

  return <>{fallbackRenderer(summary)}</>;
};
