import React from "react";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";
import LessonList from "@/components/Lessons";

function NewUploads() {
    const queryClient = new QueryClient();
    return (
        <section className='flex flex-col gap-4 sm:max-md:h-[48%] md:w-3/12 relative'>
            <h2 className='text-2xl font-bold'>New Uploads</h2>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <LessonList
                    filters={{
                        character: undefined,
                        opponent: undefined,
                        notes: undefined,
                        timestamped: false,
                    }}
                    pagination={{ page: 1, amount: 25 }}
                    user={undefined}
                    db='newUploads'
                />
            </HydrationBoundary>
        </section>
    );
}

export default NewUploads;
