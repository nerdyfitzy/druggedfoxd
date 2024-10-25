"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { login } from "@/app/(auth)/actions";
import { LoginMethods } from "@/lib/types";

function OAuthButton({ name, image }: { name: LoginMethods; image: any }) {
  return (
    <Button
      className='h-12 flex-1'
      variant='outline'
      key={name}
      asChild
      onClick={() => login(name, {})}
    >
      {name === "discord" ? (
        <Image src={image} alt={name} className='h-12' />
      ) : (
        <Image src={image} alt={name} className='h-12 w-12' />
      )}
    </Button>
  );
}

export default OAuthButton;
