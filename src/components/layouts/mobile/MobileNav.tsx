import React from "react";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { PopoverContent, PopoverProps } from "@radix-ui/react-popover";
import { routes } from "@/constants";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useUser } from "@/hooks/useUser";

async function MobileNav(props: PopoverProps) {
  const user = await useUser();
  return (
    <Popover {...props}>
      <PopoverTrigger>
        <Button
          asChild
          variant='outline'
          size='icon'
          className='rounded-full p-2'
        >
          <Menu />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='dark:bg-slate-900 bg-zinc-100'>
        <nav className='border rounded-lg border-slate-300'>
          <ul className='flex flex-col gap-2 list-none p-0'>
            {routes.map(({ path, name, renderOnAuth, requiresAuth }) => {
              if (!renderOnAuth && user) return <></>;
              if (requiresAuth && !user) return <></>;
              return (
                <li className='w-full' key={path}>
                  <Button variant='link' asChild className='w-full'>
                    <Link href={path}>{name}</Link>
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>
      </PopoverContent>
    </Popover>
  );
}

export default MobileNav;
