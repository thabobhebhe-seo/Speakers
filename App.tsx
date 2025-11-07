
import React, { useState } from 'react';
import type { Speaker } from './types';
import SpeakerCard from './components/SpeakerCard';
import Chatbot from './components/Chatbot';
import SpeakerProfile from './components/SpeakerProfile';

// --- MOCK DATA ---
const featuredSpeakers: Speaker[] = [
  { 
    id: 1, 
    name: 'Tinashe Mutero', 
    title: 'Tech Entrepreneur & Futurist', 
    bio: 'An award-winning innovator speaking on AI, blockchain, and the future of African tech.', 
    imageUrl: 'https://picsum.photos/seed/tinashe/400/400',
    longBio: 'Tinashe Mutero is a visionary tech entrepreneur and a leading voice on the future of technology in Africa. With over a decade of experience in building successful startups, he has been recognized with numerous awards for his innovative work in artificial intelligence and blockchain solutions. Tinashe is passionate about leveraging technology to solve some of the continent\'s most pressing challenges and is a sought-after speaker for his ability to demystify complex subjects and inspire audiences.',
    topics: ['Artificial Intelligence', 'Blockchain & Web3', 'The Future of Work', 'Digital Transformation']
  },
  { 
    id: 2, 
    name: 'Chipo Matimba', 
    title: 'Global Economist & Author', 
    bio: 'Expert analysis on global markets, economic policy, and sustainable development in Africa.', 
    imageUrl: 'https://picsum.photos/seed/chipo/400/400',
    longBio: 'Chipo Matimba is a renowned global economist and the best-selling author of "The African Tiger Economy." Her work focuses on macroeconomic trends, trade policy, and the impact of globalization on emerging markets. With a background advising governments and international organizations, Chipo provides invaluable insights into the economic landscape, making complex financial topics accessible and engaging for any audience.',
    topics: ['Global Market Trends', 'Economic Policy', 'Sustainable Development', 'International Trade']
  },
  { 
    id: 3, 
    name: 'Farai Moyo', 
    title: 'Professional MC & Moderator', 
    bio: 'Brings energy, wit, and professionalism to any event, ensuring a seamless and engaging experience.', 
    imageUrl: 'https://picsum.photos/seed/farai/400/400',
    longBio: 'Farai Moyo is one of Zimbabwe\'s most requested event hosts and masters of ceremonies. His natural charisma and sharp wit allow him to connect effortlessly with any audience. Whether it\'s a corporate gala, a tech conference, or a national awards ceremony, Farai ensures the event runs smoothly, keeps the energy high, and leaves a lasting positive impression on all attendees.',
    topics: ['Event Hosting', 'Panel Moderation', 'Audience Engagement', 'Corporate Entertainment']
  },
  { 
    id: 4, 
    name: 'Rudo Shumba', 
    title: 'Leadership & Performance Coach', 
    bio: 'Empowering teams and individuals to unlock their full potential and achieve peak performance.', 
    imageUrl: 'https://picsum.photos/seed/rudo/400/400',
    longBio: 'Rudo Shumba is a certified leadership coach with a track record of transforming corporate teams and executives. Her keynote speeches and workshops are built on a foundation of psychological research and real-world business acumen. Rudo specializes in building resilient leaders, fostering high-performance cultures, and helping individuals overcome barriers to success. Her energetic and interactive style makes her a favorite among top corporations.',
    topics: ['High-Performance Teams', 'Resilient Leadership', 'Corporate Culture', 'Personal Growth']
  },
];

const testimonials = [
  {
    quote: "The keynote speaker was phenomenal! Our audience was captivated from start to finish. Zim-Speakers made the entire process seamless.",
    name: "Fadzai Mun Gomo",
    event: "Annual Tech Summit 2023"
  },
  {
    quote: "Our MC was the life of the party. Professional, witty, and incredibly engaging. We couldn't have asked for a better host for our awards gala.",
    name: "David Chena",
    event: "Corporate Awards Gala"
  },
  {
    quote: "Finding the right moderator was crucial for our panel discussion. The expert provided by Zim-Speakers was knowledgeable and kept the conversation flowing perfectly.",
    name: "Tendai Shiri",
    event: "Financial Services Conference"
  }
];

// --- SVG ICONS (as components) ---
const MicrophoneIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
);

const UsersIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 01.293.707V9.414a1 1 0 01-.293.707L13 12.414m-2 2l-2.293 2.293a1 1 0 01-.707.293H7.586a1 1 0 01-.707-.293L4.586 13M21 11.5a1.5 1.5 0 01-1.5 1.5h-8a1.5 1.5 0 01-1.5-1.5v-3a1.5 1.5 0 011.5-1.5h8a1.5 1.5 0 011.5 1.5v3z" />
    </svg>
);

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const LocationMarkerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PhoneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MailIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);


// --- MOCK LOGOS & DATA ---
const LogoPlaceholder1: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <text x="0" y="28" fontFamily="Poppins, sans-serif" fontSize="24" fontWeight="bold"> ECONET </text>
    </svg>
);
const LogoPlaceholder2: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <text x="0" y="28" fontFamily="Poppins, sans-serif" fontSize="24" fontWeight="bold"> DELTA </text>
    </svg>
);
const LogoPlaceholder3: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 180 40" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <text x="0" y="28" fontFamily="Poppins, sans-serif" fontSize="24" fontWeight="bold"> TECHSUMMIT </text>
    </svg>
);
const LogoPlaceholder4: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <text x="0" y="28" fontFamily="Poppins, sans-serif" fontSize="24" fontWeight="bold"> MEIKLES </text>
    </svg>
);
const LogoPlaceholder5: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 190 40" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <text x="0" y="28" fontFamily="Poppins, sans-serif" fontSize="24" fontWeight="bold"> ZIM-FINANCE </text>
    </svg>
);

const clientLogos = [
  { name: 'Econet Wireless', component: <LogoPlaceholder1 /> },
  { name: 'Delta Corporation', component: <LogoPlaceholder2 /> },
  { name: 'Zimbabwe Tech Summit', component: <LogoPlaceholder3 /> },
  { name: 'Meikles Hotel', component: <LogoPlaceholder4 /> },
  { name: 'FinanceConf Zim', component: <LogoPlaceholder5 /> },
];

// --- PAGE SECTIONS (as components defined outside main App component) ---

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ["Speakers", "Services", "About", "Testimonials", "Contact"];
  
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-teal-600 dark:text-teal-400">Zim-Speakers</a>
        <nav className="hidden md:flex space-x-8">
          {navLinks.map(link => (
            <button key={link} onClick={() => scrollToSection(link.toLowerCase())} className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-colors">
              {link}
            </button>
          ))}
        </nav>
        <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
                <svg className="w-6 h-6 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900">
          {navLinks.map(link => (
            <button key={link} onClick={() => scrollToSection(link.toLowerCase())} className="block py-2 px-6 text-slate-600 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-slate-800 w-full text-left">
              {link}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

const Hero = () => {
    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="pt-24 md:pt-32 pb-16 bg-slate-50 dark:bg-slate-900">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 dark:text-white leading-tight">
                    Elevate Your Event with <span className="text-teal-600 dark:text-teal-400">Zimbabwe's Premier Voices</span>
                </h1>
                <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                    We connect you with exceptional keynote speakers, event hosts, moderators, and MCs. All obligation-free.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                    <button onClick={scrollToContact} className="w-full sm:w-auto bg-teal-600 text-white py-3 px-8 rounded-full font-semibold text-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                        Get a Free Quote
                    </button>
                     <button onClick={() => document.getElementById('speakers')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto bg-transparent border-2 border-slate-400 text-slate-700 dark:text-slate-300 dark:border-slate-500 py-3 px-8 rounded-full font-semibold text-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300">
                        Explore Speakers
                    </button>
                </div>
            </div>
        </section>
    );
};

interface FeaturedSpeakersProps {
  speakers: Speaker[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onViewProfile: (speaker: Speaker) => void;
}

const FeaturedSpeakers = ({ speakers, searchQuery, onSearchChange, onViewProfile }: FeaturedSpeakersProps) => (
  <section id="speakers" className="py-20 bg-white dark:bg-slate-800">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-white mb-4">Our Featured Speakers</h2>
      <p className="text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12">
        A curated selection of our top-tier talent, ready to make your next event unforgettable.
      </p>

      <div className="max-w-xl mx-auto mb-12">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by name, title, or topic..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 text-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-full shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            aria-label="Search for a speaker"
          />
        </div>
      </div>
      
      {speakers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {speakers.map(speaker => <SpeakerCard key={speaker.id} speaker={speaker} onViewProfile={onViewProfile} />)}
        </div>
      ) : (
        <div className="text-center py-12">
            <p className="text-xl text-slate-600 dark:text-slate-300">No speakers found matching your search.</p>
        </div>
      )}
    </div>
  </section>
);

const Services = () => {
    const services = [
        { icon: <MicrophoneIcon className="w-12 h-12 text-teal-500" />, title: 'Keynote Speakers', description: 'Inspiring and insightful speakers who are experts in their fields.' },
        { icon: <UsersIcon className="w-12 h-12 text-teal-500" />, title: 'Event Hosts & MCs', description: 'Charismatic professionals to guide your event with energy and grace.' },
        { icon: <SparklesIcon className="w-12 h-12 text-teal-500" />, title: 'Panel Moderators', description: 'Skilled moderators to facilitate engaging and productive discussions.' },
    ];

    return (
        <section id="services" className="py-20 bg-slate-50 dark:bg-slate-900">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-white mb-4">Our Services</h2>
                <p className="text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12">
                    We provide a comprehensive range of services to ensure your event's success.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {services.map(service => (
                        <div key={service.title} className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md">
                            <div className="flex justify-center mb-4">{service.icon}</div>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{service.title}</h3>
                            <p className="text-slate-600 dark:text-slate-300">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const WhyChooseUs = () => {
  const points = [
    { title: "Curated Elite Talent", description: "We meticulously vet every speaker to ensure you get the best talent in Zimbabwe." },
    { title: "Obligation-Free Process", description: "Explore options and get quotes with no commitment. We're here to help, not pressure." },
    { title: "Deep Local Expertise", description: "Our understanding of the local landscape ensures a perfect match for your event's culture." },
    { title: "Seamless Booking", description: "From inquiry to event day, we handle all the logistics for a stress-free experience." },
  ];
  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-white mb-12">Why Zim-Speakers?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {points.map(point => (
            <div key={point.title} className="flex items-start">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="w-8 h-8 text-teal-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{point.title}</h3>
                <p className="mt-1 text-slate-600 dark:text-slate-300">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => (
    <section id="testimonials" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-white mb-4">
          What Our Clients Say
        </h2>
        <p className="text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12">
          Hear from satisfied partners who trusted us to elevate their events.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg flex flex-col transform transition-all duration-300 hover:scale-105">
              <svg className="w-10 h-10 text-teal-500 dark:text-teal-400 mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.5 2C3.567 2 2 3.567 2 5.5v3.99c0 1.345 1.225 2.433 2.75 2.584V13.5a.5.5 0 00.5.5h1.5a.5.5 0 00.5-.5V12c.983-.1 1.75-.95 1.75-1.99V5.5C9 3.567 7.433 2 5.5 2zm10 0C13.567 2 12 3.567 12 5.5v3.99c0 1.345 1.225 2.433 2.75 2.584V13.5a.5.5 0 00.5.5h1.5a.5.5 0 00.5-.5V12c.983-.1 1.75-.95 1.75-1.99V5.5C19 3.567 17.433 2 15.5 2z"></path>
              </svg>
              <p className="text-slate-600 dark:text-slate-300 italic flex-grow">
                "{testimonial.quote}"
              </p>
              <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-4">
                <p className="font-bold text-slate-800 dark:text-white">{testimonial.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
);

const ClientLogos = () => (
  <section id="clients" className="py-20 bg-white dark:bg-slate-800">
    <div className="container mx-auto px-6">
      <h2 className="text-center text-2xl font-bold text-slate-800 dark:text-white mb-12">
        Trusted By Leading Organizations
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-x-12 sm:gap-x-16 gap-y-8">
        {clientLogos.map((client) => (
          <div key={client.name} title={client.name} className="h-8 sm:h-10 text-slate-400 dark:text-slate-500 filter grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300">
            {React.cloneElement(client.component, { className: 'h-full w-auto' })}
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ContactForm = () => {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [form, setForm] = useState({ name: '', email: '', eventType: '', message: ''});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        // Simulate API call
        setTimeout(() => {
            if (form.email.includes('@')) {
                setStatus('success');
                setForm({ name: '', email: '', eventType: '', message: '' });
            } else {
                setStatus('error');
            }
        }, 1500);
    };

    return (
        <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-900">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-white mb-4">Let's Plan Your Event</h2>
                <p className="text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12">
                    Fill out the form below for a free, no-obligation quote. Our team will get back to you shortly.
                </p>
                <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
                    {status === 'success' ? (
                        <div className="text-center p-8">
                            <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Thank You!</h3>
                            <p className="text-slate-600 dark:text-slate-300 mt-2">Your inquiry has been sent. We'll be in touch soon.</p>
                        </div>
                    ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                                <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                                <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
                            </div>
                        </div>
                        <div className="mt-6">
                            <label htmlFor="eventType" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Event Type</label>
                            <input type="text" id="eventType" name="eventType" value={form.eventType} onChange={handleChange} placeholder="e.g., Corporate Conference, Gala Dinner" required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"/>
                        </div>
                        <div className="mt-6">
                            <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Your Message</label>
                            <textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange} placeholder="Tell us about your event, desired speaker type, and any other details." required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"></textarea>
                        </div>
                        <div className="mt-6 text-center">
                            <button type="submit" disabled={status === 'submitting'} className="w-full bg-teal-600 text-white py-3 px-8 rounded-md font-semibold text-lg hover:bg-teal-700 transition-colors duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed">
                                {status === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
                            </button>
                            {status === 'error' && <p className="text-red-500 mt-3">Something went wrong. Please check your details and try again.</p>}
                        </div>
                    </form>
                    )}
                </div>
            </div>
        </section>
    );
};


const Footer = () => (
    <footer className="bg-slate-800 dark:bg-slate-900 text-slate-300">
        <div className="container mx-auto px-6 py-10">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left">
                <div className="mb-6 md:mb-0">
                    <h3 className="text-2xl font-bold text-white">Zim-Speakers Connect</h3>
                    <p className="mt-2 text-slate-400">Connecting you with Zimbabwe's finest talent.</p>
                </div>
                <div className="flex flex-col items-center md:items-start space-y-3">
                    <div className="flex items-center">
                        <LocationMarkerIcon className="w-5 h-5 mr-3 flex-shrink-0 text-teal-400" />
                        <span>Harare, Zimbabwe</span>
                    </div>
                    <div className="flex items-center">
                        <PhoneIcon className="w-5 h-5 mr-3 flex-shrink-0 text-teal-400" />
                        <a href="tel:+263771234567" className="hover:text-teal-400 transition-colors">+263 77 123 4567</a>
                    </div>
                    <div className="flex items-center">
                        <MailIcon className="w-5 h-5 mr-3 flex-shrink-0 text-teal-400" />
                        <a href="mailto:bookings@zimspeakers.co.zw" className="hover:text-teal-400 transition-colors">bookings@zimspeakers.co.zw</a>
                    </div>
                </div>
            </div>
            <hr className="my-8 border-slate-700" />
            <p className="text-center text-sm text-slate-400">
                &copy; {new Date().getFullYear()} Zim-Speakers Connect. All Rights Reserved.
            </p>
        </div>
    </footer>
);


// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleViewProfile = (speaker: Speaker) => {
    document.body.style.overflow = 'hidden'; // Prevent background scrolling when modal is open
    setSelectedSpeaker(speaker);
  };

  const handleCloseProfile = () => {
    document.body.style.overflow = 'auto'; // Restore scrolling
    setSelectedSpeaker(null);
  };

  const filteredSpeakers = featuredSpeakers.filter(speaker => {
    const lowercasedQuery = searchQuery.toLowerCase();
    return (
      speaker.name.toLowerCase().includes(lowercasedQuery) ||
      speaker.title.toLowerCase().includes(lowercasedQuery) ||
      speaker.bio.toLowerCase().includes(lowercasedQuery) ||
      speaker.topics.some(topic => topic.toLowerCase().includes(lowercasedQuery))
    );
  });

  return (
    <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 min-h-screen">
      <Header />
      <main>
        <Hero />
        <FeaturedSpeakers 
            speakers={filteredSpeakers}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onViewProfile={handleViewProfile} 
        />
        <Services />
        <WhyChooseUs />
        <Testimonials />
        <ClientLogos />
        <ContactForm />
      </main>
      <Footer />
      <Chatbot speakers={featuredSpeakers} />
      {selectedSpeaker && <SpeakerProfile speaker={selectedSpeaker} onClose={handleCloseProfile} />}
    </div>
  );
}

export default App;
