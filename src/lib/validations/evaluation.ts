import { z } from "zod";

const criteriaSchema = z.object({
  name: z.string().nonempty(),
  score: z.number().int().min(0).max(100),
  feedback: z.string().nonempty()
});

export const evaluationSchema = z.object({
  overallScore: z.number().int().min(0).max(100),
  summary: z.string().nonempty(),
  strengths: z.array(z.string().nonempty()),
  areasToImprove: z.array(z.string().nonempty()),
  criteria: z.array(criteriaSchema).min(1),
});

export type Evaluation = z.infer<typeof evaluationSchema>;