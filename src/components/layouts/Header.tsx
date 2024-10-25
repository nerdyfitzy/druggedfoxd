import React from "react";
import DesktopHeader from "./desktop";
import MobileHeader from "./mobile";

function Header() {
  return (
    <>
      <DesktopHeader className='sm:max-md:hidden' />
      <MobileHeader className='md:hidden' />
    </>
  );
}

export default Header;
