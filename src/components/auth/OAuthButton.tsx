"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { login } from "@/app/(auth)/actions";
import { LoginMethods } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";

function OAuthButton({ name, image }: { name: LoginMethods; image: any }) {
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: { method: LoginMethods }) => {
      return login(data.method, {});
    },
  });
  return (
    <Button
      className='h-12 flex-1'
      variant='outline'
      key={name}
      asChild
      onClick={() => mutation.mutate({ method: name })}
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
