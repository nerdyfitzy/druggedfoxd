import React from "react";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className='border-t-1 bottom-0 flex h-8 w-full justify-center border-t bg-zinc-100 dark:bg-slate-900'>
      {/* <Separator className='' /> */}
      <p className='h-24 text-center text-sm'>
        Made with{" "}
        <Heart className='mx-1 inline' fill='red' width={20} height={20} /> by
        Kaylee
      </p>
    </footer>
  );
}
