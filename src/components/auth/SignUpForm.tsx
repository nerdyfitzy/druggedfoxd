"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { emailSignUpSchema } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ShowPWButton from "./ShowPWButton";
import { signup } from "@/app/(auth)/actions";

export default function SignUpForm() {
  const [showPW, setShowPW] = useState(false);
  const form = useForm<z.infer<typeof emailSignUpSchema>>({
    resolver: zodResolver(emailSignUpSchema),
  });
  function onSubmit(values: z.infer<typeof emailSignUpSchema>) {
    signup("email", { email: values.email, password: values.password });
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
                  <Input {...field} placeholder='Email' />
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
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type={showPW ? "text" : "password"}
                    placeholder='Confirm Password'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Sign Up</Button>
        </form>
      </Form>
    </>
  );
}
