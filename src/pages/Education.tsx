import React from 'react';
import { useDocumentMeta } from '@/hooks';

const Education: React.FC = () => {
  useDocumentMeta('Education', 'My educational background and qualifications');

  return (
    <div className="section-container">
      <h1 className="section-heading text-center">Education</h1>
      <p className="text-center text-text-secondary">Page content coming soon...</p>
    </div>
  );
};

export default Education;
