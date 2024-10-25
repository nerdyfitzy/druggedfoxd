import React from "react";
import { redirect } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import AuthCard from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Login() {
  const user = await useUser();
  if (user) redirect("/profile");
  return (
    <>
      <section className='flex h-full w-full items-center justify-center'>
        <AuthCard
          title='Login'
          description={
            <>
              {"Don't"} have an account?{" "}
              <Button asChild variant='link' className='px-2'>
                <Link href='/signup'>Register here</Link>
              </Button>
            </>
          }
          login
        />
      </section>
    </>
  );
}
