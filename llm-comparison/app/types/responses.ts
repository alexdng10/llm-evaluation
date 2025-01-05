export interface ModelResponse {
    model: string;
    response: string;
    timeTaken: number;
    status: 'loading' | 'complete' | 'error';
    error?: string;
  }
  
  export interface ComparisonRequest {
    prompt: string;
    models: string[];
  }
  
  export interface ComparisonResponse {
    responses: ModelResponse[];
    metrics?: {
      totalTime: number;
      averageTime: number;
      successRate: number;
    };
  }