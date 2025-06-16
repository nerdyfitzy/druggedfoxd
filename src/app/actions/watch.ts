"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import type { WatchedLesson } from "@/utils/types";


export async function getAllUserWatched<T extends boolean>(
    idOnly: T
): Promise<T extends true ? number[] : WatchedLesson[]> {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        const { data, error } = await supabase
            .from("Watched_Lessons")
            .select(`Lessons (${idOnly ? "id" : "*"})`)
            .eq("userId", user.id)
            .order("createdAt", { ascending: false });

        if (error) {
            throw new Error(`Failed to fetch watched lessons: ${error.message}`);
        } else {
            if (idOnly) {
                const res = data
                    .map((item) => item.Lessons?.id)
                    .filter((id): id is number => id !== undefined);
                return res as T extends true ? number[] : WatchedLesson[];
            }
            return data as T extends true ? number[] : WatchedLesson[];
        }
    } else {
        return [] as unknown as T extends true ? number[] : WatchedLesson[];
    }
}

export const isWatched = async (lesson: number) => {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (user) {
        const { data, error } = await supabase
            .from("Watched_Lessons")
            .select("*")
            .eq("lessonId", lesson)
            .eq("userId", user.id);
        if (error) throw new Error(error.message);
        if (data?.length) return true;
        else return false;
    }

    return false;
};

export const logLessonAsViewed = async (lesson: number) => {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        const { error } = await supabase
            .from("Recently_Viewed")
            .insert([
                {
                    userId: user.id,
                    lessonId: lesson,
                },
            ])
            .select();

        if (error) throw new Error(error.message)
    }

    return
};
export const markWatched = async (lesson: number, toStatus: boolean) => {
    console.log("Changing watched of ", lesson, "to", toStatus);
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    if (toStatus) {
        const { error } = await supabase
            .from("Watched_Lessons")
            .insert([
                {
                    userId: user.id,
                    lessonId: lesson,
                },
            ])
            .select();

        if (error) throw new Error(error.message);
        else {
            console.log("Successfully Marked", lesson, "As Watched", toStatus);
            return toStatus;
        }
    } else {
        const { error } = await supabase
            .from("Watched_Lessons")
            .delete()
            .eq("lessonId", lesson)
            .eq("userId", user.id);

        if (error) throw new Error(error.message);
        else {
            console.log("Successfully Marked", lesson, "As Watched", toStatus);
            return toStatus;
        }
    }
};

export const getAllRecentlyViewed = async () => {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/login");

    const { data, error } = await supabase
        .from("Recently_Viewed")
        .select("Lessons (*)")
        .order("createdAt", { ascending: false })
        .eq("userId", user.id)
        .limit(5);

    if (error) throw new Error(error.message);
    else return data;
};
