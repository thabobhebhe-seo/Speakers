import React, { useEffect, useRef } from 'react';
import type { Speaker } from '../types';

interface SpeakerProfileProps {
  speaker: Speaker;
  onClose: () => void;
}

const SpeakerProfile: React.FC<SpeakerProfileProps> = ({ speaker, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Close modal on outside click
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };
  
  const handleBookSpeaker = () => {
    onClose();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4 animate-fade-in"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`speaker-profile-${speaker.id}`}
    >
      <div ref={modalRef} className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row animate-slide-up">
        <div className="md:w-1/3 flex-shrink-0">
          <img src={speaker.imageUrl} alt={speaker.name} className="w-full h-64 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none" />
        </div>
        <div className="p-8 flex-grow flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <h2 id={`speaker-profile-${speaker.id}`} className="text-3xl font-bold text-slate-800 dark:text-white">{speaker.name}</h2>
              <p className="text-teal-600 dark:text-teal-400 font-medium mt-1 text-lg">{speaker.title}</p>
            </div>
            <button onClick={onClose} aria-label="Close profile" className="text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-6 flex-grow">
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">About</h3>
            <p className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{speaker.longBio}</p>
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mt-6 mb-3">Speaking Topics</h3>
            <div className="flex flex-wrap gap-2">
              {speaker.topics.map(topic => (
                <span key={topic} className="bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200 text-sm font-medium px-3 py-1 rounded-full">{topic}</span>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 text-right">
            <button onClick={handleBookSpeaker} className="bg-teal-600 text-white py-3 px-8 rounded-md font-semibold hover:bg-teal-700 transition-colors duration-300">
              Book this Speaker
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakerProfile;