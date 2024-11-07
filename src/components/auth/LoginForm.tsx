"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { emailLoginSchema } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ShowPWButton from "./ShowPWButton";
import { login } from "@/app/(auth)/actions";
import { useMutation } from "@tanstack/react-query";
import { LoginMethods } from "@/lib/types";

export default function EmailForm() {
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: {
      method: LoginMethods;
      credentials: { email: string; password: string };
    }) => {
      return login(data.method, {
        email: data.credentials.email,
        password: data.credentials.password,
      });
    },
  });
  const [showPW, setShowPW] = useState(false);
  const form = useForm<z.infer<typeof emailLoginSchema>>({
    resolver: zodResolver(emailLoginSchema),
  });
  function onSubmit(values: z.infer<typeof emailLoginSchema>) {
    mutation.mutate({
      method: "email",
      credentials: { email: values.email, password: values.password },
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          className='flex flex-col gap-4'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type='email' placeholder='Email' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='relative'>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type={showPW ? "text" : "password"}
                    placeholder='Password'
                  />
                </FormControl>

                <ShowPWButton showPW={showPW} setShowPW={setShowPW} />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Log in</Button>
        </form>
      </Form>
    </>
  );
}
