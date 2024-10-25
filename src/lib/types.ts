import { StaticImageData } from "next/image";

export type NamesToImages = {
  [key: string]: StaticImageData;
};

export type FilterValues = {
  character: string | undefined;
  opponent: string | undefined;
  notes: string | undefined;
  timestamped: boolean;
};

export type Lesson = {
  id: number;
  player: string;
  character: string;
  opponent: string;
  notes: string | null;
  link: string;
  timestamped: boolean;
  date: string | Date;
};

export type NestedReturnedLesson = {
  Lessons: Lesson;
};

export type SearchParamsProps = {
  searchParams: { [key: string]: string | undefined };
};

type Route = {
  path: string;
  name: string;
  renderOnAuth: boolean;
  requiresAuth?: boolean;
  variant: "link" | "default" | "secondary" | "outline" | null;
};

export type TRoutes = Route[];

export type LoginMethods = "google" | "discord" | "email";
