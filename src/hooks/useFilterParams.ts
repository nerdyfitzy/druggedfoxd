import { FilterValues } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useFilterParams() {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleFilter = (filterValues: FilterValues) => {
    const newParams = new URLSearchParams(params.toString());
    for (const key in filterValues) {
      if (filterValues[key as keyof FilterValues] !== undefined)
        newParams.set(key, String(filterValues[key as keyof FilterValues]));
      else newParams.delete(key);
    }
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const clearFilters = () => {
    router.push(`${pathname}`);
  };

  return { handleFilter, clearFilters };
}
