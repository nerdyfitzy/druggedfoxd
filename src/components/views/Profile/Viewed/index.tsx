import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { useUser } from "@/hooks/useUser";
import ProfileLessonList from "../ProfileLessonList";
import { getAllRecentlyViewed } from "@/app/actions/watch";

async function Viewed() {
  const queryClient = new QueryClient();
  const user = await useUser();
  await queryClient.prefetchQuery({
    queryKey: ["viewed"],
    queryFn: () => getAllRecentlyViewed(),
  });
  return (
    <>
      <section className='flex md:w-1/3 relative flex-col sm:max-md:h-full gap-4'>
        <h2 className='sm:max-md:text-2xl md:text-3xl font-bold'>
          Recently Viewed{" "}
        </h2>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProfileLessonList type='viewed' user={user?.id} />
        </HydrationBoundary>
      </section>
    </>
  );
}

export default Viewed;
