'use client';

import React, { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import ChatMessage, { MessageProps } from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import TypingIndicator from '@/components/TypingIndicator';
import SourcesSidebar from '@/components/SourcesSidebar';
import ZapIcon from '@/components/icons/zap-icon';
import FileDescriptionIcon from '@/components/icons/file-description-icon';
import BrainIcon from '@/components/icons/brain-icon';
import { trackQuery } from '@/services/queryTracker';

// --- Types ---
interface Source {
  text: string;
  score: number;
}

export default function Home() {
  // --- State ---
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  // Sidebar State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSources, setActiveSources] = useState<Source[]>([]);

  // Auto-scroll ref
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // --- Handlers ---

  const handleClear = () => {
    setMessages([]);
    setInputValue('');
    setIsSidebarOpen(false);
    setActiveSources([]);
  };

  const handleSourceClick = (sources: Source[]) => {
    setActiveSources(sources);
    setIsSidebarOpen(true);
  };

  const handleQuery = async (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: MessageProps = { role: 'user', content: queryText };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    // Track the query
    trackQuery({
      queryText,
      inputMethod: 'text',
    });

    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryText }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch response');
      }

      const aiMsg: MessageProps = {
        role: 'assistant',
        content: data.answer,
        sources: data.sources,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);

      if (data.sources && data.sources.length > 0) {
        setActiveSources(data.sources);
      }

    } catch (err) {
      const errorMsg: MessageProps = {
        role: 'assistant',
        content: err instanceof Error ? err.message : 'An error occurred',
        isError: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const onSend = () => {
    handleQuery(inputValue);
  };

  const onExampleClick = (q: string) => {
    trackQuery({
      queryText: q,
      inputMethod: 'chip',
    });
    handleQuery(q);
  };

  return (
    <div className="flex h-screen bg-gray-50 font-body overflow-hidden">

      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col relative min-w-0 transition-all duration-300 ease-in-out
                       ${isSidebarOpen ? 'mr-0 sm:mr-[420px]' : ''}`}>

        <div className="absolute inset-0 flex flex-col">
          <Header onClear={handleClear} />

          {/* Scrollable Messages Container */}
          <main
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-3 sm:px-4 scrollbar-thin pt-20 sm:pt-24 pb-32 sm:pb-40"
          >
            <div className="max-w-3xl mx-auto">

              {/* Empty State */}
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center 
                                min-h-[50vh] sm:min-h-[60vh] text-center animate-fade-in px-2 sm:px-4">

                  {/* Headline */}
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-black mb-3 sm:mb-4 
                               leading-tight tracking-tight">
                    Ask directly.<br />
                    Verify instantly.
                  </h2>

                  {/* Description */}
                  <p className="text-base sm:text-lg text-gray-500 max-w-md mb-8 sm:mb-12 
                               leading-relaxed font-medium">
                    No summaries forced. No opinions injected.<br />
                    Your questions, answered with citations.
                  </p>

                  {/* Feature Badges — flex-wrap added so they stack on very small screens */}
                  <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8 sm:mb-12">
                    <div className="text-center group">
                      <div className="w-13 h-13 sm:w-14 sm:h-14 bg-white border-2 border-black 
                                    rounded-xl flex items-center justify-center mb-2 
                                    mx-auto shadow-brutal-sm group-hover:bg-black
                                    transition-all" style={{ width: '52px', height: '52px' }}>
                        <ZapIcon size={22} className="group-hover:text-white" />
                      </div>
                      <div className="font-bold text-black text-sm">Your pace</div>
                    </div>
                    <div className="text-center group">
                      <div className="bg-white border-2 border-black 
                                    rounded-xl flex items-center justify-center mb-2 
                                    mx-auto shadow-brutal-sm group-hover:bg-black
                                    transition-all" style={{ width: '52px', height: '52px' }}>
                        <FileDescriptionIcon size={22} className="group-hover:text-white" />
                      </div>
                      <div className="font-bold text-black text-sm">Cited</div>
                    </div>
                    <div className="text-center group">
                      <div className="bg-white border-2 border-black 
                                    rounded-xl flex items-center justify-center mb-2 
                                    mx-auto shadow-brutal-sm group-hover:bg-black
                                    transition-all" style={{ width: '52px', height: '52px' }}>
                        <BrainIcon size={22} className="group-hover:text-white" />
                      </div>
                      <div className="font-bold text-black text-sm">Verified</div>
                    </div>
                  </div>

                  {/* Arrow pointing down */}
                  <div className="animate-bounce text-3xl text-gray-300 font-bold">
                    ↓
                  </div>
                </div>
              )}

              {/* Messages List */}
              <div className="space-y-5 sm:space-y-6">
                {messages.map((msg, idx) => (
                  <ChatMessage
                    key={idx}
                    {...msg}
                    onSourceClick={(sources) => handleSourceClick(sources)}
                  />
                ))}

                {loading && <TypingIndicator />}

                <div ref={messagesEndRef} className="h-4" />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Fixed Input Area - Outside the absolute container */}
      <ChatInput
        input={inputValue}
        setInput={setInputValue}
        onSend={onSend}
        loading={loading}
        onExampleClick={onExampleClick}
        messagesLength={messages.length}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Right Sidebar */}
      <SourcesSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        sources={activeSources}
      />
    </div>
  );
}