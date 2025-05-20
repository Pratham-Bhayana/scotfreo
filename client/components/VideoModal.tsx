import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string; // should be a relative path like '/assets/video.mp4'
}

const VideoModal = ({ isOpen, onClose, videoUrl }: VideoModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => setAnimation(true), 100);
      setIsLoading(true);
    } else {
      document.body.style.overflow = '';
      setAnimation(false);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !videoContainerRef.current?.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  const handleClose = () => {
    setAnimation(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className={cn(
        "fixed inset-0 bg-black/0 backdrop-blur-none z-50 flex items-center justify-center transition-all duration-300",
        animation ? "bg-black/95 backdrop-blur-md" : "bg-black/0 backdrop-blur-none"
      )}
      style={{ perspective: '1000px' }}
    >
      <div
        className={cn(
          "relative w-full max-w-5xl mx-4 transition-all duration-300 transform",
          animation ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-10 opacity-0"
        )}
      >
        <button
          onClick={handleClose}
          className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#D4AF37]/30 text-white hover:bg-[#D4AF37] hover:text-black transition-colors flex items-center justify-center group z-10"
          aria-label="Close modal"
        >
          <i className="fas fa-times text-lg group-hover:scale-110 transition-transform"></i>
        </button>

        <div className="absolute -top-12 left-0 right-16 h-10 flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#D4AF37] mr-2">Scotfreo</div>
          <span className="text-sm font-medium opacity-80 truncate"></span>
        </div>

        <div className="absolute -inset-px rounded-lg border border-[#D4AF37]/20 gold-glow pointer-events-none"></div>

        <div className="rounded-lg overflow-hidden gold-card">
          <div className="aspect-w-16 aspect-h-9">
            <div
              ref={videoContainerRef}
              className="w-full h-0 pb-[56.25%] relative"
            >
              {isLoading && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-black flex items-center justify-center z-10">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 relative">
                      <div className="absolute inset-0 rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37] animate-spin"></div>
                      <div
                        className="absolute inset-2 rounded-full border-2 border-[#D4AF37]/20 border-b-[#D4AF37] animate-spin"
                        style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
                      ></div>
                    </div>
                    <p className="mt-4 text-[#D4AF37] animate-pulse">Loading video...</p>
                  </div>
                </div>
              )}

              {videoUrl ? (
                <video
                  src={videoUrl}
                  className="absolute inset-0 w-full h-full"
                  controls
                  autoPlay
                  muted
                  onCanPlayThrough={handleVideoLoad}
                />
              ) : (
                <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
                  <p className="text-[#D4AF37]">No video source found</p>
                </div>
              )}

              {/* Gold decorative accents */}
              <div className="absolute top-3 left-3 w-5 h-5 border border-[#D4AF37]/30 opacity-30"></div>
              <div className="absolute bottom-3 right-3 w-5 h-5 border border-[#D4AF37]/30 opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
