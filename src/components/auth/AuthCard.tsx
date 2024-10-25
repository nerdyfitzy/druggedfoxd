import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Google from "../../../public/static/images/google-icon.svg";
import Discord from "../../../public/static/images/discord-icon.svg";
import OAuthButton from "./OAuthButton";
import EmailForm from "./LoginForm";
import { Separator } from "../ui/separator";
import SignUpForm from "@/components/auth/SignUpForm";

const connections: { name: "google" | "discord"; image: any }[] = [
  {
    name: "google",
    image: Google,
  },
  {
    name: "discord",
    image: Discord,
  },
];

type AuthCardProps = {
  title: string;
  description: React.JSX.Element;
  login?: boolean;
  signup?: boolean;
};

export default function AuthCard({
  title,
  description,
  login = false,
  signup = false,
}: AuthCardProps) {
  return (
    <Card className='w-96 p-8'>
      <CardTitle>{title}</CardTitle>
      <CardDescription className='flex items-center'>
        {description}
      </CardDescription>
      <CardContent>
        {login && <EmailForm />}
        {signup && <SignUpForm />}

        <div className='my-2 flex w-full flex-row items-center justify-between gap-2 px-4 text-center text-sm text-slate-500'>
          <Separator className='w-1/3' />
          <p>or</p>
          <Separator className='w-1/3' />
        </div>
        <div className='flex w-full gap-4'>
          {connections.map(({ name, image }) => (
            <OAuthButton key={name} name={name} image={image} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
