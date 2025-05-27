"use client";

import React from "react";
import useMarkAsViewedMutation from "@/hooks/useMarkAsViewedQuery";

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
    const mutation = useMarkAsViewedMutation()
    const logAsViewed = () => {
        console.log("logging", id);
        if (loggedIn) {
            mutation.mutate(id)
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
