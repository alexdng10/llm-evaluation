'use client';

import React, { useState } from 'react';

interface InputSectionProps {
  onSubmit?: (data: { prompt: string; models: string[] }) => void;
}

const AVAILABLE_MODELS = [
  'llama-3.3-70b-versatile',
  'mixtral-8x7b-32768',
  'gemma2-9b-it',
  'distil-whisper-large-v3-en'
] as const;

const InputSection: React.FC<InputSectionProps> = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleModelSelect = (model: string) => {
    setSelectedModels(prev => 
      prev.includes(model) 
        ? prev.filter(m => m !== model)
        : [...prev, model]
    );
  };

  const handleSubmit = async () => {
    if (!prompt.trim() || selectedModels.length === 0) return;
    
    setIsSubmitting(true);
    try {
      onSubmit?.({ prompt, models: selectedModels });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-black">Model Comparison Input</h2>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-black">
            Enter your prompt:
          </label>
          <textarea
            placeholder="Type your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full min-h-32 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-black">
            Select models to compare:
          </label>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_MODELS.map((model) => (
              <button
                key={model}
                onClick={() => handleModelSelect(model)}
                className={`px-4 py-2 rounded-md text-sm transition-colors
                  ${selectedModels.includes(model)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                  }`}
                type="button"
              >
                {model}
              </button>
            ))}
          </div>
        </div>

        {selectedModels.length === 0 && (
          <div className="flex items-center gap-2 text-yellow-600">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className="text-sm">Please select at least one model</span>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={!prompt.trim() || selectedModels.length === 0 || isSubmitting}
          className={`w-full py-2 px-4 rounded-md text-white font-medium
            ${(!prompt.trim() || selectedModels.length === 0 || isSubmitting)
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
            }`}
          type="button"
        >
          {isSubmitting ? 'Comparing...' : 'Compare Models'}
        </button>
      </div>
    </div>
  );
};

export default InputSection;