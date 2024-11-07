"use client";

import { useMutationState } from "@tanstack/react-query";
import React from "react";

function AuthError() {
  const loginError = useMutationState({
    filters: { mutationKey: ["login"], status: "error" },
    select: (mutation) => mutation.state.error,
  });
  return (
    <>
      {loginError[0]?.message && (
        <p className='text-red-500 text-sm my-2'>Invalid login credentials</p>
      )}
    </>
  );
}

export default AuthError;
