import React from "react";
import { routes } from "@/constants";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signout } from "@/app/(auth)/actions";

async function DesktopNav() {
  const user = await useUser();

  console.log(user);
  return (
    <>
      <nav className='flex gap-2'>
        {routes.map(({ path, name, renderOnAuth, requiresAuth, variant }) => {
          if (path === "/log-out" && user) {
            return (
              <form key='log-out' action={signout}>
                <Button variant='outline'>Log Out</Button>
              </form>
            );
          }
          if (user && renderOnAuth) {
            return (
              <Button variant={variant} key={path} asChild>
                <Link href={path}>{name}</Link>
              </Button>
            );
          } else if (!user && !requiresAuth) {
            return (
              <Button variant={variant} key={path} asChild>
                <Link href={path}>{name}</Link>
              </Button>
            );
          } else return <></>;
        })}
      </nav>
    </>
  );
}

export default DesktopNav;
