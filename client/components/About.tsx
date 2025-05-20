import { useIntersectionObserver } from "@/hooks/use-intersection";
import { useRef, useEffect } from "react";
import anilImage from '../assets/anil-sharma-1.jpg';


const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const directorRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  useEffect(() => {
    if (isVisible) {
      // Sequence animations when section becomes visible
      setTimeout(() => {
        image1Ref.current?.classList.add('animate-slideIn');
      }, 100);
      
      setTimeout(() => {
        quoteRef.current?.classList.add('animate-fadeIn');
      }, 300);
      
      setTimeout(() => {
        directorRef.current?.classList.add('animate-slideInRight');
      }, 500);
    }
  }, [isVisible]);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="flex flex-col md:flex-row relative py-0"
    >
      {/* First column - Image with premium overlay */}
      <div 
        ref={image1Ref}
        className="w-full md:w-1/3 h-[350px] md:h-screen relative mb-0 opacity-0 overflow-hidden"
      >
        <div className="w-full h-full relative overflow-hidden gold-card">
          <img 
            src="https://www.shutterstock.com/image-vector/celtic-triquetra-knot-on-black-600nw-2052834242.jpg" 
            alt="Film production background" 
            className="w-full h-full object-cover opacity-60"
            loading="lazy"
          />
          
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
          
          {/* Title and accent line - visible on mobile */}
          <div className="absolute w-full text-2x1 inset-x-0 top-20 p-6 md:p-10 text-center md:top-80">
            {/* <div className="w-12 h-1 bg-gradient-to-r from-[#BF953F] to-[#FFC832] mb-4"></div> */}
            <h2 className="text-5xl md:text-8x1 font-bold gold-gradient-text leading-tight">
              CREATORS <br/>& <br/> COLLABORATORS
            </h2>
          </div>
        </div>
      </div>
      
      {/* Second column - Quote with premium styling */}
      <div 
        ref={quoteRef}
        className="w-full md:w-1/3 h-[300px] md:h-screen p-6 md:p-12 flex flex-col justify-center gold-card opacity-0 relative overflow-hidden"
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{ 
            backgroundImage: `url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 2l-1.414 1.414L40.97 0H32zM22 0L9.858 12.142l1.414 1.414L22 2.828l1.414-1.414L11.03 0h2.97zm5.657 0L18.15 9.314l1.414 1.414L28 2.828 29.414 1.414 19.657 0h8zM2.284 0L0 2.284l1.414 1.414L4 1.414 2.284 0zM0 5.657L5.657 0h-.243L0 5.414v.243zM0 8.485L8.485 0h-.243L0 8.243v.242zm0 2.83L11.313 0h-.242L0 11.07v.242zm0 2.828L14.142 0h-.242L0 13.9v.243zm0 2.828L16.97 0h-.242L0 16.728v.243zm0 2.828L19.8 0h-.243L0 19.556v.243zm0 2.83L22.626 0h-.243L0 22.384v.242zm0 2.828L25.456 0h-.243L0 25.212v.243zm0 2.828L28.284 0h-.242L0 28.04v.243zm0 2.83L31.113 0h-.242L0 30.87v.242zm0 2.828L33.94 0h-.242L0 33.7v.243zm0 2.828L36.77 0h-.242L0 36.527v.243zm0 2.828L39.6 0h-.243L0 39.354v.243zm0 2.83L42.427 0h-.242L0 42.184v.242zm0 2.828L45.254 0h-.242L0 45.012v.242zm0 2.828L48.083 0h-.242L0 47.84v.243zm0 2.83L50.913 0h-.243L0 50.67v.242zm0 2.828L53.74 0h-.242L0 53.5v.242zm0 2.828L56.568 0h-.242L0 56.326v.242z\' fill=\'%23D4AF37\' fill-opacity=\'0.3\' fill-rule=\'evenodd\'/%3E%3C/svg%3E')`
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-lg mx-auto md:mx-0">
          {/* Gold quote marks */}
          {/* <div className="text-[#D4AF37] text-6xl font-serif opacity-40 absolute -top-8 -left-4">"</div> */}
          
          <p className="text-3xl gold-gradient-text md:text-4xl font-bold font-playfair  font-oswald mb-8 leading-relaxed text-opacity-90 px-4 top-0">
            Services
          </p>
          
          <div className="flex items-center pl-4">
            <div className="w-full h-full  w:h-full mr-4">We have expertise in content production. Be it TVCs, Films, Documentaries, Social Media Content, OTT Content, Live Streams or Social Commerce - we bring you the best production talent.</div>
            <p className="text-[#FFC832] text-lg md:text-xl font-playfair"></p>
          </div>
          
          {/* Gold quote marks closing */}
          {/* <div className="text-[#D4AF37] text-6xl font-serif opacity-40 absolute -bottom-12 -right-4">"</div> */}
        </div>
      </div>
      
      {/* Third column - Director info with premium style */}
      <div 
        ref={directorRef}
        className="w-full md:w-1/3 h-auto md:h-screen gold-card bg-[#0d0d0d] p-6 md:p-12 flex flex-col justify-center opacity-0 relative py-10"
      >
        {/* Accent elements */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="#D4AF37" />
          </svg>
        </div>
        
        <div className="relative z-10">
          <div className="w-12 h-0.5 bg-gradient-to-r from-[#e50914] to-[#ff3b30] mb-4"></div>
          <h3 className="text-xl font-bold text-[#e50914] mb-2 tracking-wider">THE DIRECTOR</h3>
          <h4 className="text-4xl md:text-5xl mb-8 font-oswald font-bold gold-gradient-text">Anil Sharma</h4>
          
          <div className="flex items-center mb-8">
            <div className="w-20 h-20 sm:w-24 sm:h-24 relative shrink-0">
              <div className="absolute inset-0 border-2 border-[#D4AF37] rounded-full"></div>
              <img 
                  src={anilImage} 
                alt="Director portrait" 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover object-center border border-[#BF953F]"
                loading="lazy"
              />
            </div>
            
            <div className="ml-4 sm:ml-6 flex flex-col">
              {/* <span className="text-[#D4AF37] text-sm tracking-wider">VISIONARY</span>
              <span className="text-xs opacity-60">Film Director & Producer</span> */}
            </div>
          </div>
          
          <p className="text-base opacity-90 leading-relaxed max-w-md">
            Born in Edinburgh, Scotland. Anil Sharma is a result-focused individual with 28+ years of experience in the creative field producing and managing creative work for prestigious brands across Automotive, Apparel, Fashion, Telecom, Aviation, FMCG, CPG, and Oil & Gas industries.
          </p>
                
          {/* Accent line */}
          <div className="w-24 h-0.5 bg-gradient-to-r from-[#D4AF37] to-transparent mt-12"></div>
        </div>
       <div className="flex space-x-5 font-xl mt-8 font-#ffff">
          <a
            href=""
            className="text-xl text-[#D4AF37] hover:text-[#FFC832] transition-colors"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href=""
            className="text-xl text-[#D4AF37] hover:text-[#FFC832] transition-colors"
            aria-label="Instagram"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
     
    </section>
  );
};

export default About;