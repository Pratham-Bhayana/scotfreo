import { useState, useEffect, useRef } from 'react';
import { Logo } from '@/assets/logo';

const RotatingLogo = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simply add the animation class for continuous rotation
    if (logoRef.current) {
      logoRef.current.classList.add('animate-rotate');
    }
    
    // Fade in effect
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div 
      ref={logoRef}
      className={`w-full h-full transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      style={{ 
        transformOrigin: 'center',
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    >
      <Logo />
    </div>
  );
};

export default RotatingLogo;
