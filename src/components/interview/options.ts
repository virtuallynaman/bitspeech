import {
  technologyValues,
  type InterviewType,
  type Level,
  type Role,
} from "@/lib/constants/interview";

type ChoiceOption<T extends string> = {
  label: string;
  value: T;
  description?: string;
};

export const typeOptions = [
  {
    label: "Technical",
    value: "technical",
    description: "Questions about the technologies and concepts for your role.",
  },
  {
    label: "Behavioral",
    value: "behavioral",
    description: "Questions about your experiences, decisions, and working style.",
  },
  {
    label: "Mixed",
    value: "mixed",
    description: "A combination of technical and behavioral questions.",
  },
] as const satisfies readonly ChoiceOption<InterviewType>[];

export const levelOptions = [
  { label: "Junior", value: "junior" },
  { label: "Mid-Level", value: "mid-level" },
  { label: "Senior", value: "senior" },
] as const satisfies readonly ChoiceOption<Level>[];

export const roleOptions = [
  { label: "Full-Stack", value: "fullstack" },
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
] as const satisfies readonly ChoiceOption<Role>[];

export const technologyOptions = technologyValues;