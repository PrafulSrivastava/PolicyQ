import React, { useRef, useEffect } from 'react';
import SendIcon from './icons/send-icon';
import LoaderIcon from './icons/loader-icon';
import VoiceInputButton from './VoiceInputButton';

interface ChatInputProps {
    input: string;
    setInput: (val: string) => void;
    onSend: () => void;
    loading: boolean;
    onExampleClick: (q: string) => void;
    messagesLength: number;
    isSidebarOpen?: boolean;
}

// Purposeful example queries - not tutorial-like, not vague
const EXAMPLE_QUESTIONS = [
    "What does this policy actually say?",
    "Who does this apply to?",
    "What are the exceptions?",
    "Show me the deadlines",
];

const MAX_CHARS = 500;

export default function ChatInput({
    input,
    setInput,
    onSend,
    loading,
    onExampleClick,
    messagesLength,
    isSidebarOpen = false
}: ChatInputProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (input.trim() && !loading) {
                onSend();
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        if (val.length <= MAX_CHARS) {
            setInput(val);
        }
    };

    // Auto-resize
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 128)}px`;
        }
    }, [input]);

    const handleVoiceTranscript = (transcript: string) => {
        setInput(transcript);
        // We wait a bit for setInput to take effect before sending
        setTimeout(() => {
            onSend();
        }, 100);
    };

    return (
        <div className={`fixed bottom-0 left-0 bg-white border-t-3 border-black z-40 transition-all duration-300 ${isSidebarOpen ? 'right-0 sm:right-[420px]' : 'right-0'}`}>
            <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2 sm:py-5">

                {/* Suggested Questions (only if chat is empty) - DISABLED FOR NOW */}
                {/* 
                {messagesLength === 0 && (
                    <div className="mb-5 animate-fade-in">
                        <p className="text-sm text-gray-500 mb-3 font-bold uppercase tracking-wide">
                            Or start with
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {EXAMPLE_QUESTIONS.map((q, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => onExampleClick(q)}
                                    className="px-5 py-3 bg-white border-2 border-gray-300 
                                              rounded-xl font-bold text-gray-700 text-sm
                                              hover:bg-black hover:text-white hover:border-black
                                              transition-all shadow-offset-sm hover:shadow-brutal-sm 
                                              hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                */}

                {/* Main Input */}
                <div className="relative">
                    <div className={`flex items-end gap-2 sm:gap-3 bg-white rounded-2xl p-1.5 sm:p-3
                                  border-2 border-gray-300 
                                  focus-within:border-black focus-within:border-2
                                  focus-within:shadow-brutal-sm
                                  transition-all`}>

                        {/* Textarea */}
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask about the policy..."
                            rows={1}
                            className="flex-1 min-w-0 bg-transparent border-0 outline-none 
                                     resize-none py-1 sm:py-2 px-2 text-[15px] text-gray-900 font-medium
                                     placeholder:text-gray-400 max-h-32 
                                     scrollbar-thin"
                        />

                        {/* Character Counter — hidden on mobile, shown on sm+ (inline with buttons) */}
                        <span className={`text-xs font-mono shrink-0 mb-3 transition-colors hidden sm:inline-block
                                       ${input.length >= MAX_CHARS
                                ? 'text-red-500 font-bold'
                                : 'text-gray-400'}`}>
                            {input.length}/{MAX_CHARS}
                        </span>

                        {/* Voice Input Button */}
                        <div className="mb-0.5 shrink-0">
                            <VoiceInputButton
                                onTranscript={handleVoiceTranscript}
                                disabled={loading}
                            />
                        </div>

                        {/* Send Button */}
                        <button
                            onClick={onSend}
                            disabled={!input.trim() || loading}
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center 
                                      font-bold border-2 transition-all shrink-0 mb-0.5
                                      ${input.trim() && !loading
                                    ? 'bg-black border-black text-white shadow-brutal-sm hover:-translate-y-0.5 active:translate-y-0'
                                    : 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                                }`}
                            title="Send"
                        >
                            {loading ? (
                                <LoaderIcon size={20} />
                            ) : (
                                <SendIcon size={20} color={input.trim() ? 'white' : '#9CA3AF'} />
                            )}
                        </button>
                    </div>

                    {/* Mobile-only character counter — sits below the input group */}
                    <div className="flex justify-end mt-1 sm:hidden">
                        <span className={`text-xs font-mono transition-colors 
                                       ${input.length >= MAX_CHARS
                                ? 'text-red-500 font-bold'
                                : 'text-gray-400'}`}>
                            {input.length}/{MAX_CHARS}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}