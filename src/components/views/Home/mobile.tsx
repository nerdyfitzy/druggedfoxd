import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewUploads from "../NewUploads";
import AllPosts from "../AllPosts";
import { SearchParamsProps } from "@/lib/types";

function MobileHomeView({
  searchParams,
  className,
}: SearchParamsProps & { className?: string }) {
  return (
    <Tabs
      defaultValue='new-uploads'
      className={`flex flex-col items-center gap-4 w-full ${className}`}
    >
      <TabsList className='flex gap-4 w-2/3'>
        <TabsTrigger value='new-uploads'>New Uploads</TabsTrigger>
        <TabsTrigger value='all-posts'>All Posts</TabsTrigger>
      </TabsList>
      <TabsContent value='new-uploads'>
        <NewUploads />
      </TabsContent>
      <TabsContent value='all-posts' className='w-full'>
        <AllPosts searchParams={searchParams} />
      </TabsContent>
    </Tabs>
  );
}

export default MobileHomeView;
