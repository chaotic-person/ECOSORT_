// recycling-performance-analysis.ts
'use server';

/**
 * @fileOverview Analyzes household recyclable waste percentages and provides actionable insights and suggests improvements for underperforming households.
 *
 * - analyzeRecyclingPerformance - A function that analyzes recycling performance.
 * - AnalyzeRecyclingPerformanceInput - The input type for the analyzeRecyclingPerformance function.
 * - AnalyzeRecyclingPerformanceOutput - The return type for the analyzeRecyclingPerformance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeRecyclingPerformanceInputSchema = z.object({
  recyclableWastePercentage: z
    .number()
    .describe(
      'The percentage of recyclable waste contributed by a household (e.g., 75 for 75%).'
    ),
  householdDetails: z
    .string()
    .describe('Additional details about the household, like the size of the household, demographics, location, etc.'),
  municipalityName: z
    .string()
    .describe('Name of the Municipality'),
});

export type AnalyzeRecyclingPerformanceInput = z.infer<
  typeof AnalyzeRecyclingPerformanceInputSchema
>;

const AnalyzeRecyclingPerformanceOutputSchema = z.object({
  analysis: z
    .string()
    .describe(
      'An analysis of the household recycling performance, including whether targets are on track, and tailored recommendations for improvement for households that are underperforming.'
    ),
});

export type AnalyzeRecyclingPerformanceOutput = z.infer<
  typeof AnalyzeRecyclingPerformanceOutputSchema
>;

export async function analyzeRecyclingPerformance(
  input: AnalyzeRecyclingPerformanceInput
): Promise<AnalyzeRecyclingPerformanceOutput> {
  return analyzeRecyclingPerformanceFlow(input);
}

const analyzeRecyclingPerformancePrompt = ai.definePrompt({
  name: 'analyzeRecyclingPerformancePrompt',
  input: {
    schema: AnalyzeRecyclingPerformanceInputSchema,
  },
  output: {
    schema: AnalyzeRecyclingPerformanceOutputSchema,
  },
  prompt: `You are an expert in municipal waste management and recycling programs.

You are helping the city of {{{municipalityName}}} analyze the recycling performance of individual households and provide actionable insights.

Analyze the recycling performance of the household, taking into account the recyclable waste percentage and any additional household details provided.

Recyclable Waste Percentage: {{{recyclableWastePercentage}}}%
Household Details: {{{householdDetails}}}

Based on this information, provide a detailed analysis of their recycling performance.

If the household is underperforming, provide concrete and actionable recommendations for improvement, tailored to their specific situation.

Consider factors like education, convenience, access to recycling facilities, and any other relevant information.

Be encouraging and positive in your feedback.`,
});

const analyzeRecyclingPerformanceFlow = ai.defineFlow(
  {
    name: 'analyzeRecyclingPerformanceFlow',
    inputSchema: AnalyzeRecyclingPerformanceInputSchema,
    outputSchema: AnalyzeRecyclingPerformanceOutputSchema,
  },
  async input => {
    const {output} = await analyzeRecyclingPerformancePrompt(input);
    return output!;
  }
);
