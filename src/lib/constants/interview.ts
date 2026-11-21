export const interviewTypeValues = [
  "technical",
  "behavioral",
  "mixed",
] as const;

export const levelValues = [
  "junior",
  "mid-level",
  "senior",
] as const;

export const roleValues = [
  "fullstack",
  "frontend",
  "backend",
] as const;

export const technologyValues = [
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "PostgreSQL",
  "Web Development",
  "Computer Science",
] as const;

export const interviewStatusValues = ["pending", "in_progress", "completed"] as const;

export type InterviewType = (typeof interviewTypeValues)[number];
export type Level = (typeof levelValues)[number];
export type Role = (typeof roleValues)[number];
export type Technology = (typeof technologyValues)[number];
export type InterviewStatus = (typeof interviewStatusValues)[number];