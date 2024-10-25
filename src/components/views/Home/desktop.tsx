import React from "react";
import { SearchParamsProps } from "@/lib/types";
import NewUploads from "../NewUploads";
import AllPosts from "../AllPosts";

function DesktopHomeView({
  searchParams,
  className,
}: SearchParamsProps & { className?: string }) {
  return (
    <>
      <div className={`flex flex-row gap-4 w-full ${className}`}>
        <NewUploads />
        <AllPosts searchParams={searchParams} />
      </div>
    </>
  );
}

export default DesktopHomeView;
