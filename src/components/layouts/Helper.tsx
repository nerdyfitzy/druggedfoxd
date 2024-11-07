import React from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

function Helper() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='dark:bg-slate-900 bg-zinc-100 absolute bottom-1 right-1 p-2 rounded-full'
        >
          ?
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='dark:bg-slate-900 bg-zinc-100'>
        <AlertDialogHeader>
          <AlertDialogTitle>Help</AlertDialogTitle>
          <AlertDialogDescription>
            <p>
              • You can right click to bookmark or save lessons. <br />• If you
              do not see a lesson here, it is because it was not in the public
              google sheet. I am working to add the leftover lessons, but doing
              it by hand is annoying. <br />• The code is publicly available on{" "}
              <Link
                target='_blank'
                className='underline text-blue-400'
                href='https://github.com/nerdyfitzy/druggedfoxd'
              >
                Github
              </Link>
              !
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Close</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Helper;
