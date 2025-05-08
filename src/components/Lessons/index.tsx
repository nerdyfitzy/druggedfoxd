"use client";

import React from "react";
import Spinner from "@/components/ui/spinner";
import { ScrollArea } from "@/components/ui/scroll-area";
import Lesson from "@/components/Lessons/LessonCard";
import { FilterValues } from "@/lib/types";
import PostsPagination from "../views/AllPosts/Pagination";
import { useLessonsQuery } from "@/hooks/useLessonsQuery";
import { useBookmarksQuery } from "@/hooks/useBookmarksQuery";
import { useWatchedQuery } from "@/hooks/useWatchedQuery";
type LessonListProps = {
    user: string | undefined;
    db: "allPosts" | "newUploads";
    filters: FilterValues;
    pagination: { page: number; amount: number };
};
function LessonList({ user, db, filters, pagination }: LessonListProps) {
    const { character, opponent, notes, timestamped } = filters;
    const { page, amount } = pagination;
    const { data, isPending, isError, error } = useLessonsQuery(
        db,
        { character, opponent, notes, timestamped },
        { page, amount }
    );
    const { data: bookmarksData, isPending: bookmarksIsPending } =
        useBookmarksQuery();
    const { data: watchedData, isPending: watchedIsPending } = useWatchedQuery();

    if (isPending || bookmarksIsPending || watchedIsPending) {
        return (
            <div className='flex flex-row justify-center'>
                <Spinner />
                Loading...
            </div>
        );
    }
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <>
            {db === "allPosts" && (
                <span className='absolute right-10 font-bold -z-10'>
                    ({data?.count})
                </span>
            )}

            <ScrollArea className='h-[125vh] md:pr-4 sm:w-full overflow-x-visible'>
                <div className='w-full flex flex-row flex-wrap sm:max-md:gap-x-2 md:gap-x-4 gap-y-px'>
                    {data?.data.map((lesson) => (
                        <Lesson
                            key={lesson.id}
                            lesson={lesson}
                            db={db}
                            userInfo={{
                                bookmarked: bookmarksData?.includes(lesson.id) || false,
                                watched: watchedData?.includes(lesson.id) || false,
                            }}
                            isLoggedIn={user !== undefined}
                        />
                    ))}
                </div>
            </ScrollArea>
            {db === "allPosts" && (
                <PostsPagination
                    page={page}
                    totalPages={Math.ceil(Number(data?.count) / amount)}
                />
            )}
        </>
    );
}

export default LessonList;
