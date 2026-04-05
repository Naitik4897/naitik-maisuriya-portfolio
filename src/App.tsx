import { Suspense, lazy, useEffect, useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';
import WhatsAppButton from './components/WhatsAppButton';
import { AnimatedBackground, CursorEffect } from './components/effects';
import { useIsMobile } from './hooks';

// Single Page Portfolio
const SinglePagePortfolio = lazy(() => import('./pages/SinglePagePortfolio'));

function App() {
  const isMobileOrTablet = useIsMobile(1024);
  const [isTouchInput, setIsTouchInput] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: none), (pointer: coarse)').matches;
  });

  useEffect(() => {
    const touchQuery = window.matchMedia('(hover: none), (pointer: coarse)');

    const updateTouchInput = () => {
      setIsTouchInput(touchQuery.matches);
    };

    updateTouchInput();
    touchQuery.addEventListener('change', updateTouchInput);

    return () => {
      touchQuery.removeEventListener('change', updateTouchInput);
    };
  }, []);

  const disableCustomCursor = isMobileOrTablet || isTouchInput;

  return (
    <div className="min-h-screen bg-background text-text-primary relative overflow-x-hidden">
      {/* Animated Background - always visible */}
      <AnimatedBackground 
        particleCount={isMobileOrTablet ? 25 : 50}
        enableGrid={true}
        enableParticles={true}
        enableGradientOrbs={true}
      />
      
      {/* Custom Cursor - disabled on mobile and tablet */}
      {!disableCustomCursor && <CursorEffect enabled={true} />}
      
      <Navbar />
      
      <main className="relative z-10">
        <Suspense fallback={<LoadingSpinner />}>
          <SinglePagePortfolio />
        </Suspense>
      </main>
      
      <Footer />
      
      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}

export default App;
