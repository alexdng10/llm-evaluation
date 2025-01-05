import React from 'react';

interface ModelResponse {
  model: string;
  response: string;
  timeTaken: number;
  status: 'loading' | 'complete' | 'error';
  error?: string;
}

interface ResponseSectionProps {
  responses: ModelResponse[];
}

const ResponseSection: React.FC<ResponseSectionProps> = ({ responses }) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      {responses.map((response, index) => (
        <div 
          key={response.model + index}
          className="bg-white rounded-lg shadow-lg p-6 flex flex-col"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{response.model}</h3>
            <span className="text-sm text-gray-500">
              {response.status === 'complete' && `${response.timeTaken}ms`}
            </span>
          </div>

          {response.status === 'loading' && (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}

          {response.status === 'error' && (
            <div className="flex items-center text-red-500 p-4 bg-red-50 rounded-md">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{response.error || 'An error occurred'}</span>
            </div>
          )}

          {response.status === 'complete' && (
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap">{response.response}</div>
            </div>
          )}
          
          {response.status === 'complete' && (
            <div className="mt-4 flex justify-end space-x-2">
              <button
                type="button"
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                onClick={() => navigator.clipboard.writeText(response.response)}
              >
                Copy
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResponseSection;