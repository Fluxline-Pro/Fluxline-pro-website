import React from 'react';
import { UnifiedContentPage } from '../unified-content-page/unified-content-page';

interface ContactPageProps {
  contentType?: 'contact-me';
}

export const ContactPage: React.FC<ContactPageProps> = ({
  contentType = 'contact-me',
}) => {
  return <UnifiedContentPage contentType={contentType} />;
};

export default ContactPage;
