import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import type { ChatMessage, Speaker } from '../types';

// --- SVG ICONS for Chatbot ---
const ChatIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);

// --- Chatbot Component ---
interface ChatbotProps {
    speakers: Speaker[];
}

const Chatbot: React.FC<ChatbotProps> = ({ speakers }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', text: 'Hello! How can I assist you with booking a speaker today?' }
    ]);
    const [inputValue, setInputValue] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [chat, setChat] = useState<Chat | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const speakerContext = speakers.map(s => 
              `Name: ${s.name}, Title: ${s.title}, Bio: ${s.bio}`
            ).join('\n');
      
            const systemInstruction = `You are a friendly and helpful assistant for Zim-Speakers Connect, a premier talent agency in Zimbabwe. Your goal is to help users find information about speakers, understand the services offered, and guide them on how to make a booking through the contact form. Be concise and professional.
            
            Here is a list of our featured speakers:
            ${speakerContext}
            
            Use this information to answer questions about specific speakers. If a user asks about a speaker not on this list, politely inform them you don't have information on that person but can help with the featured speakers.`;


            const chatSession = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: systemInstruction,
                },
            });
            setChat(chatSession);
        } catch (error) {
            console.error("Failed to initialize Gemini AI:", error);
            setMessages(prev => [...prev, { role: 'model', text: "Sorry, the chat service is currently unavailable."}]);
        }
    }, [speakers]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading || !chat) return;

        const userMessage: ChatMessage = { role: 'user', text: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await chat.sendMessage({ message: userMessage.text });
            const modelMessage: ChatMessage = { role: 'model', text: response.text };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error('Gemini API error:', error);
            const errorMessage: ChatMessage = { role: 'model', text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className={`fixed bottom-0 right-0 m-6 transition-all duration-300 ${isOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-teal-600 text-white rounded-full p-4 shadow-lg hover:bg-teal-700 transition-colors"
                    aria-label="Open chat"
                >
                    <ChatIcon className="w-8 h-8" />
                </button>
            </div>

            <div
                className={`fixed bottom-0 right-0 m-6 mb-24 w-full max-w-sm h-3/4 bg-white dark:bg-slate-800 rounded-lg shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="chat-heading"
            >
                {/* Header */}
                <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
                    <h2 id="chat-heading" className="text-lg font-semibold text-slate-800 dark:text-white">Zim-Speakers Assistant</h2>
                    <button onClick={() => setIsOpen(false)} aria-label="Close chat" className="text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </header>

                {/* Messages */}
                <div ref={chatContainerRef} className="flex-grow p-4 overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center font-bold text-white flex-shrink-0 text-sm">AI</div>}
                            <div className={`max-w-xs md:max-w-sm px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-teal-600 text-white rounded-br-none' : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none'}`}>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-end gap-2 justify-start">
                             <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center font-bold text-white flex-shrink-0 text-sm">AI</div>
                             <div className="px-4 py-2 rounded-2xl bg-slate-200 dark:bg-slate-700 rounded-bl-none">
                                <div className="flex items-center justify-center space-x-1">
                                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Form */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
                    <div className="relative">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask a question..."
                            className="w-full pl-4 pr-12 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                            disabled={isLoading || !chat}
                        />
                        <button type="submit" disabled={isLoading || !chat} className="absolute right-1 top-1/2 -translate-y-1/2 bg-teal-600 text-white rounded-full p-2 hover:bg-teal-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors" aria-label="Send message">
                            <SendIcon className="w-5 h-5" />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Chatbot;