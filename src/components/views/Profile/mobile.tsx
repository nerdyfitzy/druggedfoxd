import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Bookmarked from "./Bookmarked";
import Watched from "./Watched";
import Viewed from "./Viewed";

function MobileProfile({ className }: { className?: string }) {
  return (
    <Tabs
      defaultValue='bookmarks'
      className={`flex flex-col items-center gap-4 w-full ${className}`}
    >
      <TabsList className='flex gap-4 w-full'>
        <TabsTrigger value='bookmarks'>Bookmarks</TabsTrigger>
        <TabsTrigger value='watched'>Watched</TabsTrigger>
        <TabsTrigger value='recently-viewed'>Recently Viewed</TabsTrigger>
      </TabsList>
      <TabsContent value='bookmarks' className='flex justify-center'>
        <Bookmarked />
      </TabsContent>
      <TabsContent value='watched' className='flex justify-center'>
        <Watched />
      </TabsContent>
      <TabsContent value='recently-viewed' className='flex justify-center'>
        <Viewed />
      </TabsContent>
    </Tabs>
  );
}

export default MobileProfile;
