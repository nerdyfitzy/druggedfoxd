import React from "react";
import Bookmarked from "./Bookmarked";
import Watched from "./Watched";
import Viewed from "./Viewed";

function DesktopProfile({ className }: { className?: string }) {
  return (
    <>
      <div className={`gap-2 w-full h-full flex ${className}`}>
        <Bookmarked />
        <Watched />
        <Viewed />
      </div>
    </>
  );
}

export default DesktopProfile;
