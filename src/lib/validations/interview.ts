
import { z } from "zod";

import {
  levelValues,
  roleValues,
  technologyValues,
} from "@/lib/constants/interview";

// Reusable schemas
const levelSchema = z.enum(levelValues);
const roleSchema = z.enum(roleValues);
const technologySchema = z.enum(technologyValues);

// At least one technology, without duplicates
const technologiesSchema = z
  .array(technologySchema)
  .min(1, "Select at least one technology.")
  .refine(
    (items) => new Set(items).size === items.length,
    "Duplicate technologies are not allowed."
  );

// Shared fields for technical and mixed interviews
const technicalFields = {
  level: levelSchema,
  role: roleSchema,
  technologies: technologiesSchema,
};

// Interview setup validation
export const interviewSetupSchema = z.discriminatedUnion("interviewType", [
  // Behavioral
  z.object({
    interviewType: z.literal("behavioral"),
    level: levelSchema,
  }),

  // Technical
  z.object({
    interviewType: z.literal("technical"),
    ...technicalFields,
  }),

  // Mixed
  z.object({
    interviewType: z.literal("mixed"),
    ...technicalFields,
  }),
]);

// Infer TypeScript type directly from the schema
export type InterviewSetupInput = z.infer<typeof interviewSetupSchema>;