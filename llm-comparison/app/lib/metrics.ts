// app/lib/metrics.ts
import _ from 'lodash';

interface ComparisonMetrics {
  clarity: number;
  accuracy: number;
  depth: number;
  engagement: number;
  helpfulness: number;
  responseTime: number;
}

// Utility function to normalize scores to 0-100 range
function normalizeScore(score: number, min: number, max: number): number {
  return Math.min(100, Math.max(0, ((score - min) / (max - min)) * 100));
}

// Calculate text complexity using readability metrics
function calculateTextComplexity(text: string): number {
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const words = text.split(/\s+/).filter(Boolean);
  const syllables = words.reduce((count, word) => {
    return count + countSyllables(word.toLowerCase());
  }, 0);

  // Calculate Flesch-Kincaid Grade Level
  const avgSentenceLength = words.length / sentences.length;
  const avgSyllablesPerWord = syllables / words.length;
  const gradeLevel = 0.39 * avgSentenceLength + 11.8 * avgSyllablesPerWord - 15.59;

  // Normalize to 0-100 scale (typical grade levels range from 0-18)
  return normalizeScore(gradeLevel, 0, 18);
}

// Count syllables in a word (simplified approach)
function countSyllables(word: string): number {
  const vowels = 'aeiouy';
  let count = 0;
  let prevChar = '';

  for (let i = 0; i < word.length; i++) {
    if (vowels.includes(word[i]) && !vowels.includes(prevChar)) {
      count++;
    }
    prevChar = word[i];
  }

  // Handle silent e
  if (word.length > 2 && word.endsWith('e') && !vowels.includes(word[word.length - 2])) {
    count--;
  }

  return Math.max(1, count);
}

// Measure structural coherence
function measureStructuralCoherence(text: string): number {
  const paragraphs = text.split('\n\n').filter(Boolean);
  const hasIntroduction = paragraphs[0]?.length > 100;
  const hasConclusion = paragraphs[paragraphs.length - 1]?.length > 100;
  const avgParagraphLength = _.meanBy(paragraphs, 'length');
  const paragraphLengthVariance = _.variance(paragraphs.map(p => p.length)) || 0;

  // Score based on structure characteristics
  let score = 0;
  score += hasIntroduction ? 25 : 0;
  score += hasConclusion ? 25 : 0;
  score += normalizeScore(avgParagraphLength, 100, 500) * 0.25;
  score += (1 - normalizeScore(paragraphLengthVariance, 0, 10000)) * 0.25;

  return score;
}

// Analyze technical depth and detail
function analyzeTechnicalDepth(text: string): number {
  // Look for indicators of detailed explanations
  const technicalIndicators = [
    /\b(?:framework|language|library|api|database|schema)\b/gi,
    /\b(?:function|method|class|interface|type)\b/gi,
    /\b(?:example|instance|case study)\b/gi,
    /```[\s\S]*?```/g, // Code blocks
    /\b(?:specifically|particularly|notably|importantly)\b/gi,
    /\b(?:because|therefore|thus|hence|consequently)\b/gi
  ];

  const matches = technicalIndicators.reduce((count, regex) => {
    const matches = text.match(regex) || [];
    return count + matches.length;
  }, 0);

  // Normalize based on text length and match count
  const textLength = text.length;
  const density = (matches / textLength) * 1000;
  return normalizeScore(density, 0, 2);
}

// Measure engagement through interactive elements
function measureEngagement(text: string): number {
  const engagementIndicators = {
    questions: (text.match(/\?/g) || []).length,
    examples: (text.match(/(?:for example|e\.g\.|such as|like)/gi) || []).length,
    codeSnippets: (text.match(/```[\s\S]*?```/g) || []).length,
    explanatoryPhrases: (text.match(/(?:in other words|to clarify|think of it as|imagine|consider)/gi) || []).length,
    interactivePrompts: (text.match(/(?:try this|let's|now you can|you might want to)/gi) || []).length
  };

  const totalIndicators = Object.values(engagementIndicators).reduce((a, b) => a + b, 0);
  const textLength = text.length;
  const densityScore = (totalIndicators / textLength) * 1000;

  return normalizeScore(densityScore, 0, 1);
}

// Measure helpfulness through practical application
function measureHelpfulness(text: string): number {
  const helpfulnessIndicators = {
    practicalExamples: (text.match(/(?:here's an example|for instance|in practice)/gi) || []).length,
    stepByStep: (text.match(/(?:first|second|third|finally|next|then|lastly)/gi) || []).length,
    solutions: (text.match(/(?:solution|resolve|fix|handle|deal with|approach)/gi) || []).length,
    alternatives: (text.match(/(?:alternatively|another way|option|could also|instead)/gi) || []).length,
    implementation: (text.match(/(?:implement|use|apply|create|build|develop)/gi) || []).length
  };

  const totalIndicators = Object.values(helpfulnessIndicators).reduce((a, b) => a + b, 0);
  const textLength = text.length;
  const densityScore = (totalIndicators / textLength) * 1000;

  return normalizeScore(densityScore, 0, 1);
}

export function analyzeEducationalMetrics(text: string): Partial<ComparisonMetrics> {
  // Calculate individual metrics
  const clarity = calculateTextComplexity(text);
  const coherence = measureStructuralCoherence(text);
  const depth = analyzeTechnicalDepth(text);
  const engagement = measureEngagement(text);
  const helpfulness = measureHelpfulness(text);

  // Combine clarity metrics
  const finalClarity = (clarity * 0.6 + coherence * 0.4);

  return {
    clarity: Math.round(finalClarity),
    depth: Math.round(depth),
    engagement: Math.round(engagement),
    helpfulness: Math.round(helpfulness),
    accuracy: 0 // Note: Accuracy requires comparison with ground truth or expert evaluation
  };
}

export function calculateMetrics(response: string, startTime: number): ComparisonMetrics {
  const responseTime = Date.now() - startTime;
  const metrics = analyzeEducationalMetrics(response);

  return {
    clarity: metrics.clarity || 0,
    accuracy: metrics.accuracy || 0, // Will need human evaluation or fact-checking
    depth: metrics.depth || 0,
    engagement: metrics.engagement || 0,
    helpfulness: metrics.helpfulness || 0,
    responseTime
  };
}