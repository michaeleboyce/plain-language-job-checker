'use server';

import OpenAI from 'openai';
import { unstable_cache } from 'next/cache';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type AnalysisResult = {
  isPlainLanguage: boolean;
  reasons: string[];
  suggestion?: string;
};

const analyzeJobTitleInternal = async (jobTitle: string): Promise<AnalysisResult> => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4.1',
    messages: [
      {
        role: 'system',
        content: `You are an expert in plain language writing for federal government job titles. Your task is to analyze whether a given job title follows plain language principles. 
        
Plain language job titles should:
- Be clear and understandable to the general public
- Be compelling and engaging to a potential employee
- Avoid jargon, acronyms, or technical terms unless describing a specialized role where you need to know jargon to do the job or it is a leadership role of a specific office.
- Clearly indicate what the person does
- Use common, everyday words when possible
- Be concise but descriptive
- Technical roles should be written in a way that describes the function of the role, so generic IT Specialist does not work, but software engineer, network engineer, etc. do.

Respond with a JSON object containing:
- "isPlainLanguage": boolean indicating if the title follows plain language principles
- "reasons": array of strings explaining why or why not (provide 2-4 specific reasons)
- "suggestion": if not plain language, provide a suggested alternative title`
      },
      {
        role: 'user',
        content: `Analyze this federal government job title: "${jobTitle}"`
      }
    ],
    temperature: 0.3,
    response_format: { type: 'json_object' }
  });

  return JSON.parse(completion.choices[0].message.content || '{}');
};

const getCachedAnalysis = unstable_cache(
  async (jobTitle: string) => analyzeJobTitleInternal(jobTitle),
  ['job-title-analysis'],
  {
    revalidate: 3600 * 24 * 1, // Cache for 1 day
    tags: ['job-title-analysis'],
  }
);

export async function analyzeJobTitle(jobTitle: string): Promise<AnalysisResult> {
  if (!jobTitle || typeof jobTitle !== 'string') {
    throw new Error('Job title is required');
  }

  const normalizedTitle = jobTitle.trim().toLowerCase();
  
  try {
    return await getCachedAnalysis(normalizedTitle);
  } catch (error) {
    console.error('Error analyzing job title:', error);
    throw new Error('Failed to analyze job title');
  }
}