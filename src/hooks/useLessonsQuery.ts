import { getLessons } from "@/app/actions/lessons";
import { FilterValues } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const useLessonsQuery = (
  db: "allPosts" | "newUploads",
  filters: FilterValues,
  pagination: { page: number; amount: number }
) => {
  const { character, opponent, notes, timestamped } = filters;
  const { page, amount } = pagination;
  return useQuery({
    queryKey: [db, { character, opponent, notes, timestamped, page, amount }],
    queryFn: async () =>
      await getLessons(
        { character, opponent, notes, timestamped },
        { page, amount }
      ),
  });
};
