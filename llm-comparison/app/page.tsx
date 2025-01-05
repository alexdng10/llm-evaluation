import React, { useState } from 'react';
import InputSection from '@/components/input-section/InputSection';
import ResponseSection from '@/components/response-section/ResponseSection';
import type { ModelResponse } from '@/types/responses'; // We'll create this type file next

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

// Temporary mock API call - will be replaced with actual API integration
const mockApiCall = async (prompt: string, model: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  if (Math.random() < 0.1) throw new Error('Model API error');
  return `Response from ${model} for prompt: "${prompt}"\n\nThis is a mock response that will be replaced with actual API integration.`;
};