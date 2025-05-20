import { useState } from 'react';
import VideoModal from './VideoModal';
import { cn } from '@/lib/utils';

const Projects = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');

  const openVideoModal = (videoUrl: string) => {
    setSelectedVideoUrl(videoUrl);
    setIsModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsModalOpen(false);
    setSelectedVideoUrl('');
  };

  const projects = [
    {
      id: 1,
      title: 'Indigo',
      videoUrl: '/assets/IndigoFinal.mov',
    },
    {
      id: 2,
      title: 'Chevrolet Promise',
      videoUrl: '/assets/Chevrolet Promise - YouTube.mp4',
    },
    {
      id: 3,
      title: 'Ford Mustang',
      videoUrl: '/assets/Ford-mustang.mov',
    },
{
    id:4,
    title:'Royal Enfield',
    videoUrl:'/assets/RE-Handcrafted in Chennai.m4v'
  
},
{
    id:5,
    title:'Ford Journey',
    videoUrl:'/assets/Ford-Brand-Journey.mp4'
  
},
{
    id:6,
    title:'Mountain Dew',
    videoUrl:'/assets/animtdew.mp4'
  
},
];

  return (
    <section className="py-16 px-4 sm:px-8 lg:px-20 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-[#D4AF37]">Projects</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative group rounded-2xl overflow-hidden shadow-xl border border-[#D4AF37]/20 gold-glow cursor-pointer transition-transform hover:scale-105"
              onClick={() => openVideoModal(project.videoUrl)}
            >
              <div className="relative w-full pt-[75%] bg-black">
                <video
                  src={project.videoUrl}
                  className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="none"
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 p-5">
                <h3 className="text-xl font-semibold text-[#D4AF37]">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <VideoModal
        isOpen={isModalOpen}
        onClose={closeVideoModal}
        videoUrl={selectedVideoUrl}
      />
    </section>
  );
};

export default Projects;
