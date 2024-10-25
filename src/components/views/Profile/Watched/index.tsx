import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { useUser } from "@/hooks/useUser";
import ProfileLessonList from "../ProfileLessonList";
import { getAllUserWatched } from "@/app/actions/watch";

async function Watched() {
  const queryClient = new QueryClient();
  const user = await useUser();
  await queryClient.prefetchQuery({
    queryKey: ["watched"],
    queryFn: () => getAllUserWatched(false),
  });
  return (
    <>
      <section className='flex md:w-1/3 relative flex-col sm:max-md:h-full gap-4'>
        <h2 className='sm:max-md:text-2xl md:text-3xl font-bold'>Watched</h2>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProfileLessonList type='watched' user={user?.id} />
        </HydrationBoundary>
      </section>
    </>
  );
}

export default Watched;
