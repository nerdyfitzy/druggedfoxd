import { getAllUserBookmarks } from "@/app/actions/bookmark";
import { useQuery } from "@tanstack/react-query";

export const useBookmarksQuery = () => {
  return useQuery({
    queryKey: ["bookmarks", "idOnly"],
    queryFn: () => getAllUserBookmarks(true),
  });
};
