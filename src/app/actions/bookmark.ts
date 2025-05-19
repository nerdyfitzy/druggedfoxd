"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import type { BookmarkedLesson } from "@/utils/types";

const createClientGetUser = async () => {

    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return [supabase, user]
}

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
            //here because we have to reformat the data into a way our frontend can interpret
            //but only if the request was for idOnly
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


export async function isBookmarked(lesson: number) {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        const { data, error } = await supabase
            .from("Bookmarked_Lessons")
            .select("*")
            .eq("lessonId", lesson);

        if (error) {
            throw new Error(`Failed to check bookmark status: ${error.message}`);
        }

        return data?.length > 0;
    }

    return false;
}
