import React from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, ArrowLeft } from 'lucide-react';
import { useDocumentMeta } from '@/hooks';

const NotFound: React.FC = () => {
  useDocumentMeta('404 - Page Not Found');

  return (
    <div className="min-h-screen flex items-center justify-center gradient-orb-bg">
      <div className="text-center px-4">
        <h1 className="text-9xl font-heading font-bold gradient-text mb-4">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-4">
          Page Not Found
        </h2>
        <p className="text-text-secondary text-lg mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="btn-primary inline-flex items-center">
            <HomeIcon className="mr-2" size={20} />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-outline inline-flex items-center"
          >
            <ArrowLeft className="mr-2" size={20} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
