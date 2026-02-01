'use client';

import React, { useState, useRef, useEffect } from 'react';
import MicrophoneIcon from './icons/microphone-icon';
import LoaderIcon from './icons/loader-icon';
import { trackQuery } from '@/services/queryTracker';

interface VoiceInputButtonProps {
    onTranscript: (transcript: string) => void;
    onError?: (error: string) => void;
    disabled?: boolean;
}

export default function VoiceInputButton({
    onTranscript,
    onError,
    disabled = false
}: VoiceInputButtonProps) {
    const [mounted, setMounted] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [interimTranscript, setInterimTranscript] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        setMounted(true);
        if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event: any) => {
                let finalTranscript = '';
                let currentInterim = '';

                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    } else {
                        currentInterim += event.results[i][0].transcript;
                    }
                }

                if (finalTranscript) {
                    trackQuery({
                        queryText: finalTranscript,
                        inputMethod: 'voice',
                    });
                    onTranscript(finalTranscript);
                    setIsListening(false);
                } else {
                    setInterimTranscript(currentInterim);
                }
            };

            recognitionRef.current.onerror = (event: any) => {
                const error = event.error || 'Speech recognition error';
                setErrorMessage(error);
                setIsListening(false);
                if (onError) onError(error);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
                setInterimTranscript('');
            };
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [onTranscript, onError]);

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            setErrorMessage('');
            setInterimTranscript('');
            try {
                recognitionRef.current?.start();
                setIsListening(true);
            } catch (err) {
                console.error('Speech recognition start failed:', err);
            }
        }
    };

    if (!mounted) {
        return null; // Avoid hydration mismatch
    }

    if (!recognitionRef.current) {
        return null; // Don't show if speech recognition is not supported
    }

    return (
        <div className="relative group">
            <button
                onClick={toggleListening}
                disabled={disabled}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center 
                  font-bold border-2 transition-all shrink-0 mb-0.5
                  ${isListening
                        ? 'bg-rose-500 border-rose-600 text-white animate-pulse'
                        : 'bg-white border-gray-300 text-gray-500 hover:border-black hover:text-black shadow-offset-sm hover:shadow-brutal-sm'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                title={isListening ? "Stop listening" : "Start voice input"}
            >
                {isListening ? (
                    <div className="relative">
                        <div className="absolute -inset-1 bg-white rounded-full animate-ping opacity-20"></div>
                        <LoaderIcon size={20} className="animate-spin" />
                    </div>
                ) : (
                    <MicrophoneIcon size={20} />
                )}
            </button>

            {/* Interim results tooltip */}
            {isListening && interimTranscript && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 
                      bg-black text-white text-xs p-2 rounded-lg pointer-events-none
                      after:content-[''] after:absolute after:top-full after:left-1/2 
                      after:-translate-x-1/2 after:border-8 after:border-t-black 
                      after:border-transparent">
                    {interimTranscript}...
                </div>
            )}

            {/* Error tooltip */}
            {!isListening && errorMessage && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 
                      bg-rose-500 text-white text-xs p-2 rounded-lg pointer-events-none">
                    {errorMessage}
                </div>
            )}
        </div>
    );
}
