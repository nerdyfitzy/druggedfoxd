import {
  pgTable,
  integer,
  text,
  timestamp,
  serial,
  date,
  boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable("", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const lessons = pgTable('"public"."Lessons"', {
  id: serial("id").primaryKey(),
  player: text("player").notNull(),
  opponent: text("opponent").notNull(),
  date: date("date").notNull(),
  link: text("link").notNull().unique(),
  timestamped: boolean("timestamped").default(false),
  notes: text("notes"),
});

export const newUploads = pgTable("new_uploads", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").references(() => lessons.id),
});

export const bookmarkedLessons = pgTable("bookmarked_lessons", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").references(() => lessons.id),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const watchedLessons = pgTable("watched_lessons", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").references(() => lessons.id),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const recentlyWatched = pgTable("recently_watched", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").references(() => lessons.id),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});
