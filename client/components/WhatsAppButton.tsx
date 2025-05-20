import { useState, useEffect } from 'react';

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Show the button after a short delay
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // Set up pulse animation interval
    const animationInterval = setInterval(() => {
      setIsAnimating(true);
      
      // Reset animation after duration
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(animationInterval);
    };
  }, []);

  return (
    <a 
      href="https://wa.me/+918851964979" 
      className={`fixed bottom-5 right-4 sm:bottom-8 sm:right-8 z-50 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-500 ease-out group`}
      target="_blank" 
      rel="noopener noreferrer" 
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse animation ring */}
      <div className={`absolute inset-0 rounded-full bg-[#25D366]/30 ${isAnimating ? 'animate-ping' : ''}`}></div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-[#25D366]/20 blur-md transform scale-125"></div>
      
      {/* Main button */}
      <div className="relative flex items-center">
        {/* Label that appears on hover */}
        <div className="absolute right-full mr-3 pr-2 py-2 pl-4 bg-[#25D366] text-white font-medium rounded-full opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap shadow-lg hidden md:flex">
          Chat with us
          <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#25D366] rotate-45"></div>
        </div>
        
        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
          <i className="fab fa-whatsapp text-white text-3xl"></i>
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
