import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import React from "react";

async function ProfilePicture() {
  const user = await useUser();
  if (!user || !user?.user_metadata.avatar_url) return <></>;
  return (
    <>
      <Image
        src={user?.user_metadata.avatar_url}
        alt='Profile picture'
        className='scale-100 rounded-full'
        width={40}
        height={25}
      />
    </>
  );
}

export default ProfilePicture;
