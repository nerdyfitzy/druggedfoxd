import React from "react";
import { redirect } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import AuthCard from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Register() {
  const user = await useUser();

  if (user) redirect("/profile");
  return (
    <>
      <section className='flex h-full w-full items-center justify-center'>
        <AuthCard
          title='Register'
          description={
            <>
              <span>
                Already have an account?{" "}
                <Button className='mx-2 p-0' asChild variant='link'>
                  <Link href='/login'>Log in</Link>
                </Button>
              </span>
            </>
          }
          signup
        />
      </section>
    </>
  );
}
