"use client";

import React from "react";
import { logLessonAsViewed } from "@/app/actions/watch";

type LessonLinkProps = React.PropsWithChildren & {
  link: string;
  id: number;
  loggedIn: boolean;
};

export default function LessonLink({
  children,
  link,
  id,
  loggedIn,
}: LessonLinkProps) {
  const logAsViewed = () => {
    console.log("logging", id);
    if (loggedIn) {
      logLessonAsViewed(id);
    }
  };
  return (
    <a
      href={link}
      target='_blank'
      rel='noreferrer'
      className='h-fit max-w-fit'
      onClick={logAsViewed}
    >
      {children}
    </a>
  );
}
