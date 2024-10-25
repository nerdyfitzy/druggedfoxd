import Image from "next/image";
import Link from "next/link";
import React from "react";
import { images } from "@/constants/images";
import DesktopNav from "./DesktopNav";
import ThemeSwitcher from "@/components/theme/theme-switcher";
import ProfilePicture from "../ProfilePicture";

function DesktopHeader({ className }: { className?: string }) {
  return (
    <header
      className={`border-b-1 relative flex items-center justify-between border-b px-8 py-4 ${className}`}
    >
      <Link href='/'>
        {/* <h1 className='font-extrabold text-3xl'>Druggedfox Organizer</h1> */}
        <Image
          src={images.logoDark}
          alt='logo'
          width={200}
          height={50}
          className='absolute left-0 top-0 w-72 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 sm:max-md:hidden'
        />
        <Image
          src={images.logoLight}
          alt='logo'
          width={200}
          height={50}
          className='absolute left-0 top-0 w-72 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 sm:max-md:hidden'
        />
      </Link>

      {/* <Separator className=""/> */}
      <div className='flex gap-4'>
        <DesktopNav />
        <ThemeSwitcher />
        <ProfilePicture />
      </div>
    </header>
  );
}

export default DesktopHeader;
