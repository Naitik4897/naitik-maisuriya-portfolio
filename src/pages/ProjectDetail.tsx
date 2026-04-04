import React from 'react';
import { useParams } from 'react-router-dom';
import { useDocumentMeta } from '@/hooks';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  useDocumentMeta(`Project: ${slug}`, 'View project details');

  return (
    <div className="section-container">
      <h1 className="section-heading text-center">Project: {slug}</h1>
      <p className="text-center text-text-secondary">Page content coming soon...</p>
    </div>
  );
};

export default ProjectDetail;
