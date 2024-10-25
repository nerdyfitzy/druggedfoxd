"use client";

import { getLessons } from "@/app/actions/lessons";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Spinner from "@/components/ui/spinner";
import { ScrollArea } from "@/components/ui/scroll-area";
import Lesson from "@/components/Lessons/LessonCard";
import { FilterValues } from "@/lib/types";
import PostsPagination from "../views/AllPosts/Pagination";
import { getAllUserBookmarks } from "@/app/actions/bookmark";
import { getAllUserWatched } from "@/app/actions/watch";
type LessonListProps = {
  user: string | undefined;
  db: "allPosts" | "newUploads";
  filters: FilterValues;
  pagination: { page: number; amount: number };
};
function LessonList({ user, db, filters, pagination }: LessonListProps) {
  const { character, opponent, notes, timestamped } = filters;
  const { page, amount } = pagination;
  const lessonsQuery = useQuery({
    queryKey: [db, character, opponent, notes, timestamped, page, amount],
    queryFn: async () =>
      await getLessons(
        { character, opponent, notes, timestamped },
        { page, amount }
      ),
  });
  const bookmarksQuery = useQuery({
    queryKey: ["bookmarks", "idOnly"],
    queryFn: () => getAllUserBookmarks(true),
  });
  const watchedQuery = useQuery({
    queryKey: ["watched", "idOnly"],
    queryFn: () => getAllUserWatched(true),
  });

  if (bookmarksQuery.isSuccess) console.log(bookmarksQuery.data);

  if (
    lessonsQuery.isPending ||
    bookmarksQuery.isPending ||
    watchedQuery.isPending
  )
    return (
      <div>
        <Spinner />
        Loading...
      </div>
    );
  if (lessonsQuery.isError)
    return <div>Error: {lessonsQuery.error.message}</div>;

  return (
    <>
      {db === "allPosts" && (
        <span className='absolute right-10 font-bold -z-10'>
          ({lessonsQuery.data?.count})
        </span>
      )}

      <ScrollArea className='sm:max-md:h-[44%] pr-4 sm:w-full'>
        <div className='h-1/2 w-full flex flex-row flex-wrap sm:max-md:gap-x-2 md:gap-x-4 gap-y-px'>
          {lessonsQuery.data?.data.map((lesson) => (
            <Lesson
              key={lesson.id}
              lesson={lesson}
              db={db}
              userInfo={{
                bookmarked: bookmarksQuery.data?.includes(lesson.id) || false,
                watched: watchedQuery.data?.includes(lesson.id) || false,
              }}
              isLoggedIn={user !== undefined}
            />
          ))}
        </div>
      </ScrollArea>
      {db === "allPosts" && (
        <PostsPagination
          page={page}
          totalPages={Math.ceil(Number(lessonsQuery.data?.count) / amount)}
        />
      )}
    </>
  );
}

export default LessonList;
