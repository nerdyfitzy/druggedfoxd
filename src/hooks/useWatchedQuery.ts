import { getAllUserWatched } from "@/app/actions/watch";
import { useQuery } from "@tanstack/react-query";

export const useWatchedQuery = () => {
  return useQuery({
    queryKey: ["watched", "idOnly"],
    queryFn: () => getAllUserWatched(true),
  });
};
