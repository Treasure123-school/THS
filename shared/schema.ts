import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, uuid, jsonb, integer, boolean, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Profiles table for user roles and information
export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().references(() => sql`auth.users(id)`, { onDelete: "cascade" }),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  role: text("role").notNull(), // 'admin', 'teacher', 'student', 'parent'
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Announcements table
export const announcements = pgTable("announcements", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v4()`),
  title: text("title").notNull(),
  content: text("content").notNull(),
  audience: text("audience").array().notNull().default(sql`'{}'::text[]`), // ['all', 'students', 'parents', 'staff']
  createdBy: uuid("created_by").references(() => profiles.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Gallery table for image management
export const gallery = pgTable("gallery", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v4()`),
  title: text("title").notNull(),
  description: text("description"),
  fileUrl: text("file_url").notNull(),
  uploadedBy: uuid("uploaded_by").references(() => profiles.id, { onDelete: "cascade" }),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

// Question bank for exam system
export const questionBank = pgTable("question_bank", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v4()`),
  subject: text("subject").notNull(),
  topic: text("topic").notNull(),
  difficulty: text("difficulty").notNull(), // 'easy', 'medium', 'hard'
  type: text("type").notNull(), // 'mcq', 'short'
  body: text("body").notNull(),
  options: jsonb("options"),
  answerKey: text("answer_key").notNull(),
  createdBy: uuid("created_by").references(() => profiles.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Exams table
export const exams = pgTable("exams", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v4()`),
  title: text("title").notNull(),
  subject: text("subject").notNull(),
  durationMinutes: integer("duration_minutes").notNull(),
  totalMarks: integer("total_marks").notNull(),
  published: boolean("published").default(false),
  createdBy: uuid("created_by").references(() => profiles.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Exam questions junction table
export const examQuestions = pgTable("exam_questions", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v4()`),
  examId: uuid("exam_id").references(() => exams.id, { onDelete: "cascade" }),
  questionId: uuid("question_id").references(() => questionBank.id, { onDelete: "cascade" }),
  points: integer("points").notNull(),
});

// Exam attempts
export const examAttempts = pgTable("exam_attempts", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v4()`),
  examId: uuid("exam_id").references(() => exams.id, { onDelete: "cascade" }),
  studentId: uuid("student_id").references(() => profiles.id, { onDelete: "cascade" }),
  startedAt: timestamp("started_at").defaultNow(),
  submittedAt: timestamp("submitted_at"),
  score: numeric("score"),
  autoGraded: boolean("auto_graded").default(false),
});

// Exam answers
export const examAnswers = pgTable("exam_answers", {
  id: uuid("id").primaryKey().default(sql`uuid_generate_v4()`),
  attemptId: uuid("attempt_id").references(() => examAttempts.id, { onDelete: "cascade" }),
  questionId: uuid("question_id").references(() => questionBank.id, { onDelete: "cascade" }),
  answer: jsonb("answer"),
  isCorrect: boolean("is_correct"),
});

// Zod schemas for validation
export const insertProfileSchema = createInsertSchema(profiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAnnouncementSchema = createInsertSchema(announcements).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertGallerySchema = createInsertSchema(gallery).omit({
  id: true,
  uploadedAt: true,
});

export const insertQuestionSchema = createInsertSchema(questionBank).omit({
  id: true,
  createdAt: true,
});

export const insertExamSchema = createInsertSchema(exams).omit({
  id: true,
  createdAt: true,
});

// Types
export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = z.infer<typeof insertProfileSchema>;

export type Announcement = typeof announcements.$inferSelect;
export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;

export type GalleryItem = typeof gallery.$inferSelect;
export type InsertGalleryItem = z.infer<typeof insertGallerySchema>;

export type Question = typeof questionBank.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;

export type Exam = typeof exams.$inferSelect;
export type InsertExam = z.infer<typeof insertExamSchema>;

export type ExamQuestion = typeof examQuestions.$inferSelect;
export type ExamAttempt = typeof examAttempts.$inferSelect;
export type ExamAnswer = typeof examAnswers.$inferSelect;

// Contact form schema (for API validation)
export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactForm = z.infer<typeof contactFormSchema>;
