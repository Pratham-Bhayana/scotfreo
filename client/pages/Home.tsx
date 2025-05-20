import { Suspense, lazy, useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import WhatsAppButton from '@/components/WhatsAppButton';

// Lazy load components for better performance
const About = lazy(() => import('@/components/About'));
const Projects = lazy(() => import('@/components/Projects'));
const Contact = lazy(() => import('@/components/Contact'));

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Setup preloading and animations
  useEffect(() => {
    // Simulate initial loading for smoother transitions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    // Smooth scroll behavior for snap container
    const smoothScroll = (e: WheelEvent) => {
      if (document.body.classList.contains('snap-container')) {
        // Get the current scroll position
        const currentPosition = window.scrollY;
        // Get the viewport height
        const viewportHeight = window.innerHeight;
        
        // Calculate the target scroll position
        const direction = e.deltaY > 0 ? 1 : -1;
        const targetPosition = Math.round(currentPosition / viewportHeight) * viewportHeight + (direction * viewportHeight);
        
        // Perform smooth scroll
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Prevent default scroll behavior
        e.preventDefault();
      }
    };
    
    // Add smooth scroll only on desktop devices
    if (window.innerWidth >= 1024) {
      document.body.classList.add('snap-container');
      window.addEventListener('wheel', smoothScroll, { passive: false });
    }
    
    // Performance optimization for scroll animations
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px' // Trigger slightly before the element comes into view
    });
    
    revealElements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      if (window.innerWidth >= 1024) {
        window.removeEventListener('wheel', smoothScroll);
        document.body.classList.remove('snap-container');
      }
    };
  }, []);

  // Premium loader with gold accent
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0a] z-50">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-4 border-[#111111] border-t-[#D4AF37] animate-spin"></div>
            <div className="absolute inset-4 rounded-full border-4 border-[#111111] border-b-[#D4AF37] animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-[#0a0a0a] rounded-full flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10"></div>
              </div>
            </div>
          </div>
          <p className="mt-6 text-[#D4AF37] font-medium tracking-wider animate-pulse text-sm">LOADING</p>
        </div>
      </div>
    );
  }

  // Premium loading state for lazy-loaded components
  const LoadingFallback = () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0 rounded-full border-2 border-[#1a1a1a] border-t-[#D4AF37] animate-spin"></div>
          <div className="absolute inset-3 rounded-full border-2 border-[#1a1a1a] border-b-[#D4AF37] animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
        <p className="mt-4 text-sm text-[#D4AF37] animate-pulse opacity-70">Loading content</p>
      </div>
    </div>
  );

  return (
    <main className="bg-background text-foreground relative">
      {/* Background noise overlay for added texture */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.015]" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
      }}></div>
      
      {/* Main content sections */}
      <div className="relative z-10">
        <Hero />
        
        <Suspense fallback={<LoadingFallback />}>
          <About />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <Projects />
        </Suspense>
        
        <Suspense fallback={<LoadingFallback />}>
          <Contact />
        </Suspense>
      </div>
      
      {/* Fixed elements */}
      <WhatsAppButton />
      
      {/* Progress indicator dots for snap sections */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30 hidden lg:flex flex-col gap-4">
        {['hero', 'about', 'projects', 'contact'].map((id, index) => (
          <a 
            key={id}
            href={`#${id}`}
            className="w-3 h-3 rounded-full border border-[#D4AF37]/50 bg-transparent hover:bg-[#D4AF37]/50 transition-all cursor-pointer group"
            aria-label={`Scroll to ${id} section`}
          >
            <span className="absolute right-full mr-4 text-xs opacity-0 group-hover:opacity-100 transition-opacity text-[#D4AF37] whitespace-nowrap">
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </span>
          </a>
        ))}
      </div>
    </main>
  );
};

export default Home;
