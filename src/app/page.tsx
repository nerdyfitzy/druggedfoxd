import DesktopHomeView from "@/components/views/Home/desktop";
import MobileHomeView from "@/components/views/Home/mobile";
import { SearchParamsProps } from "@/utils/types";

export default function Home({ searchParams }: SearchParamsProps) {
  return (
    <main className='flex h-svh md:h-full justify-center flex-row gap-4 overflow-y-hidden md:pt-12 sm:px-4 md:px-10 lg:px-20'>
      <DesktopHomeView
        className='sm:max-md:hidden'
        searchParams={searchParams}
      />
      <MobileHomeView className='md:hidden' searchParams={searchParams} />
    </main>
  );
}
