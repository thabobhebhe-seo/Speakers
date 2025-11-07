
import React from 'react';
import type { Speaker } from '../types';

interface SpeakerCardProps {
  speaker: Speaker;
  onViewProfile: (speaker: Speaker) => void;
}

const SpeakerCard: React.FC<SpeakerCardProps> = ({ speaker, onViewProfile }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col">
      <img className="w-full h-64 object-cover object-center" src={speaker.imageUrl} alt={speaker.name} />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">{speaker.name}</h3>
        <p className="text-teal-600 dark:text-teal-400 font-medium mt-1">{speaker.title}</p>
        <p className="text-slate-600 dark:text-slate-300 mt-3 text-sm flex-grow">{speaker.bio}</p>
        <button 
          onClick={() => onViewProfile(speaker)}
          className="mt-4 w-full bg-teal-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-teal-700 transition-colors duration-300">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default SpeakerCard;