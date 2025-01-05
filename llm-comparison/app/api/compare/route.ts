// app/api/compare/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for the request
const requestSchema = z.object({
  prompt: z.string().min(1),
  models: z.array(z.enum([
    'llama-3.3-70b-versatile',
    'mixtral-8x7b-32768',
    'gemma2-9b-it',
    'distil-whisper-large-v3-en'
  ])),
  temperature: z.number().min(0).max(1).optional().default(0.7)
});

// Type for the comparison metrics
interface ComparisonMetrics {
  clarity: number;
  accuracy: number;
  depth: number;
  engagement: number;
  helpfulness: number;
  responseTime: number;
}

// Utility function to calculate metrics
function calculateMetrics(response: string, startTime: number): ComparisonMetrics {
  const responseTime = Date.now() - startTime;
  
  // Implement your metric calculation logic here
  // This is a placeholder implementation
  return {
    clarity: Math.random() * 100,
    accuracy: Math.random() * 100,
    depth: Math.random() * 100,
    engagement: Math.random() * 100,
    helpfulness: Math.random() * 100,
    responseTime
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, models, temperature } = requestSchema.parse(body);

    const responses = await Promise.all(models.map(async (model) => {
      const startTime = Date.now();
      
      // Make request to Groq API
      const response = await fetch('https://api.groq.com/v1/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          prompt,
          temperature,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.statusText}`);
      }

      const data = await response.json();
      const generatedText = data.choices[0].text;

      // Calculate metrics for this response
      const metrics = calculateMetrics(generatedText, startTime);

      return {
        model,
        response: generatedText,
        metrics,
      };
    }));

    // Save to database
    // TODO: Implement database saving logic using Prisma

    return NextResponse.json({ responses });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process comparison request' },
      { status: 500 }
    );
  }
}

// lib/metrics.ts
export function analyzeEducationalMetrics(text: string): Partial<ComparisonMetrics> {
  // Implement more sophisticated metric calculation logic
  // This could include:
  // - Text complexity analysis
  // - Keyword density
  // - Sentence structure analysis
  // - Response coherence evaluation
  // For now, this is a placeholder
  return {
    clarity: 0,
    accuracy: 0,
    depth: 0,
    engagement: 0,
    helpfulness: 0
  };
}