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
import { SearchParamsProps } from "@/utils/types";
import { Filter } from "lucide-react";
import { getAllUserBookmarks } from "@/app/actions/bookmark";
import { getAllUserWatched } from "@/app/actions/watch";
import { DEFAULT_AMOUNT } from "@/constants";

async function AllPosts({ searchParams }: SearchParamsProps) {
    const queryClient = new QueryClient();
    const user = await useUser();

    const { character, opponent, notes } = searchParams;
    const timestamped = searchParams.timestamped === "true" ? true : false;
    const page = Number(searchParams.page) || 1;
    const amount = Number(searchParams.amount) || DEFAULT_AMOUNT;
    await queryClient.prefetchQuery({
        queryKey: [
            "allPosts",
            { character, opponent, notes, timestamped, page, amount },
        ],
        queryFn: () =>
            getLessons(
                { character, opponent, notes, timestamped },
                { page, amount }
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
                    filters={{ character, opponent, notes, timestamped }}
                    user={user?.id}
                    db='allPosts'
                    pagination={{ page, amount }}
                />
            </HydrationBoundary>
        </section>
    );
}

export default AllPosts;
