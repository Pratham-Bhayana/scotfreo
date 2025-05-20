import { useEffect, useRef, useState } from 'react';
import RotatingLogo from './RotatingLogo';
import logoImage from '../assets/scotfreo.jpg'; // adjust path if needed
import heroVideo from '../assets/SCOTFREO1.mp4';
import { cn } from '@/lib/utils';
import bgImage from '@assets/bg.webp';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    if (titleRef.current) {
      setTimeout(() => {
        titleRef.current?.classList.add('animate-slideUp');
      }, 600);
    }

    if (subtitleRef.current) {
      setTimeout(() => {
        subtitleRef.current?.classList.add('animate-fadeIn');
      }, 900);
    }

    if (footerRef.current) {
      setTimeout(() => {
        footerRef.current?.classList.add('animate-fadeIn');
      }, 1200);
    }

    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const yPos = -(scrollY * 0.2);
        heroRef.current.style.backgroundPosition = `center ${yPos}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className={`min-h-screen flex flex-col justify-center items-center relative overflow-hidden snap-section transition-opacity duration-700 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ backgroundColor: '#0f0f0f' }}

    >
      {/* Video wrapper to center the video */}
      <div className="video-wrapper absolute inset-0 flex justify-center items-center z-0 overflow-hidden w-100%">
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          // controls // optional for debug
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

       <div className="absolute top-6 left-6 z-10 flex items-center space-x-3">
        <img
          src={logoImage}
          alt="Scotfreo Logo"
          className="w-full h-10 round-full object-contain"
        />
        <span className="text-white font-semibold text-xl tracking-wide"></span>
      </div>


      {/* Animated top glow */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#D4AF37]/10 to-transparent opacity-40"></div>

      {/* Rotating Logo */}
      {/* <div className="mb-10 w-32 h-32 md:w-44 md:h-44 z-10 relative">
        <RotatingLogo />
      </div> */}

      {/* Main title */}
      {/* <h1
        ref={titleRef}
        className={cn(
          'text-5xl sm:text-6xl md:text-7xl font-bold tracking-wider mb-3 z-10 gold-gradient-text opacity-0 text-center'
        )}
      >
        SCOTFREO
      </h1> */}

      <div className="mb-10"></div>

      {/* Hero footer */}
      <div
        ref={footerRef}
        className="absolute bottom-12 w-full px-6 md:px-12 flex justify-between items-center z-10 opacity-0"
      >
        <div className="flex space-x-5">
          <a
            href="https://x.com/scotfreo1?t=7KBTLCXjfUXWCQPUgUzrlQ&s=09"
            className="text-xl text-[#D4AF37] hover:text-[#FFC832] transition-colors"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://www.instagram.com/scotfreo?igsh=MWp3eXdnbHZpM2tqMA=="
            className="text-xl text-[#D4AF37] hover:text-[#FFC832] transition-colors"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        onClick={handleScrollDown}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer"
      >
        <div className="flex flex-col items-center animate-pulse-subtle">
          <span className="text-sm text-[#D4AF37] mb-2 opacity-80">EXPLORE</span>
          <i className="fas fa-chevron-down text-[#D4AF37]"></i>
        </div>
      </div>

      {/* Mobile touch overlay */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 z-5 md:hidden"
        onClick={handleScrollDown}
      ></div>

      {/* Inline styles for video centering and sizing */}
      <style>{`
        .video-wrapper {
        background-color:black;
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          z-index: 0;
        }
        .hero-video {
          width: 100%;
          height: auto;
          max-height: 100vh;
          object-fit: cover;
        }
        @media (max-width: 640px) {
          .hero-video {
            min-height: 300px; /* limit video height on mobile */
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
