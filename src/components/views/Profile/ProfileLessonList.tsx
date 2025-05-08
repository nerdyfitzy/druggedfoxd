"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/ui/spinner";
import { ScrollArea } from "@/components/ui/scroll-area";
import Lesson from "@/components/Lessons/LessonCard";
import { getAllRecentlyViewed, getAllUserWatched } from "@/app/actions/watch";
import { getAllUserBookmarks } from "@/app/actions/bookmark";

type LessonListProps = {
    user: string | undefined;
    type: "bookmarks" | "watched" | "viewed";
};
function ProfileLessonList({ user, type }: LessonListProps) {
    const { isPending, isError, data, error } = useQuery({
        queryKey: [type],
        queryFn: () => {
            if (type === "bookmarks") {
                return getAllUserBookmarks(false);
            } else if (type === "watched") {
                return getAllUserWatched(false);
            } else {
                return getAllRecentlyViewed();
            }
        },
    });

    if (isPending)
        return (
            <div>
                <Spinner />
                Loading...
            </div>
        );
    if (isError) return <div>Error: {error.message}</div>;
    console.log(data, isPending, "weird query");
    return (
        <>
            <span className='absolute right-10 font-bold -z-10'>
                ({data?.length})
            </span>

            <ScrollArea className='h-[125vh] md:pr-4 sm:w-full overflow-x-visible'>
                <div className='w-full flex flex-row flex-wrap sm:max-md:gap-x-2 md:gap-x-4 gap-y-px'>
                    {data?.map(({ Lessons }) => {
                        if (Lessons)
                            return (
                                <Lesson
                                    key={Lessons.id}
                                    lesson={Lessons}
                                    db='allPosts'
                                    userInfo={{
                                        bookmarked: type === "bookmarks",
                                        watched: type === "watched",
                                    }}
                                    isLoggedIn={user !== undefined}
                                />
                            );
                    })}
                </div>
            </ScrollArea>
        </>
    );
}

export default ProfileLessonList;
