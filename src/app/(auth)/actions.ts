"use server";

import { createClient } from "@/utils/supabase/server";
import { LoginMethods } from "@/lib/types";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const login = async (
  method: LoginMethods,
  { email, password }: { email?: string; password?: string }
) => {
  const supabase = createClient();
  if (method === "email") {
    //sign in with pw
    const { error } = await supabase.auth.signInWithPassword({
      email: email as string,
      password: password as string,
    });
    if (error) throw new Error(error.message);
    else return;
  } else {
    console.log(headers(), "HEADERS!!");
    const origin = headers().get("origin");
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: method,
      options: {
        redirectTo: process.env.POST_LOGIN_CALLBACK_URL,
      },
    });
    if (error) throw new Error(error.message);
    if (data.url) return redirect(data.url);
  }
};

export const signup = async (
  method: LoginMethods,
  { email, password }: { email?: string; password?: string }
) => {
  const supabase = createClient();
  if (method === "email") {
    const { error } = await supabase.auth.signUp({
      email: email as string,
      password: password as string,
    });

    if (error) throw new Error(error.message);
    else return;
  } else {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: method,
      options: {
        redirectTo: process.env.POST_LOGIN_CALLBACK_URL,
      },
    });
    if (error) throw new Error(error.message);
    if (data.url) redirect(data.url);
  }
};

export const signout = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  redirect("/");
};
