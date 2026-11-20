import { index, integer, jsonb, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { sql } from "drizzle-orm";
import {
  type InterviewType, type Level, type Role, type Technology,
} from "@/lib/constants/interview";


export const interviews = pgTable(
  "interviews",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    interviewType: text("interview_type").$type<InterviewType>().notNull(),
    level: text("level").$type<Level>().notNull(),
    role: text("role").$type<Role>(),
    technologies: text("technologies").array().$type<Technology[]>()
      .notNull()
      .default(sql`'{}'::text[]`),
    status: text("status").notNull().default("pending"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    startedAt: timestamp("started_at", { withTimezone: true }),
    endedAt: timestamp("ended_at", { withTimezone: true }),
  },
  (table) => [
    index("interviews_user_created_at_idx").on(
      table.userId,
      table.createdAt,
    )
  ],
);

export const interview_messages = pgTable(
  "interview_messages",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    interviewId: uuid("interview_id")
      .notNull()
      .references(() => interviews.id, { onDelete: "cascade" }),
    itemId: text("item_id").notNull(),
    role: text("role").notNull(),
    content: text("content").notNull(),
    sequence: integer("sequence").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull()
  },
  (table) => [
    uniqueIndex("interview_messages_interview_item_idx").on(
      table.interviewId,
      table.itemId,
    ),
    index("interview_messages_interview_sequence_idx").on(
      table.interviewId,
      table.sequence,
    )
  ]
);