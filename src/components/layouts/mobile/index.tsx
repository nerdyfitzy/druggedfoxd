import React from "react";
import { images } from "@/constants/images";
import MobileNav from "./MobileNav";
import ThemeSwitcher from "@/components/theme/theme-switcher";
import Image from "next/image";

function MobileHeader({ className }: { className?: string }) {
  return (
    <header
      className={`border-b-1 relative flex items-center justify-between border-b px-8 py-4 ${className}`}
    >
      <Image src={images.logoSmall} alt='logo' width={50} height={25} />
      <div className='flex gap-4'>
        <MobileNav />
        <ThemeSwitcher />
      </div>
    </header>
  );
}

export default MobileHeader;
