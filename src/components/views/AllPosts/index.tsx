import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getLessons } from "@/app/actions/lessons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LessonList from "@/components/Lessons";
import Filters from "./Filters";
import { useUser } from "@/hooks/useUser";
import { SearchParamsProps } from "@/lib/types";
import { Filter } from "lucide-react";
import { getAllUserBookmarks } from "@/app/actions/bookmark";
import { getAllUserWatched } from "@/app/actions/watch";

async function AllPosts({ searchParams }: SearchParamsProps) {
  const queryClient = new QueryClient();
  const user = await useUser();

  const { character, opponent, notes, timestamped, page, amount } =
    searchParams;
  const boolTimestamped = timestamped === "true" ? true : false;
  await queryClient.prefetchQuery({
    queryKey: [
      "allPosts",
      character,
      opponent,
      notes,
      timestamped,
      page,
      amount,
    ],
    queryFn: async () =>
      await getLessons(
        { character, opponent, notes, timestamped: boolTimestamped },
        { page: Number(page) || 1, amount: Number(amount) || 20 }
      ),
  });

  if (user) {
    await queryClient.prefetchQuery({
      queryKey: ["bookmarks"],
      queryFn: () => getAllUserBookmarks(true),
    });

    await queryClient.prefetchQuery({
      queryKey: ["watched"],
      queryFn: () => getAllUserWatched(true),
    });
  }

  return (
    <section className='flex relative flex-col sm:max-md:h-[48%] md:w-full gap-4'>
      <h2 className='text-2xl font-bold'>
        All Posts{" "}
        <span>
          <Popover>
            <PopoverTrigger>
              <Filter className='mb-1 ml-4 inline fill-black dark:fill-white' />
            </PopoverTrigger>
            <PopoverContent>
              <Filters />
            </PopoverContent>
          </Popover>
        </span>
      </h2>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <LessonList
          filters={{ character, opponent, notes, timestamped: boolTimestamped }}
          user={user?.id}
          db='allPosts'
          pagination={{ page: Number(page) || 1, amount: Number(amount) || 20 }}
        />
      </HydrationBoundary>
    </section>
  );
}

export default AllPosts;
