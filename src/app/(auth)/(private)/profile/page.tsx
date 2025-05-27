import React from "react";
import DesktopProfile from "@/components/views/Profile/desktop";
import MobileProfile from "@/components/views/Profile/mobile";
import { useUser } from "@/hooks/useUser";
import { redirect } from "next/navigation";

async function Profile() {
    const user = await useUser();
    if (!user) redirect("/login");
    return (
        <main className='flex h-full justify-center flex-row gap-4 overflow-y-hidden md:pt-12 sm:px-4 md:px-10 lg:px-20'>
            <DesktopProfile className='sm:max-md:hidden sm:max-md:absolute' />
            <MobileProfile className='md:hidden' />
        </main>
    );
}

export default Profile;
