"use client";

import { ContextMenuItem } from "@/components/ui/context-menu";
import { changeBookmarked } from "@/app/actions/bookmark";
import { markWatched } from "@/app/actions/watch";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";
import { QueryClient, useMutation } from "@tanstack/react-query";

const Action = (
  <ToastAction altText='Goto profile'>
    <Link href='/profile'>Go to Profile</Link>
  </ToastAction>
);

type CMenuItemsProps = {
  id: number;
  bookmarked: boolean;
  watched: boolean;
};

export default function CMenuItems({
  id,
  bookmarked,
  watched,
}: CMenuItemsProps) {
  const queryClient = new QueryClient();
  const { toast } = useToast();
  const bookmarks = useMutation({
    mutationKey: ["changeBookmarked", `${id}`],
    mutationFn: (data: { lesson: number; toStatus: boolean }) => {
      return changeBookmarked(data.lesson, data.toStatus);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["bookmarks"] }),
  });
  const watches = useMutation({
    mutationKey: ["changeWatched", `${id}`],
    mutationFn: (data: { lesson: number; toStatus: boolean }) => {
      return markWatched(data.lesson, data.toStatus);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["watched"] }),
  });
  return (
    <>
      <ContextMenuItem
        inset
        onSelect={() => {
          toast({
            title: !bookmarked
              ? "Bookmarked Lesson!"
              : "Removed Lesson from Bookmarks",
            action: Action,
          });
          bookmarks.mutate({ lesson: id, toStatus: !bookmarked });
        }}
      >
        {bookmarked ? "Unb" : "B"}ookmark Lesson
      </ContextMenuItem>
      <ContextMenuItem
        inset
        onSelect={() => {
          toast({
            title: !watched ? "Marked as Watched!" : "Marked as not watched.",
            action: Action,
          });
          watches.mutate({ lesson: id, toStatus: !watched });
        }}
      >
        Mark as {watched ? "not " : " "}watched
      </ContextMenuItem>
    </>
  );
}
