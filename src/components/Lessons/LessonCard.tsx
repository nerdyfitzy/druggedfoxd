"use client";
import React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import LessonLink from "./LinkWrapper";
import { type Lesson } from "@/lib/types";
import Image from "next/image";
import { formatDate, getImageFromName } from "@/utils/helpers";
import { CircleCheck, CircleX } from "lucide-react";
import WatchedBookmarked from "./WatchedBookmarked";
import CMenuItems from "./CMenuItems";
import useBookmarkState from "@/hooks/useBookmarkState";
import useWatchedState from "@/hooks/useWatchedState";

type UserInfo = {
  watched: boolean;
  bookmarked: boolean;
};

type LessonProps = {
  isLoggedIn: boolean;
  db: string;
  lesson: Lesson;
  userInfo: UserInfo;
};

function Lesson({ isLoggedIn, db, lesson, userInfo }: LessonProps) {
  const { player, character, opponent, date, notes, timestamped, link, id } =
    lesson;
  const { watched, bookmarked } = userInfo;
  const bmState = useBookmarkState(bookmarked, lesson.id);
  const wState = useWatchedState(watched, lesson.id);
  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <LessonLink link={link} id={id} loggedIn={isLoggedIn}>
            <Card className='active:bg-zinc-75 relative mb-4 max-w-fit hover:bg-zinc-50 dark:hover:bg-slate-800 sm:h-52  sm:w-full md:h-52'>
              {db == "allPosts" ? (
                <div className='absolute right-0 top-0 z-50 mx-2 my-1 flex items-center justify-around gap-2'>
                  <WatchedBookmarked watched={wState} bookmarked={bmState} />
                </div>
              ) : (
                <></>
              )}

              <CardHeader>
                <CardTitle>
                  {player}
                  {"   "}
                </CardTitle>
                <CardDescription>
                  <Image
                    className='inline'
                    src={getImageFromName(character)}
                    alt={`character: ${character}`}
                  />
                  <span> vs </span>
                  <Image
                    className='inline'
                    src={getImageFromName(opponent)}
                    alt={`opponent: ${opponent}`}
                  />
                </CardDescription>
              </CardHeader>
              <CardContent className='sm:max-md:text-sm'>
                <div>
                  <Label className='text-md' htmlFor='timestamped'>
                    Timestamped:{" "}
                  </Label>
                  {timestamped ? (
                    <CircleCheck
                      id='timestamped'
                      className='inline sm:max-md:w-4'
                    />
                  ) : (
                    <CircleX
                      id='timestamped'
                      className='inline sm:max-md:w-4'
                    />
                  )}
                </div>
                <div>
                  <Label className='text-md inline' htmlFor='notes'>
                    Notes:
                  </Label>
                  <span className='text-sm'> {notes}</span>
                </div>
              </CardContent>
              <CardFooter>{formatDate(date)}</CardFooter>
            </Card>
          </LessonLink>
        </ContextMenuTrigger>
        <ContextMenuContent>
          {isLoggedIn ? (
            db == "allPosts" ? (
              <CMenuItems id={id} bookmarked={bmState} watched={wState} />
            ) : (
              <ContextMenuItem>
                Please only bookmark and mark watched in the All Posts section.
              </ContextMenuItem>
            )
          ) : (
            <ContextMenuItem>
              Log in to mark as watched and bookmark
            </ContextMenuItem>
          )}
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
}

export default Lesson;
