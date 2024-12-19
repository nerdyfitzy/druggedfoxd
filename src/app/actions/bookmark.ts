"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export const changeBookmarked = async (lesson: number, toStatus: boolean) => {
  console.log("Changing bookmark of ", lesson, "to", toStatus);
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  if (toStatus) {
    const { error } = await supabase
      .from("Bookmarked_Lessons")
      .insert([
        {
          userId: user.id,
          lessonId: lesson,
        },
      ])
      .select();

    if (error) {
      throw new Error(`Failed to bookmark lesson: ${error.message}`);
    } else {
      console.log("Successfully Marked", lesson, "As Bookmarked", toStatus);
      return toStatus;
    }
  } else {
    const { error } = await supabase
      .from("Bookmarked_Lessons")
      .delete()
      .eq("lessonId", lesson)
      .eq("userId", user.id);

    if (error) {
      throw new Error(`Failed to remove bookmark: ${error.message}`);
    } else {
      console.log("Successfully Marked", lesson, "As Bookmarked", toStatus);
      return toStatus;
    }
  }
};

export async function getAllUserBookmarks<T extends boolean>(
  idOnly: T
): Promise<T extends true ? number[] : BookmarkedLesson[]> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase
      .from("Bookmarked_Lessons")
      .select(`Lessons (${idOnly ? "id" : "*"})`)
      .eq("userId", user.id)
      .order("createdAt", { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch bookmarks: ${error.message}`);
    } else {
      if (idOnly) {
        const res = data
          .map((item) => item.Lessons?.id)
          .filter((id): id is number => id !== undefined);
        return res as T extends true ? number[] : BookmarkedLesson[];
      }
      return data as T extends true ? number[] : BookmarkedLesson[];
    }
  } else {
    return [] as unknown as T extends true ? number[] : BookmarkedLesson[];
  }
}

interface BookmarkedLesson {
  Lessons: {
    id: number;
    character: string;
    date: string;
    link: string;
    notes: string | null;
    opponent: string;
    player: string;
    timestamped: boolean;
  };
}

export async function isBookmarked(lesson: number) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data, error } = await supabase
      .from("Bookmarked_Lessons")
      .select("*")
      .eq("lessonId", Number(lesson));

    if (error) {
      throw new Error(`Failed to check bookmark status: ${error.message}`);
    }

    return data?.length > 0;
  }

  return false;
}
