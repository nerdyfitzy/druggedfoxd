import React from "react";
import { images } from "@/constants/images";
import MobileNav from "./MobileNav";
import ThemeSwitcher from "@/components/theme/theme-switcher";
import Image from "next/image";
import Link from "next/link";

function MobileHeader({ className }: { className?: string }) {
  return (
    <header
      className={`border-b-1 h-16 mb-4 relative flex items-center justify-between border-b px-8 py-4 ${className}`}
    >
      <Link href='/'>
        <Image src={images.logoSmall} alt='logo' width={50} height={25} />
      </Link>

      <div className='flex gap-4'>
        <MobileNav />
        <ThemeSwitcher />
      </div>
    </header>
  );
}

export default MobileHeader;
