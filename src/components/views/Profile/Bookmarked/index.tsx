import React from "react";
import { getAllUserBookmarks } from "@/app/actions/bookmark";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { useUser } from "@/hooks/useUser";
import ProfileLessonList from "../ProfileLessonList";

async function Bookmarked() {
  const queryClient = new QueryClient();
  const user = await useUser();
  await queryClient.prefetchQuery({
    queryKey: ["bookmarks"],
    queryFn: () => getAllUserBookmarks(false),
  });
  return (
    <>
      <section className='flex relative flex-col sm:max-md:h-full md:w-1/3 gap-4'>
        <h2 className='sm:max-md:text-2xl md:text-3xl font-bold'>Bookmarks</h2>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProfileLessonList type='bookmarks' user={user?.id} />
        </HydrationBoundary>
      </section>
    </>
  );
}

export default Bookmarked;
