'use client';

import React, { useState } from 'react';
import InputSection from './components/input-section/InputSection';
import ResponseSection from './components/response-section/ResponseSection';
import type { ModelResponse } from './types/responses';

export default function Home() {
  const [responses, setResponses] = useState<ModelResponse[]>([]);

  const handleComparison = async (data: { prompt: string; models: string[] }) => {
    // Set initial loading state for each model
    setResponses(data.models.map(model => ({
      model,
      response: '',
      timeTaken: 0,
      status: 'loading' as const,
    })));

    // Process each model sequentially
    for (const model of data.models) {
      const startTime = Date.now();
      
      try {
        // TODO: Replace with actual API call
        const response = await mockApiCall(data.prompt, model);
        
        setResponses(prev => 
          prev.map(r => 
            r.model === model
              ? {
                  model,
                  response,
                  timeTaken: Date.now() - startTime,
                  status: 'complete' as const,
                }
              : r
          )
        );
      } catch (error) {
        setResponses(prev => 
          prev.map(r => 
            r.model === model
              ? {
                  model,
                  response: '',
                  timeTaken: Date.now() - startTime,
                  status: 'error' as const,
                  error: error instanceof Error ? error.message : 'An error occurred',
                }
              : r
          )
        );
      }
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          LLM Model Comparison
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Section - 4 columns on large screens */}
          <div className="lg:col-span-4">
            <InputSection onSubmit={handleComparison} />
          </div>

          {/* Response Section - 8 columns on large screens */}
          <div className="lg:col-span-8">
            <ResponseSection responses={responses} />
          </div>
        </div>
      </div>
    </main>
  );
}

const mockResponses = {
  'llama-3.3-70b-versatile': (prompt: string) => `[Llama 3.3 70B Analysis]
Input: "${prompt}"

Analysis:
This is a simulated response from the Llama 3.3 70B model. It would typically provide a detailed, nuanced analysis with:
- Comprehensive understanding
- Logical reasoning
- Multiple perspectives
- Relevant examples

The actual implementation will connect to the real API endpoint.`,

  'mixtral-8x7b-32768': (prompt: string) => `[Mixtral 8x7B Analysis]
Prompt: "${prompt}"

Response:
Here's a simulated Mixtral 8x7B response that would showcase:
- Fast processing speed
- Efficient reasoning
- Concise explanations
- Direct answers

This placeholder will be replaced with real API responses.`,

  'gemma2-9b-it': (prompt: string) => `[Gemma2 9B Analysis]
Q: ${prompt}

A: This is a mock Gemma2 9B response demonstrating:
1. Clear structure
2. Step-by-step reasoning
3. Focused answers
4. Learning-oriented approach

Real API integration pending.`,

  'distil-whisper-large-v3-en': (prompt: string) => `[Distil Whisper Analysis]
Input Text: "${prompt}"

Processed Output:
Simulated Whisper model response showing:
* Speech pattern recognition
* Transcription capabilities
* Audio comprehension
* Language processing

This will be replaced with actual API output.`
};

// Enhanced mock API call with realistic scenarios
const mockApiCall = async (prompt: string, model: string): Promise<string> => {
  // Simulate network delay (1-3 seconds)
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

  // Simulate different error scenarios (10% chance)
  if (Math.random() < 0.1) {
    const errors = [
      'Rate limit exceeded. Please try again later.',
      'Model is currently overloaded. Please retry.',
      'Invalid request format.',
      'Model initialization failed.',
      'Connection timeout.'
    ];
    throw new Error(errors[Math.floor(Math.random() * errors.length)]);
  }

  // Return model-specific mock response
  return mockResponses[model as keyof typeof mockResponses](prompt);
};