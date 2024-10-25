import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bookmark, BookmarkPlus, Eye } from "lucide-react";

type WatchedBookmarkedProps = {
  watched: boolean;
  bookmarked: boolean;
};

export default function WatchedBookmarked({
  watched,
  bookmarked,
}: WatchedBookmarkedProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {!bookmarked ? (
            <BookmarkPlus />
          ) : (
            <Bookmark className='fill-black dark:fill-white' />
          )}
        </TooltipTrigger>
        <TooltipContent>
          <p>Right click to bookmark!</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          {watched ? <Eye className='static' /> : <></>}
        </TooltipTrigger>
        <TooltipContent>Watched</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
