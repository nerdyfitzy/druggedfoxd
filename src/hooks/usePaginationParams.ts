import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function usePaginationParams() {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleParams = (page: number, amount: number) => {
    const newParams = new URLSearchParams(params.toString());

    if (page !== -1) newParams.set("page", page.toString());
    if (amount !== -1) newParams.set("amount", amount.toString());

    router.push(`${pathname}?${newParams.toString()}`);
  };

  return { params, handleParams };
}

// ?newUploads=character=Marth,opponent=Fox,timestamped=true
